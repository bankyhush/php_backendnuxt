<template>
  <div>
    <div
      class="min-h-screen mb-20 p-4 md:p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300"
    >
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Section -->
          <div
            class="lg:col-span-2 bg-gray-100 dark:bg-background/50 rounded-lg p-6"
          >
            <div class="space-y-6">
              <!-- Coin (disabled select mimic) -->
              <div>
                <label class="block mb-2">Selected Coin</label>
                <div
                  class="flex items-center space-x-3 bg-gray-200 dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#333] rounded-md p-3 text-sm cursor-not-allowed"
                >
                  <img
                    v-if="coinData?.photo"
                    :src="coinData.photo"
                    :alt="coinData.name"
                    class="w-6 h-6 rounded-full object-contain"
                  />
                  <span>{{ coinData?.name }}</span>
                </div>
              </div>

              <!-- Network -->
              <div>
                <label class="block mb-2">Select Network</label>
                <select
                  class="w-full bg-white dark:bg-[#0a0a0a] border border-gray-300 dark:border-[#333] rounded-md p-3 text-sm"
                >
                  <option :key="coinData?.id" :value="coinData?.fullName">
                    {{ coinData?.fullName }}
                  </option>
                </select>
                <p class="text-sm text-gray-500 mt-2">
                  Make sure the network you choose for the deposit matches the
                  withdrawal network or your assets may be lost.
                </p>
              </div>

              <!-- Wallet Address -->
              <div>
                <label class="block mb-2">Address</label>
                <div class="flex">
                  <input
                    type="text"
                    :value="coinData?.wallet"
                    readonly
                    class="w-full bg-white dark:bg-[#0a0a0a] border border-gray-300 dark:border-[#333] rounded-l-md p-3"
                  />
                  <div class="flex">
                    <button
                      @click="handleCopyAddress"
                      class="bg-white dark:bg-[#0a0a0a] border border-l-0 border-gray-300 dark:border-[#333] p-3 relative"
                    >
                      <Check
                        v-if="copySuccess"
                        class="h-5 w-5 text-green-500"
                      />
                      <Copy v-else class="h-5 w-5 text-gray-400" />

                      <div
                        v-if="copySuccess"
                        class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs rounded py-1 px-2 whitespace-nowrap"
                      >
                        Copied!
                      </div>
                    </button>
                    <button
                      class="bg-white dark:bg-[#0a0a0a] border border-l-0 border-gray-300 dark:border-[#333] rounded-r-md p-3"
                    >
                      <QrCode class="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Confirmation Info -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block mb-2">Expected Arrival</label>
                  <p>1 network confirmation</p>
                </div>
                <div>
                  <label class="block mb-2">Coin</label>
                  <p>Only send {{ coinData?.name }}</p>
                </div>
              </div>

              <div>
                <label class="block mb-2">Network</label>
                <p>Make sure the network is {{ coinData?.fullName }}</p>
              </div>
            </div>
          </div>

          <!-- Help Section -->
          <div class="bg-gray-100 dark:bg-background/50 rounded-lg p-6">
            <h2 class="text-sm font-medium border-b pb-4 mb-4">
              Facing Deposit Issues?
            </h2>
            <ul
              class="list-disc pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300"
            >
              <li>
                Ensure the selected network matches your sending platform.
              </li>
              <li>Double check the wallet address before sending.</li>
              <li>Reach out to support if funds don't arrive in 1 hour.</li>
              <li>{{ coinData?.desc }}</li>
            </ul>

            <div class="mt-6 mb-6">
              <VerifyPayment :coinData="coinData" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// This page automatically gets auth protection from the layout
definePageMeta({
  layout: "user",
});

// Inject the user data provided by the layout
const user = inject("authUser");

import { ref } from "vue";

// Example reactive data
const coinData = ref({
  id: 1,
  name: "Bitcoin",
  fullName: "Bitcoin Mainnet",
  photo: "/btc.png",
  wallet: "bc1xyzabc...",
  desc: "Ensure your wallet supports BTC native addresses.",
});

const copySuccess = ref(false);
const handleCopyAddress = () => {
  navigator.clipboard.writeText(coinData.value.wallet);
  copySuccess.value = true;
  setTimeout(() => (copySuccess.value = false), 2000);
};
</script>
