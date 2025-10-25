<template>
  <main>
    <!-- Hero -->
    <div class="pb-[2px]">
      <HeroHeader />
    </div>

    <div class="bg-white text-black dark:bg-black dark:text-white">
      <!-- Contact Hero -->
      <section class="overflow-hidden py-20 lg:py-28">
        <div class="container mx-auto max-w-6xl px-6 text-center">
          <h1 class="text-5xl font-semibold tracking-tight md:text-6xl">
            Get in Touch
          </h1>
          <p
            class="mt-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto"
          >
            We'd love to hear from you. Whether you have questions, need
            support, or want to explore partnerships, our team is here to help.
          </p>
        </div>
      </section>

      <!-- Contact Methods -->
      <section class="py-16 bg-gray-50 dark:bg-[#171717]">
        <div class="container mx-auto max-w-6xl px-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Email -->
            <div
              class="text-center p-8 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg"
            >
              <div
                class="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <svg
                  class="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-3">Email Us</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Send us an email and we'll respond within 24 hours
              </p>
              <NuxtLink
                href="mailto:hello@company.com"
                class="text-primary font-medium hover:underline"
              >
                hello@company.com
              </NuxtLink>
            </div>

            <!-- Phone -->
            <div
              class="text-center p-8 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg"
            >
              <div
                class="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <svg
                  class="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-3">Call Us</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Available Monday to Friday, 9AM - 6PM EST
              </p>
              <NuxtLink
                href="tel:+1-555-123-4567"
                class="text-primary font-medium hover:underline"
              >
                +1 (555) 123-4567
              </NuxtLink>
            </div>

            <!-- Office -->
            <div
              class="text-center p-8 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg"
            >
              <div
                class="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <svg
                  class="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-3">Visit Us</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Come say hello at our headquarters
              </p>
              <p class="text-gray-800 dark:text-gray-200 font-medium">
                123 Business Ave<br />
                San Francisco, CA 94107
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Form & Map -->
      <section class="py-20 bg-white dark:bg-black">
        <div class="container mx-auto max-w-6xl px-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Contact Form -->
            <div>
              <h2 class="text-3xl font-semibold mb-6">Send us a Message</h2>
              <form class="space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      for="firstName"
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-[#1a1a1a] transition"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label
                      for="lastName"
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-[#1a1a1a] transition"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-[#1a1a1a] transition"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    for="subject"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    required
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-[#1a1a1a] transition"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="careers">Careers</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    for="message"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows="6"
                    required
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-[#1a1a1a] transition"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  class="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/80 transition duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>

            <!-- Map & Additional Info -->
            <div class="space-y-8">
              <!-- Map Placeholder -->
              <div
                class="bg-gray-200 dark:bg-[#1a1a1a] rounded-xl overflow-hidden h-80"
              >
                <div
                  class="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400"
                >
                  <div class="text-center">
                    <svg
                      class="w-16 h-16 mx-auto mb-4 opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <p>Interactive Map</p>
                    <p class="text-sm mt-2">123 Business Ave, San Francisco</p>
                  </div>
                </div>
              </div>

              <!-- Office Hours -->
              <div class="bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-6">
                <h3 class="text-xl font-semibold mb-4">Office Hours</h3>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400"
                      >Monday - Friday</span
                    >
                    <span class="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400"
                      >Saturday</span
                    >
                    <span class="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Sunday</span>
                    <span class="font-medium">Closed</span>
                  </div>
                </div>
              </div>

              <!-- Emergency Support -->
              <div class="bg-primary/5 border border-primary/20 rounded-xl p-6">
                <h3 class="text-xl font-semibold mb-3 text-primary">
                  Emergency Support
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  For urgent technical issues affecting your account or trading.
                </p>
                <NuxtLink
                  href="tel:+1-555-911-4567"
                  class="text-primary font-medium hover:underline"
                >
                  +1 (555) 911-4567
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Preview -->
      <section class="py-20 bg-gray-50 dark:bg-[#171717]">
        <div class="container mx-auto max-w-4xl px-6 text-center">
          <h2 class="text-3xl font-semibold mb-6">Common Questions</h2>
          <p
            class="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Check our FAQ section for quick answers to common questions about
            accounts, trading, security, and more.
          </p>
          <NuxtLink
            href="/faq"
            class="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Visit Help Center
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </NuxtLink>
        </div>
      </section>

      <!-- CTA Section -->
      <section
        class="py-20 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800"
      >
        <div class="container mx-auto px-6 max-w-4xl text-center">
          <h2 class="text-4xl font-semibold">Ready to Get Started?</h2>
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Join millions of users who trust us with their crypto journey.
          </p>
          <div class="mt-10 flex flex-wrap justify-center gap-4">
            <NuxtLink
              href="/register"
              class="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/80 transition font-medium"
            >
              Create Account
            </NuxtLink>
            <NuxtLink
              href="/login"
              class="border border-gray-600 dark:border-white px-8 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition font-medium"
            >
              Request Demo
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <HeroFooter />
    </div>
  </main>
</template>

<script>
export default {
  name: "ContactPage",
  // You can add form handling logic here
  methods: {
    handleSubmit(event) {
      event.preventDefault();
      // Add your form submission logic here
      console.log("Form submitted");
      // You can integrate with your backend or email service
    },
  },
};
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
