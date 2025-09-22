<template>
  <div
    v-if="loading"
    class="h-screen flex justify-center items-center bg-gray-900 text-lg text-white"
  >
    Loading...
  </div>

  <main v-else-if="user">
    <div class="pb-[2px]">
      <HeroHeader />
    </div>

    <section class="pt-20 bg-gray-800/60">
      <slot />
    </section>

    <section>
      <div
        class="text-xl fixed bottom-0 left-0 right-0 bg-black border-t border-[#25272a] py-3 px-6 flex justify-around text-white md:hidden"
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
            <Icon
              name="streamline-freehand:money-wallet"
              width="24"
              height="24"
            />
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
              width="24"
              height="24"
            />
            <span class="text-xs mt-1">Swap</span>
          </div>
        </NuxtLink>

        <NuxtLink to="/earn" :class="navItemClass('/earn')">
          <div class="flex flex-col items-center">
            <Icon name="subway:coin" width="24" height="24" />
            <span class="text-xs mt-1">Earn</span>
          </div>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, provide, onMounted } from "vue";

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

const navItemClass = (path) =>
  [
    "transition-all duration-200 ease-in-out",
    "hover:text-cyan-400 hover:scale-110 hover:drop-shadow-lg",
    route.path === path
      ? "text-cyan-400 font-bold drop-shadow-[0_0_10px_rgba(0,255,255,0.6)]"
      : "text-white",
  ].join(" ");
</script>
