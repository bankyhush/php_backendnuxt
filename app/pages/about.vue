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
              Founded in 2018 with a bold vision to redefine crypto trading, we
              started as a small team with big ideas. Today, we're a global
              company serving millions, built on trust, innovation, and a
              relentless focus on user experience.
            </p>

            <div class="mt-10 flex flex-wrap gap-4">
              <NuxtLink to="#leadership">
                <button
                  class="bg-primary text-white px-5 py-2 rounded-md hover:bg-primary/80 transition"
                >
                  Meet the Team
                </button>
              </NuxtLink>
              <NuxtLink to="#mission">
                <button
                  class="border border-gray-500 text-gray-800 dark:text-white px-5 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  Our Mission
                </button>
              </NuxtLink>
            </div>
          </div>
          <div class="mt-10 lg:mt-0 lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1600180758890-6a7d6f1d510e?auto=format&fit=crop&w=1000&q=80"
              class="rounded-xl shadow-lg w-full h-[400px] object-cover"
              alt="Team collaborating"
            />
          </div>
        </div>
      </section>

      <!-- Vision & Mission -->
      <section id="mission" class="py-20 bg-gray-100 dark:bg-[#1e1e1e]">
        <div class="container mx-auto max-w-5xl text-center px-6">
          <h2 class="text-4xl font-semibold mb-6">Our Vision & Mission</h2>
          <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Our mission is to democratize access to cryptocurrency and financial
            tools, enabling individuals worldwide to achieve economic freedom.
            Our vision is a future where financial systems are open, accessible,
            and empowering to all.
          </p>
        </div>
      </section>

      <!-- Global Impact / Stats -->
      <section
        class="py-20 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700"
      >
        <div class="container mx-auto px-6 max-w-6xl">
          <h2 class="text-center text-4xl font-semibold mb-16">
            Our Global Impact
          </h2>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center"
          >
            <div>
              <p class="text-5xl font-bold text-primary">5M+</p>
              <p class="mt-2 text-gray-600 dark:text-gray-300">
                Users Worldwide
              </p>
            </div>
            <div>
              <p class="text-5xl font-bold text-primary">98%</p>
              <p class="mt-2 text-gray-600 dark:text-gray-300">
                Customer Satisfaction
              </p>
            </div>
            <div>
              <p class="text-5xl font-bold text-primary">$10B+</p>
              <p class="mt-2 text-gray-600 dark:text-gray-300">Assets Traded</p>
            </div>
            <div>
              <p class="text-5xl font-bold text-primary">40+</p>
              <p class="mt-2 text-gray-600 dark:text-gray-300">
                Countries Served
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Our Values -->
      <section class="py-20 bg-gray-50 dark:bg-[#171717]">
        <div class="container mx-auto max-w-4xl text-center px-6">
          <h2 class="text-4xl font-semibold mb-8">Our Core Values</h2>
          <p
            class="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed"
          >
            <i
              >Transparency, innovation, and user-first design drive everything
              we do. These values shape our culture and the products we
              deliver.</i
            >
          </p>
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1000&q=80"
            class="w-full rounded-xl shadow-lg object-cover"
            alt="Team values"
          />
        </div>
      </section>

      <!-- Leadership -->
      <section id="leadership" class="bg-zinc-50 py-24 dark:bg-transparent">
        <div class="container mx-auto px-6 max-w-6xl">
          <h2 class="text-center text-4xl font-semibold mb-14">
            Meet Our Leadership
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div
              class="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-lg text-center"
            >
              <img
                src="https://uifaces.co/our-content/donated/gPZwCbdS.jpg"
                class="w-24 h-24 rounded-full mx-auto object-cover mb-4"
              />
              <h3 class="text-xl font-medium">Alex Johnson</h3>
              <p class="text-sm text-gray-500 mb-3">CEO & Founder</p>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Alex leads the strategic direction of the company with over a
                decade of experience in fintech and blockchain innovation.
              </p>
            </div>
            <div
              class="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-lg text-center"
            >
              <img
                src="https://uifaces.co/our-content/donated/kY8HLp0T.jpg"
                class="w-24 h-24 rounded-full mx-auto object-cover mb-4"
              />
              <h3 class="text-xl font-medium">Sarah Chen</h3>
              <p class="text-sm text-gray-500 mb-3">Chief Technology Officer</p>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Sarah brings deep expertise in system architecture and leads our
                engineering team to build secure and scalable solutions.
              </p>
            </div>
            <div
              class="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-lg text-center"
            >
              <img
                src="https://uifaces.co/our-content/donated/NY9hnAbp.jpg"
                class="w-24 h-24 rounded-full mx-auto object-cover mb-4"
              />
              <h3 class="text-xl font-medium">Michael Rodriguez</h3>
              <p class="text-sm text-gray-500 mb-3">Chief Product Officer</p>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Michael drives product strategy with a focus on simplifying the
                crypto experience for users of all skill levels.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section
        class="py-24 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800"
      >
        <div class="container mx-auto px-6 max-w-4xl text-center">
          <h2 class="text-4xl font-semibold">Join Our Mission</h2>
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
            We're always on the lookout for talented individuals who want to
            shape the future of finance.
          </p>
          <div class="mt-10 flex flex-wrap justify-center gap-4">
            <NuxtLink
              href="/contact"
              class="border border-gray-600 dark:border-white px-6 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >Contact Us</NuxtLink
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
