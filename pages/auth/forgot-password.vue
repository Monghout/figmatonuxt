<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900">
    <div class="max-w-md w-full p-8 bg-gray-800 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-yellow-400 mb-6 text-center">
        Reset Your Password
      </h2>

      <div
        v-if="error"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
        role="alert"
      >
        <span class="block sm:inline">{{ error }}</span>
      </div>

      <div
        v-if="success"
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
        role="alert"
      >
        <span class="block sm:inline"
          >Password reset email sent! Check your inbox.</span
        >
      </div>

      <form @submit.prevent="handleReset" class="space-y-4">
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
        <button
          type="submit"
          :disabled="loading"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="!loading">Send Reset Email</span>
          <span v-else>Sending...</span>
        </button>
      </form>

      <div class="mt-4 text-center text-sm text-gray-400">
        Remember your password?
        <NuxtLink
          to="/auth/login"
          class="font-medium text-yellow-400 hover:text-yellow-300"
        >
          Login
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "~/composible/useAuth";

const email = ref("");
const { error, loading, success, sendResetEmail } = useAuth();

const handleReset = async () => {
  await sendResetEmail(email.value);
};
</script>
