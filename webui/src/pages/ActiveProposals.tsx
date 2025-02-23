import * as React from 'react'
import { Activity, Clock, BarChart3, AlertCircle } from 'lucide-react'

const mockProposals = [
  {
    id: 'AIP-23',
    title: 'Protocol Upgrade v2.1',
    description: 'Implement protocol upgrade v2.1 to enhance network security and improve transaction throughput.',
    category: 'Technical',
    status: 'Active',
    votes: {
      yes: 75,
      no: 25,
      quorum: 50,
      total: 1250
    },
    timeLeft: '48h',
    endsAt: 'July 15, 2024 12:00 UTC',
    impact: 'High'
  },
  {
    id: 'AIP-24',
    title: 'Treasury Allocation Q2',
    description: 'Allocate treasury funds for Q2 2024 development initiatives and community rewards.',
    category: 'Financial',
    status: 'Active',
    votes: {
      yes: 62,
      no: 38,
      quorum: 45,
      total: 980
    },
    timeLeft: '3d',
    endsAt: 'July 18, 2024 12:00 UTC',
    impact: 'Medium'
  }
]

const ActiveProposals: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center relative mb-12">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30 blur-3xl" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Active Proposals</h1>
        <p className="text-lg text-muted-foreground">
          Review and vote on current governance proposals
        </p>
      </div>

      {/* Proposals List */}
      <div className="space-y-6">
        {mockProposals.map((proposal) => (
          <div key={proposal.id} className="glass-card p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-sm text-primary">{proposal.id}</span>
                  <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">
                    {proposal.status}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                    {proposal.impact} Impact
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-white">{proposal.title}</h2>
                <p className="text-muted-foreground mt-2">{proposal.description}</p>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{proposal.timeLeft} left</span>
              </div>
            </div>

            {/* Voting Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Yes Votes</span>
                  <span className="text-white">{proposal.votes.yes}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div 
                    className="h-full rounded-full bg-green-500"
                    style={{ width: `${proposal.votes.yes}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">No Votes</span>
                  <span className="text-white">{proposal.votes.no}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div 
                    className="h-full rounded-full bg-red-500"
                    style={{ width: `${proposal.votes.no}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Quorum</span>
                  <span className="text-white">{proposal.votes.quorum}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div 
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${proposal.votes.quorum}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Activity className="w-4 h-4" />
                  <span>{proposal.votes.total} total votes</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <BarChart3 className="w-4 h-4" />
                  <span>{proposal.category}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="glass-button bg-red-500/20 hover:bg-red-500/30">
                  Vote No
                </button>
                <button className="glass-button bg-green-500/20 hover:bg-green-500/30">
                  Vote Yes
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="glass-card p-4 flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
        <p className="text-sm text-muted-foreground">
          Voting power is determined by your token holdings at the time of proposal creation. 
          Votes cannot be changed once submitted.
        </p>
      </div>

      {/* Decorative elements */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none" />
    </div>
  )
}

export default ActiveProposals