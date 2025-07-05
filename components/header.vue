<template>
  <div class="font-sans">
    <HeaderLogo />
    <HeaderTopNav
      :navigation="navigation"
      :active-dropdown="activeDropdown"
      @update:active-dropdown="activeDropdown = $event"
    />
    <HeaderBottomNav :quick-links="quickLinks" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import HeaderLogo from "./header/headerLogo.vue";
import HeaderTopNav from "./header/topNav.vue";
import HeaderBottomNav from "./header/bottomNav.vue";

const activeDropdown = ref(null);

const navigation = ref([
  {
    name: "LIVE SCHEDULE",
    href: "#",
    children: [
      { name: "FOOTBALL", href: "#", icon: "⚽" },
      { name: "HORSE RACING", href: "#", icon: "🏇" },
      { name: "BASKETBALL", href: "#", icon: "🏀" },
      { name: "E-SPORTS", href: "#", icon: "🎮" },
      { name: "CASINO", href: "#", icon: "🎰" },
    ],
  },
  { name: "MATCH SCHEDULE", href: "#" },
  { name: "BETTING ODDS", href: "#" },
  { name: "RESULTS", href: "#" },
  { name: "CHAT ROOM", href: "#" },
  { name: "NEWS", href: "#" },
]);

const quickLinks = ref([
  { name: "Football", icon: "⚽", href: "#" },
  { name: "Reels", icon: "🎬", href: "#" },
  { name: "Highlight", icon: "⭐", href: "#" },
  { name: "Tips", icon: "💡", href: "#" },
  { name: "Movies", icon: "🎭", href: "#" },
  { name: "Comics", icon: "📚", href: "#" },
]);
</script>
