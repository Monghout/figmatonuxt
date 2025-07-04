<template>
  <div
    class="relative group"
    @mouseenter="$emit('mouseenter')"
    @mouseleave="$emit('mouseleave')"
  >
    <button
      class="px-4 py-2 flex items-center space-x-1 text-xs font-medium transition-all duration-100 rounded-xl group"
      :class="{
        'text-yellow-400  bg-black ': activeDropdown === item.name,
        'text-black hover:text-yellow-400 hover:bg-gradient-to-b hover:from-gray-800 via-neutral-900 hover:to-black':
          activeDropdown !== item.name,
      }"
    >
      <span>{{ item.name }}</span>
      <svg
        v-if="item.children"
        class="w-3 h-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <div
      v-if="item.children && activeDropdown === item.name"
      class="absolute top-full left-0 bg-gray-900 border-t-2 border-yellow-500 shadow-lg rounded-b-md w-48 z-50"
    >
      <ul class="py-2">
        <li v-for="child in item.children" :key="child.name">
          <a
            :href="child.href"
            class="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-yellow-500 hover:text-black transition-colors"
          >
            <span class="mr-2">{{ child.icon }}</span>
            {{ child.name }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: Object,
  activeDropdown: String,
});
</script>
