<template>
  <div class="bg-black w-full">
    <nav class="container">
      <div class="flex h-12">
        <div class="w-1/5"></div>
        <div class="flex items-center justify-between w-full text-sm">
          <QuickLinks :links="quickLinks" />
          <div class="flex items-center space-x-3">
            <DarkModeSwitch />
            <select
              class="bg-gray-800 border border-gray-700 text-white text-xs rounded px-2 py-1 focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option>🇺🇸 ENGLISH</option>
              <option>🇻🇳 VIETNAMESE</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import QuickLinks from "./quicklinks.vue";
import DarkModeSwitch from "./darkmode.vue";

defineProps({
  quickLinks: Array,
});
</script>
