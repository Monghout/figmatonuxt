<template>
  <div
    class="relative group"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <button
      class="px-4 py-2 flex items-center space-x-1 text-xs font-medium transition-all duration-100 rounded-xl group"
      :class="{
        'text-yellow-400 bg-black hover:bg-gradient-to-b hover:from-gray-800 hover:via-black':
          activeDropdown === item.name,
        'text-black hover:text-yellow-400': activeDropdown !== item.name,
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
      class="absolute top-full left-0 bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-xl rounded-b-md w-48 z-50 overflow-hidden"
      style="
        box-shadow:
          0 10px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04);
      "
    >
      <ul class="py-1">
        <li
          v-for="child in item.children"
          :key="child.name"
          class="border-b border-gray-200/50 last:border-b-0"
        >
          <a
            :href="child.href"
            class="flex items-center px-4 py-3 text-sm font-medium text-gray-800 hover:text-white transition-all duration-200"
            :style="{
              background:
                'linear-gradient(to right, rgba(255,255,255,0.9) 0%, rgba(245,245,245,0.9) 100%)',
              borderLeft: '1px solid rgba(255,255,255,0.5)',
              borderRight: '1px solid rgba(255,255,255,0.5)',
            }"
            @mouseenter="
              (e) =>
                (e.currentTarget.style.background =
                  'linear-gradient(to right, rgba(251,191,36,0.9) 0%, rgba(245,158,11,0.9) 100%)')
            "
            @mouseleave="
              (e) =>
                (e.currentTarget.style.background =
                  'linear-gradient(to right, rgba(255,255,255,0.9) 0%, rgba(245,245,245,0.9) 100%)')
            "
            @click.prevent
          >
            <span class="mr-2 text-yellow-600">{{ child.icon }}</span>
            {{ child.name }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object,
  activeDropdown: String,
});

const emit = defineEmits(["set-active-dropdown"]);

const handleMouseEnter = () => {
  emit("set-active-dropdown", props.item.name);
};

const handleMouseLeave = () => {
  emit("set-active-dropdown", null);
};
</script>
