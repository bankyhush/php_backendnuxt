<template>
  <div
    class="bg-white rounded-xl shadow-lg dark:bg-[#202020] dark:text-gray-50"
  >
    <div class="p-6">
      <h2 class="text-xl font-semibold mb-6">Assets</h2>

      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4"
      >
        <div class="relative w-full sm:w-auto">
          <Icon
            name="lucide:search"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            width="16"
            height="16"
          />
          <input
            type="text"
            placeholder="Search assets"
            v-model="searchQuery"
            @input="handleSearch"
            aria-label="Search assets"
            class="w-full sm:w-80 pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-[#303030] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white dark:bg-[#303030] text-black dark:text-white"
          />
        </div>

        <div class="flex items-center">
          <input
            type="checkbox"
            id="hideSmall"
            v-model="hideSmallAssets"
            @change="fetchCoins"
            class="h-4 w-4 rounded border-gray-300 text-black focus:ring-0 cursor-pointer dark:bg-[#303030]"
          />
          <label
            for="hideSmall"
            class="ml-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
          >
            Hide small assets
          </label>
        </div>
      </div>
    </div>

    <div class="overflow-x-auto">
      <!-- Loading Skeleton -->
      <div v-if="loading" class="p-6">
        <div class="space-y-4 animate-pulse">
          <!-- Skeleton Header -->
          <div class="flex justify-between items-center mb-4">
            <div class="h-4 bg-gray-200 dark:bg-[#303030] rounded w-1/4"></div>
            <div class="h-4 bg-gray-200 dark:bg-[#303030] rounded w-1/6"></div>
          </div>

          <!-- Skeleton Rows -->
          <div
            v-for="n in 5"
            :key="n"
            class="flex items-center justify-between py-3 border-b border-gray-100 dark:border-[#303030]"
          >
            <div class="flex items-center space-x-3">
              <div
                class="w-8 h-8 bg-gray-200 dark:bg-[#303030] rounded-full"
              ></div>
              <div>
                <div
                  class="h-4 bg-gray-200 dark:bg-[#303030] rounded w-24 mb-2"
                ></div>
                <div
                  class="h-3 bg-gray-200 dark:bg-[#303030] rounded w-16"
                ></div>
              </div>
            </div>
            <div class="text-right">
              <div
                class="h-4 bg-gray-200 dark:bg-[#303030] rounded w-20 mb-2"
              ></div>
              <div class="h-3 bg-gray-200 dark:bg-[#303030] rounded w-12"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="p-8 text-center">
        <Icon
          name="lucide:alert-circle"
          class="text-red-500 text-2xl mx-auto"
        />
        <p class="text-red-500 mt-2">
          Please try refreshing the page, or come back later. If the problem
          persists, contact our support team.
        </p>
        <button
          @click="fetchCoins"
          class="mt-3 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          Try Again
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="coins.length === 0" class="p-8 text-center">
        <Icon name="lucide:package" class="text-gray-400 text-2xl mx-auto" />
        <p class="text-gray-500 mt-2">No assets found</p>
        <p class="text-sm text-gray-400" v-if="searchQuery">
          No results for "{{ searchQuery }}"
        </p>
        <button
          v-if="hideSmallAssets"
          @click="
            hideSmallAssets = false;
            fetchCoins();
          "
          class="mt-3 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          Show all assets
        </button>
      </div>

      <!-- Data Table -->
      <table v-else class="min-w-full">
        <thead>
          <tr
            class="text-sm text-gray-500 border-t border-b border-gray-200 dark:border-[#303030]"
          >
            <th class="text-left px-6 py-3 font-medium">Name</th>
            <th class="text-right px-6 py-3 font-medium">Spot</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="coin in coins"
            :key="coin.coin_id"
            class="hover:bg-gray-50 border-b border-gray-100 dark:border-[#303030] dark:hover:bg-[#303030] cursor-pointer transition-colors duration-150"
            @click="navigateToPortfolio(coin.coin_id)"
          >
            <td class="px-6 py-4">
              <div class="flex items-center">
                <div
                  v-if="coin.photo"
                  class="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden"
                >
                  <img
                    :src="coin.photo"
                    :alt="coin.coin_name"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div
                  v-else
                  class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-[#23292F] text-white"
                >
                  {{ coin.coin_name.charAt(0).toUpperCase() }}
                </div>
                <div class="ml-3">
                  <div class="font-medium capitalize">
                    {{ coin.coin_title }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    ${{ formatNumber(coin.coin_rate) }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 text-right">
              <div class="font-medium">
                ${{ formatNumber(coin.total_balance, 2) }}
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ formatNumber(coin.total_value) }} {{ coin.coin_name }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div
        v-if="pagination.total_pages > 1"
        class="p-6 border-t border-gray-200 dark:border-[#303030]"
      >
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Showing {{ coins.length }} of {{ pagination.total_items }} assets
          </div>
          <div class="flex space-x-2">
            <button
              @click="changePage(pagination.current_page - 1)"
              :disabled="pagination.current_page === 1"
              class="px-3 py-1 rounded border border-gray-300 dark:border-[#303030] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-[#303030] transition-colors"
            >
              Previous
            </button>
            <span class="px-3 py-1 text-sm">
              Page {{ pagination.current_page }} of {{ pagination.total_pages }}
            </span>
            <button
              @click="changePage(pagination.current_page + 1)"
              :disabled="pagination.current_page === pagination.total_pages"
              class="px-3 py-1 rounded border border-gray-300 dark:border-[#303030] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-[#303030] transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const router = useRouter();

// Reactive data
const coins = ref([]);
const loading = ref(true);
const error = ref("");
const searchQuery = ref("");
const hideSmallAssets = ref(false); // Default to false
const pagination = ref({
  current_page: 1,
  total_pages: 1,
  total_items: 0,
  items_per_page: 20,
});

// Search debounce
let searchTimeout = null;

// Format numbers with precision control
const formatNumber = (num, precision = 2) => {
  if (num === 0) return "0." + "0".repeat(precision);
  if (num < 0.000001) return num.toExponential(4);
  if (num < 0.001) return num.toFixed(6);
  if (num < 1) return num.toFixed(precision);
  if (num < 1000) return num.toFixed(precision);
  return num.toLocaleString("en-US", { maximumFractionDigits: precision });
};

// Handle search with debounce
const handleSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    pagination.value.current_page = 1;
    fetchCoins();
  }, 500);
};

// Change page
const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.total_pages) {
    pagination.value.current_page = page;
    fetchCoins();
  }
};

// Navigate to portfolio details
const navigateToPortfolio = (coinId) => {
  router.push(`/dashboard/portfolio/${coinId}`);
};

// Fetch coins from API
const fetchCoins = async () => {
  loading.value = true;
  error.value = "";

  try {
    const params = new URLSearchParams({
      page: pagination.value.current_page.toString(),
      search: searchQuery.value,
      hide_small: hideSmallAssets.value.toString(),
    });

    const response = await $fetch(
      `${config.public.apiBase}/user/user-coins.php?${params}`,
      {
        credentials: "include",
      }
    );

    if (response.success) {
      coins.value = response.data.coins;
      pagination.value = response.data.pagination;
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    error.value = err?.data?.message || err?.message || "Failed to load assets";
    coins.value = [];
  } finally {
    loading.value = false;
  }
};

// Auto-refresh data every 30 seconds
let intervalId;
onMounted(() => {
  fetchCoins();

  // Set up auto-refresh
  intervalId = setInterval(() => {
    if (!loading.value) {
      fetchCoins();
    }
  }, 30000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId); // Clean up interval
  clearTimeout(searchTimeout); // Clean up search timeout
});
</script>
