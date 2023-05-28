<template>
  <div>

    <div class="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
      <div class="mr-6">
        <h1 class="text-4xl font-semibold mb-2">Добавить проект</h1>
      </div>
    </div>



    <section class="w-full">

      <AdminMyInput title="Заголовок" v-model="project.title" />
      <AdminMyTextArea title="Краткое описание" v-model="project.shortDescription" />
      <AdminQuill v-model="project.description" />
      <AdminMyInput title="Ссылка на проект" v-model="project.link" />
      <AdminMyButton title="Сохранить" @click="save" />
    </section>

  </div>
</template>



<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})



import { useProjectStore } from '@/store/project';
import { IProject } from '~/types/IProject';

const project: Ref<IProject> = ref({
  title: "",
  shortDescription: "",
  description: "",
  link: ""
})


const save = () => {
  const validate = useValidate(project.value).validate(['title', 'shortDescription', 'description', 'link'])
  if (!validate) {
    return
  }

  useProjectStore().create(project.value)
}
</script>