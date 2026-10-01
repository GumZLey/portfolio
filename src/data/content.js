// All site content lives here. To add a project, append an object to `projects`.
// ponytail: eager glob emits every matched file, so keep patterns narrow (no my-image/ originals)
const files = import.meta.glob(
  ['../assets/*.{png,jpg}', '../assets/skills/*.png', '../assets/photos/*.jpg'],
  { eager: true, query: '?url', import: 'default' },
)
const asset = (name) => files[`../assets/${name}`]

export const links = {
  email: 'kliv2554@gmail.com',
  github: 'https://github.com/GumZLey',
  linkedin: 'https://www.linkedin.com/in/ananda-kongkoed-862154217/',
  instagram: 'https://www.instagram.com/ley_adk',
  facebook: 'https://www.facebook.com/share/168vFHTEnu/?mibextid=wwXIfr',
  cv: 'https://drive.google.com/drive/folders/1-5pJBW3yjcf6OWomnPjFRa_s9wt4g7ql?usp=sharing',
}

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'projects', label: 'Projects' },
  { id: 'offduty', label: 'Off-duty' },
  { id: 'contact', label: 'Contact' },
]

// `id` doubles as the hero-graph node id, so hovering a skill lights its node.
export const skillGroups = [
  {
    name: 'Backend',
    skills: [
      { id: 'go', name: 'Go', level: 'Primary', icon: null },
      { id: 'node', name: 'Node / Express', icon: null },
      { id: 'python', name: 'Python / Flask', icon: 'python.png' },
      { id: 'java', name: 'Java', icon: 'java.png' },
      { id: 'sql', name: 'SQL / PostgreSQL', icon: 'sql.png' },
      { id: 'mongo', name: 'MongoDB', icon: 'mongo.png' },
      { id: 'docker', name: 'Docker', icon: 'docker.png' },
    ],
  },
  {
    name: 'Frontend',
    skills: [
      { id: 'vue', name: 'Vue', icon: 'vue.png' },
      { id: 'react', name: 'React', icon: 'react.png' },
      { id: 'tailwind', name: 'Tailwind', icon: 'tailwind.png' },
      { id: 'javascript', name: 'JavaScript', icon: 'javascript.png' },
      { id: 'html', name: 'HTML / CSS', icon: 'html.png' },
    ],
  },
  {
    name: 'Also',
    skills: [
      { id: 'cpp', name: 'C / C++', icon: 'cpp.png' },
      { id: 'git', name: 'Git / GitHub', icon: 'Github.png' },
    ],
  },
].map((g) => ({
  ...g,
  skills: g.skills.map((s) => ({ ...s, icon: s.icon && asset(`skills/${s.icon}`) })),
}))

// Hero service graph. Clicking a node jumps to Skills and pulses the matching skill.
export const graph = {
  nodes: [
    { id: 'go', label: 'Go service', pos: [0, 0, 0], size: 1, color: 0x38d6f5 },
    { id: 'node', label: 'API gateway', pos: [-2.6, 0.9, 0.8], size: 0.65, color: 0x7ee787 },
    { id: 'vue', label: 'Vue client', pos: [-5, 1.9, -0.4], size: 0.5, color: 0x42d392 },
    { id: 'react', label: 'React client', pos: [-4.6, -1.3, 1], size: 0.5, color: 0x61dafb },
    { id: 'python', label: 'ML service', pos: [-1.4, -2.4, -0.6], size: 0.6, color: 0xffd43b },
    { id: 'sql', label: 'PostgreSQL', pos: [3, 1.4, -0.8], size: 0.6, color: 0x7aa2ff },
    { id: 'mongo', label: 'MongoDB', pos: [2.6, -1.8, 0.6], size: 0.55, color: 0x4db33d },
    { id: 'docker', label: 'Docker', pos: [0.4, 2.6, 1.2], size: 0.5, color: 0x2496ed },
    { id: 'java', label: 'Java', pos: [5, -0.2, 0.2], size: 0.45, color: 0xf89820 },
  ],
  edges: [
    ['vue', 'node'],
    ['react', 'node'],
    ['node', 'go'],
    ['node', 'python'],
    ['go', 'sql'],
    ['go', 'mongo'],
    ['node', 'mongo'],
    ['docker', 'go'],
    ['docker', 'python'],
    ['python', 'sql'],
    ['go', 'java'],
  ],
}

export const timeline = [
  {
    when: '2021',
    title: 'Repl.it Game Jam — Kajam',
    body: 'First game jam. Shipped a playable game under a deadline.',
  },
  {
    when: '2022',
    title: 'B.Eng. Computer Engineering, Mahidol University',
    body: 'Started a degree in algorithms, systems, and software engineering. Joined the Amity Generative AI Hackathon the same year.',
  },
  {
    when: '2023',
    title: 'Mahidol Innovation for Campus Sustainability',
    body: 'Built and pitched tech ideas for a greener campus.',
  },
  {
    when: 'Internship',
    title: 'Intern — T.C.C Technology',
    body: 'Joined T.C.C Technology as an intern, working on backend services and enterprise applications.',
  },
  {
    when: 'Now',
    title: 'Application Developer — T.C.C Technology',
    body: 'Building backend systems and enterprise applications, with Go as my main language.',
    current: true,
  },
  {
    when: '6 Oct 2026',
    title: 'Graduation 🎓',
    body: 'Officially graduating, B.Eng. Computer Engineering, Mahidol University.',
  },
]

export const filters = ['All', 'Backend', 'Full-stack', 'AI', 'Game']

export const projects = [
  {
    name: 'Image Segment Nothing',
    summary:
      'A web app for deep-learning image segmentation. Upload an image, run AI-powered segmentation, inspect the segmented regions, and download the result.',
    stack: ['React', 'Node', 'Express', 'Python', 'Tailwind'],
    tags: ['Full-stack', 'AI'],
    image: asset('SN.jpg'),
    link: 'https://github.com/GumZLey/image-segment-nothing-project',
  },
  {
    name: 'Book Recommendation',
    summary:
      'Personalized book suggestions using TF-IDF and cosine similarity. A Flask API serves recommendations from a CSV dataset to a Vue frontend.',
    stack: ['Python', 'Flask', 'Vue', 'Tailwind'],
    tags: ['Backend', 'AI', 'Full-stack'],
    image: asset('book-recommendation.jpg'),
    link: 'https://github.com/GumZLey/Library-Recommend-System',
  },
  {
    name: 'Contact List',
    summary:
      'Contact manager with Google sign-in and full CRUD and search. Express API, MongoDB storage, and a Vue 3 + Vuex client.',
    stack: ['Vue', 'Vuex', 'Node', 'Express', 'MongoDB'],
    tags: ['Backend', 'Full-stack'],
    image: asset('Contact-List-Login.jpg'),
    link: 'https://github.com/GumZLey/Contact-List',
  },
  {
    name: 'Locus',
    summary:
      'A 2D shooter in Java Swing. It is built around threads for the game loop, projectiles, and audio, with a clean OOP structure.',
    stack: ['Java', 'Swing', 'Threads'],
    tags: ['Game'],
    image: asset('Locus.png'),
    link: 'https://github.com/GumZLey/Locus',
  },
  {
    name: 'Agado',
    status: 'Ongoing',
    summary:
      'An Agoda-style finder for dormitories near Mahidol, which ranks places by price-to-value. Owners can list their own places. Uses the Google Maps API.',
    stack: ['Vue', 'Node', 'Express', 'PostgreSQL'],
    tags: ['Backend', 'Full-stack'],
    image: asset('Agado.jpg'),
    link: 'https://github.com/GumZLey',
  },
  {
    name: 'Dead Prevention',
    status: 'Ongoing',
    summary:
      'A finger-worn embedded sensor streams patient vitals to a Strapi backend and a Vue dashboard, so staff can watch patients while they wait for a doctor.',
    stack: ['Embedded', 'Strapi', 'Vue'],
    tags: ['Backend', 'Full-stack'],
    image: asset('Dead_Prevention.jpg'),
    link: 'https://github.com/GumZLey',
  },
]

const odin = 'https://github.com/GumZLey/git_test/tree/main/Project/'
export const earlyWork = [
  { name: 'Calculator', image: 'Calculator.jpg', link: odin + 'Calculator', from: 'Odin' },
  { name: 'Dashboard', image: 'Dashboard.jpg', link: odin + 'Dashboard', from: 'Odin' },
  { name: 'Etch A Sketch', image: 'Etch.png', link: odin + 'Etch-a-Sketch', from: 'Odin' },
  { name: 'Library', image: 'Library.jpg', link: odin + 'Library', from: 'Odin' },
  { name: 'Sign-up Form', image: 'Sign-up.jpg', link: odin + 'Sign-up-Form', from: 'Odin' },
  { name: 'Tic Tac Toe', image: 'Tic.jpg', link: odin + 'Tic-Tac-Toe', from: 'Odin' },
  { name: 'Landing Page', image: 'Landing.jpg', link: odin + 'landing-page', from: 'Odin' },
  { name: 'Recipes', image: 'Recipes.png', link: odin + 'recipes', from: 'Odin' },
  {
    name: 'NFT Preview Card',
    image: 'nft-preview.jpg',
    link: 'https://github.com/GumZLey/nft-preview-card-component-main',
    from: 'Frontend Mentor',
  },
  {
    name: 'QR Code',
    image: 'QR.jpg',
    link: 'https://github.com/GumZLey/qr-code-component-Practice',
    from: 'Frontend Mentor',
  },
  {
    name: 'Result Summary',
    image: 'Result.jpg',
    link: 'https://github.com/GumZLey/FEM-Result_summary',
    from: 'Frontend Mentor',
  },
].map((p) => ({ ...p, image: asset(p.image) }))

export const photos = [
  { src: asset('photos/basketball.jpg'), caption: 'Catch-and-shoot on the court' },
  { src: asset('photos/golf.jpg'), caption: 'Working on my swing at the range' },
  { src: asset('photos/portrait.jpg'), caption: 'Recharging away from the screen' },
  { src: asset('photos/mirror.jpg'), caption: 'MICS shirt, still proud of it' },
]
