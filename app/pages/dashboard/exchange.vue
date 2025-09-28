<template>
  <div
    class="bg-white dark:bg-[#171717] bg-opacity-50 flex items-center justify-center p-4 mt-14 mb-20"
  >
    <div
      class="bg-white dark:bg-[#202020] rounded-2xl p-6 w-full max-w-xl mx-auto shadow-xl"
    >
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          Currency Swap
        </h2>
      </div>

      <!-- From Section -->
      <div class="mb-4">
        <label
          class="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300"
          >From</label
        >
        <div
          class="bg-gray-50 dark:bg-[#303030] rounded-xl p-4 border border-gray-200 dark:border-[#100f0f]"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div
                class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
              >
                <div class="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <!-- Custom styled select -->
              <div class="relative flex items-center">
                <select
                  class="appearance-none pl-3 pr-8 py-1 px-5 rounded-lg bg-white dark:bg-[#202020] text-gray-900 dark:text-gray-100 text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>LINK</option>
                  <option>BTC</option>
                  <option>ETH</option>
                  <option>LTC</option>
                  <option>XRP uyruey whjhjwehejejhhej</option>
                </select>
                <!-- Custom Arrow -->
                <div
                  class="pointer-events-none absolute right-2 top-1.5 text-gray-400 dark:text-gray-300"
                >
                  ▼
                </div>
              </div>
            </div>

            <!-- Input amount -->
            <div class="text-right">
              <input
                type="number"
                placeholder="0.00"
                value="0.00"
                class="bg-transparent text-right text-lg font-semibold w-full outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Swap Icon -->
      <div class="flex justify-center mb-4">
        <div class="bg-gray-100 dark:bg-[#171717] rounded-lg p-2">
          <svg
            class="w-5 h-5 text-gray-600 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
            />
          </svg>
        </div>
      </div>

      <!-- To Section -->
      <div class="mb-6">
        <label
          class="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-200"
          >To</label
        >
        <div
          class="bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 rounded-xl p-4 border-1 border-blue-400"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div
                class="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center"
              >
                <div
                  class="w-4 h-4 bg-white rounded-sm transform rotate-45"
                ></div>
              </div>
              <div class="text-gray-900 dark:text-white text-sm font-medium">
                <div class="relative flex items-center">
                  <select
                    class="appearance-none pl-3 pr-8 py-1 px-5 rounded-lg bg-white dark:bg-[#202020] text-gray-900 dark:text-gray-100 text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>LINK</option>
                    <option>BTC</option>
                    <option>ETH</option>
                    <option>LTC</option>
                    <option>XRP uyruey whjhjwehejejhhej</option>
                  </select>
                  <!-- Custom Arrow -->
                  <div
                    class="pointer-events-none absolute right-2 top-1.5 text-gray-400 dark:text-gray-300"
                  >
                    ▼
                  </div>
                </div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-lg font-semibold text-gray-900 dark:text-white">
                8.248445
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                (~$15,393.84)
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Price Details -->
      <div class="space-y-3 mb-6">
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500 dark:text-gray-400">Price</span>
          <div class="text-right">
            <span class="text-sm font-medium text-gray-900 dark:text-white"
              >1 LINK = 0.0423674 ETH</span
            >
            <span class="text-sm text-gray-500 dark:text-gray-400 ml-1"
              >(~$7.820)</span
            >
          </div>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500 dark:text-gray-400"
            >Minimum received</span
          >
          <div class="text-right">
            <span class="text-sm font-medium text-gray-900 dark:text-white"
              >8.225403 ETH</span
            >
            <span class="text-sm text-gray-500 dark:text-gray-400 ml-1"
              >(~$15,350)</span
            >
          </div>
        </div>
      </div>

      <!-- Disclaimer -->
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
        End price is an estimate. You will receive at least 8.225403 ETH
        (~$15,350) or the transaction will be refunded.
      </p>

      <!-- Convert Button -->
      <button
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
        <span>Convert</span>
      </button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "user",
});

const user = inject("authUser");
</script>
