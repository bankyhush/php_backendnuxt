<script setup>
// This page automatically gets auth protection from the layout
definePageMeta({
  layout: "user",
});

// Inject the user data provided by the layout
const user = inject("authUser");

const tabs = [
  { name: "Overview", active: true },
  { name: "Funding", active: false },
  { name: "Trading", active: false },
  { name: "Grow", active: false },
  { name: "Analysis", active: false },
  { name: "Order center", active: false },
  { name: "Account statement", active: false },
];

const config = useRuntimeConfig();

// Create loading delay manually
const data = ref(null);
const error = ref(null);
const isPending = ref(true);

try {
  const response = await useFetch(`${config.public.apiBase}/user/profile.php`, {
    credentials: "include",
  });

  // Artificial delay for skeleton (e.g., 800ms)

  data.value = response.data.value;
  error.value = response.error.value;
  isPending.value = false;
} catch (err) {
  error.value = err;
  isPending.value = false;
}

function formatCurrency(value) {
  return Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
</script>

<template>
  <main>
    <div class="flex flex-col min-h-screen mb-14">
      <!-- Loading State -->

      <div
        class="-mt-5 shadow-sm bg-white dark:bg-[#282727] dark:text-cyan-500"
      >
        <div class="container mx-auto px-4">
          <div class="flex overflow-x-auto hide-scrollbar">
            <div
              v-for="tab in tabs"
              :key="tab.name"
              class="px-6 py-4 whitespace-nowrap cursor-pointer text-sm font-medium transition-colors"
              :class="
                tab.active
                  ? 'dark:text-red-400 border-b-2 border-black'
                  : 'dark:text-gray-50 hover:text-black'
              "
            >
              {{ tab.name }}
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow bg-white dark:bg-[#171717] text-black">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <!-- Dashboard Balance -->
              <DashboardOverall />
              <!-- Dashboard Assets Coins -->
              <DashboardAssets />
            </div>

            <!-- Right Bar SIde  -->
            <div class="lg:col-span-1 space-y-6">
              <!-- Allocation Section -->
              <div
                class="bg-white rounded-xl shadow-lg dark:bg-[#202020] dark:text-gray-200"
              >
                <div
                  class="flex items-center justify-between p-6 cursor-pointer"
                >
                  <h2 class="text-xl font-semibold">Allocation</h2>
                </div>

                <div class="px-6 pb-6">
                  <div class="h-3 flex rounded-full overflow-hidden mb-6">
                    <!-- Dummy allocation bars -->
                    <div
                      class="bg-red-500 h-full transition-all"
                      style="width: 40%; min-width: 4px"
                    ></div>
                    <div
                      class="bg-blue-500 h-full transition-all"
                      style="width: 30%; min-width: 4px"
                    ></div>
                    <div
                      class="bg-green-500 h-full transition-all"
                      style="width: 20%; min-width: 4px"
                    ></div>
                    <div
                      class="bg-yellow-500 h-full transition-all"
                      style="width: 10%; min-width: 4px"
                    ></div>
                  </div>

                  <div
                    class="flex items-center justify-between mb-4 hover:bg-gray-50 dark:hover:bg-[#303030] p-2 rounded-lg cursor-pointer transition-colors"
                  >
                    <div class="flex items-center">
                      <div class="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      <span class="text-gray-700 dark:text-gray-200"
                        >Deposit Balance</span
                      >
                    </div>
                    <div class="flex items-center">
                      <span class="text-right">
                        {{ data?.user?.currency || "$"
                        }}{{ formatCurrency(data?.user?.deposit) }}
                      </span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="text-gray-400 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        width="16"
                        height="16"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>

                  <div
                    class="flex items-center justify-between mb-4 hover:bg-gray-50 dark:hover:bg-[#303030] p-2 rounded-lg cursor-pointer transition-colors"
                  >
                    <div class="flex items-center">
                      <div class="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <span class="text-gray-700 dark:text-gray-200"
                        >Profit Balance</span
                      >
                    </div>
                    <div class="flex items-center">
                      <span class="text-right">
                        {{ data?.user?.currency || "$"
                        }}{{ formatCurrency(data?.user?.profit) }}</span
                      >

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="text-gray-400 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        width="16"
                        height="16"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>

                  <div
                    class="flex items-center justify-between mb-4 hover:bg-gray-50 dark:hover:bg-[#303030] p-2 rounded-lg cursor-pointer transition-colors"
                  >
                    <div class="flex items-center">
                      <div
                        class="w-2 h-2 rounded-full bg-yellow-500 mr-2"
                      ></div>
                      <span class="text-gray-700 dark:text-gray-200"
                        >Bonus Balance</span
                      >
                    </div>
                    <div class="flex items-center">
                      <span class="text-right">
                        {{ data?.user?.currency || "$"
                        }}{{ formatCurrency(data?.user?.bonus) }}</span
                      >

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="text-gray-400 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        width="16"
                        height="16"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <!-- Dummy allocation items -->
                  <div
                    class="flex items-center justify-between mb-4 hover:bg-gray-50 dark:hover:bg-[#303030] p-2 rounded-lg cursor-pointer transition-colors"
                  >
                    <div class="flex items-center">
                      <div class="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                      <span class="text-gray-700 dark:text-gray-200"
                        >Payout Balance</span
                      >
                    </div>
                    <div class="flex items-center">
                      <span class="text-right">
                        {{ data?.user?.currency || "$"
                        }}{{ formatCurrency(data?.user?.withdrawal) }}
                      </span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="text-gray-400 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        width="16"
                        height="16"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Transactions Section -->
              <div
                class="bg-white rounded-xl shadow-lg p-6 text-gray-900 dark:bg-[#202020] dark:text-gray-50"
              >
                <div class="flex items-center justify-between mb-4">
                  <h2 class="text-xl font-semibold">Recent Transactions</h2>
                  <a
                    href="/dashboard/transactions"
                    class="text-sm dark:text-red-600 hover:underline font-semibold"
                    >View all</a
                  >
                </div>

                <!-- Transactions Table Dummy -->
                <div class="overflow-x-auto">
                  <table class="w-full text-sm">
                    <thead>
                      <tr class="border-b border-gray-300 dark:border-gray-700">
                        <th class="py-2 text-left">Type</th>
                        <th class="py-2 text-left">Amount</th>
                        <th class="py-2 text-left">Status</th>
                        <th class="py-2 text-left">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <td class="py-2">Deposit</td>
                        <td class="py-2">$1,000.00</td>
                        <td class="py-2">
                          <span
                            class="px-1 rounded-sm text-sm font-medium text-green-600 bg-green-100"
                            >Approved</span
                          >
                        </td>
                        <td class="py-2">2025-09-22</td>
                      </tr>
                      <tr
                        class="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <td class="py-2">Withdrawal</td>
                        <td class="py-2">$500.00</td>
                        <td class="py-2">
                          <span
                            class="px-1 rounded-sm text-sm font-medium text-yellow-600 bg-yellow-100"
                            >Pending</span
                          >
                        </td>
                        <td class="py-2">2025-09-20</td>
                      </tr>
                      <tr
                        class="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <td class="py-2">Transfer</td>
                        <td class="py-2">$300.00</td>
                        <td class="py-2">
                          <span
                            class="px-1 rounded-sm text-sm font-medium text-blue-600 bg-blue-100"
                            >Submit</span
                          >
                        </td>
                        <td class="py-2">2025-09-18</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="flex justify-between items-center mt-4">
                  <button
                    class="px-4 py-2 bg-gray-200 text-gray-700 rounded cursor-not-allowed opacity-50 hover:bg-gray-300"
                    disabled
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="inline-block"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      width="16"
                      height="16"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <span>Page 1 of 3</span>

                  <button
                    class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="inline-block"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      width="16"
                      height="16"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </main>
</template>
