<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-[#171717a8] bg-opacity-50 z-50 flex items-center justify-center p-4"
  >
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
    >
      <div
        class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
      >
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          User Balances - {{ user?.fullname }}
        </h3>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <Icon name="mdi:close" class="w-6 h-6" />
        </button>
      </div>

      <div class="p-6 overflow-auto max-h-[70vh]">
        <!-- Balance Summary -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div class="text-sm text-blue-600 dark:text-blue-400">
              Total Balance
            </div>
            <div class="text-2xl font-bold text-blue-700 dark:text-blue-300">
              ${{ formatNumber(user?.balances?.total_usd_value || 0) }}
            </div>
          </div>
          <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <div class="text-sm text-green-600 dark:text-green-400">
              Available
            </div>
            <div class="text-2xl font-bold text-green-700 dark:text-green-300">
              ${{ formatNumber(user?.balances?.total_available || 0) }}
            </div>
          </div>
          <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <div class="text-sm text-yellow-600 dark:text-yellow-400">
              On Order
            </div>
            <div
              class="text-2xl font-bold text-yellow-700 dark:text-yellow-300"
            >
              ${{ formatNumber(user?.balances?.total_on_order || 0) }}
            </div>
          </div>
          <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <div class="text-sm text-purple-600 dark:text-purple-400">
              Staked
            </div>
            <div
              class="text-2xl font-bold text-purple-700 dark:text-purple-300"
            >
              ${{ formatNumber(user?.balances?.total_staked || 0) }}
            </div>
          </div>
        </div>

        <!-- Coin Balances Table -->
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
          <table
            class="min-w-full divide-y divide-gray-200 dark:divide-gray-600"
          >
            <thead class="bg-gray-100 dark:bg-gray-600">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Coin
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Available
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  On Order
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Staked
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Total
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  USD Value
                </th>
              </tr>
            </thead>
            <tbody
              class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
            >
              <tr
                v-for="coin in user?.balances?.coins || []"
                :key="coin.coin_id"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <img
                      v-if="coin.photo"
                      :src="coin.photo"
                      :alt="coin.coin_name"
                      class="w-8 h-8 rounded-full mr-3"
                    />
                    <div>
                      <div
                        class="text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {{ coin.coin_name }}
                      </div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">
                        {{ coin.coin_code }}
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                >
                  {{ formatNumber(coin.available_balance, 6) }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                >
                  {{ formatNumber(coin.on_order_balance, 6) }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                >
                  {{ formatNumber(coin.staked_balance, 6) }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                >
                  {{ formatNumber(coin.total_balance, 6) }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                >
                  ${{ formatNumber(coin.usd_value) }}
                </td>
              </tr>
              <tr v-if="!user?.balances?.coins?.length">
                <td
                  colspan="6"
                  class="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  No balances found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        class="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700"
      >
        <button
          @click="$emit('close')"
          class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  user: Object,
});

defineEmits(["close"]);

const formatNumber = (num, precision = 2) => {
  if (!num) return "0." + "0".repeat(precision);
  if (num < 0.000001) return num.toExponential(4);
  if (num < 0.001) return num.toFixed(6);
  if (num < 1) return num.toFixed(precision);
  return num.toLocaleString("en-US", { maximumFractionDigits: precision });
};
</script>
