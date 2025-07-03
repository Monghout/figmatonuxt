<template>
  <div class="max-w-[1200px] mx-auto px-5 py-6">
    <!-- Games Badge Section -->
    <div class="mb-6"></div>

    <!-- Header Section with Title and Show More -->
    <div>
      <h1 class="text-2xl font-bold text-white"></h1>
    </div>
    <div class="flex items-center justify-between pb-4">
      <span
        class="flex font-semibold border-2 border-black px-2.5 bg-yellow-500 rounded-2xl"
      >
        Upcoming Matches</span
      >
      <button
        @click="showMore = !showMore"
        class="flex items-center gap-1 text-blue-500 hover:text-blue-600 font-medium transition-colors"
      >
        {{ showMore ? "Show Less" : "Show More" }}
        <ChevronDown
          :class="{ 'rotate-180': showMore }"
          class="w-4 h-4 transition-transform"
        />
      </button>
    </div>
    <!-- Content Section -->
    <Carousel :matches="matches" />

    <div v-if="showMore" class="mt-4">
      <Carousel :matches="matches" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { matches } from "../types/data";
import { ChevronDown } from "lucide-vue-next";

export default defineComponent({
  components: { ChevronDown },
  data() {
    return {
      matches,
      showMore: false,
    };
  },
});
</script>
