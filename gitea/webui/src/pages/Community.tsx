import * as React from 'react'
import { Users, MessageSquare, Award, Sparkles } from 'lucide-react'

const mockMembers = [
  {
    name: 'Alex Thompson',
    role: 'Core Contributor',
    contributions: 324,
    status: 'Active',
    badges: ['Top Developer', 'Governance Expert']
  },
  {
    name: 'Sarah Chen',
    role: 'Protocol Engineer',
    contributions: 256,
    status: 'Active',
    badges: ['Security Specialist']
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Community Lead',
    contributions: 189,
    status: 'Active',
    badges: ['Community Builder']
  }
]

const Community: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center relative mb-12">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30 blur-3xl" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Community</h1>
        <p className="text-lg text-muted-foreground">
          Connect with developers and contributors
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Members</p>
              <p className="text-2xl font-bold text-white">2,456</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Discussions</p>
              <p className="text-2xl font-bold text-white">892</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Contributors</p>
              <p className="text-2xl font-bold text-white">156</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Contributors */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Top Contributors</h2>
        <div className="space-y-6">
          {mockMembers.map((member, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  {member.badges.map((badge, badgeIndex) => (
                    <span 
                      key={badgeIndex}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm flex items-center"
                    >
                      <Sparkles className="w-4 h-4 mr-1" />
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Contributions</p>
                  <p className="text-lg font-medium text-white">{member.contributions}</p>
                </div>
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

export default Community