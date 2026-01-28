'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
// import { useDeal } from '@/hooks/useDeals';
// import { useClaims } from '@/hooks/useClaims';
// import { useAuth } from '@/hooks/useAuth';
// import { ClaimButton } from '@/components/deals/ClaimButton';

interface DealPageProps {
  params: Promise<{ id: string }>;
}

export default function DealPage({ params }: DealPageProps) {
  const { id } = use(params);
  
  // TODO: Replace with actual hooks
  // const { deal, isLoading, error } = useDeal(id);
  // const { user } = useAuth();
  // const { hasClaimedDeal, getClaimForDeal } = useClaims();

  // Mock data for scaffolding
  const deal = {
    id,
    title: 'Cloud Provider Pro',
    description: `
      Get $10,000 in cloud credits to build and scale your startup. 
      
      This exclusive partnership gives you access to:
      - Compute instances with latest-gen processors
      - Managed databases with automatic backups
      - Global CDN for lightning-fast delivery
      - 24/7 technical support
      
      Perfect for startups looking to scale their infrastructure without the upfront costs.
    `,
    category: 'cloud-infrastructure',
    isLocked: true,
    value: '$10,000 in credits',
    partnerInfo: {
      name: 'Cloud Provider',
      website: 'https://example.com',
      description: 'Leading cloud infrastructure provider',
    },
    eligibilityConditions: [
      'Less than $5M in total funding',
      'Founded within the last 3 years',
      'Have not previously used this service',
    ],
  };
  const isLoading = false;
  const user = null;
  const hasClaimed = false;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          {/* Loading skeleton */}
          <div className="animate-pulse">
            <div className="mb-4 h-8 w-2/3 rounded bg-slate-200" />
            <div className="mb-8 h-4 w-1/3 rounded bg-slate-100" />
            <div className="h-64 rounded-xl bg-slate-200" />
          </div>
        </div>
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

        {/* Deal header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Partner logo */}
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  {deal.title}
                </h1>
                <p className="text-slate-600">{deal.partnerInfo.name}</p>
              </div>
            </div>

            {/* Locked badge */}
            {deal.isLocked && (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
                🔒 Verified Only
              </span>
            )}
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            {/* Description card */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">About This Deal</h2>
              <div className="prose prose-slate max-w-none">
                {/* TODO: Render markdown description */}
                <p className="whitespace-pre-line text-slate-600">
                  {deal.description}
                </p>
              </div>
            </div>

            {/* Eligibility conditions */}
            {deal.eligibilityConditions && deal.eligibilityConditions.length > 0 && (
              <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">
                  Eligibility Requirements
                </h2>
                <ul className="space-y-2">
                  {deal.eligibilityConditions.map((condition, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-slate-600"
                    >
                      <span className="mt-0.5 text-green-500">✓</span>
                      {condition}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Value card */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="mb-4 text-center">
                <span className="text-sm text-slate-500">Deal Value</span>
                <p className="text-2xl font-bold text-blue-600">{deal.value}</p>
              </div>

              {/* Claim button - shows different states based on auth/claim status */}
              <ClaimButtonPlaceholder
                deal={deal}
                user={user}
                hasClaimed={hasClaimed}
              />
            </div>

            {/* Partner info */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-semibold">About the Partner</h3>
              <p className="text-sm text-slate-600">
                {deal.partnerInfo.description}
              </p>
              {deal.partnerInfo.website && (
                <a
                  href={deal.partnerInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm text-blue-600 hover:underline"
                >
                  Visit website →
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

/**
 * Placeholder ClaimButton Component
 * 
 * Shows different states:
 * 1. Not logged in → "Login to claim"
 * 2. Locked + not verified → "Verify to claim"
 * 3. Already claimed → Show status
 * 4. Can claim → "Claim deal" button
 */
function ClaimButtonPlaceholder({
  deal,
  user,
  hasClaimed,
}: {
  deal: any;
  user: any;
  hasClaimed: boolean;
}) {
  // Not logged in
  if (!user) {
    return (
      <Link
        href="/auth/login"
        className="block w-full rounded-lg bg-slate-100 py-3 text-center font-medium text-slate-700 transition-colors hover:bg-slate-200"
      >
        Login to claim this deal
      </Link>
    );
  }

  // Already claimed
  if (hasClaimed) {
    return (
      <div className="rounded-lg bg-green-50 p-4 text-center">
        <span className="font-medium text-green-700">✓ Already claimed</span>
        <p className="mt-1 text-sm text-green-600">
          Check your dashboard for status
        </p>
      </div>
    );
  }

  // Locked and not verified
  if (deal.isLocked && !user.isVerified) {
    return (
      <div>
        <button
          disabled
          className="mb-2 w-full cursor-not-allowed rounded-lg bg-slate-100 py-3 font-medium text-slate-400"
        >
          🔒 Verification Required
        </button>
        <p className="text-center text-sm text-slate-500">
          This deal is only available to verified startups
        </p>
      </div>
    );
  }

  // Can claim
  return (
    <button className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-700">
      Claim This Deal
    </button>
  );
}
