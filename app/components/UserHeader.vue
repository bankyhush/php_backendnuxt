<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { navigateTo } from "#app";

const menuOpen = ref(false);
const menuRef = ref(null);

const config = useRuntimeConfig();

const menuItems = [
  {
    name: "Staking",
    href: "/dashboard/staking",
    icon: "clarity:coin-bag-line",
  },
  {
    name: "Copy Trader",
    href: "/dashboard/trader",
    icon: "solar:copy-broken",
  },
  {
    name: "Trading Plan",
    href: "/dashboard/plans",
    icon: "solar:chart-broken",
  },
  {
    name: "Statement",
    href: "/dashboard/statement",
    icon: "solar:history-2-broken",
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: "solar:user-broken",
  },
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

const user = inject("authUser");

// Logout logic
const logout = async () => {
  try {
    await $fetch(`${config.public.apiBase}/auth/logout.php`, {
      credentials: "include",
    });
  } catch (e) {
    // Ignore errors
  }
  user.value = null;
  navigateTo("/login");
};
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <header class="relative z-50 border-b-1 border-gray-300">
      <nav
        class="fixed top-0 left-0 w-full bg-white/80 dark:bg-[#202020] backdrop-blur-lg border-b border-gray-200 transition dark:border-[#333333]"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <!-- Left: Logo + Nav -->
            <div class="flex items-center space-x-10">
              <NuxtLink to="/dashboard" class="flex items-center">
                <img
                  src="/logo_light.png"
                  class="w-24 h-auto hidden dark:block"
                  alt="Logo"
                />
                <img
                  src="/logo_dark.png"
                  class="w-24 h-auto dark:hidden"
                  alt="Logo"
                />
              </NuxtLink>

              <div class="hidden lg:flex space-x-8">
                <NuxtLink
                  v-for="item in menuItems"
                  :key="item.name"
                  :to="item.href"
                  class="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition"
                >
                  <Icon :name="item.icon" class="w-4 h-4 mr-2 text-gray-400" />
                  {{ item.name }}
                </NuxtLink>
              </div>
            </div>

            <!-- Desktop Right -->
            <div class="hidden lg:flex items-center space-x-3">
              <NuxtLink
                class="px-4 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 text-sm font-medium text-black hover:text-foreground hover:border-foreground transition dark:text-white"
              >
                Welcome, {{ user?.fullname }}!
              </NuxtLink>

              <button
                class="flex justify-center items-center gap-1 cursor-pointer bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-sm rounded-md transition-all"
                @click="logout"
              >
                <Icon
                  name="ant-design:logout-outlined"
                  width="1024"
                  height="1024"
                />
                Logout
              </button>
              <div
                id="userIcon"
                class="bg-white/10 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 cursor-pointer transition text-md font-semibold text-black uppercase dark:text-white"
              >
                <Icon name="ph:user-focus-fill" class="text-3xl" />
              </div>
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
                :name="menuOpen ? 'ph:user-focus-fill' : 'ph:user-focus-fill'"
                class="text-3xl text-black dark:text-white"
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
                  class="flex items-center text-base font-medium text-muted-foreground hover:text-foreground transition"
                  @click="toggleMenu"
                >
                  <Icon :name="item.icon" class="w-4 h-4 mr-2 text-gray-400" />
                  {{ item.name }}
                </NuxtLink>

                <div class="flex mt-6 space-x-3">
                  <button
                    @click="logout"
                    class="cursor-pointer flex gap-1 justify-center items-center w-32 text-center px-4 py-2 rounded-md border border-gray-400 bg-zinc-100 text-sm font-medium text-zinc-700 transition hover:shadow-md hover:text-foreground dark:bg-zinc-900 dark:border-zinc-900 dark:text-white dark:hover:text-foreground dark:hover:shadow-md"
                  >
                    <Icon
                      name="ant-design:logout-outlined"
                      width="1024"
                      height="1024"
                    />
                    Logout
                  </button>
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
