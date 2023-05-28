<template>
  <div class="flex-grow text-gray-800">
    <main class="">

      <section class="grid place-items-center h-screen">
        <div class="xl:w-1/5 lg:w-2/5 sm:w-3/5">


          <h3 class="my-4 text-2xl font-semibold text-gray-700">Account Login</h3>

          <div class="flex flex-col space-y-1 mt-4">
            <div class="flex items-center justify-between">
              <label class="text-sm font-semibold text-gray-500">Login</label>
            </div>
            <input type="text" name="login" v-model="user.login"
              class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200" />
          </div>


          <div class="flex flex-col space-y-1 mt-4">
            <div class="flex items-center justify-between">
              <label for="password" class="text-sm font-semibold text-gray-500">Password</label>
            </div>
            <input name="password" type="password" id="password" v-model="user.password" @keyup.enter="login"
              class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200" />
          </div>

          <button @click="login"
            class="w-full mt-4 px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4">
            Log in
          </button>

        </div>
      </section>


    </main>
  </div>
</template>



<script setup lang="ts">
definePageMeta({
  layout: 'empty'
})
import { useUserStore } from '@/store/user'
import { IUser } from '~/types/IUser';


const user: Ref<IUser> = ref({
  login: "",
  password: ""
})

const login = async () => {
  const validate = useValidate(user.value).validate(['login', 'password'])
  if (!validate) {
    return
  }

  await useUserStore().login(user.value)
}


</script>