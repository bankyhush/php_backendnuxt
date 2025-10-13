<script setup>
// This page automatically gets auth protection from the layout
definePageMeta({
  layout: "user",
});

// Inject the user data provided by the layout
const user = inject("authUser");

const tabs = [{ name: "Overview", active: true }];

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
        class="-mt-5 shadow-sm bg-gray-100 dark:bg-[#282727] dark:text-cyan-500"
      >
        <div class="container mx-auto px-4">
          <div class="flex overflow-x-auto hide-scrollbar">
            <div
              v-for="tab in tabs"
              :key="tab.name"
              class="flex items-center gap-1 px-6 py-4 whitespace-nowrap cursor-pointer text-sm font-medium transition-colors"
              :class="
                tab.active
                  ? 'dark:text-gray-200 text-zinc-900 border-gray-200 border-b-2 dark:border-[#303030]'
                  : 'dark:text-gray-50 hover:text-black'
              "
            >
              <Icon
                name="streamline-plump:safe-vault-remix"
                width="24"
                height="24"
              />
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
              <!-- Dashboard Stocks -->
              <DashboardStockz />
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
                      class="bg-purple-500 h-full transition-all"
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

                  <div
                    class="flex items-center justify-between mb-4 hover:bg-gray-50 dark:hover:bg-[#303030] p-2 rounded-lg cursor-pointer transition-colors"
                  >
                    <div class="flex items-center">
                      <div
                        class="w-2 h-2 rounded-full bg-purple-500 mr-2"
                      ></div>
                      <span class="text-gray-700 dark:text-gray-200"
                        >Active Plan</span
                      >
                    </div>
                    <div class="flex items-center">
                      <span class="text-right">
                        ${{ formatCurrency(data?.user?.planamount) }}
                        {{ data?.user?.activeplan }}</span
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
                </div>
              </div>

              <!-- News Section -->
              <div
                class="bg-white rounded-xl shadow-lg p-6 text-gray-900 dark:bg-[#202020] dark:text-gray-50"
              >
                <div class="flex items-center justify-between mb-4">
                  <h2 class="text-xl font-semibold">CoinDesk Headlines</h2>
                </div>

                <!-- Transactions Table Dummy -->

                <DashboardNews />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </main>
</template>
