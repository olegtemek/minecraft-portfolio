<template>
  <div class="info" v-if="project">
    <div class="container">
      <div class="info__wrapper">
        <h1 class="info__title">
          {{ project.title }}
        </h1>
        <ClientOnly>
          <p class="info__description" v-html="project.description"></p>
        </ClientOnly>

        <UiMyButton title="Back" type="nuxt-link" link="/projects" />
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import { useProjectStore } from '~/store/project';
import { IProject } from '~/types/IProject';

const route = useRoute()



if (typeof route.params.slug == 'string') {
  await useProjectStore().fetchOneBySlug(route.params.slug)
}

const project: ComputedRef<IProject | undefined> = computed(() => {
  return useProjectStore().getProject
})

</script>