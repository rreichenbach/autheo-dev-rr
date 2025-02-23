import * as React from 'react'
import { Link } from 'react-router-dom'
import { GitBranch, Star, GitFork, Search, Filter } from 'lucide-react'

type Language = 'Solidity' | 'Rust' | 'TypeScript'

interface Repository {
  name: string
  description: string
  stars: number
  forks: number
  language: Language
  lastUpdated: string
  status: 'Active' | 'Inactive'
  type: 'Public' | 'Private'
}

const mockRepositories: Repository[] = [
  {
    name: 'Smart Contract Library',
    description: 'A collection of reusable smart contracts and utilities',
    stars: 156,
    forks: 45,
    language: 'Solidity',
    lastUpdated: '2 days ago',
    status: 'Active',
    type: 'Public'
  },
  {
    name: 'DeFi Protocol',
    description: 'Decentralized finance protocol with advanced features',
    stars: 324,
    forks: 89,
    language: 'Rust',
    lastUpdated: '5 days ago',
    status: 'Active',
    type: 'Private'
  },
  {
    name: 'Governance Framework',
    description: 'Modular framework for on-chain governance',
    stars: 245,
    forks: 67,
    language: 'TypeScript',
    lastUpdated: '1 week ago',
    status: 'Active',
    type: 'Public'
  }
]

const languageColors: Record<Language, string> = {
  Solidity: 'bg-green-400',
  Rust: 'bg-orange-400',
  TypeScript: 'bg-blue-400'
}

const Repositories: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Repositories</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Discover and collaborate on blockchain projects
          </p>
        </div>
        <Link
          to="/repositories/create"
          className="glass-button bg-primary/20 hover:bg-primary/30"
        >
          New Repository
        </Link>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search repositories..."
            className="w-full h-10 pl-9 pr-4 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>
        <button className="glass-button h-10 px-4">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </button>
      </div>

      {/* Repository List */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        {mockRepositories.map((repo, index) => (
          <div 
            key={index}
            className="flex items-center px-4 py-3 hover:bg-muted/5 transition-colors border-b border-border last:border-0"
          >
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-medium text-foreground hover:text-primary transition-colors truncate">
                  {repo.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    repo.type === 'Public' ? 'bg-primary/10 text-primary' : 'bg-orange-500/10 text-orange-500'
                  }`}>
                    {repo.type}
                  </span>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/10 text-green-500">
                    {repo.status}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground truncate mb-2">
                {repo.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${languageColors[repo.language]}`} />
                  <span>{repo.language}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  <span>{repo.stars}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="w-3 h-3" />
                  <span>{repo.forks}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitBranch className="w-3 h-3" />
                  <span>Updated {repo.lastUpdated}</span>
                </div>
              </div>
            </div>
            <button className="glass-button h-8 px-4 text-sm whitespace-nowrap">
              Clone
            </button>
          </div>
        ))}
      </div>

      {/* Repository Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-card p-4 bg-gradient-to-br from-primary/5 to-transparent">
          <h3 className="text-sm font-medium text-foreground mb-1">Total Repositories</h3>
          <p className="text-2xl font-semibold text-primary">156</p>
          <p className="text-xs text-muted-foreground mt-1">12 new this month</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 bg-gradient-to-br from-green-500/5 to-transparent">
          <h3 className="text-sm font-medium text-foreground mb-1">Active Projects</h3>
          <p className="text-2xl font-semibold text-green-500">45</p>
          <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 bg-gradient-to-br from-orange-500/5 to-transparent">
          <h3 className="text-sm font-medium text-foreground mb-1">Contributors</h3>
          <p className="text-2xl font-semibold text-orange-500">89</p>
          <p className="text-xs text-muted-foreground mt-1">Across all repos</p>
        </div>
      </div>
    </div>
  )
}

export default Repositories