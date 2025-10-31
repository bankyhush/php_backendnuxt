<template>
  <main>
    <!-- Hero -->
    <div class="pb-[2px]">
      <HeroHeader />
    </div>

    <div class="bg-white text-black dark:bg-black dark:text-white">
      <!-- Our Story -->
      <section class="overflow-hidden py-24 lg:py-36">
        <div
          class="container mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-12"
        >
          <div class="lg:w-1/2">
            <h1 class="text-5xl font-semibold tracking-tight md:text-6xl">
              Our Story
            </h1>
            <p
              class="mt-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              Founded in 2016 with a bold vision to revolutionize crypto and
              stock trading, Tradein247 started as a small team with big
              ambitions. Today, we're a global platform serving millions of
              traders worldwide, built on cutting-edge technology, security, and
              an unwavering commitment to our users' success.
            </p>

            <div class="mt-10 flex flex-wrap gap-4">
              <NuxtLink to="#mission">
                <button
                  class="bg-primary text-white px-5 py-2 rounded-md hover:bg-primary/80 transition"
                >
                  Our Mission
                </button>
              </NuxtLink>
              <NuxtLink to="#trading">
                <button
                  class="border border-gray-500 text-gray-800 dark:text-white px-5 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  Trading Features
                </button>
              </NuxtLink>
            </div>
          </div>
          <div class="mt-10 lg:mt-0 lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80"
              class="rounded-xl shadow-lg w-full h-[400px] object-cover"
              alt="Trading platform interface"
            />
          </div>
        </div>
      </section>

      <!-- Vision & Mission -->
      <section id="mission" class="py-20 bg-gray-100 dark:bg-[#1e1e1e]">
        <div class="container mx-auto max-w-5xl text-center px-6">
          <h2 class="text-4xl font-semibold mb-6">Our Vision & Mission</h2>
          <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Our mission is to democratize access to cryptocurrency and stock
            trading, providing professional-grade tools and insights to traders
            of all levels. Our vision is a future where everyone can participate
            confidently in global financial markets through intuitive technology
            and comprehensive education.
          </p>
        </div>
      </section>

      <!-- Trading Features -->
      <section id="trading" class="py-20 bg-white dark:bg-black">
        <div class="container mx-auto max-w-6xl px-6">
          <h2 class="text-center text-4xl font-semibold mb-16">
            Advanced Trading Features
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="text-center p-6">
              <div
                class="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <span class="text-2xl">⚡</span>
              </div>
              <h3 class="text-xl font-semibold mb-3">Real-Time Execution</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Lightning-fast trade execution across crypto and stock markets
                with advanced order types
              </p>
            </div>
            <div class="text-center p-6">
              <div
                class="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <span class="text-2xl">📊</span>
              </div>
              <h3 class="text-xl font-semibold mb-3">Advanced Analytics</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Professional charting tools, technical indicators, and market
                insights
              </p>
            </div>
            <div class="text-center p-6">
              <div
                class="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <span class="text-2xl">🛡️</span>
              </div>
              <h3 class="text-xl font-semibold mb-3">Secure Platform</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Bank-level security with cold storage and institutional-grade
                protection
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Global Impact / Stats -->
      <section
        class="py-20 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700"
      >
        <div class="container mx-auto px-6 max-w-6xl">
          <h2 class="text-center text-4xl font-semibold mb-16">
            Our Trading Impact
          </h2>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center"
          >
            <div>
              <p class="text-5xl font-bold text-primary">5M+</p>
              <p class="mt-2 text-gray-600 dark:text-gray-300">
                Active Traders
              </p>
            </div>
            <div>
              <p class="text-5xl font-bold text-primary">99.9%</p>
              <p class="mt-2 text-gray-600 dark:text-gray-300">
                Platform Uptime
              </p>
            </div>
            <div>
              <p class="text-5xl font-bold text-primary">$50B+</p>
              <p class="mt-2 text-gray-600 dark:text-gray-300">
                Monthly Volume
              </p>
            </div>
            <div>
              <p class="text-5xl font-bold text-primary">150+</p>
              <p class="mt-2 text-gray-600 dark:text-gray-300">
                Markets Covered
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Our Values -->
      <section class="py-20 bg-gray-50 dark:bg-[#171717]">
        <div class="container mx-auto max-w-4xl text-center px-6">
          <h2 class="text-4xl font-semibold mb-8">Our Trading Philosophy</h2>
          <p
            class="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed"
          >
            <i
              >Innovation, transparency, and trader success drive everything we
              do. We believe in empowering traders with the tools and knowledge
              needed to navigate today's dynamic markets.</i
            >
          </p>
          <img
            src="https://cdn.dribbble.com/userupload/45173325/file/489b3c5500a45b99480dc20158e3537c.png?resize=2048x1152&vertical=center"
            class="w-full rounded-xl shadow-lg object-cover h-[400px]"
            alt="Trading analytics dashboard"
          />
        </div>
      </section>

      <!-- Call to Action -->
      <section
        class="py-24 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800"
      >
        <div class="container mx-auto px-6 max-w-4xl text-center">
          <h2 class="text-4xl font-semibold">Start Trading with Confidence</h2>
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Join millions of traders who trust Tradein247 for their crypto and
            stock trading needs.
          </p>
          <div class="mt-10 flex flex-wrap justify-center gap-4">
            <NuxtLink
              href="/login"
              class="border border-gray-600 dark:border-white px-6 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >Get Started</NuxtLink
            >
          </div>
        </div>
      </section>

      <!-- Footer -->
      <HeroFooter />
    </div>
  </main>
</template>

<!-- Add to your style or script section -->
<style scoped>
.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
