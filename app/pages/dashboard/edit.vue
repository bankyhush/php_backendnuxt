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
    class="max-w-3xl mx-auto px-6 py-12 bg-gray-50 text-black min-h-screen dark:bg-[#1a1a1a] dark:text-white"
  >
    <!-- Edit Profile Card -->
    <div class="bg-white shadow-md rounded-lg p-8 dark:bg-[#202020]">
      <h1
        class="text-3xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-2"
      >
        Edit Profile
      </h1>

      <form class="space-y-6">
        <div>
          <label class="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            value="John Doe"
            class="w-full p-3 border border-gray-100 dark:border-zinc-700 rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:bg-[#303030]"
            placeholder="Enter full name"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="text"
            value="+1234567890"
            class="w-full p-3 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:bg-[#303030]"
            placeholder="Enter phone number"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Country</label>
          <input
            type="text"
            value="United States"
            class="w-full p-3 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:bg-[#303030]"
            placeholder="Enter country"
          />
        </div>

        <button
          type="submit"
          class="cursor-pointer bg-gray-800 hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-md shadow transition w-40"
        >
          Update Profile
        </button>
      </form>
    </div>

    <!-- Change Password Card -->
    <div class="bg-white shadow-md rounded-lg p-8 mt-12 dark:bg-[#202020]">
      <h2
        class="text-2xl font-semibold text-gray-800 dark:text-white mb-6 border-b pb-2"
      >
        Change Password
      </h2>

      <form class="space-y-6">
        <div>
          <label class="block text-sm font-medium mb-1">Current Password</label>
          <input
            type="password"
            value="********"
            class="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:bg-[#111]"
            placeholder="Current password"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">New Password</label>
          <input
            type="password"
            value="newpassword123"
            class="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:bg-[#111]"
            placeholder="New password"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1"
            >Confirm New Password</label
          >
          <input
            type="password"
            value="newpassword123"
            class="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:bg-[#111]"
            placeholder="Confirm new password"
          />
        </div>

        <p class="text-red-600 text-sm font-bold">Passwords do not match</p>

        <button
          type="submit"
          class="cursor-pointer bg-gray-800 hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-md shadow transition w-48"
        >
          Change Password
        </button>
      </form>
    </div>
  </div>
</template>
