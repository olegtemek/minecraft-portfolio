<template>
  <div class="w-screen  flex">
    <!-- Side bar -->
    <div class="w-[300px] min-h-screen bg-gray-200 text-white" v-show="showSide">
      <div class="h-[50px] bg-gray-900 flex justify-start  items-center ">
        <div class="px-[20px]">
          <h3 class="font-bold text-xl">Admin Dashboard</h3>
        </div>
      </div>
      <div class="h-[calc(100%-50px)] bg-gray-800 py-[20px]">
        <div class="flex flex-col justify-between px-[20px] space-y-[10px]">
          <div class=" flex flex-col justify-between space-y-[10px]">

            <router-link to="/admin/stack"
              class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
              <svg aria-hidden="true" class="mr-2 w-[25px] h-[25px] fill-current" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clip-rule="evenodd"></path>
              </svg>
              Стек
            </router-link>
            <router-link to="/admin/projects"
              class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
              <svg aria-hidden="true" class="mr-2 w-[25px] h-[25px] fill-current" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clip-rule="evenodd"></path>
              </svg>
              Проекты
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full bg-gray-400">
      <div class="h-[50px] bg-gray-100 flex items-center shadow-sm px-[20px] w-full py-[10px] z-10 border-b ">
        <!-- Hambuger menu -->
        <div class="cursor-pointer w-[30px]" @click="toggleSideBar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class=" w-[25px] h-[25px]">
            <path
              d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </div>
        <!-- Search bar -->

        <div class="w-[calc(100%-30px)] flex">
          <!-- User login -->
          <div class="w-[200px] ">

          </div>
        </div>
      </div>
      <div class=" bg-gray-50 p-[20px] min-h-screen">
        <TransitionGroup name="alert">
          <div key="test"
            class="fixed top-3 z-10 right-3 p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
            :class="alertStore.getAlert.error ? 'text-red-800 bg-red-50 dark:text-red-400' : ''" role="alert"
            v-if="alertStore.getAlert.text">
            {{ alertStore.getAlert.text }}
          </div>
        </TransitionGroup>
        <div class="">
          <NuxtPage />
        </div>
      </div>
    </div>
    <!-- Main  -->
  </div>
</template>



<script setup lang="ts">
import '@/assets/scss/admin.css'
import { useAlertStore } from '@/store/alert';

const alertStore = useAlertStore()
const showSide = ref(true)

const toggleSideBar = () => {
  showSide.value = !showSide.value
}
</script>