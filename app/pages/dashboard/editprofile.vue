<script setup>
definePageMeta({
  layout: "user",
});

const config = useRuntimeConfig();

// Reactive data
const data = ref(null);
const error = ref(null);
const isPending = ref(true);
const activeTab = ref("profile"); // 'profile' or 'password'

// Form data
const profileForm = ref({
  fullname: "",
  email: "",
  phone: "",
  address: "",
  country: "",
  city: "",
  zipcode: "",
  dob: "",
});

const passwordForm = ref({
  current_password: "",
  new_password: "",
  confirm_password: "",
});

// UI states
const profileLoading = ref(false);
const passwordLoading = ref(false);
const profileMessage = ref({ type: "", text: "" });
const passwordMessage = ref({ type: "", text: "" });

// Fetch user profile data
const fetchProfileData = async () => {
  try {
    const response = await $fetch(`${config.public.apiBase}/user/profile.php`, {
      credentials: "include",
    });

    // Artificial delay for skeleton
    setTimeout(() => {
      data.value = response;
      if (response?.user) {
        // Populate profile form with existing data
        profileForm.value = {
          fullname: response.user.fullname || "",
          email: response.user.email || "",
          phone: response.user.phone || "",
          address: response.user.address || "",
          country: response.user.country || "",
          city: response.user.city || "",
          zipcode: response.user.zipcode || "",
          dob: response.user.dob || "",
        };
      }
      isPending.value = false;
    }, 800);
  } catch (err) {
    error.value = err;
    isPending.value = false;
  }
};

// Initialize
fetchProfileData();

// Update profile function
const updateProfile = async () => {
  profileLoading.value = true;
  profileMessage.value = { type: "", text: "" };

  try {
    const response = await $fetch(
      `${config.public.apiBase}/user/profile_update.php`,
      {
        method: "POST",
        body: profileForm.value,
        credentials: "include",
      }
    );

    if (response.success) {
      profileMessage.value = { type: "success", text: response.message };
      // Refresh profile data
      await fetchProfileData();
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    profileMessage.value = {
      type: "error",
      text: err?.data?.message || err?.message || "Failed to update profile",
    };
  } finally {
    profileLoading.value = false;
  }
};

// Change password function
const changePassword = async () => {
  passwordLoading.value = true;
  passwordMessage.value = { type: "", text: "" };

  // Validate passwords match
  if (passwordForm.value.new_password !== passwordForm.value.confirm_password) {
    passwordMessage.value = {
      type: "error",
      text: "New passwords do not match",
    };
    passwordLoading.value = false;
    return;
  }

  // Validate password strength
  if (passwordForm.value.new_password.length < 6) {
    passwordMessage.value = {
      type: "error",
      text: "Password must be at least 6 characters",
    };
    passwordLoading.value = false;
    return;
  }

  try {
    const response = await $fetch(
      `${config.public.apiBase}/user/change_password.php`,
      {
        method: "POST",
        body: {
          current_password: passwordForm.value.current_password,
          new_password: passwordForm.value.new_password,
          confirm_password: passwordForm.value.confirm_password,
        },
        credentials: "include",
      }
    );

    if (response.success) {
      passwordMessage.value = { type: "success", text: response.message };
      // Clear password form
      passwordForm.value = {
        current_password: "",
        new_password: "",
        confirm_password: "",
      };
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    passwordMessage.value = {
      type: "error",
      text: err?.data?.message || err?.message || "Failed to change password",
    };
  } finally {
    passwordLoading.value = false;
  }
};

// Clear messages when switching tabs
const switchTab = (tab) => {
  activeTab.value = tab;
  profileMessage.value = { type: "", text: "" };
  passwordMessage.value = { type: "", text: "" };
};
</script>

<template>
  <div
    class="max-w-5xl mb-8 mx-auto px-6 py-12 min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-[#171717]"
  >
    <div
      class="bg-gradient-to-b from-gray-100 to-white dark:from-[#202020] dark:to-[#111] rounded-2xl shadow-xl p-8"
    >
      <!-- Skeleton -->
      <div v-if="isPending" class="space-y-6 animate-pulse">
        <div class="h-8 bg-gray-300 dark:bg-[#171717] w-2/3 rounded"></div>
        <div class="h-6 bg-gray-200 dark:bg-[#171717] w-1/2 rounded"></div>
        <div class="h-48 bg-gray-200 dark:bg-[#171717] rounded-lg"></div>
        <div class="h-48 bg-gray-200 dark:bg-[#171717] rounded-lg"></div>
        <div class="h-48 bg-gray-200 dark:bg-[#171717] rounded-lg"></div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="flex flex-col items-center justify-center text-center py-16 px-4 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-md"
      >
        <img
          src="/error/error.gif"
          alt="Error loading"
          class="w-40 h-40 mb-6"
        />
        <h2 class="text-2xl font-semibold text-red-600 dark:text-red-400 mb-2">
          Oops! Something went wrong
        </h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-md mb-4">
          We weren't able to load your profile information at the moment.
        </p>
        <button
          @click="fetchProfileData"
          class="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
        >
          Try Again
        </button>
      </div>

      <!-- Loaded State -->
      <div v-else>
        <!-- Header -->
        <div class="flex items-center gap-6 mb-8">
          <div class="relative">
            <div
              class="w-24 h-24 rounded-full overflow-hidden shadow-lg ring-4 ring-white dark:ring-gray-800"
            >
              <img
                src="/images/avatar.jpg"
                alt="User avatar"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              Profile Settings
            </h1>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Manage your personal information and security
            </p>
          </div>
        </div>

        <!-- Tab Navigation -->
        <div class="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav class="-mb-px flex space-x-8">
            <button
              @click="switchTab('profile')"
              :class="[
                activeTab === 'profile'
                  ? 'border-primary text-primary dark:border-white dark:text-white'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
              ]"
            >
              Edit Profile
            </button>
            <button
              @click="switchTab('password')"
              :class="[
                activeTab === 'password'
                  ? 'border-primary text-primary dark:border-white dark:text-white'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
              ]"
            >
              Change Password
            </button>
          </nav>
        </div>

        <!-- Edit Profile Tab -->
        <div v-if="activeTab === 'profile'" class="space-y-6">
          <!-- Success/Error Messages -->
          <div
            v-if="profileMessage.text"
            :class="[
              profileMessage.type === 'success'
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
              'p-3 rounded-md text-sm',
            ]"
          >
            {{ profileMessage.text }}
          </div>

          <form @submit.prevent="updateProfile" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Full Name -->
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  v-model="profileForm.fullname"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  readonly
                />
              </div>

              <!-- Email -->
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  v-model="profileForm.email"
                  disabled
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                />
                <p class="text-xs text-gray-500 mt-1">
                  Email cannot be changed
                </p>
              </div>

              <!-- Phone -->
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  v-model="profileForm.phone"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <!-- Date of Birth -->
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Date of Birth: <small>{{ profileForm.dob }}</small>
                </label>
                <input
                  type="date"
                  v-model="profileForm.dob"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <!-- Address -->
              <div class="md:col-span-2">
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Address
                </label>
                <input
                  type="text"
                  v-model="profileForm.address"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <!-- Country -->
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Country
                </label>
                <input
                  type="text"
                  v-model="profileForm.country"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <!-- City -->
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  City
                </label>
                <input
                  type="text"
                  v-model="profileForm.city"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <!-- Zip Code -->
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  ZIP Code
                </label>
                <input
                  type="text"
                  v-model="profileForm.zipcode"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end">
              <button
                type="submit"
                :disabled="profileLoading"
                class="cursor-pointer bg-black dark:bg-white dark:text-black text-white px-6 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="profileLoading">Updating...</span>
                <span v-else>Update Profile</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Change Password Tab -->
        <div v-if="activeTab === 'password'" class="space-y-6">
          <!-- Success/Error Messages -->
          <div
            v-if="passwordMessage.text"
            :class="[
              passwordMessage.type === 'success'
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
              'p-3 rounded-md text-sm',
            ]"
          >
            {{ passwordMessage.text }}
          </div>

          <form @submit.prevent="changePassword" class="space-y-6">
            <div class="space-y-4">
              <!-- Current Password -->
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  v-model="passwordForm.current_password"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter your current password"
                />
              </div>

              <!-- New Password -->
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  New Password
                </label>
                <input
                  type="password"
                  v-model="passwordForm.new_password"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter new password"
                />
                <p class="text-xs text-gray-500 mt-1">
                  Must be at least 6 characters
                </p>
              </div>

              <!-- Confirm Password -->
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  v-model="passwordForm.confirm_password"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end">
              <button
                type="submit"
                :disabled="passwordLoading"
                class="cursor-pointer bg-black dark:bg-white dark:text-black text-white px-6 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="passwordLoading">Updating...</span>
                <span v-else>Change Password</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
