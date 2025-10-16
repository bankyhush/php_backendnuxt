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
          Create Transaction History - {{ user?.fullname }}
        </h3>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <Icon name="mdi:close" class="w-6 h-6" />
        </button>
      </div>

      <form @submit.prevent="createTransaction" class="p-6 space-y-4">
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Transaction Type
          </label>
          <select
            v-model="form.type"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          >
            <option value="">Select Type</option>
            <option value="DEPOSIT">Deposit</option>
            <option value="PROFIT">Profit</option>
            <option value="COPY TRADE">Copy Trade</option>
            <option value="PAYOUT">Payout</option>
            <option value="WITHDRAW">Withdraw</option>
            <option value="BONUS">Bonus</option>
          </select>
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Coin
          </label>
          <select
            v-model="form.coin_id"
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

        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Amount
          </label>
          <input
            v-model="form.amount"
            type="number"
            step="0.000001"
            min="0"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter amount"
            required
          />
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Method
          </label>
          <select
            v-model="form.method"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          >
            <option value="">Select Method</option>
            <option value="credit">Credit (Add)</option>
            <option value="debit">Debit (Subtract)</option>
          </select>
        </div>

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
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Additional Info (Optional)
          </label>
          <textarea
            v-model="form.additional_info"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Any additional information about this transaction"
          ></textarea>
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
            @click="$emit('close')"
            class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="creating"
            :class="[
              'flex-1 px-4 py-2 text-sm font-medium text-white rounded-md transition-colors',
              form.method === 'credit'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-red-600 hover:bg-red-700',
              creating ? 'opacity-50 cursor-not-allowed' : '',
            ]"
          >
            {{
              creating
                ? "Creating..."
                : form.method === "credit"
                ? "Create Credit"
                : "Create Debit"
            }}
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
const creating = ref(false);
const message = ref({ type: "", text: "" });

const form = ref({
  type: "",
  coin_id: "",
  amount: "",
  method: "",
  status: "",
  additional_info: "",
});

// Reset form when modal opens
watch(
  () => props.show,
  (isOpen) => {
    if (isOpen) {
      form.value = {
        type: "",
        coin_id: "",
        amount: "",
        method: "",
        status: "",
        additional_info: "",
      };
      message.value = { type: "", text: "" };
    }
  }
);

const createTransaction = async () => {
  creating.value = true;
  message.value = { type: "", text: "" };

  try {
    const response = await $fetch(
      `${config.public.apiBase}/admin/create-user-transaction.php`,
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
    console.error("Failed to create transaction:", error);
    message.value = { type: "error", text: "Failed to create transaction" };
  }

  creating.value = false;
};
</script>
