<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-[#171717a8] bg-opacity-50 z-50 flex items-center justify-center p-4"
  >
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
    >
      <div
        class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
      >
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          Convert Balances - {{ user?.fullname }}
        </h3>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <Icon name="mdi:close" class="w-6 h-6" />
        </button>
      </div>

      <form @submit.prevent="convertBalances" class="p-6 space-y-4">
        <!-- Coin Selection -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Select Coin
          </label>
          <select
            v-model="form.coin_id"
            @change="fetchCoinBalances"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          >
            <option value="">Select Coin</option>
            <option
              v-for="coin in availableCoins"
              :key="coin.coin_id"
              :value="coin.coin_id"
            >
              {{ coin.coin_name }} ({{ coin.coin_title }})
            </option>
          </select>
        </div>

        <!-- Current Balances Display -->
        <div
          v-if="currentBalances"
          class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-2"
        >
          <h4 class="font-medium text-gray-700 dark:text-gray-300 mb-2">
            Current Balances
          </h4>
          <div class="grid grid-cols-3 gap-2 text-sm">
            <div class="text-center">
              <div class="text-green-600 dark:text-green-400 font-semibold">
                {{ formatNumber(currentBalances.available_balance) }}
              </div>
              <div class="text-gray-500 dark:text-gray-400 text-xs">
                Available
              </div>
            </div>
            <div class="text-center">
              <div class="text-yellow-600 dark:text-yellow-400 font-semibold">
                {{ formatNumber(currentBalances.on_order_balance) }}
              </div>
              <div class="text-gray-500 dark:text-gray-400 text-xs">
                On Order
              </div>
            </div>
            <div class="text-center">
              <div class="text-purple-600 dark:text-purple-400 font-semibold">
                {{ formatNumber(currentBalances.staked_balance) }}
              </div>
              <div class="text-gray-500 dark:text-gray-400 text-xs">Staked</div>
            </div>
          </div>
        </div>

        <!-- Conversion Type -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Conversion Type
          </label>
          <select
            v-model="form.conversion_type"
            @change="updateMaxAmount"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          >
            <option value="">Select Conversion</option>
            <option value="to_on_order">Available → On Order</option>
            <option value="to_available">On Order → Available</option>
            <option value="too_available">Staked → Available</option>
          </select>
        </div>

        <!-- Amount -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Amount
          </label>
          <div class="relative">
            <input
              v-model="form.amount"
              type="number"
              step="0.000001"
              :min="0"
              :max="maxAmount"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-20"
              placeholder="Enter amount"
              required
            />
            <button
              type="button"
              @click="setMaxAmount"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-blue-300 rounded transition-colors"
            >
              MAX
            </button>
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Maximum: {{ formatNumber(maxAmount) }}
          </div>
        </div>

        <!-- Conversion Preview -->
        <div
          v-if="form.amount > 0 && form.conversion_type"
          class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg"
        >
          <h4 class="font-medium text-blue-900 dark:text-blue-100 mb-2">
            Conversion Preview
          </h4>
          <div class="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <div class="flex justify-between">
              <span>From:</span>
              <span class="font-semibold">{{ getFromBalanceType() }}</span>
            </div>
            <div class="flex justify-between">
              <span>To:</span>
              <span class="font-semibold">{{ getToBalanceType() }}</span>
            </div>
            <div class="flex justify-between">
              <span>Amount:</span>
              <span class="font-semibold">{{ formatNumber(form.amount) }}</span>
            </div>
          </div>
        </div>

        <!-- Status Message -->
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

        <!-- Actions -->
        <div class="flex gap-3 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="
              converting ||
              !form.amount ||
              !form.conversion_type ||
              !form.coin_id
            "
            :class="[
              'flex-1 px-4 py-2 text-sm font-medium text-white rounded-md transition-colors flex items-center justify-center',
              converting
                ? 'opacity-50 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700',
            ]"
          >
            <Icon
              v-if="converting"
              name="mdi:loading"
              class="w-4 h-4 mr-2 animate-spin"
            />
            {{ converting ? "Converting..." : "Convert Balances" }}
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
  availableCoins: Array,
});

const emit = defineEmits(["close", "success"]);

const config = useRuntimeConfig();
const converting = ref(false);
const message = ref({ type: "", text: "" });
const currentBalances = ref(null);
const maxAmount = ref(0);

const form = ref({
  coin_id: "",
  amount: "",
  conversion_type: "",
});

// Reset form when modal opens
watch(
  () => props.show,
  (isOpen) => {
    if (isOpen) {
      form.value = {
        coin_id: "",
        amount: "",
        conversion_type: "",
      };
      currentBalances.value = null;
      maxAmount.value = 0;
      message.value = { type: "", text: "" };
    }
  }
);

// Fetch current balances when coin is selected
const fetchCoinBalances = async () => {
  if (!form.value.coin_id) {
    currentBalances.value = null;
    return;
  }

  try {
    const response = await $fetch(
      `${config.public.apiBase}/admin/convert-user-coins-list.php?userid=${props.user.id}&coin_id=${form.value.coin_id}`,
      { credentials: "include" }
    );

    if (response.success) {
      currentBalances.value = response.balances;
      updateMaxAmount();
    } else {
      currentBalances.value = {
        available_balance: 0,
        on_order_balance: 0,
        staked_balance: 0,
      };
    }
  } catch (error) {
    console.error("Failed to fetch balances:", error);
    currentBalances.value = {
      available_balance: 0,
      on_order_balance: 0,
      staked_balance: 0,
    };
  }
};

// Update max amount based on conversion type
const updateMaxAmount = () => {
  if (!currentBalances.value || !form.value.conversion_type) {
    maxAmount.value = 0;
    return;
  }

  switch (form.value.conversion_type) {
    case "to_on_order":
      maxAmount.value = currentBalances.value.available_balance;
      break;
    case "to_available":
      maxAmount.value = currentBalances.value.on_order_balance;
      break;
    case "too_available":
      maxAmount.value = currentBalances.value.staked_balance;
      break;
    default:
      maxAmount.value = 0;
  }
};

// Set amount to maximum
const setMaxAmount = () => {
  form.value.amount = maxAmount.value;
};

// Helper functions for display
const getFromBalanceType = () => {
  switch (form.value.conversion_type) {
    case "to_on_order":
      return "Available Balance";
    case "to_available":
      return "On Order Balance";
    case "too_available":
      return "Staked Balance";
    default:
      return "";
  }
};

const getToBalanceType = () => {
  switch (form.value.conversion_type) {
    case "to_on_order":
      return "On Order Balance";
    case "to_available":
      return "Available Balance";
    case "too_available":
      return "Available Balance";
    default:
      return "";
  }
};

const formatNumber = (num, precision = 6) => {
  if (!num) return "0." + "0".repeat(precision);
  if (num < 0.000001) return num.toExponential(4);
  if (num < 0.001) return num.toFixed(6);
  if (num < 1) return num.toFixed(precision);
  return num.toLocaleString("en-US", { maximumFractionDigits: precision });
};

const convertBalances = async () => {
  converting.value = true;
  message.value = { type: "", text: "" };

  try {
    const response = await $fetch(
      `${config.public.apiBase}/admin/convert-user-balances.php`,
      {
        method: "POST",
        body: {
          userid: props.user.id,
          coin_id: form.value.coin_id,
          amount: parseFloat(form.value.amount),
          conversion_type: form.value.conversion_type,
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
    console.error("Failed to convert balances:", error);
    message.value = { type: "error", text: "Failed to convert balances" };
  }

  converting.value = false;
};
</script>
