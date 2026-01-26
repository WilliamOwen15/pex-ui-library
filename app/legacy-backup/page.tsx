import { ArrowRightIcon, BoxIcon, LayoutIcon, TypeIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <main className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        {/* Hero Section */}
        <div className="mb-20 space-y-6 text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">
            <span className="font-semibold text-slate-900 text-xs uppercase tracking-wider">
              Design System
            </span>
          </div>
          <h1 className="font-bold font-serif text-5xl text-slate-900 leading-tight tracking-tight md:text-7xl">
            PEX UI Library
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 leading-relaxed md:text-xl">
            A collection of beautifully designed, accessible UI components
            inspired by Glide Apps. Built with React, TypeScript, and Tailwind
            CSS.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 pt-6 sm:flex-row">
            <Link
              className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-slate-800 hover:shadow-xl"
              href="/examples/title"
            >
              Browse Components
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-900 shadow-sm transition-all hover:border-slate-400 hover:shadow-md"
              href="https://github.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              View on GitHub
            </a>
          </div>
        </div>

        {/* Components Grid */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="mb-2 font-bold text-3xl text-slate-900 tracking-tight">
              Available Components
            </h2>
            <p className="text-slate-600">
              Explore our growing collection of UI components
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Title Component Card */}
            <Link
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:scale-[1.02] hover:shadow-xl"
              href="/examples/title"
            >
              <div className="mb-6 inline-flex rounded-xl bg-slate-100 p-4 transition-colors group-hover:bg-slate-900">
                <TypeIcon className="size-8 text-slate-900 transition-colors group-hover:text-white" />
              </div>
              <h3 className="mb-2 font-bold text-2xl text-slate-900">Title</h3>
              <p className="mb-4 text-slate-600 leading-relaxed">
                Versatile title component with multiple variants including
                simple, image, cover, and profile layouts.
              </p>
              <div className="flex items-center gap-2 font-medium text-slate-900 transition-colors group-hover:text-slate-900">
                View Examples
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </div>
              {/* Decorative element */}
              <div className="absolute top-0 right-0 -mt-8 -mr-8 size-24 rounded-full bg-slate-50 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>

            {/* Placeholder for future components */}
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-slate-300 border-dashed bg-slate-50/50 p-8 text-center">
              <div className="mb-4 inline-flex rounded-xl bg-slate-200 p-4">
                <LayoutIcon className="size-8 text-slate-400" />
              </div>
              <h3 className="mb-2 font-semibold text-lg text-slate-500">
                More Components
              </h3>
              <p className="text-slate-400 text-sm">Coming soon</p>
            </div>

            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-slate-300 border-dashed bg-slate-50/50 p-8 text-center">
              <div className="mb-4 inline-flex rounded-xl bg-slate-200 p-4">
                <BoxIcon className="size-8 text-slate-400" />
              </div>
              <h3 className="mb-2 font-semibold text-lg text-slate-500">
                More Components
              </h3>
              <p className="text-slate-400 text-sm">Coming soon</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 inline-flex rounded-lg bg-slate-100 p-3">
              <svg
                className="size-6 text-slate-900"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Accessible</title>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
            </div>
            <h3 className="mb-2 font-bold text-slate-900 text-xl">
              Accessible
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Built with accessibility in mind, following WCAG guidelines and
              best practices for inclusive design.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 inline-flex rounded-lg bg-slate-100 p-3">
              <svg
                className="size-6 text-slate-900"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Type Safe</title>
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <h3 className="mb-2 font-bold text-slate-900 text-xl">Type Safe</h3>
            <p className="text-slate-600 leading-relaxed">
              Fully typed with TypeScript for better developer experience and
              fewer runtime errors.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 inline-flex rounded-lg bg-slate-100 p-3">
              <svg
                className="size-6 text-slate-900"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Customizable</title>
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v6m0 6v6M1 12h6m6 0h6" />
              </svg>
            </div>
            <h3 className="mb-2 font-bold text-slate-900 text-xl">
              Customizable
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Flexible variant system powered by CVA, making it easy to adapt
              components to your design needs.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 border-slate-200 border-t pt-12 text-center">
          <p className="text-slate-500">
            Built with Next.js, Tailwind CSS, and inspired by Glide Apps
          </p>
        </footer>
      </main>
    </div>
  );
}
