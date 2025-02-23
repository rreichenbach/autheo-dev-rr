import * as React from 'react'
import { AlertCircle, ChevronDown } from 'lucide-react'

const categories = [
  'Technical',
  'Financial',
  'Community',
  'Partnership',
  'Security',
  'Other'
]

const impactLevels = [
  'High',
  'Medium',
  'Low'
]

const votingDurations = [
  '3 days',
  '5 days',
  '7 days',
  '14 days'
]

const CreateProposal: React.FC = () => {
  const [category, setCategory] = React.useState('')
  const [impactLevel, setImpactLevel] = React.useState('')
  const [votingDuration, setVotingDuration] = React.useState('')

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30 blur-3xl" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Create Proposal</h1>
        <p className="text-lg text-muted-foreground">
          Submit a new proposal for community voting
        </p>
      </div>

      {/* Form */}
      <div className="glass-card p-8">
        <form className="space-y-8">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter proposal title"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">
              Description
            </label>
            <textarea
              rows={6}
              placeholder="Describe your proposal in detail"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Impact Level */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">
              Impact Level
            </label>
            <div className="relative">
              <select
                value={impactLevel}
                onChange={(e) => setImpactLevel(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Select impact level</option>
                {impactLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Voting Duration */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">
              Voting Duration
            </label>
            <div className="relative">
              <select
                value={votingDuration}
                onChange={(e) => setVotingDuration(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Select duration</option>
                {votingDurations.map((duration) => (
                  <option key={duration} value={duration}>{duration}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start space-x-3 p-4 rounded-lg bg-primary/10">
            <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Make sure your proposal aligns with the community guidelines. 
              Proposals cannot be modified after submission.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4 pt-4">
            <button
              type="button"
              className="px-6 py-3 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-lg bg-primary/20 text-white hover:bg-primary/30 transition-colors"
            >
              Submit Proposal
            </button>
          </div>
        </form>
      </div>

      {/* Decorative elements */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      </div>
    </div>
  )
}

export default CreateProposal