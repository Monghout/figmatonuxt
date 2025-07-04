<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900">
    <div class="max-w-md w-full p-8 bg-gray-800 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-yellow-400 mb-6 text-center">
        Login to Your Account
      </h2>

      <button
        @click="loginWithGoogle"
        class="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 mb-4"
      >
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.664-4.152-2.675-6.735-2.675-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.67-0.069-1.325-0.189-1.955h-9.811z"
          />
        </svg>
        Continue with Google
      </button>

      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-600"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-gray-800 text-gray-400"
            >Or login with email</span
          >
        </div>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300"
            >Email</label
          >
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-300"
            >Password</label
          >
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="rememberMe"
              type="checkbox"
              class="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-600 rounded bg-gray-700"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-300"
              >Remember me</label
            >
          </div>
          <NuxtLink
            to="/auth/forgot-password"
            class="text-sm text-yellow-400 hover:text-yellow-300"
          >
            Forgot password?
          </NuxtLink>
        </div>
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Login
        </button>
      </form>

      <div class="mt-4 text-center text-sm text-gray-400">
        Don't have an account?
        <NuxtLink
          to="/auth/signup"
          class="font-medium text-yellow-400 hover:text-yellow-300"
        >
          Sign up
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "~/composible/useAuth";
import { ref } from "vue";
const email = ref("");
const password = ref("");
const { user, error, loading, loginWithGoogle, loginWithEmail } = useAuth();

const handleLogin = async () => {
  await loginWithEmail(email.value, password.value);
  if (user.value) {
    navigateTo("/");
  }
};

const rememberMe = ref(false);
</script>
