<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const config = useRuntimeConfig();
// Basic protection for all pages
onMounted(async () => {
  if (typeof window !== "undefined") {
    const currentPath = window.location.pathname;

    // Don't check auth on login page
    if (currentPath === "/login") return;

    try {
      const res = await $fetch(`${config.public.apiBase}/auth/session.php`, {
        credentials: "include",
      });

      if (!res.loggedIn) {
        window.location.href = "/login";
      }
    } catch (e) {
      window.location.href = "/login";
    }
  }
});
</script>
