import { useState, useEffect } from 'react';
import { Card, Grid, Button } from '@/components';
import { ABTestAnalytics } from '@/utils/abtest';

export default function ABTestResults() {
  const [experiments, setExperiments] = useState({
    hero_headline: null,
  });

  useEffect(() => {
    // Load A/B test results from localStorage
    const results = ABTestAnalytics.getResults('hero_headline');
    const winner = ABTestAnalytics.getWinner(results);

    setExperiments({
      hero_headline: {
        name: 'Hero Headline A/B Test',
        results,
        winner,
      },
    });
  }, []);

  const handleExportCSV = (experimentId) => {
    ABTestAnalytics.exportToCSV(experimentId);
  };

  const exp = experiments.hero_headline;
  if (!exp || exp.results.length === 0) {
    return (
      <section id="abtest-results" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-dark mb-4">
              A/B Test Results
            </h2>
            <p className="text-lg text-gray-600">
              No data available yet. A/B tests will appear here as they gather data.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="abtest-results" className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-dark mb-4">
            A/B Test Results
          </h2>
          <p className="text-lg text-gray-600">
            Real-time performance metrics from active A/B tests
          </p>
        </div>

        {/* Experiment Results */}
        <div className="max-w-4xl mx-auto space-y-12">
          {Object.entries(experiments).map(([expId, expData]) => (
            <div key={expId}>
              <h3 className="text-2xl font-bold font-heading text-dark mb-6">
                {expData.name}
              </h3>

              {/* Winner Badge */}
              {expData.winner.winner && (
                <Card variant="elevated" padding="lg" className="mb-8 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300">
                  <div className="text-center">
                    <h4 className="text-lg font-bold text-green-900 mb-2">🏆 Winner Detected</h4>
                    <p className="text-green-800 mb-4">
                      Variant <strong>{expData.winner.winner}</strong> is winning with{' '}
                      <strong>{expData.winner.conversionRate}%</strong> conversion rate
                    </p>
                    <p className="text-sm text-green-700">
                      Conversions: {expData.winner.conversions} | Confidence: {expData.winner.confidence}
                    </p>
                  </div>
                </Card>
              )}

              {/* Variant Results Grid */}
              <Grid cols={expData.results.length === 1 ? 1 : 2} gap="lg" className="mb-8">
                {expData.results.map((result) => {
                  const progressPercent = (result.conversions / Math.max(...expData.results.map((r) => r.conversions), 1)) * 100;

                  return (
                    <Card key={result.variant} variant="outlined" padding="lg">
                      <div className="mb-4">
                        <h4 className="text-lg font-bold text-dark mb-2 capitalize">
                          {result.variant}
                        </h4>
                        <p className="text-sm text-gray-600 mb-4">
                          {result.total} total interactions
                        </p>
                      </div>

                      {/* Conversion Rate */}
                      <div className="mb-6">
                        <div className="flex justify-between mb-2">
                          <span className="font-semibold text-dark">Conversion Rate</span>
                          <span className="text-gold font-bold text-lg">
                            {result.conversionRate.toFixed(2)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gold h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(progressPercent, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Conversions</p>
                          <p className="font-bold text-dark text-lg">{result.conversions}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Total Value</p>
                          <p className="font-bold text-gold text-lg">
                            ${result.totalValue.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </Grid>

              {/* Export Button */}
              <div className="flex gap-4 mb-12">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => handleExportCSV(expId)}
                >
                  📥 Export CSV
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="max-w-4xl mx-auto p-6 bg-blue-50 border-l-4 border-blue-400 rounded">
          <h4 className="font-bold text-blue-900 mb-2">📊 How A/B Testing Works</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✓ Users are randomly assigned to variant A or B</li>
            <li>✓ Their interactions are tracked in localStorage</li>
            <li>✓ Statistical significance is calculated automatically</li>
            <li>✓ Results update in real-time as data is collected</li>
            <li>✓ Implement the winning variant permanently</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
