<template>
  <div>

    <div class="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
      <div class="mr-6">
        <h1 class="text-4xl font-semibold mb-2">Редактировать проект</h1>
      </div>
    </div>


    <section class="w-full">

      <AdminMyInput title="Заголовок" v-model="project.title" />

      <AdminMyTextArea title="Краткое описание" v-model="project.shortDescription" />
      <AdminQuill v-model="project.description" />
      <AdminMyInput title="Ссылка на проект" v-model="project.link" />

      <AdminMyButton title="Изменить" @click="save" />

    </section>

  </div>
</template>



<script setup>
import { useProjectStore } from '~/store/project';

definePageMeta({
  layout: 'admin'
})


const route = useRoute();

await useProjectStore().fetchOne(route.params.id)
const project = computed(() => {
  return useProjectStore().getProject
})

const save = () => {
  const validate = useValidate(project.value).validate(['title', 'description', 'shortDescription', 'link'])
  if (!validate) {
    return
  }

  useProjectStore().update(project.value, project.value.id)

}


</script>