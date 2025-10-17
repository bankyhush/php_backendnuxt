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
          Manage Trade Records - {{ user?.fullname }}
        </h3>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <Icon name="mdi:close" class="w-6 h-6" />
        </button>
      </div>

      <div class="p-6 overflow-auto max-h-[70vh]">
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-8">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"
          ></div>
          <p class="text-gray-500 dark:text-gray-400 mt-2">
            Loading trade records...
          </p>
        </div>

        <!-- Trade Records Table -->
        <div
          v-else
          class="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-x-scroll"
        >
          <table
            class="min-w-full divide-y divide-gray-200 dark:divide-gray-600"
          >
            <thead class="bg-gray-100 dark:bg-gray-600">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Coin
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  volume
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Signal
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Result
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
              <tr v-for="trade in trades" :key="trade.id">
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                >
                  {{ formatDate(trade.created_at) }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                >
                  {{ trade.coin_name || "N/A" }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                >
                  {{ formatNumber(trade.volume) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      getTradeTypeClass(trade.type),
                    ]"
                  >
                    {{ trade.type }}
                  </span>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                >
                  {{ trade.trade_signal || "N/A" }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      getStatusClass(trade.status),
                    ]"
                  >
                    {{ trade.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      getResultClass(trade.trade_result),
                    ]"
                  >
                    {{ trade.trade_result || "Pending" }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    @click="openEditModal(trade)"
                    class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    @click="openDeleteModal(trade)"
                    class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr v-if="!trades.length">
                <td
                  colspan="8"
                  class="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  No trade records found
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

    <!-- Edit Trade Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-[#12bb2eb6] bg-opacity-50 z-[60] flex items-center justify-center p-4"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div
          class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Edit Trade Record
          </h3>
          <button
            @click="showEditModal = false"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <Icon name="mdi:close" class="w-6 h-6" />
          </button>
        </div>

        <form @submit.prevent="updateTrade" class="p-6 space-y-4">
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Trade Type
            </label>
            <select
              v-model="editForm.type"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            >
              <option value="">Select Type</option>
              <option value="LONG">LONG</option>
              <option value="SHORT">SHORT</option>
              <option value="BUY">BUY</option>
              <option value="SELL">SELL</option>
            </select>
          </div>

          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Coin Name
            </label>
            <input
              v-model="editForm.symbol"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Coin ID
            </label>
            <input
              v-model="editForm.coin_id"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              readonly
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              volume
            </label>
            <input
              v-model="editForm.volume"
              type="number"
              step="0.000001"
              min="0"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Trade Signal
            </label>
            <input
              v-model="editForm.trade_signal"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter trade signal"
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              BGAT
            </label>
            <input
              v-model="editForm.bgat"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="BGAT value"
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              SDAT
            </label>
            <input
              v-model="editForm.sdat"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="SDAT value"
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              MDAT
            </label>
            <input
              v-model="editForm.mdat"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="MDAT value"
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Status
            </label>
            <select
              v-model="editForm.status"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Trade Result
            </label>
            <select
              v-model="editForm.trade_result"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            >
              <option value="">Select Result</option>
              <option value="WON">WON</option>
              <option value="LOST">LOST</option>
              <option value="PENDING">PENDING</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>

          <div
            v-if="message.text"
            :class="[
              'p-3 rounded-md text-sm',
              message.type === 'success'
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
            ]"
          >
            {{ message.text }}
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="showEditModal = false"
              class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="updating"
              :class="[
                'flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors',
                updating ? 'opacity-50 cursor-not-allowed' : '',
              ]"
            >
              {{ updating ? "Updating..." : "Update Trade" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-[#b409099e] bg-opacity-50 z-[60] flex items-center justify-center p-4"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full"
      >
        <div
          class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Delete Trade Record
          </h3>
          <button
            @click="showDeleteModal = false"
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
              Are you sure you want to delete this trade record?<br />
              <strong>Coin: {{ deleteForm.coin_name }}</strong
              ><br />
              <strong>volume: {{ formatNumber(deleteForm.volume) }}</strong
              ><br />
              <strong>Type: {{ deleteForm.type }}</strong>
            </p>
            <p class="text-sm text-red-500 dark:text-red-400 mb-4">
              This action cannot be undone.
            </p>
          </div>

          <div
            v-if="message.text"
            :class="[
              'p-3 rounded-md text-sm mb-4',
              message.type === 'success'
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
            ]"
          >
            {{ message.text }}
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="showDeleteModal = false"
              class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="deleteTrade"
              :disabled="deleting"
              :class="[
                'flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors',
                deleting ? 'opacity-50 cursor-not-allowed' : '',
              ]"
            >
              {{ deleting ? "Deleting..." : "Delete Trade" }}
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
const updating = ref(false);
const deleting = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const message = ref({ type: "", text: "" });

const trades = ref([]);
const editForm = ref({
  id: null,
  volume: "",
  type: "",
  status: "",
  userid: "",
  trade_result: "",
  bgat: "",
  sdat: "",
  mdat: "",
  trade_signal: "",
  coin_name: "",
  coin_id: "",
  symbol: "",
});

const deleteForm = ref({
  id: null,
  coin_name: "",
  volume: "",
  type: "",
});

// Fetch trades when modal opens
watch(
  () => props.show,
  async (isOpen) => {
    if (isOpen && props.user) {
      await fetchTrades();
    }
  }
);

const fetchTrades = async () => {
  loading.value = true;
  try {
    const response = await $fetch(
      `${config.public.apiBase}/admin/get-user-trades.php?id=${props.user.id}`,
      { credentials: "include" }
    );

    if (response.success) {
      trades.value = response.trades;
    } else {
      message.value = { type: "error", text: "Failed to load trade records" };
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to load trade records" };
  }
  loading.value = false;
};

const openEditModal = (trade) => {
  editForm.value = {
    id: trade.id,
    volume: trade.volume,
    type: trade.type,
    status: trade.status,
    userid: trade.userid,
    trade_result: trade.trade_result || "",
    bgat: trade.bgat || "",
    sdat: trade.sdat || "",
    mdat: trade.mdat || "",
    trade_signal: trade.trade_signal || "",
    coin_name: trade.coin_name || "",
    symbol: trade.symbol || "",
    coin_id: trade.coin_id || "",
  };
  showEditModal.value = true;
  message.value = { type: "", text: "" };
};

const openDeleteModal = (trade) => {
  deleteForm.value = {
    id: trade.id,
    coin_name: trade.coin_name,
    volume: trade.volume,
    type: trade.type,
  };
  showDeleteModal.value = true;
  message.value = { type: "", text: "" };
};

const updateTrade = async () => {
  updating.value = true;
  message.value = { type: "", text: "" };

  try {
    const response = await $fetch(
      `${config.public.apiBase}/admin/update-user-trade.php`,
      {
        method: "POST",
        body: {
          updatetrade: true,
          ...editForm.value,
        },
        credentials: "include",
      }
    );

    if (response.success) {
      message.value = { type: "success", text: response.message };
      setTimeout(() => {
        showEditModal.value = false;
        fetchTrades();
        emit("success");
      }, 1500);
    } else {
      message.value = { type: "error", text: response.message };
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to update trade record" };
  }

  updating.value = false;
};

const deleteTrade = async () => {
  deleting.value = true;
  message.value = { type: "", text: "" };

  try {
    const response = await $fetch(
      `${config.public.apiBase}/admin/delete-user-trade.php`,
      {
        method: "POST",
        body: { id: deleteForm.value.id },
        credentials: "include",
      }
    );

    if (response.success) {
      message.value = { type: "success", text: response.message };
      setTimeout(() => {
        showDeleteModal.value = false;
        fetchTrades();
        emit("success");
      }, 1500);
    } else {
      message.value = { type: "error", text: response.message };
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to delete trade record" };
  }

  deleting.value = false;
};

// Helper functions
const formatNumber = (num, precision = 6) => {
  if (!num) return "0." + "0".repeat(precision);
  if (num < 0.000001) return num.toExponential(4);
  if (num < 0.001) return num.toFixed(6);
  if (num < 1) return num.toFixed(precision);
  return num.toLocaleString("en-US", { maximumFractionDigits: precision });
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleString();
};

const getTradeTypeClass = (type) => {
  switch (type?.toUpperCase()) {
    case "LONG":
    case "BUY":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "SHORT":
    case "SELL":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
  }
};

const getStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case "approved":
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "rejected":
    case "cancelled":
    case "failed":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
};

const getResultClass = (result) => {
  switch (result?.toUpperCase()) {
    case "WON":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "LOST":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
};
</script>
