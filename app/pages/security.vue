<template>
  <main>
    <div class="pb-[2px]">
      <HeroHeader />
    </div>

    <div class="bg-white text-black dark:bg-black dark:text-white">
      <!-- Hero Section -->
      <section
        class="overflow-hidden py-20 lg:py-28 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900"
      >
        <div class="container mx-auto max-w-6xl px-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 class="text-5xl font-bold tracking-tight md:text-6xl">
                Advanced Wallet Security
              </h1>
              <p
                class="mt-6 text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
              >
                Your assets are protected by enterprise-grade security
                infrastructure featuring multi-layered protection, cold storage
                solutions, and institutional-grade safeguards.
              </p>
              <div class="mt-8 flex flex-wrap gap-4">
                <button
                  class="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/80 transition"
                >
                  Explore Security Features
                </button>
                <button
                  class="border border-gray-600 dark:border-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  Security Audit Report
                </button>
              </div>
            </div>
            <div class="relative">
              <img
                src="https://images.unsplash.com/photo-1563013541-2d0acd5b32b9?auto=format&fit=crop&w=1000&q=80"
                class="rounded-2xl shadow-2xl w-full h-80 object-cover"
                alt="Secure digital vault protection"
              />
              <div class="absolute inset-0 bg-blue-500/10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Security Features Grid -->
      <section class="py-20 bg-white dark:bg-black">
        <div class="container mx-auto max-w-6xl px-6">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold mb-6">
              Multi-Layered Security Architecture
            </h2>
            <p
              class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Our comprehensive security framework ensures your assets are
              protected at every level with industry-leading protocols.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Feature 1 -->
            <div
              class="bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl p-8 hover:shadow-xl transition-shadow"
            >
              <div
                class="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
              >
                <svg
                  class="w-8 h-8 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-semibold mb-4">Cold Storage Vaults</h3>
              <p class="text-gray-600 dark:text-gray-300">
                95% of digital assets are stored in offline cold wallets with
                geographically distributed, access-controlled secure facilities.
              </p>
            </div>

            <!-- Feature 2 -->
            <div
              class="bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl p-8 hover:shadow-xl transition-shadow"
            >
              <div
                class="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
              >
                <svg
                  class="w-8 h-8 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-semibold mb-4">
                Multi-Signature Protection
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                All transactions require multiple authorized approvals from
                separate security teams, eliminating single points of failure.
              </p>
            </div>

            <!-- Feature 3 -->
            <div
              class="bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl p-8 hover:shadow-xl transition-shadow"
            >
              <div
                class="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
              >
                <svg
                  class="w-8 h-8 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-semibold mb-4">Redundant Backups</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Multiple encrypted backups across secure global locations ensure
                asset recovery under any circumstances.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Hot & Cold Wallet System -->
      <section class="py-20 bg-gray-50 dark:bg-[#171717]">
        <div class="container mx-auto max-w-6xl px-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-4xl font-bold mb-8">
                Secure Hot & Cold Wallet Infrastructure
              </h2>
              <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
                We employ a sophisticated hybrid wallet system that balances
                accessibility with maximum security, ensuring your assets are
                protected while remaining available for your trading needs.
              </p>

              <div class="space-y-6">
                <div class="flex items-start gap-4">
                  <div
                    class="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-2 mt-1"
                  >
                    <svg
                      class="w-6 h-6 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-xl font-semibold mb-2">
                      Cold Wallet Storage
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      The majority of assets are stored in offline cold wallets,
                      completely isolated from internet access and protected in
                      secure facilities.
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div
                    class="bg-green-100 dark:bg-green-900/30 rounded-lg p-2 mt-1"
                  >
                    <svg
                      class="w-6 h-6 text-green-600 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-xl font-semibold mb-2">
                      Hot Wallet Operations
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Strategically limited amounts in online hot wallets enable
                      seamless trading while maintaining robust security
                      protocols and insurance coverage.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="relative">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80"
                class="rounded-2xl shadow-xl w-full h-96 object-cover"
                alt="Secure wallet infrastructure diagram"
              />
              <div
                class="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl -z-10"
              ></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Security Protocols -->
      <section class="py-20 bg-white dark:bg-black">
        <div class="container mx-auto max-w-6xl px-6">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold mb-6">
              Enterprise-Grade Security Protocols
            </h2>
            <p
              class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Our security measures meet and exceed institutional standards,
              providing peace of mind for all your digital assets.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Protocol 1 -->
            <div
              class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800"
            >
              <div class="flex items-center gap-4 mb-6">
                <div class="bg-white dark:bg-blue-900 rounded-xl p-3 shadow-lg">
                  <svg
                    class="w-8 h-8 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 class="text-2xl font-semibold">Multi-Party Computation</h3>
              </div>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Advanced cryptographic techniques ensure that no single
                individual can access or move assets, requiring coordinated
                approval from multiple authorized parties.
              </p>
              <ul class="text-gray-600 dark:text-gray-300 space-y-2">
                <li class="flex items-center gap-2">
                  <svg
                    class="w-4 h-4 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Distributed key management
                </li>
                <li class="flex items-center gap-2">
                  <svg
                    class="w-4 h-4 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Threshold signature schemes
                </li>
                <li class="flex items-center gap-2">
                  <svg
                    class="w-4 h-4 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  No single point of failure
                </li>
              </ul>
            </div>

            <!-- Protocol 2 -->
            <div
              class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800"
            >
              <div class="flex items-center gap-4 mb-6">
                <div
                  class="bg-white dark:bg-green-900 rounded-xl p-3 shadow-lg"
                >
                  <svg
                    class="w-8 h-8 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    />
                  </svg>
                </div>
                <h3 class="text-2xl font-semibold">
                  24/7 Monitoring & Response
                </h3>
              </div>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Round-the-clock security monitoring with automated threat
                detection and immediate incident response protocols to protect
                against emerging threats.
              </p>
              <ul class="text-gray-600 dark:text-gray-300 space-y-2">
                <li class="flex items-center gap-2">
                  <svg
                    class="w-4 h-4 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Real-time threat intelligence
                </li>
                <li class="flex items-center gap-2">
                  <svg
                    class="w-4 h-4 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Automated security alerts
                </li>
                <li class="flex items-center gap-2">
                  <svg
                    class="w-4 h-4 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Immediate incident response
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Insurance & Compliance -->
      <section class="py-20 bg-gray-50 dark:bg-[#171717]">
        <div class="container mx-auto max-w-6xl px-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div class="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1000&q=80"
                class="rounded-2xl shadow-xl w-full h-96 object-cover"
                alt="Insurance and compliance certification"
              />
            </div>
            <div class="order-1 lg:order-2">
              <h2 class="text-4xl font-bold mb-8">
                Insurance Protection & Regulatory Compliance
              </h2>
              <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
                We go beyond technical security to provide comprehensive asset
                protection through insurance coverage and strict regulatory
                compliance.
              </p>

              <div class="space-y-6">
                <div
                  class="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 border-l-4 border-blue-500"
                >
                  <h4 class="text-xl font-semibold mb-3">
                    Digital Asset Insurance
                  </h4>
                  <p class="text-gray-600 dark:text-gray-300">
                    Comprehensive insurance coverage for assets in both hot and
                    cold storage, provided by leading global insurers
                    specializing in digital assets.
                  </p>
                </div>

                <div
                  class="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 border-l-4 border-green-500"
                >
                  <h4 class="text-xl font-semibold mb-3">
                    Regulatory Compliance
                  </h4>
                  <p class="text-gray-600 dark:text-gray-300">
                    Full compliance with international financial regulations,
                    regular third-party audits, and transparent reporting
                    standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section
        class="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
      >
        <div
          class="container mx-auto max-w-4xl px-6 text-center text-black dark:text-white"
        >
          <h2 class="text-4xl font-bold mb-6">Ready to Secure Your Assets?</h2>
          <p class="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join millions of users who trust Fotmob's enterprise-grade security
            infrastructure to protect their digital assets.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <button
              class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Get Started Securely
            </button>
            <button
              class="border border-white text-black dark:text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Download Security Whitepaper
            </button>
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
  name: "WalletSecurity",
  head() {
    return {
      title: "Wallet Security - Fotmob",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Learn how Fotmob protects your digital assets with enterprise-grade security, cold storage, multi-signature protection, and comprehensive insurance.",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Custom animations can be added here */
</style>
