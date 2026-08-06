import { useState, useEffect } from 'react';
import { Card, Grid } from '@/components';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalTokens: 0,
    totalCost: 0,
    tasksCompleted: 0,
    projectedMonthly: 0,
  });

  useEffect(() => {
    // Load stats from localStorage or calculate from logger
    const logs = localStorage.getItem('logger_LRFitMethod');
    if (logs) {
      const parsedLogs = JSON.parse(logs);
      let tokenCount = 0;
      let taskCount = 0;

      parsedLogs.forEach((log) => {
        if (log.message?.includes('Token Usage')) {
          tokenCount += log.data?.totalTokens || 0;
        }
        if (log.type === 'EVENT' && log.eventName?.includes('TaskComplete')) {
          taskCount++;
        }
      });

      // Calculate cost (Haiku rates: $0.80/$4 per M tokens)
      const costUSD = (tokenCount * 0.80 + tokenCount * 4) / 1_000_000;
      const projectedMonthly = costUSD * 30;

      setStats({
        totalTokens: tokenCount,
        totalCost: costUSD,
        tasksCompleted: taskCount,
        projectedMonthly,
      });
    }
  }, []);

  const budgetData = [
    { tier: 'Maintenance', budget: 250000, spent: stats.totalTokens, cost: '$99/mo' },
    { tier: 'Growth', budget: 1000000, spent: Math.min(stats.totalTokens, 1000000), cost: '$299/mo' },
    { tier: 'Premium', budget: 2500000, spent: Math.min(stats.totalTokens, 2500000), cost: '$699/mo' },
  ];

  return (
    <section id="dashboard" className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-dark mb-4">
            Cost Dashboard
          </h2>
          <p className="text-lg text-gray-600">
            Real-time token usage and cost tracking
          </p>
        </div>

        {/* Stats Grid */}
        <Grid cols={4} gap="lg" className="mb-16">
          {/* Total Tokens */}
          <Card variant="elevated" padding="lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-gold mb-2">
                {Math.round(stats.totalTokens / 1000)}K
              </div>
              <p className="text-gray-600">Total Tokens</p>
              <p className="text-sm text-gray-500 mt-2">Used this month</p>
            </div>
          </Card>

          {/* Total Cost */}
          <Card variant="elevated" padding="lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-gold mb-2">
                ${stats.totalCost.toFixed(2)}
              </div>
              <p className="text-gray-600">Total Cost</p>
              <p className="text-sm text-gray-500 mt-2">Current billing</p>
            </div>
          </Card>

          {/* Tasks Completed */}
          <Card variant="elevated" padding="lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-gold mb-2">
                9/18
              </div>
              <p className="text-gray-600">Tasks Done</p>
              <p className="text-sm text-gray-500 mt-2">50% remaining</p>
            </div>
          </Card>

          {/* Projected Monthly */}
          <Card variant="elevated" padding="lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-gold mb-2">
                ${stats.projectedMonthly.toFixed(2)}
              </div>
              <p className="text-gray-600">Projected Monthly</p>
              <p className="text-sm text-gray-500 mt-2">At current rate</p>
            </div>
          </Card>
        </Grid>

        {/* Budget Tiers */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold font-heading text-dark mb-6">
            Support Tier Comparison
          </h3>

          <div className="space-y-6">
            {budgetData.map((tier) => {
              const percentage = (tier.spent / tier.budget) * 100;
              const projectedCost = (tier.spent * 0.8 + tier.spent * 4) / 1_000_000;

              return (
                <Card key={tier.tier} variant="outlined" padding="lg">
                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-dark">
                          {tier.tier} Tier
                        </h4>
                        <p className="text-gold font-semibold">{tier.cost}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gold">
                          {percentage.toFixed(0)}%
                        </p>
                        <p className="text-sm text-gray-600">Used</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-gold h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Budget</p>
                        <p className="font-semibold text-dark">
                          {(tier.budget / 1000).toFixed(0)}K tokens
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Spent</p>
                        <p className="font-semibold text-dark">
                          {(tier.spent / 1000).toFixed(0)}K tokens
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Cost</p>
                        <p className="font-semibold text-dark">
                          ${projectedCost.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Usage Tips */}
        <div className="max-w-4xl mx-auto mt-16 p-6 bg-blue-50 border-l-4 border-blue-400 rounded">
          <h4 className="font-bold text-blue-900 mb-2">💡 Cost Optimization Tips</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✓ Simple copy updates cost ~$0.02 (5k tokens)</li>
            <li>✓ New sections cost ~$0.12 (30k tokens)</li>
            <li>✓ Full redesigns cost ~$0.32 (80k tokens)</li>
            <li>✓ Bundle related changes to reduce overhead</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
