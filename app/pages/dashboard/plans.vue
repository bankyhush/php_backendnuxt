<template>
  <div class="min-h-screen bg-gray-50 dark:bg-[#171717] p-6 mt-7 mb-20">
    <div class="w-full max-w-6xl mx-auto">
      <!-- Header and Search -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Trading Plans
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Choose from our carefully crafted investment plans
        </p>

        <!-- Search and Filter Section -->
        <div class="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-lg p-6 mb-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- Search Input -->
            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Search Plans
              </label>
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Search by plan name..."
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                @input="handleSearch"
              />
            </div>

            <!-- Min Amount Filter -->
            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Min Investment
              </label>
              <input
                type="number"
                v-model="minAmount"
                placeholder="Min amount"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                @input="handleSearch"
              />
            </div>

            <!-- Max Amount Filter -->
            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Max Investment
              </label>
              <input
                type="number"
                v-model="maxAmount"
                placeholder="Max amount"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                @input="handleSearch"
              />
            </div>

            <!-- Reset Filters -->
            <div class="flex items-end">
              <button
                @click="resetFilters"
                class="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid gap-6 grid-cols-1 lg:grid-cols-4">
        <div
          v-for="n in 4"
          :key="n"
          class="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-lg p-6 animate-pulse"
        >
          <div class="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
          <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
          <div class="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
          <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
          <div class="space-y-2">
            <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          <div class="h-10 bg-gray-300 dark:bg-gray-600 rounded mt-6"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <Icon
          name="lucide:alert-circle"
          class="w-16 h-16 text-red-500 mx-auto mb-4"
        />
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Error Loading Plans
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Please try refreshing the page, or come back later. If the problem
          persists, contact our support team.
        </p>
        <button
          @click="fetchPlans"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>

      <!-- No Results -->
      <div v-else-if="plans.length === 0" class="text-center py-12">
        <Icon
          name="lucide:search"
          class="w-16 h-16 text-gray-400 mx-auto mb-4"
        />
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No Plans Found
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          No trading plans match your search criteria.
        </p>
      </div>

      <!-- Plans Grid -->
      <div v-else class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="plan in plans"
          :key="plan.id"
          class="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-lg p-6 flex flex-col text-center hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <!-- Title -->
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {{ plan.plan_name }}
          </h3>
          <p class="text-gray-500 text-sm mb-4">
            Total {{ plan.total_return_percentage }}% ROI
          </p>

          <!-- Description -->
          <p class="text-gray-600 dark:text-gray-400 text-xs mb-4 flex-1">
            {{ plan.plan_des }}
          </p>

          <!-- Percentage -->
          <div class="text-blue-600 text-3xl font-bold mb-2">
            {{ plan.daily_interest_rate }}%
          </div>
          <p class="text-gray-500 text-sm mb-4">
            Daily for {{ plan.days_duration }} Days
          </p>

          <!-- Details -->
          <div
            class="text-sm text-gray-700 dark:text-gray-300 space-y-2 flex-1"
          >
            <div class="flex justify-between">
              <span>Investment Range</span>
              <span class="font-medium">{{ plan.investment_range }}</span>
            </div>
            <div class="flex justify-between">
              <span>Duration</span>
              <span class="font-medium">{{ plan.days_duration }} days</span>
            </div>
            <div class="flex justify-between">
              <span>Total Return</span>
              <span class="font-medium text-green-600"
                >{{ plan.total_return_percentage }}%</span
              >
            </div>
            <div v-if="plan.max_ins > 0" class="flex justify-between">
              <span>Max Potential</span>
              <span class="font-medium">{{ plan.max_earn }}</span>
            </div>
          </div>

          <!-- Invest Button -->
          <button
            @click="openInvestModal(plan)"
            class="cursor-pointer mt-6 bg-[#202020] text-white dark:bg-white dark:text-black font-medium py-3 rounded-xl hover:bg-zinc-700 transition-colors w-full"
          >
            Invest Now
          </button>
        </div>
      </div>

      <!-- Invest Modal -->
      <div
        v-if="showInvestModal"
        class="fixed inset-0 bg-[#ffffffc9] dark:bg-[#202020be] bg-opacity-100 flex items-center justify-center z-50 p-4"
      >
        <div class="bg-white dark:bg-[#1e1e1e] rounded-2xl p-6 w-full max-w-md">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Invest in {{ selectedPlan?.plan_name }}
            </h3>
            <button
              @click="closeInvestModal"
              class="cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Icon name="lucide:x" class="w-5 h-5" />
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Investment Amount ($)
              </label>
              <input
                type="number"
                v-model="investmentAmount"
                :min="selectedPlan?.min_ins"
                :max="
                  selectedPlan?.max_ins > 0 ? selectedPlan.max_ins : undefined
                "
                :placeholder="`Min: $${selectedPlan?.min_ins}`"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                :disabled="isInvesting"
              />
              <p class="text-xs text-gray-500 mt-1">
                Enter amount between ${{ selectedPlan?.min_ins }}
                {{
                  selectedPlan?.max_ins > 0
                    ? `and $${selectedPlan.max_ins}`
                    : "and above"
                }}
              </p>
            </div>

            <!-- Investment Summary -->
            <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 class="font-medium text-blue-900 dark:text-blue-100 mb-2">
                Investment Summary
              </h4>
              <div class="text-sm space-y-2">
                <div class="flex justify-between">
                  <span>Daily Interest:</span>
                  <span class="font-medium"
                    >{{ selectedPlan?.daily_interest_rate }}%</span
                  >
                </div>
                <div class="flex justify-between">
                  <span>Duration:</span>
                  <span class="font-medium"
                    >{{ selectedPlan?.days_duration }} days</span
                  >
                </div>
                <div class="flex justify-between">
                  <span>Total Return:</span>
                  <span class="font-medium text-green-600"
                    >{{ selectedPlan?.total_return_percentage }}%</span
                  >
                </div>
                <div
                  v-if="
                    investmentAmount &&
                    investmentAmount >= selectedPlan?.min_ins
                  "
                  class="pt-2 border-t border-blue-200 dark:border-blue-700"
                >
                  <div class="flex justify-between text-sm">
                    <span>Expected Daily Profit:</span>
                    <span class="font-medium text-green-600">
                      ${{
                        (
                          (investmentAmount *
                            selectedPlan.daily_interest_rate) /
                          100
                        ).toFixed(2)
                      }}
                    </span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span>Total Expected Profit:</span>
                    <span class="font-medium text-green-600">
                      ${{
                        (
                          (investmentAmount *
                            selectedPlan.total_return_percentage) /
                          100
                        ).toFixed(2)
                      }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Error Message -->
            <div
              v-if="investError"
              class="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg text-sm"
            >
              {{ investError }}
            </div>

            <!-- Success Message -->
            <div
              v-if="investSuccess"
              class="p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg text-sm"
            >
              {{ investSuccess }}
            </div>

            <div class="flex gap-3 pt-4">
              <button
                @click="closeInvestModal"
                :disabled="isInvesting"
                class="cursor-pointer flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                @click="handleInvest"
                :disabled="!isFormValid || isInvesting"
                :class="[
                  'cursor-pointer flex-1 px-4 py-2 rounded-lg transition-colors font-medium',
                  isFormValid && !isInvesting
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed',
                ]"
              >
                <div class="flex items-center justify-center">
                  <Icon
                    v-if="isInvesting"
                    name="lucide:loader-2"
                    class="animate-spin w-4 h-4 mr-2"
                  />
                  {{ isInvesting ? "Processing..." : "Confirm Invest" }}
                </div>
              </button>
            </div>
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
const plans = ref([]);
const loading = ref(true);
const error = ref("");
const searchQuery = ref("");
const minAmount = ref("");
const maxAmount = ref("");
const showInvestModal = ref(false);
const selectedPlan = ref(null);
const investmentAmount = ref("");
const isInvesting = ref(false);
const investError = ref("");
const investSuccess = ref("");

// Computed properties
const isFormValid = computed(() => {
  return (
    selectedPlan.value &&
    investmentAmount.value &&
    parseFloat(investmentAmount.value) >= selectedPlan.value.min_ins &&
    (selectedPlan.value.max_ins === 0 ||
      parseFloat(investmentAmount.value) <= selectedPlan.value.max_ins)
  );
});

// Debounced search function
let searchTimeout = null;
const handleSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    fetchPlans();
  }, 500);
};

// Reset filters
const resetFilters = () => {
  searchQuery.value = "";
  minAmount.value = "";
  maxAmount.value = "";
  fetchPlans();
};

// Fetch plans from API
const fetchPlans = async () => {
  loading.value = true;
  error.value = "";

  try {
    const params = new URLSearchParams();
    if (searchQuery.value) params.append("search", searchQuery.value);
    if (minAmount.value) params.append("min_amount", minAmount.value);
    if (maxAmount.value) params.append("max_amount", maxAmount.value);

    const response = await $fetch(
      `${config.public.apiBase}/user/plans-all.php?${params.toString()}`,
      {
        credentials: "include",
      }
    );

    if (response.success) {
      plans.value = response.data;
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    console.error("Fetch error:", err);
    error.value = err?.data?.message || err?.message || "Failed to load plans";
  } finally {
    loading.value = false;
  }
};

// Invest modal functions
const openInvestModal = (plan) => {
  selectedPlan.value = plan;
  investmentAmount.value = plan.min_ins;
  investError.value = "";
  investSuccess.value = "";
  showInvestModal.value = true;
};

const closeInvestModal = () => {
  showInvestModal.value = false;
  selectedPlan.value = null;
  investmentAmount.value = "";
  investError.value = "";
  investSuccess.value = "";
  isInvesting.value = false;
};

const handleInvest = async () => {
  if (!isFormValid.value) return;

  isInvesting.value = true;
  investError.value = "";
  investSuccess.value = "";

  try {
    // Validate amount
    const amount = parseFloat(investmentAmount.value);

    if (amount < selectedPlan.value.min_ins) {
      throw new Error(
        `Minimum investment amount is $${selectedPlan.value.min_ins}`
      );
    }

    if (selectedPlan.value.max_ins > 0 && amount > selectedPlan.value.max_ins) {
      throw new Error(
        `Maximum investment amount is $${selectedPlan.value.max_ins}`
      );
    }

    console.log("Creating investment:", {
      plan_id: selectedPlan.value.id,
      amount: amount,
    });

    // Call the investment API
    const response = await $fetch(`${config.public.apiBase}/user/invest.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan_id: selectedPlan.value.id,
        amount: amount,
      }),
      credentials: "include",
    });

    //console.log("Raw investment response:", response);

    // Check if response is valid JSON and has success property
    if (response && typeof response === "object" && response.success === true) {
      // Show success message
      investSuccess.value = `You have successfully invested $${amount} in ${selectedPlan.value.plan_name}`;

      // Wait a bit before closing to show success message
      setTimeout(() => {
        closeInvestModal();
        // Refresh plans data to update any balances
        fetchPlans();
      }, 2000);
    } else {
      // Handle case where response might be corrupted or not proper JSON
      const errorMessage =
        response?.message ||
        "Investment completed but response format was invalid";
      throw new Error(errorMessage);
    }
  } catch (err) {
    console.error("Investment error details:", {
      message: err.message,
      data: err.data,
      status: err.status,
    });

    // Check if it's a successful investment with corrupted response
    if (
      err.data &&
      typeof err.data === "string" &&
      err.data.includes("success")
    ) {
      // This might be a successful investment with warning text
      investSuccess.value = `Investment completed successfully!`;
      setTimeout(() => {
        closeInvestModal();
        fetchPlans();
      }, 2000);
    } else {
      investError.value =
        err?.data?.message || err?.message || "Failed to process investment";
    }
  } finally {
    isInvesting.value = false;
  }
};

// Initialize
onMounted(() => {
  fetchPlans();
});
</script>
