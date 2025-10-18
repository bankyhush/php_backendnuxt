<template>
  <main>
    <div class="pb-[2px]">
      <HeroHeader />
    </div>

    <div class="bg-white text-black dark:bg-black dark:text-white">
      <!-- Others -->
      <section class="overflow-x-hidden">
        <!-- Section 1 -->
        <section>
          <div class="mt-6 pb-24 pt-5 md:pb-32 lg:pb-56 lg:pt-44">
            <div
              class="mx-auto flex max-w-6xl flex-col items-center px-6 lg:flex-row lg:items-start lg:justify-between"
            >
              <!-- Text content -->
              <div class="max-w-xl text-center lg:text-left lg:w-1/2">
                <h1
                  class="mt-8 text-balance text-5xl font-medium md:text-6xl xl:text-7xl"
                >
                  Faster, better
                </h1>
                <p class="mt-6 text-lg text-pretty">
                  Highly customizable components for building modern websites
                  and applications that look and feel the way you mean it.
                </p>

                <div
                  class="mt-10 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
                >
                  <Button
                    size="lg"
                    class="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-10 rounded-md has-[&gt;svg]:px-4 px-5 text-base"
                  >
                    <NuxtLink to="#link">
                      <span class="text-nowrap">Start Building</span>
                    </NuxtLink>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    class="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border-1 border-gray-500 text-black shadow-xs hover:bg-primary/30 h-10 rounded-md has-[&gt;svg]:px-4 px-5 text-base dark:text-white"
                  >
                    <NuxtLink to="#link">
                      <span class="text-nowrap">Request a demo</span>
                    </NuxtLink>
                  </Button>
                </div>
              </div>

              <!-- Responsive video -->
              <div class="mt-6 w-full max-w-lg mb-10 lg:mb-0 lg:w-1/2">
                <video
                  class="w-full h-[400px] object-contain rounded-lg shadow-lg bg-black dark:mix-blend-lighten dark:invert-0"
                  style="visibility: visible"
                  autoplay
                  loop
                  muted
                  playsinline
                  aria-label="Animation of the NS product in action"
                  role="Image"
                >
                  <source src="/clips/EA.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 2 -->
        <section class="bg-background pb-1 md:pb-3">
          <div class="group relative m-auto max-w-6xl px-6">
            <div class="flex flex-col items-center md:flex-row">
              <div class="relative py-2 md:w-[calc(100%-11rem)]">
                <InfiniteSlider :speed="40" :speedOnHover="20" :gap="112">
                </InfiniteSlider>

                <!-- Blurs and gradients -->
                <div
                  class="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"
                ></div>
                <div
                  class="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"
                ></div>
                <ProgressiveBlur
                  class="pointer-events-none absolute left-0 top-0 h-full w-20"
                  direction="left"
                  :blurIntensity="1"
                />
                <ProgressiveBlur
                  class="pointer-events-none absolute right-0 top-0 h-full w-20"
                  direction="right"
                  :blurIntensity="1"
                />
              </div>
            </div>
          </div>
        </section>
      </section>
      <!-- Crypto Section -->
      <PopularCryptos />

      <!-- COntent section -->
      <section
        class="flex flex-col items-center justify-center w-full px-6 py-20 bg-white dark:bg-[#171717]"
      >
        <div class="max-w-3xl text-center space-y-6">
          <h1
            class="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-5xl"
          >
            With you every step of the way
          </h1>

          <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            <i>
              From making your first crypto trade to becoming a seasoned trader,
              you’ll have us to guide you through the process. No question is
              too small. No sleepless nights. Have confidence in your crypto.
            </i>
          </p>

          <div class="w-full">
            <video
              class="w-full object-contain rounded-lg shadow-lg dark:mix-blend-lighten dark:invert-0"
              autoplay
              loop
              muted
              playsinline
              aria-label="Animation of the NS product in action"
              role="img"
            >
              <source src="/clips/d40.webm" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <!-- Feature section -->

      <section class="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
        <div class="@container mx-auto max-w-5xl px-6">
          <div class="text-center">
            <h2 class="text-balance text-4xl font-semibold lg:text-5xl">
              Built to cover your needs
            </h2>
            <p class="mt-4">
              Libero sapiente aliquam quibusdam aspernatur, praesentium iusto
              repellendus.
            </p>
          </div>
          <div
            class="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16"
          >
            <div
              data-slot="card"
              class="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border-gray-200 border-1 dark:border-[#32302F] py-6 shadow-sm group shadow-zinc-950/5"
            >
              <div
                data-slot="card-header"
                class="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 pb-3"
              >
                <div
                  class="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]"
                >
                  <div
                    aria-hidden="true"
                    class="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
                  ></div>
                  <div
                    aria-hidden="true"
                    class="bg-radial to-background absolute inset-0 from-transparent to-75%"
                  ></div>
                  <div
                    class="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-zap size-6"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <h3 class="mt-6 font-medium">Customizable</h3>
              </div>
              <div data-slot="card-content" class="px-6">
                <p class="text-sm">
                  Extensive customization options, allowing you to tailor every
                  aspect to meet your specific needs.
                </p>
              </div>
            </div>
            <div
              data-slot="card"
              class="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border-gray-200 border-1 dark:border-[#32302F] py-6 shadow-sm group shadow-zinc-950/5"
            >
              <div
                data-slot="card-header"
                class="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 pb-3"
              >
                <div
                  class="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]"
                >
                  <div
                    aria-hidden="true"
                    class="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
                  ></div>
                  <div
                    aria-hidden="true"
                    class="bg-radial to-background absolute inset-0 from-transparent to-75%"
                  ></div>
                  <div
                    class="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-settings2 lucide-settings-2 size-6"
                      aria-hidden="true"
                    >
                      <path d="M20 7h-9"></path>
                      <path d="M14 17H5"></path>
                      <circle cx="17" cy="17" r="3"></circle>
                      <circle cx="7" cy="7" r="3"></circle>
                    </svg>
                  </div>
                </div>
                <h3 class="mt-6 font-medium">You have full control</h3>
              </div>
              <div data-slot="card-content" class="px-6">
                <p class="mt-3 text-sm">
                  From design elements to functionality, you have complete
                  control to create a unique and personalized experience.
                </p>
              </div>
            </div>
            <div
              data-slot="card"
              class="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border-gray-200 border-1 dark:border-[#32302F] py-6 shadow-sm group shadow-zinc-950/5"
            >
              <div
                data-slot="card-header"
                class="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 pb-3"
              >
                <div
                  class="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]"
                >
                  <div
                    aria-hidden="true"
                    class="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
                  ></div>
                  <div
                    aria-hidden="true"
                    class="bg-radial to-background absolute inset-0 from-transparent to-75%"
                  ></div>
                  <div
                    class="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-sparkles size-6"
                      aria-hidden="true"
                    >
                      <path
                        d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
                      ></path>
                      <path d="M20 3v4"></path>
                      <path d="M22 5h-4"></path>
                      <path d="M4 17v2"></path>
                      <path d="M5 18H3"></path>
                    </svg>
                  </div>
                </div>
                <h3 class="mt-6 font-medium">Powered By AI</h3>
              </div>
              <div data-slot="card-content" class="px-6">
                <p class="mt-3 text-sm">
                  Elements to functionality, you have complete control to create
                  a unique experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Eco Section -->

      <section class="py-16 md:py-32">
        <div class="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
          <h2 class="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl">
            The Lyra ecosystem brings together our models.
          </h2>
          <div class="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
            <div class="relative mb-6 sm:mb-0">
              <div
                class="bg-linear-to-b aspect-76/59 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700"
              >
                <img
                  alt="payments illustration dark"
                  loading="lazy"
                  width="1207"
                  height="1029"
                  decoding="async"
                  data-nimg="1"
                  class="hidden rounded-[15px] dark:block"
                  srcset="/images/trading.webp"
                  src="/images/trading.webp"
                  style="color: transparent"
                /><img
                  alt="payments illustration light"
                  loading="lazy"
                  width="1207"
                  height="1029"
                  decoding="async"
                  data-nimg="1"
                  class="rounded-[15px] shadow dark:hidden"
                  srcset="/images/trading.webp"
                  src="/images/trading.webp"
                  style="color: transparent"
                />
              </div>
            </div>
            <div class="relative space-y-4">
              <p class="text-muted-foreground">
                Gemini is evolving to be more than just the models.
                <span class="text-accent-foreground font-bold"
                  >It supports an entire ecosystem</span
                >
                — from products innovate.
              </p>
              <p class="text-muted-foreground">
                It supports an entire ecosystem — from products to the APIs and
                platforms helping developers and businesses innovate
              </p>
              <div class="pt-6">
                <blockquote class="border-l-4 pl-4">
                  <p>
                    Using TailsUI has been like unlocking a secret design
                    superpower. It’s the perfect fusion of simplicity and
                    versatility, enabling us to create UIs that are as stunning
                    as they are user-friendly.
                  </p>
                  <div class="mt-6 space-y-3">
                    <cite class="block font-medium">John Doe, CEO</cite
                    ><img
                      alt="Nvidia Logo"
                      loading="lazy"
                      width="20"
                      height="20"
                      decoding="async"
                      data-nimg="1"
                      class="h-5 w-fit dark:invert"
                      src="/images/nvidia.svg"
                      style="color: transparent"
                    />
                  </div>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- STart Section -->

      <section class="py-16 md:py-32">
        <div class="mx-auto max-w-5xl px-6">
          <div class="text-center">
            <h2 class="text-balance text-4xl font-semibold lg:text-5xl">
              Start Building
            </h2>
            <p class="mt-4">Libero sapiente aliquam quibusdam aspernatur.</p>
            <div class="mt-12 flex flex-wrap justify-center gap-4">
              <a
                data-slot="button"
                class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-10 rounded-md px-6 has-[&gt;svg]:px-4"
                href="/"
                ><span>Get Started</span></a
              ><a
                data-slot="button"
                class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-10 rounded-md px-6 has-[&gt;svg]:px-4"
                href="/"
                ><span>Book Demo</span></a
              >
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->

      <FAQSection />

      <!-- Footer -->
      <HeroFooter />
    </div>
  </main>
</template>
