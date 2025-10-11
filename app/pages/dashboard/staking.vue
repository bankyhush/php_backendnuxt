<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4">Staking Plans</h1>

    <!-- Success/Error Messages -->
    <div
      v-if="stakeSuccess"
      class="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg"
    >
      {{ stakeSuccess }}
    </div>

    <!-- <div
      v-if="stakeError"
      class="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg"
    >
      {{ stakeError }}
    </div> -->

    <!-- Loading State -->
    <div v-if="loading" class="mb-4">
      <div class="animate-pulse">
        <div class="h-10 bg-gray-200 dark:bg-zinc-800 rounded mb-4 w-1/3"></div>
        <div
          v-for="n in 3"
          :key="n"
          class="h-16 bg-gray-200 dark:bg-zinc-800 rounded mb-2"
        ></div>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg"
    >
      Please try refreshing the page, or come back later. If the problem
      persists, contact our support team.
      <button
        @click="fetchStakingPlans"
        class="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Try Again
      </button>
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Search input -->
      <div class="mb-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name or coin..."
          class="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#202020] dark:text-white dark:border-gray-600"
        />
      </div>

      <!-- No Results -->
      <div v-if="filteredPlans.length === 0" class="text-center py-8">
        <Icon
          name="lucide:search"
          class="w-12 h-12 text-gray-400 mx-auto mb-4"
        />
        <p class="text-gray-500 dark:text-gray-400">
          No staking plans found matching your search.
        </p>
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table
          class="min-w-full bg-white dark:bg-[#202020] shadow-md rounded-lg overflow-hidden"
        >
          <thead
            class="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            <tr>
              <th class="px-6 py-3 text-left text-sm font-medium">Name</th>
              <th class="px-6 py-3 text-left text-sm font-medium">Coin</th>
              <th class="px-6 py-3 text-left text-sm font-medium">APY</th>
              <th class="px-6 py-3 text-left text-sm font-medium">
                Lock Period
              </th>
              <th class="px-6 py-3 text-left text-sm font-medium">
                Minimum Amount
              </th>
              <th class="px-6 py-3 text-left text-sm font-medium">Type</th>
              <th class="px-6 py-3 text-left text-sm font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="plan in filteredPlans"
              :key="plan.id"
              class="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
                <div class="flex items-center space-x-3">
                  <img
                    :src="plan.coin_photo || '/stake/'"
                    :alt="plan.coin"
                    class="w-8 h-8 rounded-full object-cover"
                    @error="handleImageError"
                  />
                  <span>{{ plan.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
                <div class="flex items-center space-x-2">
                  <span>{{ plan.coin }}</span>
                  <span v-if="plan.coin_name" class="text-xs text-gray-500">
                    ({{ plan.coin_name }})
                  </span>
                </div>
              </td>
              <td
                class="px-6 py-4 text-sm text-green-600 dark:text-green-400 font-semibold"
              >
                {{ plan.percent }}%
              </td>
              <td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
                {{ plan.lock_period }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
                ${{ plan.min_amount.toLocaleString() }}
                <span
                  v-if="plan.max_amount"
                  class="text-xs text-gray-500 block"
                >
                  Max: ${{ plan.max_amount.toLocaleString() }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm">
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    plan.type === 'Locked'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
                  ]"
                >
                  {{ plan.type }}
                </span>
              </td>
              <td class="px-6 py-4">
                <button
                  @click="openStakeModal(plan)"
                  class="cursor-pointer whitespace-nowrap px-4 py-2 bg-black text-white rounded-md hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-500 transition"
                >
                  Stake Now
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Total Count -->
      <div class="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Showing {{ filteredPlans.length }} of {{ plans.length }} staking plans
      </div>
    </div>

    <!-- Stake Modal -->
    <div
      v-if="showStakeModal"
      class="fixed inset-0 bg-[#ffffff92] bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-white dark:bg-[#202020] rounded-lg shadow-xl w-full max-w-2xl"
      >
        <form @submit.prevent="confirmStake">
          <!-- Hidden fields -->
          <input type="hidden" name="plan_id" :value="selectedPlan?.id" />
          <input type="hidden" name="title" :value="selectedPlan?.name" />
          <input type="hidden" name="apy" :value="selectedPlan?.percent" />
          <input
            type="hidden"
            name="lock_period"
            :value="selectedPlan?.lock_period"
          />

          <!-- Modal Header -->
          <div
            class="py-4 px-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-[#202020] mb-10"
          >
            <h5 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ selectedPlan?.name }}
            </h5>
            <button
              type="button"
              @click="closeStakeModal"
              class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Icon name="lucide:x" class="w-6 h-6" />
            </button>
          </div>

          <!-- Success/Error Messages -->
          <div
            v-if="stakeSuccess"
            class="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
          >
            {{ stakeSuccess }}
          </div>

          <div
            v-if="stakeError"
            class="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
          >
            {{ stakeError }}
          </div>

          <!-- Modal Body -->
          <div class="p-6 overflow-y-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Left Column -->
              <div>
                <div class="mb-4">
                  <label
                    class="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300"
                    >Type</label
                  >
                  <input
                    type="text"
                    :value="selectedPlan?.type"
                    disabled
                    class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 dark:bg-[#2a2a2a] dark:text-white dark:border-gray-600"
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300"
                    >Duration</label
                  >
                  <div
                    class="inline-block px-4 py-2 bg-gray-100 dark:bg-[#2a2a2a] rounded-md text-gray-900 dark:text-white"
                  >
                    {{ selectedPlan?.lock_period }}
                  </div>
                </div>
              </div>

              <!-- Right Column -->
              <div>
                <ul
                  class="mb-4 space-y-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  <li class="flex justify-between">
                    <span>Minimum Locked Amount</span>
                    <span class="font-medium"
                      >${{ selectedPlan?.min_amount.toLocaleString() }}</span
                    >
                  </li>
                  <li class="flex justify-between">
                    <span>Annual Yield Percentage</span>
                    <span class="font-medium"
                      >{{ selectedPlan?.percent }}%</span
                    >
                  </li>
                  <li
                    v-if="selectedPlan?.max_amount"
                    class="flex justify-between"
                  >
                    <span>Maximum Amount</span>
                    <span class="font-medium"
                      >${{ selectedPlan?.max_amount.toLocaleString() }}</span
                    >
                  </li>
                </ul>

                <div class="mb-4">
                  <label
                    class="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300"
                    >Select Coin</label
                  >
                  <select
                    v-model="stakeData.coin_id"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-[#2a2a2a] dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a coin</option>
                    <option
                      v-for="coin in availableCoins"
                      :key="coin.coin_id"
                      :value="coin.coin_id"
                    >
                      {{ coin.coin_name }}
                    </option>
                  </select>
                </div>

                <div class="relative">
                  <label
                    class="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300"
                    >Amount (USD)</label
                  >
                  <input
                    type="number"
                    v-model="stakeData.amount"
                    :min="selectedPlan?.min_amount"
                    :max="selectedPlan?.max_amount || ''"
                    placeholder="Enter amount"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-[#2a2a2a] dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-16"
                  />
                  <span
                    class="absolute right-3 top-9 text-sm font-medium text-gray-500"
                    >USD</span
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div
            class="py-4 px-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-4 bg-gray-50 dark:bg-[#1a1a1a]"
          >
            <button
              type="button"
              @click="closeStakeModal"
              class="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isStaking"
              class="cursor-pointer px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center"
            >
              <Icon
                v-if="isStaking"
                name="lucide:loader-2"
                class="animate-spin w-4 h-4 mr-2"
              />
              {{ isStaking ? "Processing..." : "Confirm Stake" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "user",
});

import { onMounted, ref, computed } from "vue";

const config = useRuntimeConfig();

// Reactive data
const plans = ref([]);
const availableCoins = ref([]);
const loading = ref(true);
const error = ref("");
const searchQuery = ref("");
const showStakeModal = ref(false);
const selectedPlan = ref(null);
const isStaking = ref(false);
const stakeError = ref("");
const stakeSuccess = ref("");

// Stake form data
const stakeData = ref({
  coin_id: "",
  amount: "",
});

// Filter plans based on search
const filteredPlans = computed(() => {
  if (!searchQuery.value) return plans.value;

  const q = searchQuery.value.toLowerCase();
  return plans.value.filter(
    (plan) =>
      plan.name.toLowerCase().includes(q) ||
      plan.coin.toLowerCase().includes(q) ||
      (plan.coin_name && plan.coin_name.toLowerCase().includes(q))
  );
});

// Handle image errors
const handleImageError = (event) => {
  event.target.src = "/stake/default.png";
};

// Fetch staking plans from API
const fetchStakingPlans = async () => {
  loading.value = true;
  error.value = "";

  try {
    const response = await $fetch(
      `${config.public.apiBase}/user/staking-plans.php`,
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
    error.value =
      err?.data?.message || err?.message || "Failed to load staking plans";
  } finally {
    loading.value = false;
  }
};

// Fetch available coins
const fetchAvailableCoins = async () => {
  try {
    const response = await $fetch(
      `${config.public.apiBase}/user/staking-coins.php`,
      {
        credentials: "include",
      }
    );

    if (response.success) {
      availableCoins.value = response.data;
    }
  } catch (err) {
    console.error("Failed to fetch coins:", err);
  }
};

// Open stake modal
const openStakeModal = (plan) => {
  selectedPlan.value = plan;
  stakeData.value = {
    coin_id: "",
    amount: plan.min_amount,
  };
  stakeError.value = "";
  stakeSuccess.value = "";
  showStakeModal.value = true;
};

// Close stake modal
const closeStakeModal = () => {
  showStakeModal.value = false;
  selectedPlan.value = null;
  stakeData.value = {
    coin_id: "",
    amount: "",
  };
  isStaking.value = false;
};

// Confirm stake
const confirmStake = async () => {
  if (!selectedPlan.value) return;

  isStaking.value = true;
  stakeError.value = "";
  stakeSuccess.value = "";

  try {
    const response = await $fetch(
      `${config.public.apiBase}/user/stake-now.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          plan_id: selectedPlan.value.id,
          coin_id: stakeData.value.coin_id,
          amount: parseFloat(stakeData.value.amount),
          title: selectedPlan.value.name,
          apy: selectedPlan.value.percent,
          lock_period: selectedPlan.value.lock_period.replace(" days", ""),
        },
        credentials: "include",
      }
    );

    if (response.success) {
      stakeSuccess.value = `Successfully staked $${stakeData.value.amount} in ${selectedPlan.value.name}!`;

      // Close modal and refresh data
      closeStakeModal();
      await fetchStakingPlans();

      // Clear success message after 5 seconds
      setTimeout(() => {
        stakeSuccess.value = "";
      }, 5000);
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    stakeError.value =
      err?.data?.message || err?.message || "Failed to process stake";

    // Clear error after 5 seconds
    setTimeout(() => {
      stakeError.value = "";
    }, 5000);
  } finally {
    isStaking.value = false;
  }
};

// Initialize
onMounted(() => {
  fetchStakingPlans();
  fetchAvailableCoins();
});
</script>

<style scoped>
/* Optional: Customize scrollbar on mobile */
::-webkit-scrollbar {
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 6px;
}
</style>
