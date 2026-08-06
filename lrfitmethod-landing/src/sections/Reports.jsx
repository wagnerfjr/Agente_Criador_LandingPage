import { useState } from 'react';
import { Card, Button, Grid } from '@/components';

export default function Reports() {
  const [selectedMonth, setSelectedMonth] = useState('current');

  const reportData = {
    current: {
      month: 'August 2026',
      tokens: 230000,
      cost: 1.0,
      tasks: 9,
      avgTokensPerTask: 25556,
      improvements: ['Autonomous mode enabled', 'Logging system live', 'Token tracking active'],
    },
    previous: {
      month: 'July 2026',
      tokens: 150000,
      cost: 0.65,
      tasks: 5,
      avgTokensPerTask: 30000,
      improvements: ['Design system complete', 'Meta Pixel integrated'],
    },
  };

  const current = reportData[selectedMonth];

  const downloadReport = () => {
    const report = `
LR Fit Method - Monthly Report
Month: ${current.month}

Summary:
- Total Tokens: ${current.tokens.toLocaleString()}
- Total Cost: $${current.cost.toFixed(2)}
- Tasks Completed: ${current.tasks}
- Avg Tokens per Task: ${current.avgTokensPerTask.toLocaleString()}

Improvements:
${current.improvements.map((imp) => `- ${imp}`).join('\n')}

Report generated: ${new Date().toLocaleString()}
    `;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lrfit-report-${selectedMonth}.txt`;
    a.click();
  };

  return (
    <section id="reports" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-dark mb-4">
            Monthly Reports
          </h2>
          <p className="text-lg text-gray-600">
            Track your token usage and project progress over time
          </p>
        </div>

        {/* Month Selector */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex gap-4 mb-8">
            <Button
              variant={selectedMonth === 'current' ? 'primary' : 'outline'}
              size="md"
              onClick={() => setSelectedMonth('current')}
            >
              Current Month
            </Button>
            <Button
              variant={selectedMonth === 'previous' ? 'primary' : 'outline'}
              size="md"
              onClick={() => setSelectedMonth('previous')}
            >
              Previous Month
            </Button>
          </div>

          {/* Report Stats */}
          <Grid cols={4} gap="lg" className="mb-12">
            {/* Month */}
            <Card variant="elevated" padding="lg">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Period</p>
                <p className="text-2xl font-bold text-dark">{current.month}</p>
              </div>
            </Card>

            {/* Tokens */}
            <Card variant="elevated" padding="lg">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Total Tokens</p>
                <p className="text-2xl font-bold text-gold">
                  {(current.tokens / 1000).toFixed(0)}K
                </p>
              </div>
            </Card>

            {/* Cost */}
            <Card variant="elevated" padding="lg">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Total Cost</p>
                <p className="text-2xl font-bold text-gold">${current.cost.toFixed(2)}</p>
              </div>
            </Card>

            {/* Tasks */}
            <Card variant="elevated" padding="lg">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Tasks Done</p>
                <p className="text-2xl font-bold text-gold">{current.tasks}</p>
              </div>
            </Card>
          </Grid>

          {/* Improvements Section */}
          <Card variant="elevated" padding="lg" className="mb-8">
            <h3 className="text-lg font-bold font-heading text-dark mb-4">
              Key Achievements
            </h3>
            <ul className="space-y-2">
              {current.improvements.map((improvement, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-gold rounded-full"></span>
                  <span className="text-gray-700">{improvement}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Download Report */}
          <div className="flex gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={downloadReport}
              className="flex-1"
            >
              📥 Download Report
            </Button>
            <Button variant="outline" size="lg" className="flex-1">
              📧 Email Report
            </Button>
          </div>
        </div>

        {/* Report Preview */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold font-heading text-dark mb-6">
            Report Preview
          </h3>
          <Card variant="flat" padding="lg">
            <pre className="text-sm text-gray-700 overflow-x-auto whitespace-pre-wrap">
{`LR Fit Method - Monthly Report
Month: ${current.month}

Summary:
- Total Tokens: ${current.tokens.toLocaleString()}
- Total Cost: $${current.cost.toFixed(2)}
- Tasks Completed: ${current.tasks}
- Average Tokens per Task: ${current.avgTokensPerTask.toLocaleString()}

Improvements This Period:
${current.improvements.map((imp) => `  ✓ ${imp}`).join('\n')}

ROI Analysis:
- Cost per Task: $${(current.cost / current.tasks).toFixed(2)}
- Tokens per Task: ${current.avgTokensPerTask.toLocaleString()}
- Efficiency: ${((current.tasks / current.tokens) * 1000).toFixed(2)} tasks per 1k tokens

Next Steps:
- Continue development of remaining tasks
- Monitor token usage and optimize where possible
- Scale with confidence using tiered support plans

Report Generated: ${new Date().toLocaleDateString()}
System: LR Fit Method v1.0`}
            </pre>
          </Card>
        </div>
      </div>
    </section>
  );
}
