<template>
  <div class="projects__list">
    <nuxt-link @click="useClick()" :to="`/projects/${project.slug}`" class="projects__item" v-for="project of props.list"
      :key="project.id">
      <div class="projects__item-img">
        <img src="@/assets/source/website.svg" alt="Icon site" />
      </div>
      <div class="projects__item-text">
        <h3>{{ project.title }}</h3>
        <p>{{ project.shortDescription }}</p>
      </div>
    </nuxt-link>
  </div>
</template>



<script setup lang="ts">
import { IProject } from '~/types/IProject';

const props = defineProps<{ list: IProject[] }>()
</script>
