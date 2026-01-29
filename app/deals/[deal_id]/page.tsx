'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import * as React from 'react'
import toast from 'react-hot-toast';

interface Deal {
  _id: string;
  title: string;
  desc: string;
  category?: string;
  isLocked: boolean;
  price: number;
  eligibility?: string[];
}

interface Dealpage {
  params: {
    deal_id: string;
  };
}

export default function DealPage({ params }: any) {
  
const { deal_id }: any = React.use(params);
  const [deal, setDeal] = useState<Deal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    const fetchDeal = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/deals/${deal_id}`);
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || 'Failed to fetch deal');
        }

        setDeal(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeal();
  }, [deal_id]);


 const handleClaim = async (dealId: string) => {
  // console.log("button clicked", dealId);

  const res = await fetch("/api/claims", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ dealId }),
  });

  const data = await res.json();
  if(data.success){
    toast.success(data.message)
  }else{
    toast(data.error || data.message)
  }
  console.log(data);
};



  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="animate-pulse">
            <div className="mb-4 h-8 w-2/3 rounded bg-slate-200" />
            <div className="h-64 rounded-xl bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !deal) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 text-center">
        <p className="text-red-600">{error || 'Deal not found'}</p>
        <Link href="/deals" className="text-blue-600 underline">
          Back to deals
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link href="/deals" className="text-slate-500 hover:text-slate-700">
            ← Back to deals
          </Link>
        </nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {deal.title}
              </h1>
              <p className="text-slate-600">
                
              </p>
            </div>

            {deal.isLocked && (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
                Verified Only
              </span>
            )}
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">About This Deal</h2>
              <p className="whitespace-pre-line text-slate-600">
                {deal.desc}
              </p>
            </div>

            {deal.eligibility?.length! > 0 && (
              <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">
                  Eligibility Requirements
                </h2>
                <ul className="space-y-2">
                  {deal.eligibility?.map((c, i) => (
                    <li key={i} className="flex gap-2 text-slate-600">
                      <span className="text-green-500">✓</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl border bg-white p-6 shadow-sm text-center">
              <span className="text-sm text-slate-500">Deal Value</span>
              <p className="text-2xl font-bold text-blue-600">
                ${deal.price}
              </p>
   <button
  onClick={() => handleClaim(deal._id)} 
  className="mt-4 w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
>
  Claim This Deal
</button>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
