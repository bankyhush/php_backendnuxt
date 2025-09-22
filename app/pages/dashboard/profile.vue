<script setup>
// This page automatically gets auth protection from the layout
definePageMeta({
  layout: "user",
});

// Inject the user data provided by the layout
const user = inject("authUser");
</script>

<template>
  <div
    class="max-w-5xl mx-auto px-6 py-12 min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-[#171717]"
  >
    <div
      class="bg-gradient-to-b from-gray-100 to-white dark:from-[#202020] dark:to-[#111] rounded-2xl shadow-xl p-8"
    >
      <!-- Header -->
      <div class="flex items-center gap-6 mb-10">
        <div class="relative">
          <div
            class="w-24 h-24 rounded-full overflow-hidden shadow-lg ring-4 ring-white dark:ring-gray-800"
          >
            <img
              src="https://i.pravatar.cc/100"
              alt="User avatar"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            Account Settings
          </h1>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage your personal information and preferences
          </p>
        </div>
      </div>

      <!-- Personal Info -->
      <section class="bg-white dark:bg-[#202020] rounded-xl p-6 shadow-md mb-8">
        <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Personal Info
        </h2>
        <div class="space-y-3 text-sm">
          <div>
            <p class="text-gray-500 dark:text-gray-400">Full Name</p>
            <span class="text-gray-800 dark:text-gray-100 font-medium"
              >Jane Doe</span
            >
          </div>
          <div>
            <p class="text-gray-500 dark:text-gray-400">Wallet Address</p>
            <span class="text-gray-800 dark:text-gray-100 font-mono"
              >0x4fa3...bC98eD23</span
            >
          </div>
        </div>
      </section>

      <!-- Verification -->
      <section class="bg-white dark:bg-[#202020] rounded-xl p-6 shadow-md mb-8">
        <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Verification
        </h2>
        <div class="space-y-3 text-sm">
          <div class="flex items-center gap-2">
            <span class="text-gray-500 dark:text-gray-400"
              >Identity Verification:</span
            >
            <span class="text-green-500 font-semibold">Verified</span>
          </div>
          <div>
            <p class="text-gray-500 dark:text-gray-400">Country/Region</p>
            <span class="text-gray-800 dark:text-gray-100 font-medium"
              >United States</span
            >
          </div>
        </div>
      </section>

      <!-- Account Details -->
      <section class="bg-white dark:bg-[#202020] rounded-xl p-6 shadow-md">
        <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Account Details
        </h2>
        <div class="space-y-3 text-sm">
          <div>
            <p class="text-gray-500 dark:text-gray-400">Email</p>
            <span class="text-gray-800 dark:text-gray-100 font-medium"
              >jane.doe@example.com</span
            >
          </div>
          <div>
            <p class="text-gray-500 dark:text-gray-400">Phone</p>
            <span class="text-gray-800 dark:text-gray-100 font-medium"
              >+1 (555) 123-4567</span
            >
          </div>
          <div>
            <p class="text-gray-500 dark:text-gray-400">Account Type</p>
            <span class="text-gray-800 dark:text-gray-100 font-medium"
              >Personal</span
            >
          </div>
          <div>
            <p class="text-gray-500 dark:text-gray-400">Password</p>
            <span class="text-gray-800 dark:text-gray-100 font-mono"
              >••••••••</span
            >
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-between items-center mt-8">
          <NuxtLink to="/dashboard/profile/edit">
            <button
              class="cursor-pointer bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-5 rounded-md transition duration-200 shadow-md dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-black"
            >
              Edit Profile
            </button>
          </NuxtLink>

          <LogoutButton />
        </div>
      </section>
    </div>
  </div>
</template>
