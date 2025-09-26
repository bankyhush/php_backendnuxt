<template>
  <div class="min-h-screen bg-gray-50 dark:bg-[#171717] py-8 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Transaction History
          <span
            v-if="pagination.total_items > 0"
            class="text-sm text-gray-500 ml-2"
          >
            ({{ pagination.total_items }} total)
          </span>
        </h1>
        <p class="text-gray-600 dark:text-gray-300">
          View your recent transactions and their status
        </p>
      </div>

      <!-- Filters -->
      <div class="bg-white dark:bg-[#202020] rounded-xl shadow-sm p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Coin Filter -->
          <!-- <div> -->
          <!-- <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Coin
            </label> -->
          <!-- <select
              v-model="filters.coin_id"
              @change="fetchTransactions"
              class="w-full border border-gray-300 dark:border-[#303030] rounded-md p-2 text-sm bg-white dark:bg-[#303030] text-gray-900 dark:text-white"
            >
              <option value="">All Coins</option>
              <option
                v-for="coin in coins"
                :key="coin.coin_id"
                :value="coin.coin_id"
              >
                {{ coin.coin_name }}
              </option>
            </select> -->
          <!-- </div> -->

          <!-- Type Filter -->
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Type
            </label>
            <select
              v-model="filters.type"
              @change="fetchTransactions"
              class="w-full border border-gray-300 dark:border-[#303030] rounded-md p-2 text-sm bg-white dark:bg-[#303030] text-gray-900 dark:text-white"
            >
              <option value="">All Types</option>
              <option value="deposit">Deposit</option>
              <option value="withdrawal">Withdrawal</option>
              <option value="transfer">Transfer</option>
              <option value="trade">Trade</option>
              <option value="stake">Stake</option>
            </select>
          </div>

          <!-- Status Filter -->
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Status
            </label>
            <select
              v-model="filters.status"
              @change="fetchTransactions"
              class="w-full border border-gray-300 dark:border-[#303030] rounded-md p-2 text-sm bg-white dark:bg-[#303030] text-gray-900 dark:text-white"
            >
              <option value="">All Status</option>
              <option value="Submitted">Submitted</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Approved">Approved</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          <!-- Search -->
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Search
            </label>
            <div class="relative">
              <Icon
                name="lucide:search"
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
              />
              <input
                type="text"
                v-model="searchTerm"
                @input="handleSearch"
                placeholder="Search transactions..."
                class="w-full border border-gray-300 dark:border-[#303030] rounded-md p-2 pl-10 text-sm bg-white dark:bg-[#303030] text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        <!-- Active Filters -->
        <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mt-4">
          <span
            v-for="(value, key) in activeFilters"
            :key="key"
            class="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
          >
            {{ getFilterLabel(key, value) }}
            <button @click="removeFilter(key)" class="ml-2 hover:text-blue-600">
              <Icon name="lucide:x" class="w-3 h-3" />
            </button>
          </span>
          <button
            @click="clearFilters"
            class="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            Clear all
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="animate-pulse">
        <div class="bg-white dark:bg-[#202020] rounded-xl shadow-sm p-6">
          <div class="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
          <div class="space-y-3">
            <div
              v-for="n in 5"
              :key="n"
              class="flex items-center justify-between p-3 border border-gray-200 dark:border-[#303030] rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"
                ></div>
                <div>
                  <div
                    class="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"
                  ></div>
                  <div
                    class="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"
                  ></div>
                </div>
              </div>
              <div class="text-right">
                <div
                  class="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2"
                ></div>
                <div
                  class="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="bg-white dark:bg-[#202020] rounded-xl shadow-sm p-6 text-center"
      >
        <Icon
          name="lucide:alert-circle"
          class="w-12 h-12 text-red-500 mx-auto mb-4"
        />
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Error Loading Transactions
        </h3>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          Please try refreshing the page, or come back later. If the problem
          persists, contact our support team.
        </p>
        <button
          @click="fetchTransactions"
          class="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          Try Again
        </button>
      </div>

      <!-- Transactions -->
      <div v-else class="bg-white dark:bg-[#202020] rounded-xl shadow-sm p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Recent Transactions
          </h3>

          <!-- Export Button -->
          <div class="flex space-x-2">
            <button
              @click="exportToCSV"
              class="flex items-center space-x-2 bg-gray-100 dark:bg-[#303030] text-gray-700 dark:text-gray-300 px-3 py-2 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-[#404040]"
            >
              <Icon name="lucide:download" class="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button
              @click="exportToPDF"
              class="flex items-center space-x-2 bg-gray-100 dark:bg-[#303030] text-gray-700 dark:text-gray-300 px-3 py-2 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-[#404040]"
            >
              <Icon name="lucide:file-text" class="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        <p
          v-if="transactions.length === 0"
          class="text-sm text-gray-500 dark:text-gray-400 text-center py-8"
        >
          No transactions found.
        </p>

        <div v-else class="space-y-3">
          <div
            v-for="transaction in filteredTransactions"
            :key="transaction.id"
            class="flex items-center justify-between p-3 border border-gray-200 dark:border-[#303030] rounded-lg hover:bg-gray-50 dark:hover:bg-[#303030] transition-colors cursor-pointer"
            @click="showTransactionDetails(transaction)"
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
                <div class="font-medium capitalize">
                  {{ transaction.type }}
                  <span
                    v-if="transaction.coin_name"
                    class="text-gray-500 text-sm ml-2"
                  >
                    • {{ transaction.coin_name }}
                  </span>
                </div>
                <div class="text-sm text-gray-500">
                  {{ formatDate(transaction.createdAt) }}
                  <span
                    v-if="transaction.transaction_hash"
                    class="ml-2 font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded"
                  >
                    {{ shortenHash(transaction.transaction_hash) }}
                  </span>
                </div>
              </div>
            </div>
            <div class="text-right">
              <div
                :class="[
                  'font-medium',
                  getAmountColor(transaction.type, transaction.amount),
                ]"
              >
                {{ getAmountPrefix(transaction.type, transaction.amount) }}${{
                  formatNumber(Math.abs(transaction.amount))
                }}
              </div>
              <div :class="['text-sm', getStatusColor(transaction.status)]">
                {{ transaction.status }}
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div
          v-if="pagination.total_pages > 1"
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
              class="px-3 py-1 rounded border border-gray-300 dark:border-[#303030] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-[#303030]"
            >
              Previous
            </button>
            <span class="px-3 py-1 text-sm">
              Page {{ pagination.current_page }} of {{ pagination.total_pages }}
            </span>
            <button
              @click="changePage(pagination.current_page + 1)"
              :disabled="pagination.current_page === pagination.total_pages"
              class="px-3 py-1 rounded border border-gray-300 dark:border-[#303030] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-[#303030]"
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
definePageMeta({
  layout: "user",
});

const config = useRuntimeConfig();

// Reactive data
const transactions = ref([]);
const coins = ref([]);
const loading = ref(true);
const error = ref("");
const searchTerm = ref("");
const searchTimeout = ref(null);
const exportLoading = ref(false);

// Filters
const filters = ref({
  coin_id: "",
  type: "",
  status: "",
});

// Pagination
const pagination = ref({
  current_page: 1,
  total_pages: 1,
  total_items: 0,
  items_per_page: 20,
});

// Format numbers
const formatNumber = (num, precision = 2) => {
  if (num === 0) return "0." + "0".repeat(precision);
  if (num < 0.000001) return num.toExponential(4);
  if (num < 0.001) return num.toFixed(6);
  if (num < 1) return num.toFixed(precision);
  if (num < 1000) return num.toFixed(2);
  return num.toLocaleString("en-US", { maximumFractionDigits: precision });
};

// Format date for display
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Format date for export
const formatDateForExport = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Shorten hash for display
const shortenHash = (hash) => {
  if (!hash) return "";
  return hash.length > 16
    ? hash.substring(0, 8) + "..." + hash.substring(hash.length - 8)
    : hash;
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

// Get amount color
const getAmountColor = (type, amount) => {
  if (type === "deposit") return "text-green-600";
  if (type === "withdrawal") return "text-red-600";
  return amount >= 0 ? "text-green-600" : "text-red-600";
};

// Get amount prefix with dollar sign
const getAmountPrefix = (type, amount) => {
  if (type === "deposit") return "+";
  if (type === "withdrawal") return "-";
  return amount >= 0 ? "+" : "-";
};

// Get status color
const getStatusColor = (status) => {
  const colors = {
    Completed: "text-green-600",
    Approved: "text-green-600",
    Processing: "text-yellow-600",
    Pending: "text-yellow-600",
    Submitted: "text-blue-600",
    Cancelled: "text-red-600",
    Failed: "text-red-600",
  };
  return colors[status] || "text-gray-600";
};

// Computed properties
const activeFilters = computed(() => {
  return Object.fromEntries(
    Object.entries(filters.value).filter(([_, value]) => value !== "")
  );
});

const hasActiveFilters = computed(() => {
  return Object.keys(activeFilters.value).length > 0;
});

const filteredTransactions = computed(() => {
  if (!searchTerm.value) return transactions.value;

  const searchLower = searchTerm.value.toLowerCase();
  return transactions.value.filter(
    (transaction) =>
      transaction.type.toLowerCase().includes(searchLower) ||
      transaction.coin_name.toLowerCase().includes(searchLower) ||
      transaction.status.toLowerCase().includes(searchLower) ||
      (transaction.transaction_hash &&
        transaction.transaction_hash.toLowerCase().includes(searchLower)) ||
      transaction.amount.toString().includes(searchTerm.value)
  );
});

const getFilterLabel = (key, value) => {
  const labels = {
    coin_id: `Coin: ${
      coins.value.find((c) => c.coin_id == value)?.coin_name || value
    }`,
    type: `Type: ${value.charAt(0).toUpperCase() + value.slice(1)}`,
    status: `Status: ${value}`,
  };
  return labels[key] || `${key}: ${value}`;
};

// Export to CSV function
const exportToCSV = async () => {
  exportLoading.value = true;

  try {
    // Fetch all transactions for export (without pagination)
    const params = new URLSearchParams({
      limit: "1000", // Increased limit for export
      ...activeFilters.value,
    });

    const response = await $fetch(
      `${config.public.apiBase}/user/transactions.php?${params}`,
      {
        credentials: "include",
      }
    );

    if (response.success) {
      const exportData = response.data.transactions;

      // Create CSV content
      const headers = [
        "Date",
        "Type",
        "Coin",
        "Amount (USD)",
        "Status",
        "Transaction Hash",
      ];
      const csvContent = [
        headers.join(","),
        ...exportData.map((transaction) =>
          [
            `"${formatDateForExport(transaction.createdAt)}"`,
            `"${transaction.type}"`,
            `"${transaction.coin_name}"`,
            `"${getAmountPrefix(
              transaction.type,
              transaction.amount
            )}$${Math.abs(transaction.amount)}"`,
            `"${transaction.status}"`,
            `"${transaction.transaction_hash || ""}"`,
          ].join(",")
        ),
      ].join("\n");

      // Create and download CSV file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `transactions_${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show success message
      alert("CSV exported successfully!");
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    alert(
      "Failed to export CSV: " +
        (err?.data?.message || err?.message || "Unknown error")
    );
  } finally {
    exportLoading.value = false;
  }
};

// Export to PDF function
const exportToPDF = async () => {
  exportLoading.value = true;

  try {
    // Fetch all transactions for export
    const params = new URLSearchParams({
      limit: "1000",
      ...activeFilters.value,
    });

    const response = await $fetch(
      `${config.public.apiBase}/user/transactions.php?${params}`,
      {
        credentials: "include",
      }
    );

    if (response.success) {
      const exportData = response.data.transactions;

      // Create PDF content using jsPDF (you'll need to install jsPDF)
      // This is a simplified version - you might want to use a proper PDF library
      const pdfContent = `
        TRANSACTION HISTORY REPORT
        Generated on: ${new Date().toLocaleDateString()}
        Total Transactions: ${exportData.length}
        
        ${exportData
          .map(
            (transaction) => `
        Date: ${formatDateForExport(transaction.createdAt)}
        Type: ${transaction.type}
        Coin: ${transaction.coin_name}
        Amount: ${getAmountPrefix(
          transaction.type,
          transaction.amount
        )}$${Math.abs(transaction.amount)}
        Status: ${transaction.status}
        Hash: ${transaction.transaction_hash || "N/A"}
        ${"-".repeat(50)}
        `
          )
          .join("")}
      `;

      // Create and download text file as simple PDF alternative
      const blob = new Blob([pdfContent], {
        type: "text/plain;charset=utf-8;",
      });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `transactions_${new Date().toISOString().split("T")[0]}.txt`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert("PDF exported successfully! (as text file)");
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    alert(
      "Failed to export PDF: " +
        (err?.data?.message || err?.message || "Unknown error")
    );
  } finally {
    exportLoading.value = false;
  }
};

// Methods
const handleSearch = () => {
  clearTimeout(searchTimeout.value);
  searchTimeout.value = setTimeout(() => {
    pagination.value.current_page = 1;
    fetchTransactions();
  }, 500);
};

const removeFilter = (filterKey) => {
  filters.value[filterKey] = "";
  pagination.value.current_page = 1;
  fetchTransactions();
};

const clearFilters = () => {
  filters.value = {
    coin_id: "",
    type: "",
    status: "",
  };
  searchTerm.value = "";
  pagination.value.current_page = 1;
  fetchTransactions();
};

const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.total_pages) {
    pagination.value.current_page = page;
    fetchTransactions();
  }
};

const showTransactionDetails = (transaction) => {
  // You can implement a modal or detail page here
  // console.log("Transaction details:", transaction);
};

// Fetch user's coins for filter
const fetchUserCoins = async () => {
  try {
    const response = await $fetch(
      `${config.public.apiBase}/user/user-coins.php?limit=100`,
      {
        credentials: "include",
      }
    );

    if (response.success) {
      coins.value = response.data.coins;
    }
  } catch (err) {
    console.error("Failed to fetch coins:", err);
  }
};

// Fetch transactions from API
const fetchTransactions = async () => {
  loading.value = true;
  error.value = "";

  try {
    const params = new URLSearchParams({
      page: pagination.value.current_page.toString(),
      limit: pagination.value.items_per_page.toString(),
      ...activeFilters.value,
    });

    const response = await $fetch(
      `${config.public.apiBase}/user/transactions.php?${params}`,
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
    error.value =
      err?.data?.message || err?.message || "Failed to load transactions";
    transactions.value = [];
  } finally {
    loading.value = false;
  }
};

// Initialize
onMounted(() => {
  fetchUserCoins();
  fetchTransactions();
});

onBeforeUnmount(() => {
  clearTimeout(searchTimeout.value);
});
</script>
