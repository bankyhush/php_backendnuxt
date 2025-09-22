<script setup>
// This page automatically gets auth protection from the layout
definePageMeta({
  layout: "user",
});

// Inject the user data provided by the layout
const user = inject("authUser");
</script>

<template>
  <div
    class="max-w-4xl mx-auto px-6 py-12 bg-gray-50 dark:bg-background/50 min-h-screen transition-colors duration-300"
  >
    <!-- Profile Header -->
    <div class="flex items-center gap-6 mb-10">
      <div class="relative">
        <div
          class="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden shadow"
        >
          <!-- Placeholder avatar -->
          <div class="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>
      </div>
      <div>
        <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
          Account Settings
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Manage your personal information
        </p>
      </div>
    </div>

    <!-- Personal Info Section -->
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 mb-8">
      <h2 class="text-lg font-semibold mb-4 dark:text-white">Personal Info</h2>
      <span class="capitalize">
        <span :label="'Full Name'" :value="user.fullName || 'Not set'"
          >ghjj</span
        >
      </span>
      <InfoRow :label="'Wallet Address'" :value="user.walletAddress" />
    </div>

    <!-- Verification Section -->
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 mb-8">
      <h2 class="text-lg font-semibold mb-4 dark:text-white">Verification</h2>
      <InfoRow label="Identity Verification">
        <template #value>
          <div class="flex items-center gap-2">
            <Check
              v-if="user.kycStatus === 'Verified'"
              size="16"
              class="text-green-500"
            />
            <X
              v-else-if="user.kycStatus === 'Pending'"
              size="16"
              class="text-yellow-500"
            />
            <X v-else size="16" class="text-gray-500 dark:text-gray-400" />
            <span class="font-bold text-sm">
              <template v-if="user.kycStatus === 'Verified'">
                {{ user.kycStatus }}
              </template>
              <template v-else-if="user.kycStatus === 'Pending'">
                <NuxtLink
                  to="/dashboard/profile/kyc"
                  class="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                >
                  VERIFY NOW &#8594;
                </NuxtLink>
              </template>
              <template v-else>Not Verified</template>
            </span>
          </div>
        </template>
      </InfoRow>
      <InfoRow
        :label="'Country/Region'"
        :value="user.country || 'Not provided'"
      />
    </div>

    <!-- Account Details Section -->
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 mb-18">
      <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Account Details
      </h2>
      <InfoRow :label="'Email'" :value="user.email" />
      <InfoRow :label="'Phone'" :value="user.phoneNumber || 'Not provided'" />
      <span class="capitalize">
        <InfoRow :label="'Account Type'" :value="user.accountType" />
      </span>
      <InfoRow label="Password" value="••••••••" />

      <div class="flex justify-between items-center mt-6">
        <NuxtLink to="/dashboard/profile/edit">
          <button
            class="cursor-pointer float-right mt-10 mb-10 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-200"
          >
            Edit Profile
          </button>
        </NuxtLink>

        <LogoutButton />
      </div>
    </div>
  </div>
</template>
