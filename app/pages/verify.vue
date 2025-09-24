<template>
  <div class="pb-[50px]">
    <HeroHeader />
  </div>

  <div class="min-h-screen flex flex-col bg-white dark:bg-[#171717]">
    <div class="flex flex-col md:flex-row flex-1">
      <!-- Left Side -->
      <div
        class="bg-black text-white w-full md:w-1/2 p-8 md:p-16 flex flex-col"
      >
        <div
          class="hidden max-w-md mx-auto md:mx-0 md:ml-auto flex-1 md:flex flex-col justify-center"
        >
          <h1 class="text-4xl md:text-3xl font-bold mb-6">
            Trade with confidence
          </h1>
          <p class="text-lg text-gray-300 mb-12">
            Trusted by millions, delivering the fastest trade execution, with
            powerful trading tools and a self-custody wallet.
          </p>
          <div
            class="hidden bg-zinc-900 max-w-2xl rounded-3xl overflow-hidden border border-zinc-800 md:block"
          >
            <center>
              <img
                src="/images/f4.webp"
                alt="Trading Chart Preview"
                height="340"
                width="300"
                class="mx-auto"
              />
            </center>
          </div>
        </div>
      </div>

      <!-- Right Side -->
      <div class="bg-white w-full -mt-6 md:w-1/2 p-8 md:p-16 flex flex-col">
        <div
          class="max-w-md mx-auto md:mx-0 md:mr-auto flex-1 flex flex-col justify-center"
        >
          <h1 class="text-4xl font-bold mb-1 text-black">Verify it's you</h1>
          <span class="text-sm mb-8 text-gray-600 font-light">
            Look out for the code we've sent to <strong>{{ userEmail }}</strong>
          </span>

          <!-- Success Message -->
          <div
            v-if="successMessage"
            class="mb-4 p-3 text-green-700 bg-green-100 rounded text-sm"
          >
            <UAlert
              color="success"
              variant="subtle"
              title="Success!"
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
              title="Failed!"
              :description="errorMessage"
              icon="i-lucide-x-circle"
            />
          </div>

          <form
            class="w-full mx-auto p-6 bg-white dark:bg-[#171717d6] shadow-md rounded-lg"
            @submit.prevent="verifyHandler"
          >
            <div class="mb-8">
              <div class="flex justify-center space-x-3 mb-8">
                <input
                  v-for="n in 6"
                  :key="n"
                  :ref="`codeInput${n}`"
                  type="text"
                  inputmode="numeric"
                  maxlength="1"
                  v-model="verificationCode[n - 1]"
                  @input="handleInput(n, $event)"
                  @keydown="handleKeydown(n, $event)"
                  @paste="handlePaste"
                  :disabled="loading"
                  class="w-10 h-10 md:w-10 md:h-10 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white dark:bg-gray-800 text-black dark:text-white"
                  autocomplete="off"
                />
              </div>

              <button
                type="submit"
                :disabled="loading || !isCodeComplete"
                class="cursor-pointer w-full bg-black dark:bg-white dark:text-black text-white hover:shadow-lg py-1.5 rounded-md disabled:cursor-not-allowed disabled:bg-gray-500"
              >
                <template v-if="loading">
                  <Icon
                    name="gg:spinner-two-alt"
                    class="animate-spin text-2xl mx-auto"
                  />
                </template>
                <template v-else> Verify </template>
              </button>
            </div>
          </form>

          <div class="text-center text-gray-600 mt-5">
            <span>Didn't receive anything? </span>
            <button
              type="button"
              @click="resendCode"
              :disabled="resendCooldown > 0"
              class="font-medium underline text-black hover:text-gray-700 disabled:text-gray-400"
            >
              Resend code {{ resendCooldown > 0 ? `(${resendCooldown})` : "" }}
            </button>
            <span> or </span>
            <button
              type="button"
              class="font-medium text-black underline hover:text-gray-700"
            >
              change email
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { navigateTo } from "#app";
const config = useRuntimeConfig();

const verificationCode = ref(Array(6).fill(""));
const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const userEmail = ref("you@example.com");
const resendCooldown = ref(0);
let countdownInterval = null;

const isCodeComplete = computed(() => {
  return verificationCode.value.every((digit) => digit !== "");
});

// Auto-focus first input on mount
onMounted(() => {
  focusInput(1);
  startResendCountdown();

  // Try to get user email from session or localStorage
  const storedEmail = localStorage.getItem("userEmail") || "your email";
  userEmail.value =
    storedEmail !== "you@example.com" ? storedEmail : "your email";
});

onUnmounted(() => {
  if (countdownInterval) clearInterval(countdownInterval);
});

const startResendCountdown = () => {
  resendCooldown.value = 60;
  countdownInterval = setInterval(() => {
    resendCooldown.value--;
    if (resendCooldown.value <= 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);
};

const focusInput = (index) => {
  const inputRef = `codeInput${index}`;
  nextTick(() => {
    const input = document.querySelector(`[ref="${inputRef}"]`);
    if (input) input.focus();
  });
};

const handleInput = (index, event) => {
  const value = event.target.value;

  // Only allow numbers
  if (value && !/^\d$/.test(value)) {
    verificationCode.value[index - 1] = "";
    return;
  }

  // Move to next input if current has value
  if (value && index < 6) {
    focusInput(index + 1);
  }

  // Auto-submit when all digits are filled
  if (isCodeComplete.value) {
    verifyHandler();
  }
};

const handleKeydown = (index, event) => {
  // Handle backspace
  if (event.key === "Backspace") {
    if (!verificationCode.value[index - 1] && index > 1) {
      focusInput(index - 1);
    }
  }

  // Handle arrow keys
  if (event.key === "ArrowLeft" && index > 1) {
    event.preventDefault();
    focusInput(index - 1);
  }
  if (event.key === "ArrowRight" && index < 6) {
    event.preventDefault();
    focusInput(index + 1);
  }
};

const handlePaste = (event) => {
  event.preventDefault();
  const pasteData = event.clipboardData.getData("text");
  const numbers = pasteData.replace(/\D/g, "").split("").slice(0, 6);

  numbers.forEach((num, index) => {
    if (index < 6) {
      verificationCode.value[index] = num;
    }
  });

  if (numbers.length === 6) {
    verifyHandler();
  } else {
    focusInput(numbers.length + 1);
  }
};

const verifyHandler = async () => {
  if (!isCodeComplete.value) return;

  loading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    const code = verificationCode.value.join("");
    const response = await $fetch(`${config.public.apiBase}/auth/verify.php`, {
      method: "POST",
      body: {
        verificationCode: code,
      },
      credentials: "include",
    });

    if (!response.success) {
      throw new Error(response.message);
    }

    successMessage.value = response.message;
    setTimeout(() => {
      navigateTo("/dashboard"); // Redirect to dashboard after successful verification
    }, 2000);
  } catch (err) {
    errorMessage.value =
      err?.data?.message ||
      err?.message ||
      "Verification failed. Please try again.";
    // Clear the code on error
    verificationCode.value = Array(6).fill("");
    focusInput(1);
  } finally {
    loading.value = false;
  }
};

const resendCode = async () => {
  if (resendCooldown.value > 0) return;

  errorMessage.value = "";
  successMessage.value = "";

  try {
    const response = await $fetch(
      `${config.public.apiBase}/auth/resend-verification.php`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!response.success) {
      throw new Error(response.message);
    }

    successMessage.value = response.message;
    startResendCountdown();
  } catch (err) {
    errorMessage.value =
      err?.data?.message ||
      err?.message ||
      "Failed to resend code. Please try again.";
  }
};
</script>
