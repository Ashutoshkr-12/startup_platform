'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
// import { useAuth, ProtectedRoute } from '@/hooks/useAuth';
// import { useClaims } from '@/hooks/useClaims';

// Claim status badge colors
const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  expired: 'bg-slate-100 text-slate-500',
};

export default function DashboardPage() {
  // TODO: Wrap with ProtectedRoute or add auth check
  // const { user } = useAuth();
  // const { claims, isLoading } = useClaims();

  // Mock data for scaffolding
  const user = {
    email: 'founder@startup.com',
    isVerified: true,
    createdAt: '2024-01-15',
  };

  const claims = [
    {
      id: '1',
      status: 'approved',
      claimedAt: '2024-03-15',
      deal: {
        title: 'Cloud Provider Pro',
        value: '$10,000 credits',
        partnerInfo: { name: 'Cloud Provider' },
      },
      redemptionCode: 'STARTUP-ABC123',
    },
    {
      id: '2',
      status: 'pending',
      claimedAt: '2024-03-18',
      deal: {
        title: 'Analytics Tool',
        value: '$5,000 credits',
        partnerInfo: { name: 'Analytics Co' },
      },
    },
  ];

  const isLoading = false;

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto max-w-5xl px-4">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600">Manage your profile and claimed deals</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-semibold">Profile</h2>
              
              {/* Avatar placeholder */}
              <div className="mb-4 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-2xl font-bold text-white">
                  {user.email[0].toUpperCase()}
                </div>
              </div>

              {/* User info */}
              <div className="space-y-3 text-center">
                <div>
                  <p className="font-medium text-slate-900">{user.email}</p>
                </div>
                
                {/* Verification status */}
                <div>
                  {user.isVerified ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      ✓ Verified Startup
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
                      Pending Verification
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-500">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-6 space-y-2">
                {!user.isVerified && (
                  <button className="w-full rounded-lg border border-blue-600 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50">
                    Verify My Startup
                  </button>
                )}
                <button className="w-full rounded-lg border py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
                  Edit Profile
                </button>
              </div>
            </div>
          </motion.div>

          {/* Claimed deals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-semibold">Your Claimed Deals</h2>
                <Link
                  href="/deals"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Browse more deals →
                </Link>
              </div>

              {isLoading ? (
                // Loading skeletons
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="animate-pulse rounded-lg border p-4">
                      <div className="mb-2 h-5 w-1/2 rounded bg-slate-200" />
                      <div className="h-4 w-1/4 rounded bg-slate-100" />
                    </div>
                  ))}
                </div>
              ) : claims.length === 0 ? (
                // Empty state
                <div className="py-12 text-center">
                  <div className="mb-4 text-4xl">📭</div>
                  <p className="mb-2 font-medium text-slate-900">No deals claimed yet</p>
                  <p className="mb-4 text-sm text-slate-500">
                    Browse available deals and start saving!
                  </p>
                  <Link
                    href="/deals"
                    className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Explore Deals
                  </Link>
                </div>
              ) : (
                // Claims list
                <div className="space-y-4">
                  {claims.map((claim: any) => (
                    <motion.div
                      key={claim.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="rounded-lg border p-4 transition-colors hover:bg-slate-50"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-slate-900">
                              {claim.deal.title}
                            </h3>
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                STATUS_STYLES[claim.status as keyof typeof STATUS_STYLES]
                              }`}
                            >
                              {claim.status}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-slate-500">
                            {claim.deal.partnerInfo.name} • {claim.deal.value}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            Claimed on {new Date(claim.claimedAt).toLocaleDateString()}
                          </p>
                        </div>

                        {/* Redemption code for approved claims */}
                        {claim.status === 'approved' && claim.redemptionCode && (
                          <div className="rounded-lg bg-green-50 px-3 py-2 text-right">
                            <span className="text-xs text-green-600">Redemption Code</span>
                            <p className="font-mono font-medium text-green-700">
                              {claim.redemptionCode}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
