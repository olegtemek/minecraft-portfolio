<template>
  <div class="projects">
    <div class="container">
      <div class="projects__title">
        <h1>Select project</h1>
      </div>
      <ProjectsList :list="projects" />
      <div class="projects__buttons">
        <UiMyButton title="Back" type="nuxt-link" link="/" />
        <UiMyButton title="See more on github" type="link" link="https://github.com/olegtemek" />
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import { useProjectStore } from '~/store/project';
import { IProject } from '~/types/IProject';


await useProjectStore().fetchAll()

const projects: ComputedRef<IProject[]> = (computed(() => {
  return useProjectStore().getProjects
}))
</script>