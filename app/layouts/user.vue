<template>
  <div
    v-if="loading"
    class="h-screen flex justify-center items-center bg-white-900 text-lg text-black dark:bg-[#171717] dark:text-white"
  >
    <Icon name="eos-icons:bubble-loading" class="text-6xl" />
  </div>

  <main v-else-if="user">
    <div class="pb-[2px]">
      <UserHeader />
    </div>

    <section class="pt-20 bg-gray-100 dark:bg-[#171717]">
      <slot />
    </section>

    <section>
      <div
        class="text-xl fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-[#d8d4d48b] py-3 px-6 flex justify-around font-medium text-black md:hidden dark:bg-[#202020] dark:text-white"
        style="z-index: 1000"
      >
        <NuxtLink to="/dashboard" :class="navItemClass('/dashboard')">
          <div class="flex flex-col items-center">
            <Icon name="icon-park-outline:market" width="24" height="24" />
            <span class="text-xs mt-1">Explore</span>
          </div>
        </NuxtLink>

        <NuxtLink to="/" :class="navItemClass('/')">
          <div class="flex flex-col items-center">
            <Icon name="solar:wallet-money-bold" width="24" height="24" />
            <span class="text-xs mt-1">Wallets</span>
          </div>
        </NuxtLink>

        <NuxtLink to="/trade" :class="navItemClass('/trade')">
          <div class="flex flex-col items-center">
            <Icon name="uis:chart" width="24" height="24" />
            <span class="text-xs mt-1">Trade</span>
          </div>
        </NuxtLink>

        <NuxtLink to="/swaps" :class="navItemClass('/swaps')">
          <div class="flex flex-col items-center">
            <Icon
              name="material-symbols-light:swap-horizontal-circle"
              width="26"
              height="26"
            />
            <span class="text-xs mt-1">Swap</span>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/dashboard/profile"
          :class="navItemClass('/dashboard/profile')"
        >
          <div class="flex flex-col items-center">
            <Icon name="fa-solid:user-cog" width="24" height="24" />
            <span class="text-xs mt-1">Profile</span>
          </div>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, provide, onMounted } from "vue";
import UserHeader from "~/components/UserHeader.vue";

const user = ref(null);
const loading = ref(true);
const config = useRuntimeConfig();
const router = useRouter();

// Fetch user session on mount
onMounted(async () => {
  try {
    const res = await $fetch(`${config.public.apiBase}/auth/session.php`, {
      credentials: "include",
    });

    if (res.loggedIn) {
      user.value = res.user;
    } else {
      await router.push("/login");
    }
  } catch (error) {
    await router.push("/login");
  } finally {
    loading.value = false;
  }
});

// Provide user to children
provide("authUser", user);

// Logout logic
const logout = async () => {
  try {
    await $fetch(`${config.public.apiBase}/auth/logout.php`, {
      credentials: "include",
    });
  } catch (e) {
    // ignore errors
  }
  user.value = null;
  await router.push("/login");
};

// Navigation item class logic

// Inline Tailwind class merging logic
const route = useRoute();

const navItemClass = (path) => {
  if (route.path === path) {
    return "transition-all duration-200 ease-in-out font-bold text-cyan-400 dark:text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.6)] hover:scale-110 hover:drop-shadow-lg";
  }
  return "transition-all duration-200 ease-in-out font-semibold text-black dark:text-white hover:text-cyan-400 hover:scale-110 hover:drop-shadow-lg";
};
</script>
