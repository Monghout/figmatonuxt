<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900">
    <div class="max-w-md w-full p-8 bg-gray-800 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-yellow-400 mb-6 text-center">
        Create Your Account
      </h2>

      <div
        v-if="error"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
        role="alert"
      >
        <span class="block sm:inline">{{ error }}</span>
      </div>

      <form @submit.prevent="handleSignup" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-300"
            >Username</label
          >
          <input
            id="username"
            v-model="username"
            type="text"
            required
            minlength="3"
            maxlength="20"
            pattern="[a-zA-Z0-9]+"
            class="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="cooluser123"
          />
          <p class="mt-1 text-xs text-gray-400">
            3-20 characters, letters and numbers only
          </p>
        </div>

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
            placeholder="your@email.com"
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
            minlength="6"
            class="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="••••••••"
          />
          <p class="mt-1 text-xs text-gray-400">At least 6 characters</p>
        </div>

        <div>
          <label
            for="confirm-password"
            class="block text-sm font-medium text-gray-300"
            >Confirm Password</label
          >
          <input
            id="confirm-password"
            v-model="confirmPassword"
            type="password"
            required
            class="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          :disabled="loading || password !== confirmPassword"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="!loading">Sign Up</span>
          <span v-else>Creating account...</span>
        </button>
      </form>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-600"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-gray-800 text-gray-400">Or continue with</span>
          </div>
        </div>

        <div class="mt-6">
          <button
            @click="loginWithGoogle"
            class="w-full flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.664-4.152-2.675-6.735-2.675-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.67-0.069-1.325-0.189-1.955h-9.811z"
              />
            </svg>
            Sign up with Google
          </button>
        </div>
      </div>

      <div class="mt-4 text-center text-sm text-gray-400">
        Already have an account?
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

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const { user, error, loading, signUpWithEmail, loginWithGoogle } = useAuth();

// Redirect if already logged in
watch(
  user,
  (newUser) => {
    if (newUser) {
      navigateTo("/");
    }
  },
  { immediate: true }
);

const handleSignup = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = "Passwords don't match";
    return;
  }

  try {
    await signUpWithEmail(email.value, password.value, username.value);
  } catch (err) {
    // Error is already handled in the composable
    console.error("Signup error:", err);
  }
};
</script>
