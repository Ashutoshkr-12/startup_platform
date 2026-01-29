/**
 * Deals Listing Page - Next.js App Router
 * 
 * Route: /deals
 * Purpose: Browse and filter all available deals
 * 
 * Features:
 * - Search by name
 * - Filter by category
 * - Filter by locked/unlocked
 * - Pagination
 * - Loading skeletons
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
// import { useDeals } from '@/hooks/useDeals';
// import { DealCard } from '@/components/deals/DealCard';
// import { DealFilters } from '@/components/deals/DealFilters';

// Category options for filter
const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'cloud-infrastructure', label: 'Cloud & Infrastructure' },
  { value: 'developer-tools', label: 'Developer Tools' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'finance', label: 'Finance' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'design', label: 'Design' },
  { value: 'communication', label: 'Communication' },
];

export default function DealsPage() {
  // Filter state - in production, use URL params for shareable links
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [showLocked, setShowLocked] = useState<boolean | undefined>(undefined);

  // TODO: Replace with actual useDeals hook
  const deals = []; // const { deals, isLoading, pagination, setFilters, setPage } = useDeals();
  const isLoading = false;

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Browse Deals</h1>
          <p className="mt-2 text-slate-600">
            Discover exclusive discounts and credits from our partners
          </p>
        </div>

        {/* Filters section */}
        <div className="mb-8 rounded-xl bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            {/* Search input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search deals..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Category filter */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-slate-200 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>

            {/* Locked/Unlocked filter */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={showLocked === false}
                  onChange={(e) =>
                    setShowLocked(e.target.checked ? false : undefined)
                  }
                  className="rounded border-slate-300"
                />
                Unlocked only
              </label>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-slate-600">
          Showing {deals.length} deals
          {/* TODO: Show total from pagination */}
        </div>

        {/* Deals grid */}
        {isLoading ? (
          // Loading skeletons
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl border bg-white p-6"
              >
                <div className="mb-4 h-12 w-12 rounded-lg bg-slate-200" />
                <div className="mb-2 h-5 w-2/3 rounded bg-slate-200" />
                <div className="mb-4 h-4 w-full rounded bg-slate-100" />
                <div className="h-4 w-1/3 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {/* TODO: Map over actual deals with DealCard component */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={i}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="group relative rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md"
                >
                  {/* Locked indicator */}
                  {i % 2 === 0 && (
                    <div className="absolute right-4 top-4">
                      <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
                        🔒 Verified Only
                      </span>
                    </div>
                  )}

                  {/* Partner logo placeholder */}
                  <div className="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200" />

                  {/* Deal title */}
                  <h3 className="mb-2 text-lg font-semibold text-slate-900 group-hover:text-blue-600">
                    SaaS Partner {i}
                  </h3>

                  {/* Category badge */}
                  <span className="mb-3 inline-block rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
                    Developer Tools
                  </span>

                  {/* Description */}
                  <p className="mb-4 line-clamp-2 text-sm text-slate-600">
                    Get exclusive credits and discounts on this amazing SaaS product
                    for your startup.
                  </p>

                  {/* Value */}
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-blue-600">
                      ${i}0,000 credits
                    </span>
                    <Link href={`/deals/${i}`}>
                    <button className="text-sm text-slate-500 hover:text-slate-700">
                      View details →
                    </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Pagination */}
        <div className="mt-8 flex justify-center gap-2">
          <button className="rounded-lg border bg-white px-4 py-2 text-sm hover:bg-slate-50">
            Previous
          </button>
          <span className="flex items-center px-4 text-sm text-slate-600">
            Page 1 of 3
          </span>
          <button className="rounded-lg border bg-white px-4 py-2 text-sm hover:bg-slate-50">
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
