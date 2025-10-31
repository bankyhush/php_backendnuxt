<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const menuOpen = ref(false);
const menuRef = ref(null);

const menuItems = [
  { name: "Features", href: "/features" },
  { name: "Stocks", href: "/stocks" },
  { name: "Cryptocurrency", href: "/crypto" },
  { name: "Commodities", href: "/commodities" },
  { name: "Support", href: "/contact" },
];

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// Handle click outside
const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    menuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

// Dark mode
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(_isDark) {
    colorMode.preference = _isDark ? "dark" : "light";
  },
});
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <header class="relative z-50 border-b-1 border-gray-300">
      <nav
        class="fixed top-0 left-0 w-full bg-white/80 dark:bg-[#202020] backdrop-blur-lg border-b border-gray-200 dark:border-gray-200"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <!-- Left: Logo + Nav -->
            <div class="flex items-center space-x-10">
              <NuxtLink to="/" class="flex items-center">
                <img
                  src="/logo_light.png"
                  class="w-32 h-auto hidden dark:block"
                  alt="Logo"
                />
                <img
                  src="/logo_dark.png"
                  class="w-32 h-auto dark:hidden"
                  alt="Logo"
                />
              </NuxtLink>

              <div class="hidden lg:flex space-x-8">
                <NuxtLink
                  v-for="item in menuItems"
                  :key="item.name"
                  :to="item.href"
                  class="text-sm font-medium text-muted-foreground hover:text-foreground transition"
                >
                  {{ item.name }}
                </NuxtLink>
              </div>
            </div>

            <!-- Desktop Right -->
            <div class="hidden lg:flex items-center space-x-3">
              <NuxtLink
                to="/login"
                class="px-4 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 text-sm font-medium text-black hover:text-foreground hover:border-foreground transition dark:text-white"
              >
                Login
              </NuxtLink>
              <NuxtLink
                to="/register"
                class="px-4 py-1.5 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/90 transition dark:text-black"
              >
                Sign Up
              </NuxtLink>
              <UButton
                class="cursor-pointer"
                :icon="isDark ? 'line-md:sun-rising-loop' : 'line-md:moon-loop'"
                color="neutral"
                variant="ghost"
                @click="isDark = !isDark"
              />
            </div>

            <!-- Mobile Menu Toggle -->
            <button
              @click.stop="toggleMenu"
              class="cursor-pointer lg:hidden p-2 text-muted-foreground hover:text-foreground focus:outline-none"
              :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
            >
              <Icon
                :name="menuOpen ? 'zondicons:close-solid' : 'ion:toggle'"
                class="w-6 h-6"
              />
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <transition name="fade">
          <div
            v-if="menuOpen"
            ref="menuRef"
            class="lg:hidden absolute top-full left-0 w-full z-40 bg-white dark:bg-zinc-950 shadow-lg border-t border-gray-200 dark:border-zinc-800 rounded-b-xl px-6 py-6"
          >
            <div
              class="bg-white border-1 rounded-4xl shadow-2xl border-zinc-900 dark:bg-zinc-800 p-5 dark:border-zinc-700 dark:shadow-2xl dark:shadow-[#333]"
            >
              <UButton
                class="cursor-pointer block md:hidden float-right"
                :icon="isDark ? 'line-md:sun-rising-loop' : 'line-md:moon-loop'"
                color="neutral"
                variant="ghost"
                @click="isDark = !isDark"
              />
              <nav class="space-y-4">
                <NuxtLink
                  v-for="item in menuItems"
                  :key="item.name"
                  :to="item.href"
                  class="block text-base font-medium text-muted-foreground hover:text-foreground transition"
                  @click="toggleMenu"
                >
                  {{ item.name }}
                </NuxtLink>

                <div class="flex justify-center items-center mt-6 space-x-3">
                  <NuxtLink
                    to="/login"
                    class="block w-full text-center px-4 py-2 rounded-md border text-sm font-medium text-muted-foreground hover:text-foreground transition"
                    @click="toggleMenu"
                  >
                    Login
                  </NuxtLink>
                  <NuxtLink
                    to="/register"
                    class="block w-full text-center px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/90 transition dark:text-black"
                    @click="toggleMenu"
                  >
                    Sign Up
                  </NuxtLink>
                </div>
              </nav>
            </div>
          </div>
        </transition>
      </nav>
    </header>
  </ClientOnly>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
