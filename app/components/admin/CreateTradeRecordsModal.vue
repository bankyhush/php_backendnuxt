<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-[#171717a8] bg-opacity-50 z-50 flex items-center justify-center p-4"
  >
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
    >
      <div
        class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
      >
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          Create Trade Record - {{ user?.fullname }}
        </h3>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <Icon name="mdi:close" class="w-6 h-6" />
        </button>
      </div>

      <form @submit.prevent="createTrade" class="p-6 space-y-4">
        <!-- Volume -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Volume
          </label>
          <input
            v-model="form.volume"
            type="number"
            step="0.000001"
            min="0"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter trade volume"
            required
          />
        </div>

        <!-- Symbol -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Symbol/Pair
          </label>
          <input
            v-model="form.symbol"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g., BTC/USDT, ETH/USD"
            required
          />
        </div>

        <!-- Coin Name -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Coin Name
          </label>
          <input
            v-model="form.coin_name"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g., Bitcoin, Ethereum"
            required
          />
        </div>

        <!-- Trade Type -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Trade Type
          </label>
          <select
            v-model="form.type"
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

        <!-- Trade Signal -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Trade Signal
          </label>
          <input
            v-model="form.trade_signal"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Trade signal description"
          />
        </div>

        <!-- Stop Loss (SL) -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Stop Loss (SL)
          </label>
          <input
            v-model="form.sl"
            type="number"
            step="0.000001"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Stop loss price"
          />
        </div>

        <!-- Take Profit (TP) -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Take Profit (TP)
          </label>
          <input
            v-model="form.tp"
            type="number"
            step="0.000001"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Take profit price"
          />
        </div>

        <!-- BGAT -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            BGAT
          </label>
          <input
            v-model="form.bgat"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="BGAT value"
          />
        </div>

        <!-- SDAT -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            SDAT
          </label>
          <input
            v-model="form.sdat"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="SDAT value"
          />
        </div>

        <!-- MDAT -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            MDAT
          </label>
          <input
            v-model="form.mdat"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="MDAT value"
          />
        </div>

        <!-- Expired Time -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Expired Time
          </label>
          <input
            v-model="form.expired_time"
            type="datetime-local"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <!-- Status -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Status
          </label>
          <select
            v-model="form.status"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          >
            <option value="Pending">Pending</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <!-- Trade Result -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Trade Result
          </label>
          <select
            v-model="form.trade_result"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Select Result</option>
            <option value="WON">WON</option>
            <option value="LOST">LOST</option>
            <option value="PENDING">PENDING</option>
          </select>
        </div>

        <!-- Message Alert -->
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

        <!-- Buttons -->
        <div class="flex gap-3 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="creating"
            :class="[
              'flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors',
              creating ? 'opacity-50 cursor-not-allowed' : '',
            ]"
          >
            {{ creating ? "Creating..." : "Create Trade" }}
          </button>
        </div>
      </form>
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
const creating = ref(false);
const message = ref({ type: "", text: "" });

const form = ref({
  volume: "",
  symbol: "",
  coin_name: "",
  type: "",
  trade_signal: "",
  sl: "",
  tp: "",
  bgat: "",
  sdat: "",
  mdat: "",
  expired_time: "",
  status: "Pending",
  trade_result: "PENDING",
});

// Reset form when modal opens
watch(
  () => props.show,
  (isOpen) => {
    if (isOpen) {
      form.value = {
        volume: "",
        symbol: "",
        coin_name: "",
        type: "",
        trade_signal: "",
        sl: "",
        tp: "",
        bgat: "",
        sdat: "",
        mdat: "",
        expired_time: "",
        status: "Pending",
        trade_result: "PENDING",
      };
      message.value = { type: "", text: "" };
    }
  }
);

const createTrade = async () => {
  creating.value = true;
  message.value = { type: "", text: "" };

  try {
    const response = await $fetch(
      `${config.public.apiBase}/admin/create-user-trade.php`,
      {
        method: "POST",
        body: {
          userid: props.user.id,
          ...form.value,
        },
        credentials: "include",
      }
    );

    if (response.success) {
      message.value = { type: "success", text: response.message };
      setTimeout(() => {
        emit("success");
        emit("close");
      }, 1500);
    } else {
      message.value = { type: "error", text: response.message };
    }
  } catch (error) {
    console.error("Failed to create trade:", error);
    message.value = { type: "error", text: "Failed to create trade record" };
  }

  creating.value = false;
};
</script>
