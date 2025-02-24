import * as React from 'react'
import { Link } from 'react-router-dom'
import { Activity, Vote, Users, BarChart3, Clock, ChevronRight } from 'lucide-react'

const mockProposals = [
  {
    id: 'AIP-23',
    title: 'Protocol Upgrade Framework',
    status: 'Active',
    votes: { yes: 65, no: 35 },
    timeLeft: '2 days',
    category: 'Technical',
    impact: 'High'
  },
  {
    id: 'AIP-24',
    title: 'Community Fund Allocation',
    status: 'Active',
    votes: { yes: 78, no: 22 },
    timeLeft: '5 days',
    category: 'Financial',
    impact: 'Medium'
  },
  {
    id: 'AIP-25',
    title: 'New Integration Partners',
    status: 'Active',
    votes: { yes: 82, no: 18 },
    timeLeft: '1 week',
    category: 'Partnership',
    impact: 'High'
  }
]

const Governance: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with Create Proposal Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Governance</h1>
          <p className="text-muted-foreground">
            Participate in shaping the future of the protocol
          </p>
        </div>
        <Link 
          to="/governance/create"
          className="glass-button bg-primary/20 hover:bg-primary/30"
        >
          Create Proposal
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Proposals</p>
              <p className="text-2xl font-bold text-white">8</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Vote className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Votes</p>
              <p className="text-2xl font-bold text-white">15.2k</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Participation Rate</p>
              <p className="text-2xl font-bold text-white">85%</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Quorum</p>
              <p className="text-2xl font-bold text-white">50%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Proposals */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Active Proposals</h2>
        <div className="space-y-4">
          {mockProposals.map((proposal) => (
            <div 
              key={proposal.id}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-primary">{proposal.id}</span>
                    <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">
                      {proposal.status}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                      {proposal.impact} Impact
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-white mt-1">{proposal.title}</h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                    <span>{proposal.category}</span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {proposal.timeLeft} left
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${proposal.votes.yes}%` }}
                      />
                    </div>
                    <span className="text-white">{proposal.votes.yes}%</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Yes Votes</p>
                </div>
                <Link 
                  to={`/governance/proposals/${proposal.id}`}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-primary" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none" />
    </div>
  )
}

export default Governance