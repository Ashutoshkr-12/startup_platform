'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import toast from 'react-hot-toast';

type DealData = {
  _id: string;
  title: string;
  desc: string;
  isLocked: boolean;
  price: number;
  category?: string;
};

const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'Cloud', label: 'Cloud Services' },
  { value: 'Productivity', label: 'Developer Tools' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Analytics', label: 'Analytics' },
  { value: 'Productivity', label: 'Design' },
  { value: 'Support', label: 'Communication' },
];

export default function DealsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [showLocked, setShowLocked] = useState<boolean | undefined>(undefined);
  const [deals, setDeals] = useState<DealData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/deals',{
          method: "GET"
        });
        const data = await res.json();

        if (data.success) {
          setDeals(data.data);
        } else {
          toast.error('Failed to load deals');
        }
      } catch (err) {
        toast.error('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const filteredDeals = useMemo(() => {
    return deals.filter((deal) => {
      // Search filter
      if (
        search &&
        !deal.title.toLowerCase().includes(search.toLowerCase()) &&
        !deal.desc.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }

      // Category filter
      if (category && deal.category !== category) {
        return false;
      }

      // Locked filter
      if (showLocked === false && deal.isLocked) {
        return false;
      }

      return true;
    });
  }, [deals, search, category, showLocked]);

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Browse Deals</h1>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search deals..."
            className="border px-4 py-2 rounded-lg"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-4 py-2 rounded-lg"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showLocked === false}
              onChange={(e) =>
                setShowLocked(e.target.checked ? false : undefined)
              }
            />
            Unlocked only
          </label>
        </div>

        {/* Count */}
        <p className="text-sm mb-4">
          Showing {filteredDeals.length} deals
        </p>

        {/* Deals */}
        {isLoading ? (
          <p>Loading deals...</p>
        ) : (
          <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDeals.map((deal) => (
              <motion.div
                key={deal._id}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >
                {deal.isLocked && (
                  <span className="text-xs bg-yellow-100 px-2 py-1 rounded">
                    🔒 Verified Only
                  </span>
                )}

                <h3 className="mt-2 font-semibold">{deal.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-2">
                  {deal.desc}
                </p>

                <div className="mt-4 flex justify-between items-center">
                  <span className="font-semibold text-blue-600">
                    ${deal.price}
                  </span>
                  <Link href={`/deals/${deal._id}`}>
                    View details →
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}
