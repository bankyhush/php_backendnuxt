<template>Redirecting...</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

definePageMeta({
  layout: "user",
});

const router = useRouter();

onMounted(() => {
  router.push("/dashboard"); // Redirect on mount
});
</script>
