<template>
  <div class="flex items-center pl-25 space-x-2">
    <a
      v-for="link in links"
      :key="link.name"
      :href="link.href"
      class="flex items-center space-x-1 px-2 py-1 text-xs text-gray-300 hover:text-yellow-400 transition-colors"
    >
      <span>{{ link.icon }}</span>
      <span>{{ link.name }}</span>
    </a>
  </div>
</template>

<script setup>
defineProps({
  links: Array,
});
</script>
