<template>
  <div
    class="min-h-screen flex flex-col bg-white dark:bg-[#171717] dark:text-white"
  >
    <div class="flex flex-col md:flex-row flex-1">
      <!-- Left Side -->
      <div
        class="bg-black text-white w-full md:w-1/2 p-8 md:p-16 flex flex-col"
      >
        <div
          class="hidden max-w-md mx-auto md:mx-0 md:ml-auto flex-1 md:flex flex-col justify-center"
        >
          <h1 class="text-4xl md:text-3xl font-bold mb-6">Admin Portal</h1>
          <p class="text-lg text-gray-300 mb-12">
            Secure access to the administration dashboard. Manage users,
            transactions, and platform settings.
          </p>
          <div
            class="hidden bg-zinc-900 max-w-2xl rounded-3xl overflow-hidden border border-zinc-800 md:block"
          >
            <img
              src="/images/f4.webp"
              alt="Admin Dashboard Preview"
              height="340"
              width="300"
              class="mx-auto"
            />
          </div>
        </div>
      </div>

      <!-- Right Side -->
      <div
        class="bg-white dark:bg-[#202020] dark:text-white w-full -mt-10 md:w-1/2 p-8 md:p-16 flex flex-col"
      >
        <div
          class="max-w-md mx-auto md:mx-0 md:mr-auto flex-1 flex flex-col justify-center"
        >
          <div class="text-center mb-6">
            <h1 class="text-4xl font-bold mb-2 text-black dark:text-white">
              Admin Login
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
              Access the administration dashboard
            </p>
          </div>

          <!-- Login Form -->
          <div>
            <form
              class="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg dark:bg-zinc-800"
              @submit.prevent="loginHandler"
            >
              <!-- Success Message -->
              <div
                v-if="successMessage"
                class="mb-4 p-3 text-green-700 bg-green-100 rounded text-sm"
              >
                <UAlert
                  color="success"
                  variant="subtle"
                  title="Access Granted"
                  :description="successMessage"
                  icon="i-lucide-check-circle"
                />
              </div>
              <!-- Error Message -->
              <div
                v-if="errorMessage"
                class="mb-4 p-3 text-red-700 bg-red-100 rounded text-sm"
              >
                <UAlert
                  color="error"
                  variant="subtle"
                  title="Login Failed"
                  :description="errorMessage"
                  icon="i-lucide-terminal"
                />
              </div>

              <!-- Email Field -->
              <div class="mb-5 relative">
                <Icon
                  name="lucide:mail"
                  class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  placeholder="Admin Email"
                  v-model="email"
                  required
                  class="w-full pl-10 pr-3 py-1.5 rounded-md border border-gray-300 bg-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <!-- Password Field -->
              <div class="mb-5 relative">
                <Icon
                  name="lucide:lock"
                  class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Admin Password"
                  v-model="password"
                  required
                  class="w-full pl-10 pr-10 py-1.5 rounded-md border border-gray-300 bg-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <Icon
                    :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'"
                  />
                </button>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="isLoading"
                class="min-h-[40px] cursor-pointer mb-5 w-full bg-black dark:bg-white dark:text-black text-white hover:shadow-lg py-1.5 rounded-md disabled:cursor-not-allowed disabled:bg-gray-500"
              >
                <template v-if="isLoading">
                  <Icon
                    name="gg:spinner-two-alt"
                    class="animate-spin text-2xl mx-auto"
                  />
                </template>
                <template v-else> Sign In </template>
              </button>

              <!-- Back to Main Site -->
              <div class="text-center">
                <NuxtLink
                  to="/login"
                  class="text-zinc-800 dark:text-gray-100 font-mono"
                >
                  ← Back to User Login
                </NuxtLink>
              </div>
            </form>
          </div>

          <!-- Security Notice -->
          <div class="mt-8 text-center text-sm text-gray-500">
            <p>
              <Icon name="lucide:shield" class="inline w-4 h-4 mr-1" />
              Restricted access. Authorized personnel only.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false, // No layout for login page
});

const config = useRuntimeConfig();
const router = useRouter();

const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const email = ref("");
const password = ref("");

const loginHandler = async () => {
  errorMessage.value = "";
  successMessage.value = "";
  isLoading.value = true;

  try {
    const res = await $fetch(`${config.public.apiBase}/auth/login.php`, {
      method: "POST",
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.success) {
      // Check if user has admin user_type
      if (res.role === "admin") {
        successMessage.value = "Admin access granted. Redirecting...";

        // Redirect to admin dashboard
        setTimeout(() => {
          navigateTo("/wp-admin");
        }, 1500);
      } else {
        errorMessage.value = "Access denied. Admin privileges required.";

        // Clear any session since non-admin tried to access admin login
        setTimeout(() => {
          navigateTo("/login");
        }, 2000);
      }
    } else {
      errorMessage.value = res.message || "Login failed";
    }
  } catch (err) {
    console.error("Admin login error:", err);

    // Handle different error types
    if (err.status === 403 || err?.data?.message?.includes("Access denied")) {
      errorMessage.value = "Access denied. Admin privileges required.";
    } else if (err?.data?.message?.includes("Email not verified")) {
      errorMessage.value =
        "Please verify your email before accessing admin panel.";
    } else {
      errorMessage.value =
        err?.data?.message || err?.message || "Login failed. Please try again.";
    }
  } finally {
    isLoading.value = false;
  }
};

// Redirect if already logged in as admin
onMounted(async () => {
  try {
    const res = await $fetch(
      `${config.public.apiBase}/auth/check-session.php`,
      {
        credentials: "include",
      }
    );

    if (res.success && res.user?.user_type === "admin") {
      navigateTo("/wp-admin");
    }
  } catch (error) {
    // Not logged in or session expired - stay on login page
    console.log("No valid admin session");
  }
});
</script>
