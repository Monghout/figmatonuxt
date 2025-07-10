<template>
  <div
    class="relative"
    @mouseenter="currencyOpen = true"
    @mouseleave="currencyOpen = false"
  >
    <button
      class="flex items-center space-x-1 px-3 py-1 bg-white text-black hover:bg-yellow-400 hover:text-black rounded-full font-semibold text-sm transition-colors"
    >
      <span>💰</span>
      <span>1000</span>
      <svg
        class="w-3 h-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    </button>

    <div
      v-if="currencyOpen"
      class="absolute top-full right-0 mt-2 bg-gray-900 border-t-2 border-yellow-500 shadow-lg rounded-md w-32 z-50"
    >
      <ul class="py-2">
        <li>
          <a
            href="#"
            class="block px-4 py-2 text-sm text-gray-300 hover:bg-yellow-500 hover:text-black"
          >
            10.000
          </a>
        </li>
        <li>
          <a
            href="#"
            class="block px-4 py-2 text-sm text-gray-300 hover:bg-yellow-500 hover:text-black"
          >
            20.000
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const currencyOpen = ref(false);
</script>
