<script setup>
// This page automatically gets auth protection from the layout
definePageMeta({
  layout: "user",
});

// Inject the user data provided by the layout
const user = inject("authUser");
</script>

<template>
  <main>
    <div>
      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto"
      >
        <div class="flex items-center mb-2">
          <div class="h-4 w-32 bg-gray-200 rounded animate-pulse mr-2"></div>
          <div class="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div class="flex items-baseline mb-1">
          <div class="h-8 w-24 bg-gray-200 rounded animate-pulse mr-2"></div>
          <div class="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div class="mb-8">
          <div class="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div class="flex flex-wrap gap-3">
          <div
            v-for="n in 4"
            :key="n"
            class="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"
          ></div>
        </div>
      </div>

      <!-- Content -->
      <div
        v-else
        class="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:shadow-xl dark:bg-gray-900 dark:text-gray-50"
      >
        <div class="flex items-center mb-2">
          <h2 class="text-sm text-gray-600 mr-2">Estimated total value</h2>
          <!-- Optional: Icon -->
        </div>

        <div class="flex items-baseline mb-1">
          <h1 class="text-3xl font-bold mr-2">$12,345.67</h1>
          <span class="text-gray-500 text-sm">USD</span>
        </div>

        <div class="mb-8 text-sm">
          <span class="mr-1">Available's P/L:</span>
          <span class="text-green-500">
            $8,765.43 <span class="text-red-500">(-123.45)</span>
          </span>
        </div>

        <div class="flex flex-wrap gap-2 dark:bg-gray-900 rounded-lg">
          <NuxtLink to="/dashboard/deposit/1">
            <button
              class="cursor-pointer bg-white text-black border border-gray-300 px-6 py-2.5 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors dark:bg-gray-800 dark:text-white dark:border-gray-800 dark:hover:border-gray-500"
            >
              Deposit
            </button>
          </NuxtLink>

          <NuxtLink to="/dashboard/convert">
            <button
              class="cursor-pointer bg-white text-black border border-gray-300 px-6 py-2.5 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors dark:bg-gray-800 dark:text-white dark:border-gray-800 dark:hover:border-gray-500"
            >
              Convert
            </button>
          </NuxtLink>

          <NuxtLink to="/dashboard/withdraw/1">
            <button
              class="cursor-pointer bg-white text-black border border-gray-300 px-6 py-2.5 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors dark:bg-gray-800 dark:text-white dark:border-gray-800 dark:hover:border-gray-500"
            >
              Withdraw
            </button>
          </NuxtLink>

          <NuxtLink to="/dashboard/transfer/1">
            <button
              class="cursor-pointer bg-white text-black border border-gray-300 px-6 py-2.5 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors dark:bg-gray-800 dark:text-white dark:border-gray-800 dark:hover:border-gray-500"
            >
              Transfer
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>
