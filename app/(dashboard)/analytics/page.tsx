'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, DollarSign, Zap, BarChart3 } from 'lucide-react'

interface UsageData {
  totalCalls: number
  totalTokens: number
  estimatedCostUsd: number
  recentLogs: Array<{
    id: string
    model: string
    purpose: string
    totalTokens: number | null
    estimatedCostUsd: number | null
    createdAt: string
  }>
}

export default function AnalyticsPage() {
  const [data, setData] = useState<UsageData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadUsage() {
      try {
        const res = await fetch('/api/usage')
        if (res.ok) {
          const usage = await res.json()
          setData(usage)
        }
      } catch (e) {
        console.error('Failed to load usage data')
      } finally {
        setIsLoading(false)
      }
    }
    loadUsage()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-8 py-10">
      <Link href="/" className="flex items-center gap-2 text-[#a1a1aa] hover:text-white mb-6 text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-semibold tracking-tight mb-2">Analytics &amp; Usage</h1>
        <p className="text-[#71717a]">Track agent activity and API consumption.</p>
      </div>

      {isLoading ? (
        <div className="text-[#71717a]">Loading usage data...</div>
      ) : !data ? (
        <div className="card p-8">Could not load usage data.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="text-sm text-[#a1a1aa]">Total API Calls</div>
              </div>
              <div className="text-4xl font-semibold tracking-tight">{data.totalCalls}</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
