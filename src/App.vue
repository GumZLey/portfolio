<script setup>
import NavBar from '@/components/NavBar.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import TimelineSection from '@/components/TimelineSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import OffDutySection from '@/components/OffDutySection.vue'
import ContactSection from '@/components/ContactSection.vue'
import CommandPalette from '@/components/CommandPalette.vue'
</script>

<template>
  <NavBar />
  <main>
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <TimelineSection />
    <ProjectsSection />
    <OffDutySection />
    <ContactSection />
  </main>
  <CommandPalette />
</template>
