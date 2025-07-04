<template>
  <div class="flex items-center relative px-2 mx-auto max-w-full">
    <!-- Navigation Left Button -->
    <button
      class="absolute top-1/2 -translate-y-1/2 -left-8 w-8 h-16 rounded-lg bg-gray-800/80 hover:bg-gray-700/90 flex items-center justify-center shadow-lg transition-all z-20 backdrop-blur-sm"
      @click="scrollLeft"
      aria-label="Previous matches"
    >
      <ChevronLeft class="text-white h-5 w-5" />
    </button>

    <!-- Carousel -->
    <div
      ref="carousel"
      class="flex overflow-x-auto scroll-smooth snap-x snap-mandatory touch-pan-x gap-4 py-2 w-full scrollbar-none px-2"
    >
      <div
        v-for="match in matches"
        :key="match.id"
        class="flex-none snap-start w-[300px] h-[220px] rounded-2xl overflow-hidden relative transition-all shadow-lg hover:shadow-xl hover:-translate-y-1.5 group border-1 border-yellow-400"
        :style="{
          'background-image': `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(${match.bg})`,
          'background-size': 'cover',
          'background-position': 'center',
        }"
      >
        <!-- Content container -->
        <div class="relative z-20 h-full flex flex-col justify-between p-5">
          <!-- Top Row -->
          <div class="flex justify-between items-center w-full">
            <!-- Hot Tag - Updated to match border color -->
            <div
              class="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full shadow-md border border-yellow-300"
            >
              <Flame class="h-3.5 w-3.5 text-white" />
              <span class="text-xs font-bold text-white tracking-wide"
                >Hot</span
              >
            </div>

            <!-- Notification Badge -->
            <div class="flex items-center">
              <div
                v-if="match.isLive"
                class="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full text-xs font-bold tracking-wide shadow-md"
              >
                <span class="relative flex h-2 w-2">
                  <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"
                  ></span>
                  <span
                    class="relative inline-flex rounded-full h-2 w-2 bg-white"
                  ></span>
                </span>
                LIVE NOW
              </div>
              <div v-else class="relative flex items-center justify-center">
                <button
                  @click.stop="toggleNotification(match.id)"
                  class="w-12 h-12 p-2 rounded-xl backdrop-blur-sm shadow hover:bg-yellow-500/30 transition-colors focus:outline-none flex flex-col items-center justify-center relative border border-yellow-400/50"
                  :class="{
                    'bg-gray-800/70': !notificationStates[match.id],
                    'bg-yellow-400/90': notificationStates[match.id],
                  }"
                  aria-label="Notifications"
                >
                  <!-- Bell Icon -->
                  <Bell
                    class="h-5 w-5 mb-1"
                    :class="{
                      'text-yellow-400': !notificationStates[match.id],
                      'text-gray-900': notificationStates[match.id],
                    }"
                  />

                  <!-- ON/OFF Label -->
                  <span
                    class="text-xs font-medium"
                    :class="{
                      'text-yellow-400': !notificationStates[match.id],
                      'text-gray-900': notificationStates[match.id],
                    }"
                  >
                    {{ notificationStates[match.id] ? "ON" : "OFF" }}
                  </span>

                  <!-- Ping Dot - Updated to yellow -->
                  <span class="absolute top-1 right-1 flex h-2.5 w-2.5">
                    <span
                      v-if="!notificationStates[match.id]"
                      class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"
                    ></span>
                    <span
                      class="relative inline-flex rounded-full h-2.5 w-2.5"
                      :class="{
                        'bg-yellow-500': !notificationStates[match.id],
                        'bg-transparent': notificationStates[match.id],
                      }"
                    ></span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          <!-- Match Content -->

          <!-- Bottom Tab Section -->
          <div
            class="absolute bottom-0 left-0 right-0 p-2 rounded-2xl border-t border-yellow-400/50"
            :style="{
              background:
                'linear-gradient(to top,rgba(220, 180, 90, 1), rgba(180, 140, 70, 0.8 ), rgba(220, 180, 90, 1))',
              'backdrop-filter': 'blur(10px)',
            }"
          >
            <!-- Trophy icon -->
            <div>
              <div
                class="absolute -top-7 left-10 transform -translate-x-1/2"
              ></div>
              <div>
                <div class="absolute -top-5 left-4 transform -translate-x-1/64">
                  <div
                    class="bg-yellow-400 p-1.5 rounded-full shadow-lg border-2 border-yellow-600"
                  >
                    <span
                      class="text-[12px] text-gray-800 text-center line-clamp-2 font-bold px-1"
                    >
                      {{ match.league }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Grid Layout -->
            <div class="grid grid-cols-12 gap-1 items-start pt-4">
              <!-- Team A Column -->
              <div class="col-span-5 flex flex-col items-center h-full">
                <div class="flex flex-col items-center w-full">
                  <img
                    :src="match.teamALogo"
                    :alt="match.teamA"
                    class="h-10 w-10 object-contain mb-1.5 min-w-[20px]"
                  />
                  <span
                    class="text-xs font-semibold text-gray-900 text-center line-clamp-2 leading-tight w-full px-1"
                  >
                    {{ match.teamA }}
                  </span>
                </div>
              </div>

              <!-- VS/League Center Column -->
              <div
                class="col-span-2 flex flex-col items-center justify-start h-full pt-2"
              >
                <span
                  class="text-sm text-white font-semibold text-shadow-2xs shadow-black"
                >
                  {{ match.time }}
                </span>
                <span class="text-lg font-bold text-gray-900 mb-1">VS</span>
              </div>

              <!-- Team B Column -->
              <div class="col-span-5 flex flex-col items-center h-full">
                <div class="flex flex-col items-center w-full">
                  <img
                    :src="match.teamBLogo"
                    :alt="match.teamB"
                    class="h-10 w-10 object-contain mb-1.5 min-w-[32px]"
                  />
                  <span
                    class="text-xs font-semibold text-gray-900 text-center line-clamp-2 leading-tight w-full px-1"
                  >
                    {{ match.teamB }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Right Button -->
    <button
      class="absolute top-1/2 -translate-y-1/2 -right-8 w-8 h-16 rounded-lg bg-gray-800/80 hover:bg-gray-700/90 flex items-center justify-center shadow-lg transition-all z-20 backdrop-blur-sm"
      @click="scrollRight"
      aria-label="Next matches"
    >
      <ChevronRight class="text-white h-5 w-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight, Flame, Bell } from "lucide-vue-next";
import type { Match } from "../types/data";
import { ref, onMounted } from "vue";

const props = defineProps<{
  matches: Match[];
}>();

const carousel = ref<HTMLElement | null>(null);
const notificationStates = ref<Record<string, boolean>>({});

// Initialize notification states from localStorage
onMounted(() => {
  props.matches.forEach((match) => {
    const savedState = localStorage.getItem(`notification-${match.id}`);
    if (savedState !== null) {
      notificationStates.value[match.id] = savedState === "true";
    } else {
      notificationStates.value[match.id] = false; // Default to OFF
    }
  });
});

const toggleNotification = (matchId: string) => {
  notificationStates.value[matchId] = !notificationStates.value[matchId];
  // Save to localStorage
  localStorage.setItem(
    `notification-${matchId}`,
    notificationStates.value[matchId].toString()
  );
};

const scrollLeft = () => {
  if (carousel.value) {
    carousel.value.scrollBy({ left: -320, behavior: "smooth" });
  }
};

const scrollRight = () => {
  if (carousel.value) {
    carousel.value.scrollBy({ left: 320, behavior: "smooth" });
  }
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};
</script>
<style>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}

/* Ensure text doesn't overflow */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
