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
              <div
                class="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:shadow-xl dark:bg-[#202020] dark:text-gray-50"
              >
                <div class="flex items-center mb-2">
                  <h2 class="text-sm text-[#beb8b8] mr-2">
                    Estimated total value
                  </h2>
                  <!-- Optional: Icon -->
                </div>

                <div class="flex items-baseline mb-1">
                  <h1 class="text-3xl font-bold mr-2">$12,345.67</h1>
                  <span class="text-[#beb8b8] text-sm">USD</span>
                </div>

                <div class="mb-8 text-sm">
                  <span class="mr-1">Available's P/L:</span>
                  <span class="text-green-500">
                    $8,765.43 <span class="text-red-500">(-123.45)</span>
                  </span>
                </div>

                <div class="flex flex-wrap gap-2 rounded-lg">
                  <NuxtLink to="/dashboard/deposit/1">
                    <button
                      class="cursor-pointer bg-white text-black border border-gray-300 px-6 py-2.5 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors dark:bg-[#303030] dark:text-white dark:border-[#303030] dark:hover:border-gray-500"
                    >
                      Deposit
                    </button>
                  </NuxtLink>

                  <NuxtLink to="/dashboard/convert">
                    <button
                      class="cursor-pointer bg-white text-black border border-gray-300 px-6 py-2.5 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors dark:bg-[#303030] dark:text-white dark:border-[#303030] dark:hover:border-gray-500"
                    >
                      Convert
                    </button>
                  </NuxtLink>

                  <NuxtLink to="/dashboard/withdraw/1">
                    <button
                      class="cursor-pointer bg-white text-black border border-gray-300 px-6 py-2.5 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors dark:bg-[#303030] dark:text-white dark:border-[#303030] dark:hover:border-gray-500"
                    >
                      Withdraw
                    </button>
                  </NuxtLink>

                  <NuxtLink to="/dashboard/transfer/1">
                    <button
                      class="cursor-pointer bg-white text-black border border-gray-300 px-6 py-2.5 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors dark:bg-[#303030] dark:text-white dark:border-[#303030] dark:hover:border-gray-500"
                    >
                      Transfer
                    </button>
                  </NuxtLink>
                </div>
              </div>
              <!-- Dashboard Assets Coins -->
              <div
                class="bg-white rounded-xl shadow-lg dark:bg-[#202020] dark:text-gray-50"
              >
                <div class="p-6">
                  <h2 class="text-xl font-semibold mb-6">Assets</h2>

                  <div
                    class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4"
                  >
                    <div class="relative w-full sm:w-auto">
                      <!-- Dummy Search Icon -->
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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
                          d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                        />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search assets"
                        aria-label="Search assets"
                        class="w-full sm:w-80 pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-[#303030] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                        value=""
                      />
                    </div>

                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        id="hideSmall"
                        class="h-4 w-4 rounded border-gray-300 text-black focus:ring-0 cursor-pointer"
                        checked
                        disabled
                      />
                      <label
                        for="hideSmall"
                        class="ml-2 text-sm text-gray-400 cursor-pointer"
                      >
                        Hide small assets
                      </label>
                    </div>
                  </div>
                </div>

                <div class="overflow-x-auto">
                  <!-- No results dummy -->
                  <!-- <div class="text-center text-gray-500 py-10">
        No results found <br />
        Try changing your filter or search
      </div> -->

                  <!-- Dummy Table with 2 asset rows -->
                  <table class="min-w-full">
                    <thead>
                      <tr
                        class="text-sm text-gray-500 border-t border-b border-gray-200 dark:border-[#303030]"
                      >
                        <th class="text-left px-6 py-3 font-medium">Name</th>
                        <th class="text-right px-6 py-3 font-medium">
                          Holdings
                        </th>
                        <th class="text-right px-6 py-3 font-medium">
                          Spot Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="hover:bg-gray-50 border-b border-gray-100 dark:border-[#303030] dark:hover:bg-[#303030] cursor-pointer"
                      >
                        <td class="px-6 py-4">
                          <div class="flex items-center">
                            <div
                              class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-[#23292F] text-white"
                            >
                              B
                            </div>
                            <div class="ml-3">
                              <div class="font-medium">Bitcoin</div>
                              <div class="text-sm text-gray-500">
                                Bitcoin Full Name
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 text-right">
                          <div class="font-medium">1.234</div>
                          <div class="text-sm text-gray-500">$45,000</div>
                        </td>
                        <td class="px-6 py-4 text-right">
                          <div class="font-medium text-yellow-700">$36,500</div>
                          <div class="text-sm text-gray-500">+2.3%</div>
                        </td>
                      </tr>

                      <tr
                        class="hover:bg-gray-50 border-b border-gray-100 dark:border-[#303030] dark:hover:bg-[#303030] cursor-pointer"
                      >
                        <td class="px-6 py-4">
                          <div class="flex items-center">
                            <img
                              src="https://cryptologos.cc/logos/ethereum-eth-logo.png"
                              alt="Ethereum logo"
                              class="w-8 h-8 rounded-full object-cover"
                            />
                            <div class="ml-3">
                              <div class="font-medium">Ethereum</div>
                              <div class="text-sm text-gray-500">
                                Ethereum Full Name
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 text-right">
                          <div class="font-medium">10.5</div>
                          <div class="text-sm text-gray-500">$31,000</div>
                        </td>
                        <td class="px-6 py-4 text-right">
                          <div class="font-medium text-yellow-700">$3,100</div>
                          <div class="text-sm text-gray-500">-1.2%</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
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

                  <!-- Dummy allocation items -->
                  <div
                    class="flex items-center justify-between mb-4 hover:bg-gray-50 dark:hover:bg-[#303030] p-2 rounded-lg cursor-pointer transition-colors"
                  >
                    <div class="flex items-center">
                      <div class="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                      <span class="text-gray-400">Stocks</span>
                    </div>
                    <div class="flex items-center">
                      <span class="text-right">$12,000</span>
                      <span class="text-xs text-gray-500 ml-1">40.0%</span>
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
                      <div class="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      <span class="text-gray-700">Bonds</span>
                    </div>
                    <div class="flex items-center">
                      <span class="text-right">$9,000</span>
                      <span class="text-xs text-gray-500 ml-1">30.0%</span>
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
                      <span class="text-gray-700">Real Estate</span>
                    </div>
                    <div class="flex items-center">
                      <span class="text-right">$6,000</span>
                      <span class="text-xs text-gray-500 ml-1">20.0%</span>
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
                      <span class="text-gray-700">Cash</span>
                    </div>
                    <div class="flex items-center">
                      <span class="text-right">$3,000</span>
                      <span class="text-xs text-gray-500 ml-1">10.0%</span>
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
