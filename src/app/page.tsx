export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfaf6] selection:bg-[#f7995a] selection:text-white">
      {/* Hero Section with Background Image */}
      <main className="relative flex flex-col items-center justify-center p-8 w-full  tracking-wide gap-8 overflow-hidden ">
        {/* Content - needs z-10 to sit above the background */}
        <div className="z-10 flex flex-col items-center gap-8 text-center">
          {/* CSS-only Logo */}
          <h1 className="text-7xl md:text-9xl font-semibold bg-gradient-to-r from-[#f77054] via-[#f89c5b] to-[#41b2bd] bg-clip-text text-transparent items-baseline hover:scale-105 transition-transform duration-500 ease-out select-none cursor-default font-[family-name:var(--font-fredoka)]">
            runco.
          </h1>

          <div className="space-y-4">
            <p className="text-2xl md:text-3xl font-medium tracking-widest text-gray-600 drop-shadow-md">
              走る仲間が、ここにいる。
            </p>
          </div>
          <div className="w-full max-w-4xl flex flex-col items-center">
            <div className="flex flex-col sm:flex-row gap-6">
              <button
                type="button"
                className="px-8 py-4 bg-[#f77054] text-white rounded-full font-bold shadow-lg hover:bg-[#e06248] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                はじめる
              </button>
              <button
                type="button"
                className="px-8 py-4 bg-white text-[#f77054] border-2 border-[#f77054] rounded-full font-bold shadow-sm hover:bg-[#fff5f2] transition-all duration-300"
              >
                ログイン
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-8 text-center text-gray-400 text-sm w-full">
        &copy; {new Date().getFullYear()} runco. All rights reserved.
      </footer>
    </div>
  );
}
