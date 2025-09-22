<script setup>
// This page automatically gets auth protection from the layout
definePageMeta({
  layout: "user",
});

// Inject the user data provided by the layout
const user = inject("authUser");
</script>

<template>
  <div>
    <h1>Dashboard Overview</h1>
    <p>Welcome back, {{ user?.fullname }}!</p>
    <p>Your email: {{ user?.email }}</p>
    <p>Your profit: ${{ user?.profit }}</p>
    <!-- Your dashboard content -->
  </div>
</template>
