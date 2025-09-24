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
    class="max-w-3xl mx-auto px-6 py-12 min-h-screen bg-gray-50 text-black dark:bg-background/50"
  >
    <div
      class="bg-white rounded-xl shadow-md p-8 space-y-8 dark:bg-[#202020] dark:text-white"
    >
      <h1 class="text-3xl font-bold">Identity Verification</h1>
      <p class="text-gray-600 dark:text-white">
        Please upload the required documents to verify your identity. Ensure all
        images are clear and legible.
      </p>

      <div
        class="text-sm bg-yellow-50 py-3 px-4 rounded-md text-yellow-800 border border-yellow-200"
      >
        <b>Documents required:</b>
        <ul class="list-disc ml-6 mt-2">
          <li>Front of ID</li>
          <li>Back of ID</li>
        </ul>
        <p class="mt-2">
          Only JPG, PNG, or PDF files under 4MB each are accepted.
        </p>
      </div>

      <form class="space-y-6">
        <!-- Certificate Type -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-white mb-1"
          >
            Certificate Type
          </label>
          <select
            required
            class="w-full border border-gray-300 rounded-md p-2 text-sm dark:bg-gray-200 dark:text-black"
          >
            <option value="">-- Select Certificate Type --</option>
            <option value="passport">Passport</option>
            <option value="national_id">National ID</option>
            <option value="driver_license">Driver’s License</option>
            <option value="voter_card">Voter Card</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Front ID -->
          <div class="border border-gray-300 rounded-md p-4">
            <label
              class="block text-sm font-semibold text-gray-700 dark:text-white mb-2"
            >
              Upload Front of ID
            </label>
            <div
              class="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 dark:text-black text-sm mb-2 rounded"
            >
              Image preview placeholder
            </div>
            <input
              type="file"
              name="frontFile"
              accept="image/jpeg,image/png,application/pdf"
              class="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 dark:text-white"
            />
          </div>

          <!-- Back ID -->
          <div class="border border-gray-300 rounded-md p-4">
            <label
              class="block text-sm font-semibold text-gray-700 dark:text-white mb-2"
            >
              Upload Back of ID
            </label>
            <div
              class="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 dark:text-black text-sm mb-2 rounded"
            >
              Image preview placeholder
            </div>
            <input
              type="file"
              name="backFile"
              accept="image/jpeg,image/png,application/pdf"
              class="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 dark:text-white"
            />
          </div>
        </div>

        <div class="text-right">
          <button
            type="submit"
            class="flex justify-center items-center gap-1 cursor-pointer bg-[#202020] text-white font-medium py-2 px-6 rounded-md dark:bg-white dark:text-black dark:hover:bg-gray-200 hover:bg-black transition"
          >
            <Icon name="hugeicons:security-lock" width="24" height="24" />
            Process
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
