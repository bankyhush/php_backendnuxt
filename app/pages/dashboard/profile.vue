<script setup>
definePageMeta({
  layout: "user",
});

const config = useRuntimeConfig();

// Create loading delay manually
const data = ref(null);
const error = ref(null);
const isPending = ref(true);

try {
  const response = await useFetch(`${config.public.apiBase}/user/profile.php`, {
    credentials: "include",
  });

  // Artificial delay for skeleton (e.g., 800ms)
  setTimeout(() => {
    data.value = response.data.value;
    error.value = response.error.value;
    isPending.value = false;
  }, 800); // you can adjust this
} catch (err) {
  error.value = err;
  isPending.value = false;
}
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
        <div class="h-8 bg-gray-200 dark:bg-[#171717] w-2/3 rounded"></div>
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
        <!-- Error Illustration -->
        <img
          src="/error/error.gif"
          alt="Error loading"
          class="w-40 h-40 mb-6"
        />

        <!-- Main Message -->
        <h2 class="text-2xl font-semibold text-red-600 dark:text-red-400 mb-2">
          Oops! Something went wrong
        </h2>

        <!-- Explanation -->
        <p class="text-gray-600 dark:text-gray-400 max-w-md mb-4">
          We weren’t able to load your profile information at the moment. This
          might be due to a temporary connection issue or server error.
        </p>

        <!-- Suggested Action -->
        <p class="text-gray-500 dark:text-gray-500 text-sm mb-6">
          Please try refreshing the page, or come back later. If the problem
          persists, contact our support team.
        </p>

        <!-- Optional Retry Button -->
      </div>

      <!-- Loaded State -->
      <div v-else>
        <!-- Header -->
        <div class="flex items-center gap-6 mb-10">
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
            <h1
              class="whitespace-nowrap text-2xl font-bold text-gray-900 dark:text-white"
            >
              Profile Settings
            </h1>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Manage your personal information and preferences
            </p>
          </div>
        </div>

        <!-- Personal Info -->
        <section
          class="bg-white dark:bg-[#202020] rounded-xl p-6 shadow-md mb-8"
        >
          <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Personal Info
          </h2>
          <div class="space-y-3 text-sm">
            <div>
              <p class="text-gray-500 dark:text-gray-400">Full Name</p>
              <span class="text-gray-800 dark:text-gray-100 font-medium">
                {{ data?.user?.fullname || "N/A" }}
              </span>
            </div>
            <div>
              <p class="text-gray-500 dark:text-gray-400">Wallet Address</p>
              <span class="text-gray-800 dark:text-gray-100 font-mono">
                {{ data?.user?.wallet_address || "0x0000...0000" }}
              </span>
            </div>
          </div>
        </section>

        <!-- Verification -->
        <section
          class="bg-white dark:bg-[#202020] rounded-xl p-6 shadow-md mb-8"
        >
          <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Verification
          </h2>
          <div class="space-y-3 text-sm">
            <div class="flex items-center gap-2">
              <span class="text-gray-500 dark:text-gray-400">
                Identity Verification:
              </span>
              <span
                :class="[
                  data?.user?.kyc_status === 'true'
                    ? 'text-green-500'
                    : data?.user?.kyc_status === 'false'
                    ? 'text-red-400'
                    : 'text-amber-600',
                  'font-semibold',
                ]"
              >
                {{
                  data?.user?.kyc_status === "true"
                    ? "Verified"
                    : data?.user?.kyc_status === "false"
                    ? "Not Verified"
                    : "Pending"
                }}
              </span>
            </div>
            <div>
              <p class="text-gray-500 dark:text-gray-400">Country/Region</p>
              <span class="text-gray-800 dark:text-gray-100 font-medium">
                {{ data?.user?.country || "Not Provided" }}
              </span>
            </div>
          </div>
        </section>

        <!-- Account Details -->
        <section class="bg-white dark:bg-[#202020] rounded-xl p-6 shadow-md">
          <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Account Details
          </h2>
          <div class="space-y-3 text-sm">
            <div>
              <p class="text-gray-500 dark:text-gray-400">Email</p>
              <span class="text-gray-800 dark:text-gray-100 font-medium">
                {{ data?.user?.email || "example@email.com" }}
              </span>
            </div>
            <div>
              <p class="text-gray-500 dark:text-gray-400">Phone</p>
              <span class="text-gray-800 dark:text-gray-100 font-medium">
                {{ data?.user?.phone || "Not Provided" }}
              </span>
            </div>
            <div>
              <p class="text-gray-500 dark:text-gray-400">Account Type</p>
              <span class="text-gray-800 dark:text-gray-100 font-medium">
                {{ data?.user?.account_type || "Personal" }}
              </span>
            </div>
            <div>
              <p class="text-gray-500 dark:text-gray-400">Password</p>
              <span class="text-gray-800 dark:text-gray-100 font-mono"
                >••••••••</span
              >
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-between items-center mt-8">
            <NuxtLink to="/dashboard/editprofile">
              <button
                class="cursor-pointer flex justify-center items-center gap-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-5 rounded-md transition duration-200 shadow-md dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-black"
              >
                <Icon name="nimbus:edit" width="16" height="16" />
                Edit Profile
              </button>
            </NuxtLink>
          </div>
          <NuxtLink
            to="/dashboard/kyc"
            v-if="data?.user?.kyc_status !== 'true'"
          >
            <button
              :disabled="data?.user?.kyc_status === 'pending'"
              class="flex justify-center items-center gap-1 mt-3 cursor-pointer bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-5 rounded-md transition duration-200 shadow-md"
            >
              <Icon
                name="hugeicons:user-id-verification"
                width="24"
                height="24"
                class="font-bold"
              />
              Verification
            </button>
          </NuxtLink>
        </section>
      </div>
    </div>
  </div>
</template>
