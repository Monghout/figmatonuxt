<template>
  <div class="flex items-center">
    <span class="text-xs text-gray-300 mr-1">☀️</span>
    <button
      @click="toggleDarkMode"
      class="relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none"
      :class="{
        'bg-yellow-500': darkMode,
        'bg-gray-700': !darkMode,
      }"
      aria-label="Toggle dark mode"
    >
      <span
        class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
        :class="{
          'translate-x-5': darkMode,
          'translate-x-1': !darkMode,
        }"
      />
    </button>
    <span class="text-xs text-gray-300 ml-1">🌙</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const darkMode = ref(false);

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  if (darkMode.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("darkMode", "enabled");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", "disabled");
  }
};

onMounted(() => {
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode === "enabled") {
    darkMode.value = true;
    document.documentElement.classList.add("dark");
  }
});
</script>
