<template>
  <div class="bg-white dark:bg-[#202020] p-6 rounded-xl shadow-sm">
    <!-- Header with Search -->
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Recent Transactions
      </h3>

      <!-- Search Input -->
      <div class="relative w-64">
        <Icon
          name="lucide:search"
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
        />
        <input
          type="text"
          v-model="searchTerm"
          @input="handleSearch"
          placeholder="Search transactions..."
          class="w-full border border-gray-300 dark:border-[#303030] rounded-md p-2 pl-10 text-sm bg-white dark:bg-[#303030] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="animate-pulse space-y-3">
      <div
        v-for="n in 3"
        :key="n"
        class="flex items-center justify-between p-3 border border-gray-200 dark:border-[#303030] rounded-lg"
      >
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div>
            <div
              class="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"
            ></div>
            <div class="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
        <div class="text-right">
          <div class="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div class="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8">
      <Icon
        name="lucide:alert-circle"
        class="w-8 h-8 text-red-500 mx-auto mb-2"
      />
      <p class="text-red-500 text-sm">{{ error }}</p>
      <button
        @click="fetchTransactions"
        class="mt-2 text-blue-500 hover:text-blue-600 text-sm"
      >
        Try Again
      </button>
    </div>

    <!-- No Transactions -->
    <div v-else-if="transactions.length === 0" class="text-center py-8">
      <Icon
        name="lucide:file-text"
        class="w-8 h-8 text-gray-400 mx-auto mb-2"
      />
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{
          searchTerm
            ? "No transactions found for your search"
            : "No transactions found"
        }}
      </p>
    </div>

    <!-- Transactions List -->
    <div v-else class="space-y-3">
      <div
        v-for="transaction in transactions"
        :key="transaction.id"
        class="flex items-center justify-between p-3 border border-gray-200 dark:border-[#303030] rounded-lg hover:bg-gray-50 dark:hover:bg-[#303030] transition-colors"
      >
        <div class="flex items-center space-x-3">
          <div
            class="w-8 h-8 bg-gray-100 dark:bg-[#303030] rounded-full flex items-center justify-center"
          >
            <Icon
              :name="getTransactionIcon(transaction.type)"
              class="w-4 h-4"
            />
          </div>
          <div>
            <div class="font-medium capitalize">{{ transaction.type }}</div>
            <div class="text-sm text-gray-500">
              {{ formatDate(transaction.createdAt) }}
            </div>
          </div>
        </div>
        <div class="text-right">
          <div
            :class="[
              'font-medium',
              transaction.method === 'credit'
                ? 'text-green-600'
                : 'text-red-600',
            ]"
          >
            {{ transaction.method === "credit" ? "+" : "-" }}${{
              formatNumber(transaction.amount)
            }}
          </div>
          <div class="text-sm text-gray-500 capitalize">
            {{ transaction.status.toLowerCase() }}
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div
      v-if="!loading && pagination.total_pages > 1"
      class="flex justify-between items-center mt-6 pt-6 border-t border-gray-200 dark:border-[#303030]"
    >
      <div class="text-sm text-gray-500 dark:text-gray-400">
        Showing {{ transactions.length }} of
        {{ pagination.total_items }} transactions
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
</template>

<script setup>
// Define the prop
const props = defineProps({
  coinId: {
    type: [String, Number],
    required: true,
  },
});

const config = useRuntimeConfig();

// Reactive data
const transactions = ref([]);
const loading = ref(true);
const error = ref("");
const searchTerm = ref("");
const searchTimeout = ref(null);

// Pagination
const pagination = ref({
  current_page: 1,
  total_pages: 1,
  total_items: 0,
  items_per_page: 10,
});

// Format numbers
const formatNumber = (num) => {
  if (num === 0) return "0.00";
  if (num < 0.01) return num.toFixed(4);
  if (num < 1) return num.toFixed(3);
  return num.toFixed(2);
};

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Get transaction icon
const getTransactionIcon = (type) => {
  const icons = {
    deposit: "lucide:download",
    withdrawal: "lucide:upload",
    transfer: "lucide:send",
    trade: "lucide:arrow-up-down",
    stake: "lucide:lock",
  };
  return icons[type] || "lucide:circle";
};

// Handle search with debounce
const handleSearch = () => {
  clearTimeout(searchTimeout.value);
  searchTimeout.value = setTimeout(() => {
    pagination.value.current_page = 1;
    fetchTransactions();
  }, 500);
};

// Change page
const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.total_pages) {
    pagination.value.current_page = page;
    fetchTransactions();
  }
};

// Fetch transactions from API
const fetchTransactions = async () => {
  loading.value = true;
  error.value = "";

  try {
    // Validate coinId
    if (!props.coinId) {
      throw new Error("Coin ID is required");
    }

    const params = new URLSearchParams({
      coin_id: props.coinId,
      page: pagination.value.current_page.toString(),
      limit: pagination.value.items_per_page.toString(),
      search: searchTerm.value,
    });

    const response = await $fetch(
      `${config.public.apiBase}/user/coin-transactions.php?${params}`,
      {
        credentials: "include",
      }
    );

    if (response.success) {
      transactions.value = response.data.transactions;
      pagination.value = response.data.pagination;
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    console.error("Transaction fetch error:", err);
    error.value =
      err?.data?.message || err?.message || "Failed to load transactions";
    transactions.value = [];
  } finally {
    loading.value = false;
  }
};

// Watch for coinId changes and refetch transactions
watch(
  () => props.coinId,
  (newCoinId) => {
    if (newCoinId) {
      pagination.value.current_page = 1;
      searchTerm.value = "";
      fetchTransactions();
    }
  }
);

// Initialize
onMounted(() => {
  if (props.coinId) {
    fetchTransactions();
  } else {
    error.value = "Coin ID is missing";
    loading.value = false;
  }
});

onBeforeUnmount(() => {
  clearTimeout(searchTimeout.value);
});
</script>
