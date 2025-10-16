<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-[#171717a8] bg-opacity-50 z-50 flex items-center justify-center p-4"
  >
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
    >
      <div
        class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
      >
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          Send Email - {{ user?.fullname }}
        </h3>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <Icon name="mdi:close" class="w-6 h-6" />
        </button>
      </div>

      <form @submit.prevent="sendEmail" class="p-6 space-y-4">
        <!-- Recipient Info -->
        <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <div
                class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center"
              >
                <span class="text-white font-semibold text-sm">
                  {{ user?.fullname?.charAt(0)?.toUpperCase() }}
                </span>
              </div>
            </div>
            <div>
              <p class="text-sm font-medium text-blue-900 dark:text-blue-100">
                {{ user?.fullname }}
              </p>
              <p class="text-sm text-blue-700 dark:text-blue-300">
                {{ user?.email }}
              </p>
            </div>
          </div>
        </div>

        <!-- Subject -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Subject
          </label>
          <input
            v-model="form.subject"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Enter email subject"
            required
          />
        </div>

        <!-- Message -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Message
          </label>
          <textarea
            v-model="form.message"
            rows="12"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
            placeholder="Compose your message here..."
            required
          ></textarea>
        </div>

        <!-- Quick Templates -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Quick Templates
          </label>
          <div class="grid grid-cols-2 gap-2">
            <button
              type="button"
              @click="applyTemplate('welcome')"
              class="px-3 py-2 text-xs bg-green-100 hover:bg-green-200 text-green-800 dark:bg-green-900 dark:hover:bg-green-800 dark:text-green-300 rounded-md transition-colors"
            >
              Welcome
            </button>
            <button
              type="button"
              @click="applyTemplate('account_update')"
              class="px-3 py-2 text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-blue-300 rounded-md transition-colors"
            >
              Account Update
            </button>
            <button
              type="button"
              @click="applyTemplate('promotion')"
              class="px-3 py-2 text-xs bg-purple-100 hover:bg-purple-200 text-purple-800 dark:bg-purple-900 dark:hover:bg-purple-800 dark:text-purple-300 rounded-md transition-colors"
            >
              Promotion
            </button>
            <button
              type="button"
              @click="applyTemplate('support')"
              class="px-3 py-2 text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:hover:bg-yellow-800 dark:text-yellow-300 rounded-md transition-colors"
            >
              Support
            </button>
          </div>
        </div>

        <!-- Character Count -->
        <div class="text-right">
          <span
            class="text-sm"
            :class="
              form.message.length > 5000 ? 'text-red-500' : 'text-gray-500'
            "
          >
            {{ form.message.length }}/5000 characters
          </span>
        </div>

        <!-- Message Preview -->
        <div
          v-if="form.message"
          class="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700"
        >
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Preview
          </h4>
          <div
            class="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap"
          >
            {{ form.message }}
          </div>
        </div>

        <!-- Status Message -->
        <div
          v-if="message.text"
          :class="[
            'p-3 rounded-md text-sm flex items-start gap-2',
            message.type === 'success'
              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
              : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
          ]"
        >
          <Icon
            :name="
              message.type === 'success'
                ? 'mdi:check-circle-outline'
                : 'mdi:alert-circle-outline'
            "
            class="w-5 h-5 mt-0.5"
          />
          <span>{{ message.text }}</span>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {{ message.type === "success" ? "Close" : "Cancel" }}
          </button>
          <button
            type="submit"
            :disabled="sending"
            :class="[
              'cursor-pointer flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center',
              sending ? 'opacity-50 cursor-not-allowed' : '',
            ]"
          >
            <Icon
              v-if="sending"
              name="mdi:loading"
              class="w-4 h-4 mr-2 animate-spin"
            />
            {{ sending ? "Sending..." : "Send Email" }}
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
});

const emit = defineEmits(["close", "success"]);

const config = useRuntimeConfig();
const sending = ref(false);
const message = ref({ type: "", text: "" });

const form = ref({
  subject: "",
  message: "",
});

// Reset form when modal opens
watch(
  () => props.show,
  (isOpen) => {
    if (isOpen) {
      form.value = {
        subject: "",
        message: "",
      };
      message.value = { type: "", text: "" };
    }
  }
);

// Quick email templates
const emailTemplates = {
  welcome: {
    subject: "Welcome to Our Platform!",
    message: `Dear ${
      props.user?.fullname || "Valued Customer"
    },\n\nWelcome to our platform! We're thrilled to have you on board.\n\nAt our platform, you'll find:\n• Secure and reliable trading environment\n• Competitive rates and low fees\n• 24/7 customer support\n• Advanced trading tools\n\nYour account has been successfully created and is ready for use. You can now:\n1. Deposit funds to start trading\n2. Explore our various trading options\n3. Set up your trading preferences\n\nIf you have any questions or need assistance, our support team is always here to help.\n\nBest regards,\nThe Platform Team`,
  },
  account_update: {
    subject: "Important Account Update",
    message: `Dear ${
      props.user?.fullname || "Valued Customer"
    },\n\nThis is an important update regarding your account.\n\nWe're continuously working to improve our services and enhance your trading experience. Please take a moment to review the following updates:\n\n• Enhanced security features\n• New trading instruments available\n• Updated fee structure\n• Improved user interface\n\nThese changes are designed to provide you with a better trading experience and enhanced security for your funds.\n\nIf you have any questions about these updates, please don't hesitate to contact our support team.\n\nThank you for being a valued member of our platform.\n\nSincerely,\nThe Platform Team`,
  },
  promotion: {
    subject: "Special Promotion Just For You!",
    message: `Dear ${
      props.user?.fullname || "Valued Customer"
    },\n\nWe have an exclusive promotion available for you!\n\nAs a valued member of our platform, we're offering you a special opportunity:\n\n🎁 SPECIAL OFFER:\n• Increased returns on selected trades\n• Reduced trading fees for the next 7 days\n• Bonus on your next deposit\n• Priority customer support\n\nThis promotion is available for a limited time only. Don't miss this chance to maximize your trading potential!\n\nTo take advantage of this offer, simply continue with your regular trading activities or make a deposit to qualify for the bonus.\n\nHappy trading!\n\nBest regards,\nThe Platform Team`,
  },
  support: {
    subject: "Following Up on Your Account",
    message: `Dear ${
      props.user?.fullname || "Valued Customer"
    },\n\nWe hope this message finds you well.\n\nWe're reaching out to ensure you're having a great experience with our platform. Our records show you've been an active member, and we want to make sure everything is meeting your expectations.\n\nIs there anything we can help you with?\n• Account-related questions\n• Trading assistance\n• Technical support\n• Feature explanations\n\nOur support team is available 24/7 to assist you with any questions or concerns you may have. Don't hesitate to reach out to us.\n\nThank you for choosing our platform for your trading needs.\n\nWarm regards,\nCustomer Support Team`,
  },
};

const applyTemplate = (templateKey) => {
  const template = emailTemplates[templateKey];
  if (template) {
    form.value.subject = template.subject;
    form.value.message = template.message;
  }
};

const sendEmail = async () => {
  sending.value = true;
  message.value = { type: "", text: "" };

  try {
    const response = await $fetch(
      `${config.public.apiBase}/admin/send-email.php`,
      {
        method: "POST",
        body: {
          userid: props.user.id,
          email: props.user.email,
          username: props.user.fullname,
          subject: form.value.subject,
          message: form.value.message,
        },
        credentials: "include",
      }
    );

    if (response.success) {
      message.value = { type: "success", text: response.message };
      emit("success"); // Notify parent
      // Do not auto-close modal to allow user to read the message
    } else {
      message.value = { type: "error", text: response.message };
    }
  } catch (error) {
    console.error("Failed to send email:", error);
    message.value = { type: "error", text: "Failed to send email" };
  }

  sending.value = false;
};
</script>
