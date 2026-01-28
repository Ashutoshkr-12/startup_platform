'use client';

import { assets } from '@/public/assets';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  const ourWorks = [
  {
    id: "1",
    image: assets.server,
    title: "Cloud services",
    desc: "Online computing resources (servers, storage, databases, hosting) you rent over the internet instead of owning hardware. Example: AWS, Azure. You pay as you use.",
  },
  {
    id: "2",
    image: assets.advertising,
    title: "Marketing tools",
    desc: "Software used to promote products, reach customers, and run campaigns. Includes email marketing, ads, SEO, and social media tools. Goal: get attention and conversions.",
  },
  {
    id: "3",
    image: assets.web,
    title: "Analytics platforms",
    desc: "Tools that collect and analyze data to show what users are doing. They help measure performance, behavior, and decisions.",
  },
  {
    id: "4",
    image: assets.software,
    title: "Productivity software",
    desc: "Apps that help individuals or teams work faster and stay organized—documents, spreadsheets, task management, communication. Example: Microsoft Office, Notion.",
  },
  
  ]

  const weProvide = [
              {
                icon: '🎯',
                title: 'Curated Deals',
                description:
                  'Every partnership is vetted and negotiated for maximum value.',
              },
              {
                icon: '✓',
                title: 'Verified Access',
                description:
                  'Exclusive deals for verified startups. Simple verification process.',
              },
              {
                icon: '⚡',
                title: 'Easy Claiming',
                description:
                  'One-click claiming with instant access to your benefits.',
              },
            ]
  return (
    <main className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-zinc-800 py-24 ">
        <div className="absolute" />  
        <div className="container flex items-center select-none relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center ">
          
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Unlock
              <span className="bg-linear-to-r from-[#eb0e0e] to-[#d65c5c] bg-clip-text text-transparent">
                Exclusive SaaS Deals
              </span>
              <br />
              for Your Startup
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/deals"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-blue-600 px-8 font-medium text-white transition-colors hover:bg-blue-700"
              >
                Explore Deals
              </Link>
              <Link
                href="/register"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-600 px-8 font-medium text-slate-300 transition-colors hover:bg-slate-800"
              >
                Create Account
              </Link>
            </motion.div>
          </div>
          <div className="mx-auto max-w-4xl text-center">
            {/* Animated badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full "
            >
              <Image src={assets.heroSection}
              alt=''
              width={500}
              height={500}
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-blue-500/30 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl"
        />
      </section>

      {/* WORK DESCRIPTION*/}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-slate-900 font-serif">
              What We Do
            </h2>
            <p className="text-lg text-slate-600">
              We maintains a portfolio spanning multiple sectors. Disruptive technology is our unifying theme. We provide the following services:
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ourWorks.map((i) => (
              <div
                key={i.id}
                className="rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 h-12 w-12 rounded-lg bg-slate-100" />
                <Image src={i.image} alt='' width={50}  />
                <h3 className="mb-2 text-lg font-semibold">{i.title}</h3>
                <p className="mb-4 text-sm text-slate-600">
                  {i.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICED section*/}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            {weProvide.map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
