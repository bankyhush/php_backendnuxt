<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-[#171717a8] bg-opacity-50 z-50 flex items-center justify-center p-4"
  >
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-auto"
    >
      <div
        class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
      >
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          Investment History - {{ user?.fullname }}
        </h3>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <Icon name="mdi:close" class="w-6 h-6" />
        </button>
      </div>

      <div class="p-6 overflow-auto max-h-[70vh]">
        <!-- Tabs -->
        <div class="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav class="-mb-px flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
              ]"
            >
              {{ tab.name }}
              <span
                class="ml-2 py-0.5 px-2 text-xs rounded-full"
                :class="
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                "
              >
                {{ getHistoryCount(tab.id) }}
              </span>
            </button>
          </nav>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-8">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"
          ></div>
          <p class="text-gray-500 dark:text-gray-400 mt-2">
            Loading history...
          </p>
        </div>

        <!-- Stake History -->
        <div v-else-if="activeTab === 'stakes'">
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
            <table
              class="min-w-full divide-y divide-gray-200 dark:divide-gray-600"
            >
              <thead class="bg-gray-100 dark:bg-gray-600">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Plan
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    APY
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Lock Period
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Start Date
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody
                class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
              >
                <tr v-for="stake in stakeHistory" :key="stake.id">
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                  >
                    {{ stake.title || "N/A" }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                  >
                    {{ formatNumber(stake.amount) }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                  >
                    {{ stake.apy ? stake.apy + "%" : "N/A" }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                  >
                    {{ stake.lock_period || "N/A" }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                  >
                    {{ formatDate(stake.start_date) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      :class="[
                        'px-2 py-1 text-xs font-medium rounded-full',
                        getStakeStatusClass(stake.status),
                      ]"
                    >
                      {{ stake.status || "N/A" }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      @click="openDeleteStakeModal(stake)"
                      class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                <tr v-if="!stakeHistory.length">
                  <td
                    colspan="7"
                    class="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                  >
                    No stake history found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Investment History -->
        <div v-else-if="activeTab === 'investments'">
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
            <table
              class="min-w-full divide-y divide-gray-200 dark:divide-gray-600"
            >
              <thead class="bg-gray-100 dark:bg-gray-600">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Plan
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Daily Interest
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Total Profit
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Start Date
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    End Date
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody
                class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
              >
                <tr
                  v-for="investment in investmentHistory"
                  :key="investment.id"
                >
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                  >
                    {{ investment.plan_id || "N/A" }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                  >
                    {{ formatNumber(investment.amount) }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                  >
                    {{ formatNumber(investment.daily_interest) }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                  >
                    {{ formatNumber(investment.total_profit) }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                  >
                    {{ formatDate(investment.start_date) }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                  >
                    {{ formatDate(investment.end_date) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      :class="[
                        'px-2 py-1 text-xs font-medium rounded-full',
                        getInvestmentStatusClass(investment.status),
                      ]"
                    >
                      {{ investment.status || "N/A" }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      @click="openDeleteInvestmentModal(investment)"
                      class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                <tr v-if="!investmentHistory.length">
                  <td
                    colspan="8"
                    class="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                  >
                    No investment history found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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

    <!-- Delete Stake Confirmation Modal -->
    <div
      v-if="showDeleteStakeModal"
      class="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full"
      >
        <div
          class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Delete Stake Record
          </h3>
          <button
            @click="showDeleteStakeModal = false"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <Icon name="mdi:close" class="w-6 h-6" />
          </button>
        </div>

        <div class="p-6">
          <div class="text-center">
            <Icon
              name="mdi:alert-circle-outline"
              class="w-12 h-12 text-red-500 mx-auto mb-4"
            />
            <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Confirm Deletion
            </h4>
            <p class="text-gray-500 dark:text-gray-400 mb-6">
              Are you sure you want to delete this stake record?<br />
              <strong>Plan: {{ deleteStakeForm.title }}</strong
              ><br />
              <strong>Amount: {{ formatNumber(deleteStakeForm.amount) }}</strong
              ><br />
              <strong>Status: {{ deleteStakeForm.status }}</strong>
            </p>
            <p class="text-sm text-red-500 dark:text-red-400 mb-4">
              This action cannot be undone.
            </p>
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="showDeleteStakeModal = false"
              class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="deleteStake"
              :disabled="deleting"
              :class="[
                'flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors',
                deleting ? 'opacity-50 cursor-not-allowed' : '',
              ]"
            >
              {{ deleting ? "Deleting..." : "Delete Stake" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Investment Confirmation Modal -->
    <div
      v-if="showDeleteInvestmentModal"
      class="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full"
      >
        <div
          class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Delete Investment Record
          </h3>
          <button
            @click="showDeleteInvestmentModal = false"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <Icon name="mdi:close" class="w-6 h-6" />
          </button>
        </div>

        <div class="p-6">
          <div class="text-center">
            <Icon
              name="mdi:alert-circle-outline"
              class="w-12 h-12 text-red-500 mx-auto mb-4"
            />
            <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Confirm Deletion
            </h4>
            <p class="text-gray-500 dark:text-gray-400 mb-6">
              Are you sure you want to delete this investment record?<br />
              <strong
                >Amount: {{ formatNumber(deleteInvestmentForm.amount) }}</strong
              ><br />
              <strong
                >Total Profit:
                {{ formatNumber(deleteInvestmentForm.total_profit) }}</strong
              ><br />
              <strong>Status: {{ deleteInvestmentForm.status }}</strong>
            </p>
            <p class="text-sm text-red-500 dark:text-red-400 mb-4">
              This action cannot be undone.
            </p>
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="showDeleteInvestmentModal = false"
              class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="deleteInvestment"
              :disabled="deleting"
              :class="[
                'flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors',
                deleting ? 'opacity-50 cursor-not-allowed' : '',
              ]"
            >
              {{ deleting ? "Deleting..." : "Delete Investment" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  user: Object,
});

const emit = defineEmits(["close", "success"]);

const config = useRuntimeConfig();
const loading = ref(false);
const deleting = ref(false);
const activeTab = ref("stakes");
const showDeleteStakeModal = ref(false);
const showDeleteInvestmentModal = ref(false);

const tabs = [
  { id: "stakes", name: "Stake History" },
  { id: "investments", name: "Investment History" },
];

const stakeHistory = ref([]);
const investmentHistory = ref([]);
const deleteStakeForm = ref({
  id: null,
  title: "",
  amount: "",
  status: "",
});
const deleteInvestmentForm = ref({
  id: null,
  amount: "",
  total_profit: "",
  status: "",
});

// Fetch history when modal opens
watch(
  () => props.show,
  async (isOpen) => {
    if (isOpen && props.user) {
      await fetchHistory();
    }
  }
);

const fetchHistory = async () => {
  loading.value = true;
  try {
    await Promise.all([fetchStakeHistory(), fetchInvestmentHistory()]);
  } catch (error) {
    console.error("Failed to fetch history:", error);
  }
  loading.value = false;
};

const fetchStakeHistory = async () => {
  try {
    const response = await $fetch(
      `${config.public.apiBase}/admin/get-user-stakes.php?id=${props.user.id}`,
      { credentials: "include" }
    );

    if (response.success) {
      stakeHistory.value = response.stakes;
    } else {
      stakeHistory.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch stake history:", error);
    stakeHistory.value = [];
  }
};

const fetchInvestmentHistory = async () => {
  try {
    const response = await $fetch(
      `${config.public.apiBase}/admin/get-user-investments.php?id=${props.user.id}`,
      { credentials: "include" }
    );

    if (response.success) {
      investmentHistory.value = response.investments;
    } else {
      investmentHistory.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch investment history:", error);
    investmentHistory.value = [];
  }
};

const openDeleteStakeModal = (stake) => {
  deleteStakeForm.value = {
    id: stake.id,
    title: stake.title,
    amount: stake.amount,
    status: stake.status,
  };
  showDeleteStakeModal.value = true;
};

const openDeleteInvestmentModal = (investment) => {
  deleteInvestmentForm.value = {
    id: investment.id,
    amount: investment.amount,
    total_profit: investment.total_profit,
    status: investment.status,
  };
  showDeleteInvestmentModal.value = true;
};

const deleteStake = async () => {
  deleting.value = true;
  try {
    const response = await $fetch(
      `${config.public.apiBase}/admin/delete-stake.php`,
      {
        method: "POST",
        body: { id: deleteStakeForm.value.id },
        credentials: "include",
      }
    );

    if (response.success) {
      await fetchStakeHistory();
      showDeleteStakeModal.value = false;
      emit("success");
    }
  } catch (error) {
    console.error("Failed to delete stake:", error);
  }
  deleting.value = false;
};

const deleteInvestment = async () => {
  deleting.value = true;
  try {
    const response = await $fetch(
      `${config.public.apiBase}/admin/delete-investment.php`,
      {
        method: "POST",
        body: { id: deleteInvestmentForm.value.id },
        credentials: "include",
      }
    );

    if (response.success) {
      await fetchInvestmentHistory();
      showDeleteInvestmentModal.value = false;
      emit("success");
    }
  } catch (error) {
    console.error("Failed to delete investment:", error);
  }
  deleting.value = false;
};

// Helper functions
const getHistoryCount = (tabId) => {
  switch (tabId) {
    case "stakes":
      return stakeHistory.value.length;
    case "investments":
      return investmentHistory.value.length;
    default:
      return 0;
  }
};

const formatNumber = (num, precision = 6) => {
  if (!num) return "0." + "0".repeat(precision);
  if (num < 0.000001) return num.toExponential(4);
  if (num < 0.001) return num.toFixed(6);
  if (num < 1) return num.toFixed(precision);
  return num.toLocaleString("en-US", { maximumFractionDigits: precision });
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString();
};

const getStakeStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case "active":
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "cancelled":
    case "failed":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
};

const getInvestmentStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case "active":
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "cancelled":
    case "failed":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
};
</script>
