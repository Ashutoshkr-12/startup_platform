'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  expired: 'bg-slate-100 text-slate-500',
};

type User = {
  name: string;
  email: string;
  image: string;
  verified: boolean;
  createdAt: string;
};

type Claim = {
  _id: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  createdAt: string; // ✅ FIXED
  redemptionCode?: string;
  deal: {
    title: string;
    price: number;
    partnerInfo?: {
      name: string;
    };
  };
};

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);

        const userRes = await fetch('/api/auth/me');
        if (userRes.status === 401) {
          router.replace('/auth/login');
          return;
        }

        const userData = await userRes.json();
        setUser(userData.data);

        const claimsRes = await fetch('/api/claims',{
          method: "GET"
        });
        if (claimsRes.ok) {
          const claimsData = await claimsRes.json();
          setClaims(claimsData.data || []);
        }
      } catch (err) {
        console.error('Dashboard error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Link href="/auth/login" className="text-blue-600 underline">
          Login to access dashboard
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto max-w-5xl px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600">
            Welcome back, {user.name || user.email}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Profile */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-semibold">Profile</h2>

            <div className="mb-4 flex justify-center">
              <img
                src={user.name} 
                alt={user.name}
                className="h-20 w-20 rounded-full object-cover"
              />
            </div>

            <div className="space-y-3 text-center">
              <p className="font-medium">{user.email}</p>

              {user.verified ? (
                <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  ✓ Verified 
                </span>
              ) : (
                <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-700">
                   UnVerification
                </span>
              )}

              <p className="text-sm text-slate-500">
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Claimed Deals */}
          <div className="lg:col-span-2 rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-6 flex justify-between">
              <h2 className="font-semibold">Your Claimed Deals</h2>
              <Link href="/deals" className="text-sm text-blue-600">
                Browse deals →
              </Link>
            </div>

            {claims.length === 0 ? (
              <p className="text-slate-500">
                You have not claimed any deals yet.
              </p>
            ) : (
              <div className="space-y-4">
                {claims.map((claim) => (
                  <div
                    key={claim._id}
                    className="rounded-lg border p-4 hover:bg-slate-50"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">
                          {claim.deal.title}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {claim.deal.partnerInfo?.name} • ${claim.deal.price}
                        </p>
                        <p className="text-xs text-slate-400">
                          Claimed on{' '}
                          {new Date(claim.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <span
                        className={`h-fit rounded-full px-2 py-1 text-xs ${
                          STATUS_STYLES[claim.status]
                        }`}
                      >
                        {claim.status}
                      </span>
                    </div>

                    {claim.status === 'approved' && claim.redemptionCode && (
                      <div className="mt-3 rounded bg-green-50 p-2 text-sm text-green-700">
                        Code:
                        <span className="font-mono">
                          {claim.redemptionCode}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
