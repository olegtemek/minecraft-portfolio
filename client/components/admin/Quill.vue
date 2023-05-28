<template>
  <quill-editor theme="snow" toolbar="full" contentType="html" v-model:content="quill" style="min-height: 500px;" />
</template>


<script setup lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';
const { QuillEditor } = await import('@vueup/vue-quill');
const { vueApp } = useNuxtApp();
if (!vueApp._context.components.QuillEditor) vueApp.component('QuillEditor', QuillEditor);


const props = defineProps({
  modelValue: String
})
const quill: Ref<string> = ref(props.modelValue ?? '')
const emits = defineEmits(['update:modelValue'])
watch(() => quill.value, (first, second) => {
  emits('update:modelValue', quill.value)
})





</script>