<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { CSS2DObject, CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'
import { graph } from '@/data/content'
import { highlight } from '@/state'

const emit = defineEmits(['select'])
const host = ref(null)
let cleanup = () => {}

onMounted(() => {
  const el = host.value
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  const small = innerWidth < 768

  let renderer
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true })
  } catch {
    return // no WebGL: the CSS backdrop behind the canvas stays
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, small ? 1.5 : 2))
  renderer.setClearColor(0x07070c)
  el.appendChild(renderer.domElement)

  const labels = new CSS2DRenderer()
  labels.domElement.className = 'graph-labels'
  el.appendChild(labels.domElement)

  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x07070c, 0.035)
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
  camera.position.set(0, small ? -3.2 : -0.4, small ? 19 : 15)
  const world = new THREE.Group()
  scene.add(world)
  const disposables = []
  const track = (x) => (disposables.push(x), x)

  // Nodes: solid core + slowly spinning wireframe shell + HTML label.
  const coreGeo = track(new THREE.IcosahedronGeometry(1, 3))
  const shellGeo = track(new THREE.IcosahedronGeometry(1, 1))
  const nodes = {}
  for (const n of graph.nodes) {
    const g = new THREE.Group()
    g.position.set(...n.pos)
    const core = new THREE.Mesh(coreGeo, track(new THREE.MeshBasicMaterial({ color: n.color })))
    core.scale.setScalar(n.size * 0.42)
    core.userData.id = n.id
    const shell = new THREE.Mesh(
      shellGeo,
      track(
        new THREE.MeshBasicMaterial({
          color: n.color,
          wireframe: true,
          transparent: true,
          opacity: 0.3,
        }),
      ),
    )
    shell.scale.setScalar(n.size * 0.85)
    const div = document.createElement('div')
    div.className = 'graph-label'
    div.textContent = n.label
    const label = new CSS2DObject(div)
    label.position.y = -n.size - 0.25
    g.add(core, shell, label)
    world.add(g)
    nodes[n.id] = { ...n, g, core, shell, div, scale: 1 }
  }
  const cores = Object.values(nodes).map((n) => n.core)

  // Edges.
  const edges = graph.edges.map(([a, b]) => {
    const mat = track(
      new THREE.LineBasicMaterial({ color: 0x9aa4ff, transparent: true, opacity: 0.14 }),
    )
    const geo = track(
      new THREE.BufferGeometry().setFromPoints([nodes[a].g.position, nodes[b].g.position]),
    )
    world.add(new THREE.Line(geo, mat))
    return { a, b, mat }
  })

  // Packets hop edge to edge like requests being routed through services.
  const packetGeo = track(new THREE.SphereGeometry(0.07, 8, 8))
  const packets = Array.from({ length: reduced ? 0 : small ? 14 : 32 }, () => {
    const p = { mesh: new THREE.Mesh(packetGeo, track(new THREE.MeshBasicMaterial())) }
    route(p, edges[Math.floor(Math.random() * edges.length)].a)
    p.t = Math.random()
    world.add(p.mesh)
    return p
  })
  function route(p, from) {
    const options = edges.filter((e) => e.a === from || e.b === from)
    const e = options[Math.floor(Math.random() * options.length)]
    p.from = from
    p.to = e.a === from ? e.b : e.a
    p.t = 0
    p.speed = 0.35 + Math.random() * 0.5
    p.mesh.material.color.setHex(nodes[from].color).multiplyScalar(1.6)
  }

  // Background star dust.
  const starPos = new Float32Array(900)
  for (let i = 0; i < starPos.length; i++) starPos[i] = (Math.random() - 0.5) * 60
  const starGeo = track(new THREE.BufferGeometry())
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
  scene.add(
    new THREE.Points(starGeo, track(new THREE.PointsMaterial({ color: 0x8b8bb0, size: 0.06 }))),
  )

  let composer
  if (!small) {
    composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.75, 0.4, 0.2))
    composer.addPass(new OutputPass())
  }

  // Interaction.
  const pointer = new THREE.Vector2(9, 9) // offscreen until the cursor moves
  const raycaster = new THREE.Raycaster()
  let hovered = null
  const pick = () => {
    scene.updateMatrixWorld() // may run before the first frame has rendered
    camera.updateMatrixWorld()
    raycaster.setFromCamera(pointer, camera)
    return raycaster.intersectObjects(cores)[0]?.object.userData.id ?? null
  }
  const setPointer = (e) => {
    const r = el.getBoundingClientRect()
    pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
  }
  const onMove = (e) => setPointer(e)
  const onLeave = () => pointer.set(9, 9)
  const onClick = (e) => {
    setPointer(e)
    const id = pick()
    if (id) emit('select', id)
  }
  el.addEventListener('pointermove', onMove)
  el.addEventListener('pointerleave', onLeave)
  el.addEventListener('click', onClick)

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = el
    camera.aspect = w / h
    // Wide screens: slide the graph into the right half, clear of the hero text.
    camera.position.x = camera.aspect > 1.2 ? -0.22 * 14 * camera.aspect : 0
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
    labels.setSize(w, h)
    composer?.setSize(w, h)
  }
  const ro = new ResizeObserver(resize)
  ro.observe(el)
  resize()

  let last = performance.now()
  let spin = 0
  const tilt = new THREE.Vector2()
  const loop = (now) => {
    const dt = Math.min((now - last) / 1000, 0.05)
    last = now

    hovered = pointer.x < 2 ? pick() : null
    el.style.cursor = hovered ? 'pointer' : ''
    const active = hovered ?? highlight.value

    if (!reduced) spin += dt * 0.06
    const px = pointer.x < 2 ? pointer.x : 0
    const py = pointer.x < 2 ? pointer.y : 0
    tilt.x += (-py * 0.18 - tilt.x) * 0.04
    tilt.y += (px * 0.35 - tilt.y) * 0.04
    world.rotation.set(tilt.x, spin + tilt.y, 0)

    for (const n of Object.values(nodes)) {
      const target = n.id === active ? 1.6 : 1
      n.scale += (target - n.scale) * 0.12
      n.g.scale.setScalar(n.scale)
      n.shell.rotation.y += dt * 0.4
      n.div.classList.toggle('active', n.id === active)
    }
    for (const e of edges) {
      const target = active && (e.a === active || e.b === active) ? 0.7 : 0.14
      e.mat.opacity += (target - e.mat.opacity) * 0.1
    }
    for (const p of packets) {
      p.t += p.speed * dt
      if (p.t >= 1) route(p, p.to)
      p.mesh.position.lerpVectors(nodes[p.from].g.position, nodes[p.to].g.position, p.t)
    }

    composer ? composer.render() : renderer.render(scene, camera)
    labels.render(scene, camera)
  }

  // Only animate while the hero is on screen.
  const io = new IntersectionObserver(([e]) => {
    last = performance.now()
    renderer.setAnimationLoop(e.isIntersecting ? loop : null)
  })
  io.observe(el)

  cleanup = () => {
    io.disconnect()
    ro.disconnect()
    renderer.setAnimationLoop(null)
    el.removeEventListener('pointermove', onMove)
    el.removeEventListener('pointerleave', onLeave)
    el.removeEventListener('click', onClick)
    disposables.forEach((d) => d.dispose())
    composer?.dispose()
    renderer.dispose()
    el.replaceChildren()
  }
})

onBeforeUnmount(() => cleanup())
</script>

<template>
  <div ref="host" class="absolute inset-0" aria-hidden="true" />
</template>

<style>
.graph-labels {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.graph-label {
  font-family: var(--font-mono);
  font-size: 11px;
  color: rgb(236 236 241 / 0.55);
  letter-spacing: 0.04em;
  white-space: nowrap;
  transition: color 0.3s; /* never transition transform: CSS2DRenderer moves labels with it */
}
.graph-label.active {
  color: #fff;
  text-shadow: 0 0 12px rgb(56 214 245 / 0.8);
}
</style>
