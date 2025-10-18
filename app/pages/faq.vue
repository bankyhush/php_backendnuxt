<template>
  <main>
    <div class="pb-[2px]">
      <HeroHeader />
    </div>

    <div class="bg-white text-black dark:bg-black dark:text-white">
      <!-- Hero Section -->
      <section
        class="overflow-hidden py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900"
      >
        <div class="container mx-auto max-w-6xl px-6 text-center">
          <h1 class="text-5xl font-bold tracking-tight md:text-6xl">
            Frequently Asked Questions
          </h1>
          <p
            class="mt-6 text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto"
          >
            Find quick answers to common questions about trading, accounts,
            security, and more.
          </p>
        </div>
      </section>

      <!-- FAQ Content -->
      <section class="py-20 bg-white dark:bg-black">
        <div class="container mx-auto max-w-4xl px-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Left Column -->
            <div>
              <h2 class="text-3xl font-bold mb-8">General Questions</h2>

              <div class="space-y-6">
                <div class="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <h3 class="text-xl font-semibold mb-3">
                    How do I create an account?
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    Click the "Sign Up" button, provide your email address,
                    create a secure password, and complete the verification
                    process. Account approval typically takes 1-2 business days.
                  </p>
                </div>

                <div class="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <h3 class="text-xl font-semibold mb-3">
                    What documents do I need for verification?
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    You'll need a government-issued ID (passport or driver's
                    license) and proof of address (utility bill or bank
                    statement) dated within the last 3 months.
                  </p>
                </div>

                <div class="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <h3 class="text-xl font-semibold mb-3">
                    What are your trading hours?
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    Stock markets follow exchange hours, Forex is available
                    24/5, and Cryptocurrencies can be traded 24/7. Commodities
                    have specific trading sessions based on the product.
                  </p>
                </div>
              </div>
            </div>

            <!-- Right Column -->
            <div>
              <h2 class="text-3xl font-bold mb-8">Trading & Fees</h2>

              <div class="space-y-6">
                <div class="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <h3 class="text-xl font-semibold mb-3">
                    What are your commission rates?
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    Commission rates vary by asset class. Stocks start at $0.005
                    per share, Forex spreads start from 0.8 pips, and Crypto
                    trading fees are 0.1% per trade. View our complete fee
                    schedule for detailed pricing.
                  </p>
                </div>

                <div class="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <h3 class="text-xl font-semibold mb-3">
                    How do deposits and withdrawals work?
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    Deposits are instant via bank transfer, credit card, or
                    cryptocurrency. Withdrawals typically process within 1-3
                    business days for bank transfers and instantly for crypto.
                  </p>
                </div>

                <div class="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <h3 class="text-xl font-semibold mb-3">
                    Do you offer demo accounts?
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    Yes, we offer free demo accounts with $10,000 in virtual
                    funds to practice trading strategies risk-free.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Security FAQ -->
          <div class="mt-16">
            <h2 class="text-3xl font-bold mb-8 text-center">
              Security & Support
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-6">
                <h3 class="text-xl font-semibold mb-3">
                  How secure is my account?
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  We use bank-level security including 2FA, biometric
                  authentication, and SSL encryption. 95% of assets are stored
                  in cold wallets with multiple backups.
                </p>
              </div>

              <div class="bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-6">
                <h3 class="text-xl font-semibold mb-3">
                  What if I forget my password?
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Use the "Forgot Password" feature on the login page. You'll
                  receive an email with instructions to reset your password
                  securely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Support -->
      <section class="py-20 bg-gray-50 dark:bg-[#171717]">
        <div class="container mx-auto max-w-4xl px-6 text-center">
          <h2 class="text-4xl font-bold mb-6">Still Need Help?</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Our support team is available 24/7 to assist you with any questions.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <button
              class="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/80 transition"
            >
              Contact Support
            </button>
            <button
              class="border border-gray-600 dark:border-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Live Chat
            </button>
          </div>
        </div>
      </section>

      <HeroFooter />
    </div>
  </main>
</template>
