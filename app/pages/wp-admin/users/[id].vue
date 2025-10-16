<script setup>
import ConvertBalancesModal from "~/components/admin/ConvertBalancesModal.vue";
import CreateHistoryModal from "~/components/admin/CreateHistoryModal.vue";
import CreditDebitModal from "~/components/admin/CreditDebitModal.vue";
import HistoryModal from "~/components/admin/HistoryModal.vue";
import SendEmailModal from "~/components/admin/SendEmailModal.vue";
import UserBalancesModal from "~/components/admin/UserBalancesModal.vue";

definePageMeta({
  layout: "admin",
});

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

const userId = route.params.id;
const user = ref(null);
const loading = ref(true);
const saving = ref(false);
const message = ref({ type: "", text: "" });

// Modal states
const showBalancesModal = ref(false);
const showCreditDebitModal = ref(false);
const showHistoryModal = ref(false);
const showCreateHistoryModal = ref(false);
const showSendEmailModal = ref(false);
const showConvertBalancesModal = ref(false);
const showTradeModal = ref(false);

// Available coins for credit/debit
const availableCoins = ref([]);

// Fetch user details
const fetchUser = async () => {
  loading.value = true;
  try {
    const res = await $fetch(
      `${config.public.apiBase}/admin/get-user.php?id=${userId}`,
      { credentials: "include" }
    );

    if (res.success) {
      user.value = res.user;
      Object.keys(form.value).forEach((key) => {
        if (res.user[key] !== undefined) form.value[key] = res.user[key];
      });
    } else {
      message.value = { type: "error", text: "User not found" };
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to load user details" };
    router.push("/wp-admin/users");
  }
  loading.value = false;
};

// Fetch available coins
const fetchAvailableCoins = async () => {
  try {
    // console.log(
    //   "Fetching coins from:",
    //   `${config.public.apiBase}/admin/edit-get-coins.php`
    // );

    const res = await $fetch(
      `${config.public.apiBase}/admin/edit-get-coins.php`,
      {
        credentials: "include",
        method: "GET",
      }
    );

    //console.log("Coins API response:", res);

    if (res.success) {
      availableCoins.value = res.coins;
      // console.log("Available coins loaded:", availableCoins.value.length); // Debug log
    }
  } catch (error) {
    console.error("Failed to fetch coins:", error);
    availableCoins.value = []; // Ensure it's always an array
  }
};

// Form data
const form = ref({
  fullname: "",
  email: "",
  phone: "",
  account_type: "",
  is_verified: "",
  kyc_status: "",
  country: "",
  city: "",
  zipcode: "",
  address: "",
  current_trader: "",
  win_rate: "",
  trade_status: "",
  trader_profit: "",
  copiers: "",
  activeplan: "",
  planamount: "",
  profit: "",
  deposit: "",
  withdrawal: "",
  bonus: "",
});

// Update user
const updateUser = async () => {
  saving.value = true;
  message.value = { type: "", text: "" };

  try {
    const res = await $fetch(`${config.public.apiBase}/admin/update-user.php`, {
      method: "POST",
      body: {
        id: parseInt(userId),
        fullname: form.value.fullname,
        email: form.value.email,
        phone: form.value.phone,
        country: form.value.country,
        city: form.value.city,
        zipcode: form.value.zipcode,
        address: form.value.address,
        current_trader: form.value.current_trader,
        win_rate: form.value.win_rate,
        trade_status: form.value.trade_status,
        trader_profit: form.value.trader_profit,
        copiers: form.value.copiers,
        activeplan: form.value.activeplan,
        planamount: form.value.planamount,
        profit: form.value.profit,
        deposit: form.value.deposit,
        withdrawal: form.value.withdrawal,
        bonus: form.value.bonus,
        account_type: form.value.account_type,
        is_verified: form.value.is_verified,
        kyc_status: form.value.kyc_status,
      },
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.success) {
      message.value = { type: "success", text: res.message };
      await fetchUser(); // Refresh user data
    } else {
      message.value = { type: "error", text: res.message };
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to update user" };
  }
  saving.value = false;
};

// Handle modal success
const handleModalSuccess = () => {
  fetchUser(); // Refresh user data
};

// Load data
onMounted(() => {
  fetchUser();
  fetchAvailableCoins();
});
</script>

<template>
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="mb-6">
      <NuxtLink
        to="/wp-admin/users"
        class="text-blue-400 hover:text-blue-300 flex items-center gap-2"
      >
        ← Back to Users
      </NuxtLink>
      <h1 class="text-3xl font-bold text-white mt-2">
        Edit User - {{ user?.fullname }}
      </h1>
    </div>

    <!-- Message Alert -->
    <div
      v-if="message.text"
      :class="[
        'p-4 rounded-md mb-6',
        message.type === 'success'
          ? 'bg-green-500 text-white'
          : 'bg-red-500 text-white',
      ]"
    >
      {{ message.text }}
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center p-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"
      ></div>
      <p class="text-gray-300 mt-2">Loading user details...</p>
    </div>

    <!-- Content -->
    <div v-else class="space-y-6">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-blue-600 rounded-lg p-4 text-white">
          <div class="text-sm opacity-80">Total Balance</div>
          <div class="text-2xl font-bold">
            ${{ (user?.balances?.total_usd_value || 0).toLocaleString() }}
          </div>
        </div>
        <div class="bg-green-600 rounded-lg p-4 text-white">
          <div class="text-sm opacity-80">Transactions</div>
          <div class="text-2xl font-bold">
            {{ user?.stats?.transaction_count || 0 }}
          </div>
        </div>
        <div class="bg-purple-600 rounded-lg p-4 text-white">
          <div class="text-sm opacity-80">Trades</div>
          <div class="text-2xl font-bold">
            {{ user?.stats?.trade_count || 0 }}
          </div>
        </div>
        <div class="bg-orange-600 rounded-lg p-4 text-white">
          <div class="text-sm opacity-80">Coins Held</div>
          <div class="text-2xl font-bold">
            {{ user?.stats?.total_coins || 0 }}
          </div>
        </div>
      </div>

      <!-- Main Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- User Form -->
        <div class="lg:col-span-2 bg-gray-800 rounded-lg p-6">
          <h2 class="text-xl font-bold text-white mb-4">User Information</h2>
          <form @submit.prevent="updateUser" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2"
                  >Full Name</label
                >
                <input
                  v-model="form.fullname"
                  type="text"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2"
                  >Email</label
                >
                <input
                  v-model="form.email"
                  type="email"
                  class="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white"
                  readonly
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2"
                  >Wallet
                </label>
                <input
                  v-model="user.wallet_address"
                  type="text"
                  class="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white"
                  readonly
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2"
                  >Phone</label
                >
                <input
                  v-model="form.phone"
                  type="text"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2"
                  >Country</label
                >
                <input
                  v-model="form.country"
                  type="text"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2"
                  >City</label
                >
                <input
                  v-model="form.city"
                  type="text"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2"
                  >Address</label
                >
                <input
                  v-model="form.address"
                  type="text"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2"
                  >Zip Code</label
                >
                <input
                  v-model="form.zipcode"
                  type="text"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-red-300 mb-2"
                  >Current Trader</label
                >
                <input
                  v-model="form.current_trader"
                  type="text"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-red-300 mb-2"
                  >Win Rate</label
                >
                <input
                  v-model="form.win_rate"
                  type="text"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-red-300 mb-2"
                  >Trade Status</label
                >
                <input
                  v-model="form.trade_status"
                  type="text"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-red-300 mb-2"
                  >Trader Profit</label
                >
                <input
                  v-model="form.trader_profit"
                  type="text"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-red-300 mb-2"
                  >Copiers</label
                >
                <input
                  v-model="form.copiers"
                  type="text"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-blue-300 mb-2"
                  >Active Plan</label
                >
                <input
                  v-model="form.activeplan"
                  type="text"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-blue-300 mb-2"
                  >Plan Amount ($)</label
                >
                <input
                  v-model="form.planamount"
                  type="number"
                  step="any"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2"
                  >Account Type</label
                >
                <select
                  v-model="form.account_type"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                >
                  <option :value="user?.account_type">
                    {{ user?.account_type }}
                  </option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                  <option value="vip">VIP</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2"
                  >KYC Status</label
                >
                <select
                  v-model="form.kyc_status"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                >
                  <option :value="user?.kyc_status">
                    {{ user?.kyc_status }}
                  </option>
                  <option value="false">false</option>
                  <option value="true">true</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2"
                  >Email Verified</label
                >
                <select
                  v-model="form.is_verified"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                >
                  <option :value="user?.is_verified">
                    {{ user?.is_verified }}
                  </option>
                  <option value="false">false</option>
                  <option value="true">true</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-green-300 mb-2"
                  >Profit ($)</label
                >
                <input
                  v-model="form.profit"
                  type="number"
                  step="any"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-green-300 mb-2"
                  >Deposit ($)</label
                >
                <input
                  v-model="form.deposit"
                  type="number"
                  step="any"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-green-300 mb-2"
                  >Payout/Withdrawal ($)</label
                >
                <input
                  v-model="form.withdrawal"
                  type="number"
                  step="any"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-green-300 mb-2"
                  >Bonus ($)</label
                >
                <input
                  v-model="form.bonus"
                  type="number"
                  step="any"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>
            </div>
            <div class="flex gap-4 pt-4">
              <button
                type="submit"
                :disabled="saving"
                class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              >
                {{ saving ? "Saving..." : "Update User" }}
              </button>
              <NuxtLink
                to="/wp-admin/users"
                class="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Cancel
              </NuxtLink>
            </div>
          </form>
        </div>

        <!-- Quick Actions -->
        <div class="bg-gray-800 rounded-lg p-6">
          <h2 class="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div class="space-y-3">
            <button
              @click="showBalancesModal = true"
              class="cursor-pointer w-full text-left px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              View Balances
            </button>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div
        class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
      >
        <button
          @click="showHistoryModal = true"
          class="cursor-pointer px-4 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors"
        >
          Manage History
        </button>
        <button
          @click="showCreateHistoryModal = true"
          class="cursor-pointer px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
        >
          Create History
        </button>
        <button
          @click="showCreditDebitModal = true"
          class="cursor-pointer px-4 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md transition-colors"
        >
          Credit & Debit
        </button>
        <button
          class="cursor-pointer px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          Manage Trade Records
        </button>
        <button
          class="cursor-pointer px-4 py-3 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-md transition-colors"
        >
          Create Trade Records
        </button>
        <button
          class="cursor-pointer px-4 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-md transition-colors"
        >
          Stake History
        </button>
        <button
          class="cursor-pointer px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
        >
          Investment History
        </button>
        <button
          @click="showSendEmailModal = true"
          class="cursor-pointer px-4 py-3 bg-lime-600 hover:bg-lime-700 text-white rounded-md transition-colors"
        >
          Send Email
        </button>
        <button
          @click="showConvertBalancesModal = true"
          class="cursor-pointer px-4 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-md transition-colors"
        >
          Convert Balances
        </button>
      </div>
    </div>

    <!-- Modal Components -->
    <UserBalancesModal
      :show="showBalancesModal"
      :user="user"
      @close="showBalancesModal = false"
    />
    <CreditDebitModal
      :show="showCreditDebitModal"
      :user="user"
      :available-coins="availableCoins"
      @close="showCreditDebitModal = false"
      @success="handleModalSuccess"
    />
    <HistoryModal
      :show="showHistoryModal"
      :user="user"
      @close="showHistoryModal = false"
    />

    <CreateHistoryModal
      :show="showCreateHistoryModal"
      :user="user"
      :available-coins="availableCoins"
      @close="showCreateHistoryModal = false"
      @success="handleModalSuccess"
    />

    <SendEmailModal
      :show="showSendEmailModal"
      :user="user"
      @close="showSendEmailModal = false"
      @success="handleModalSuccess"
    />

    <ConvertBalancesModal
      :show="showConvertBalancesModal"
      :user="user"
      :available-coins="availableCoins"
      @close="showConvertBalancesModal = false"
      @success="handleModalSuccess"
    />
  </div>
</template>
