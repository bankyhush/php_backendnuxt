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
</script>

<template>
  <div
    v-if="loading"
    class="h-screen flex justify-center items-center bg-gray-900 text-lg text-white"
  >
    Loading...
  </div>

  <div v-else-if="user" class="flex min-h-screen bg-gray-50">
    <!-- Sidebar Navigation -->
    <aside
      class="w-64 bg-gray-800 text-white p-6 flex flex-col justify-between"
    >
      <div>
        <h2 class="text-2xl font-semibold mb-6">Dashboard</h2>
        <nav class="flex flex-col space-y-4">
          <NuxtLink to="/dashboard" class="text-lg hover:text-gray-400"
            >Overview</NuxtLink
          >
          <NuxtLink to="/dashboard/profile" class="text-lg hover:text-gray-400"
            >Profile</NuxtLink
          >
          <NuxtLink to="/dashboard/settings" class="text-lg hover:text-gray-400"
            >Settings</NuxtLink
          >
          <NuxtLink to="/dashboard/security" class="text-lg hover:text-gray-400"
            >Security</NuxtLink
          >
        </nav>
      </div>
      <button
        @click="logout"
        class="mt-6 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        Logout
      </button>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8 bg-gray-700 shadow-lg text-white">
      <slot />
    </main>
  </div>
</template>
