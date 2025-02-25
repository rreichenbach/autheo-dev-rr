import * as React from 'react'
import { Link } from 'react-router-dom'
import {
  Activity,
  Users,
  GitBranch,
  Search,
  Filter,
  Star,
  Code,
  BookOpen,
  Server,
  Wrench,
  ShoppingCart,
  BarChart3,
  Bell,
  FileCode,
  Coins,
  DollarSign,
  Layers,
  ChevronDown,
  ChevronUp,
  X,
  Wallet,
  BarChart,
  PieChart
} from 'lucide-react'

// Mock data for DeFi page
const stakingPools = [
  { name: 'DPT Validator Pool', apy: '12.5%', type: 'Staking' },
  { name: 'DePAIN Node Rewards', apy: '8.7%', type: 'Infrastructure' }
]

const nftItems = [
  { name: 'DeFi Governance NFT', value: '2.5 ETH', type: 'Governance' },
  { name: 'Node Operator License', value: '500 DPT', type: 'Infrastructure' }
]

const tutorials = [
  { title: 'Create a Staking dApp', level: 'Intermediate', duration: '45 min' },
  { title: 'Monetize DePAIN Nodes', level: 'Advanced', duration: '60 min' },
  { title: 'Issue DeFi NFTs', level: 'Beginner', duration: '30 min' }
]

const deploymentGuides = [
  { title: 'Deploy a DeFi dApp on Autheo', level: 'Advanced', duration: '50 min' },
  { title: 'Stake Nodes for Rewards', level: 'Intermediate', duration: '40 min' }
]

const marketplaceItems = [
  { name: 'DPT Starter Pack', price: '$500', type: '1000 DPT' },
  { name: 'DeFi dApp License', price: '$200/year', type: 'License' }
]

// Hero image URL - using a local placeholder image
const heroImageUrl = '/defi-hero-image.png'
// Note: Replace with a proper hero image for production

const DeFi: React.FC = () => {
  // State for collapsible sections
  const [tutorialsExpanded, setTutorialsExpanded] = React.useState(false)
  const [guidesExpanded, setGuidesExpanded] = React.useState(false)
  const [dashboardExpanded, setDashboardExpanded] = React.useState(false)
  const [toolsExpanded, setToolsExpanded] = React.useState(false)
  const [marketplaceExpanded, setMarketplaceExpanded] = React.useState(false)
  const [stakingExpanded, setStakingExpanded] = React.useState(false)
  const [nftsExpanded, setNftsExpanded] = React.useState(false)
  
  // State for search modal
  const [searchQuery, setSearchQuery] = React.useState('')
  const [searchModalOpen, setSearchModalOpen] = React.useState(false)
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    if (e.target.value.length > 0 && !searchModalOpen) {
      setSearchModalOpen(true)
    } else if (e.target.value.length === 0 && searchModalOpen) {
      setSearchModalOpen(false)
    }
  }
  
  // Close search modal
  const closeSearchModal = () => {
    setSearchModalOpen(false)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Search Bar (Full Width) */}
      <div className="glass-card p-4 mb-4 relative">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search for staking pools, NFTs, or DeFi dApps"
              className="w-full bg-background/30 border border-border/50 rounded-md py-2 px-4 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground" />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-primary/60" />
            <span className="text-white text-sm">Filters:</span>
            <div className="flex gap-2">
              <span className="text-xs bg-background/40 text-white px-2 py-1 rounded-md">Reward rate</span>
              <span className="text-xs bg-background/40 text-white px-2 py-1 rounded-md">Liquidity</span>
              <span className="text-xs bg-background/40 text-white px-2 py-1 rounded-md">Mesh integration</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
          <div className="glass-card w-full max-w-4xl p-6 relative">
            <button
              onClick={closeSearchModal}
              className="absolute top-4 right-4 text-white hover:text-primary"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for staking pools, NFTs, or DeFi dApps"
                  className="w-full bg-background/30 border border-border/50 rounded-md py-3 px-4 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  autoFocus
                />
                <Search className="absolute right-3 top-3.5 w-5 h-5 text-muted-foreground" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Top Results</h3>
                <div className="space-y-3">
                  {stakingPools.map((pool, index) => (
                    <div key={index} className="activity-item group">
                      <Coins className="w-4 h-4 text-primary/60" />
                      <div className="flex-1">
                        <p className="font-medium text-white">{pool.name}</p>
                        <p className="text-sm text-muted-foreground">APY: {pool.apy}</p>
                      </div>
                      <Link
                        to="#"
                        className="text-primary hover:text-primary/80 transform transition-transform group-hover:translate-x-1"
                      >
                        →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="glass-button py-2 px-3 text-sm flex items-center justify-center">
                    <span className="text-white">Staking Pools</span>
                  </div>
                  <div className="glass-button py-2 px-3 text-sm flex items-center justify-center">
                    <span className="text-white">NFT Marketplace</span>
                  </div>
                  <div className="glass-button py-2 px-3 text-sm flex items-center justify-center">
                    <span className="text-white">DeFi dApps</span>
                  </div>
                  <div className="glass-button py-2 px-3 text-sm flex items-center justify-center">
                    <span className="text-white">Node Rewards</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section with Image */}
      <div className="glass-card p-0 mb-8 relative overflow-hidden">
        {/* Hero Image */}
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${heroImageUrl})` }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-30"></div>
        
        <div className="relative z-10 p-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
            Unlock DeFi on Autheo
          </h1>
          <p className="text-lg text-white/90 mb-2">
            8 Protocols, 3 NFTs, 95% Staked
          </p>
          <p className="text-md text-muted-foreground mb-4">
            Stake $THEO and $DPT, Monetize Your Infra, and Thrive. Join Now!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link to="/defi/stake" className="glass-button py-3 px-6 flex items-center justify-center group">
              Stake DPT
              <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link to="/defi/tools" className="glass-button py-3 px-6 flex items-center justify-center group">
              Explore DeFi Tools
              <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content - Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Search & Discovery */}
        <div className="space-y-6">
          <div className="glass-card p-6 min-h-[450px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Search & Discovery</h2>
              <Search className="w-5 h-5 text-primary/60" />
            </div>
            
            {/* Featured Items - Collapsible */}
            <div>
              {/* Staking Pools - Collapsible */}
              <div className="mb-4">
                <button
                  className="w-full flex items-center justify-between mb-3"
                  onClick={() => setStakingExpanded(!stakingExpanded)}
                >
                  <div className="flex items-center">
                    <Coins className="w-4 h-4 text-primary/60 mr-2" />
                    <h3 className="text-md font-medium text-white">Top Staking Pools</h3>
                  </div>
                  {stakingExpanded ? (
                    <ChevronUp className="w-4 h-4 text-primary/60" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-primary/60" />
                  )}
                </button>
                
                {stakingExpanded && (
                  <div className="space-y-3 mb-4">
                    {stakingPools.map((pool, index) => (
                      <div key={index} className="activity-item group">
                        <Coins className="w-4 h-4 text-primary/60" />
                        <div className="flex-1">
                          <p className="font-medium text-white">{pool.name}</p>
                          <p className="text-sm text-muted-foreground">APY: {pool.apy}</p>
                        </div>
                        <Link
                          to="#"
                          className="text-primary hover:text-primary/80 transform transition-transform group-hover:translate-x-1"
                        >
                          →
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* NFTs - Collapsible */}
              <div>
                <button
                  className="w-full flex items-center justify-between mb-3"
                  onClick={() => setNftsExpanded(!nftsExpanded)}
                >
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-primary/60 mr-2" />
                    <h3 className="text-md font-medium text-white">High-Yield NFTs on Autheo</h3>
                  </div>
                  {nftsExpanded ? (
                    <ChevronUp className="w-4 h-4 text-primary/60" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-primary/60" />
                  )}
                </button>
                
                {nftsExpanded && (
                  <div className="space-y-3">
                    {nftItems.map((nft, index) => (
                      <div key={index} className="activity-item group">
                        <FileCode className="w-4 h-4 text-primary/60" />
                        <div className="flex-1">
                          <p className="font-medium text-white">{nft.name}</p>
                          <p className="text-sm text-muted-foreground">Value: {nft.value}</p>
                        </div>
                        <Link
                          to="#"
                          className="text-primary hover:text-primary/80 transform transition-transform group-hover:translate-x-1"
                        >
                          →
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Center Column: Build & Deploy */}
        <div className="space-y-6">
          <div className="glass-card p-6 min-h-[450px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Build & Deploy</h2>
              <Code className="w-5 h-5 text-primary/60" />
            </div>
            
            {/* Build Tools & Integrations */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <Wrench className="w-4 h-4 text-primary/60 mr-2" />
                <h3 className="text-md font-medium text-white">Build Tools & Integrations</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="glass-button py-2 px-3 text-sm flex items-center justify-center">
                  <span className="text-white">Autheo DeFi SDK</span>
                </div>
                <div className="glass-button py-2 px-3 text-sm flex items-center justify-center">
                  <span className="text-white">Cosmos Contracts</span>
                </div>
                <div className="glass-button py-2 px-3 text-sm flex items-center justify-center">
                  <span className="text-white">Ethereum Contracts</span>
                </div>
                <div className="glass-button py-2 px-3 text-sm flex items-center justify-center">
                  <span className="text-white">DPT Integration Kits</span>
                </div>
              </div>
            </div>
            
            {/* Tutorials - Collapsible */}
            <div className="mb-6">
              <button
                className="w-full flex items-center justify-between mb-3"
                onClick={() => setTutorialsExpanded(!tutorialsExpanded)}
              >
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 text-primary/60 mr-2" />
                  <h3 className="text-md font-medium text-white">Tutorials</h3>
                </div>
                {tutorialsExpanded ? (
                  <ChevronUp className="w-4 h-4 text-primary/60" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-primary/60" />
                )}
              </button>
              
              {tutorialsExpanded && (
                <div className="space-y-3 mb-4">
                  {tutorials.map((tutorial, index) => (
                    <div key={index} className="activity-item group">
                      <BookOpen className="w-4 h-4 text-primary/60" />
                      <div className="flex-1">
                        <p className="font-medium text-white">{tutorial.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {tutorial.level} • {tutorial.duration}
                        </p>
                      </div>
                      <Link
                        to="#"
                        className="text-primary hover:text-primary/80 transform transition-transform group-hover:translate-x-1"
                      >
                        →
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Deployment Guides - Collapsible */}
            <div className="mb-6">
              <button
                className="w-full flex items-center justify-between mb-3"
                onClick={() => setGuidesExpanded(!guidesExpanded)}
              >
                <div className="flex items-center">
                  <Server className="w-4 h-4 text-primary/60 mr-2" />
                  <h3 className="text-md font-medium text-white">Deployment Guides</h3>
                </div>
                {guidesExpanded ? (
                  <ChevronUp className="w-4 h-4 text-primary/60" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-primary/60" />
                )}
              </button>
              
              {guidesExpanded && (
                <div className="space-y-3 mb-4">
                  {deploymentGuides.map((guide, index) => (
                    <div key={index} className="activity-item group">
                      <Server className="w-4 h-4 text-primary/60" />
                      <div className="flex-1">
                        <p className="font-medium text-white">{guide.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {guide.level} • {guide.duration}
                        </p>
                      </div>
                      <Link
                        to="#"
                        className="text-primary hover:text-primary/80 transform transition-transform group-hover:translate-x-1"
                      >
                        →
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Tools - Collapsible */}
            <div>
              <button
                className="w-full flex items-center justify-between mb-3"
                onClick={() => setToolsExpanded(!toolsExpanded)}
              >
                <div className="flex items-center">
                  <Wrench className="w-4 h-4 text-primary/60 mr-2" />
                  <h3 className="text-md font-medium text-white">Tools</h3>
                </div>
                {toolsExpanded ? (
                  <ChevronUp className="w-4 h-4 text-primary/60" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-primary/60" />
                )}
              </button>
              
              {toolsExpanded && (
                <div className="space-y-2 text-sm mb-4">
                  <p className="text-muted-foreground">• Blockchain deployment scripts</p>
                  <p className="text-muted-foreground">• Mesh integration for DeFi</p>
                  <p className="text-muted-foreground">• NFT minting tools</p>
                </div>
              )}
              
              <Link
                to="/defi/deploy"
                className="glass-button mt-4 w-full flex items-center justify-center group"
              >
                Deploy DeFi Solution
                <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Right Column: Buy & Manage */}
        <div className="space-y-6">
          <div className="glass-card p-6 min-h-[450px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Buy & Manage</h2>
              <ShoppingCart className="w-5 h-5 text-primary/60" />
            </div>
            
            {/* Marketplace - Collapsible */}
            <div className="mb-6">
              <button
                className="w-full flex items-center justify-between mb-3"
                onClick={() => setMarketplaceExpanded(!marketplaceExpanded)}
              >
                <div className="flex items-center">
                  <ShoppingCart className="w-4 h-4 text-primary/60 mr-2" />
                  <h3 className="text-md font-medium text-white">Marketplace</h3>
                </div>
                {marketplaceExpanded ? (
                  <ChevronUp className="w-4 h-4 text-primary/60" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-primary/60" />
                )}
              </button>
              
              <p className="text-sm text-muted-foreground mb-3">
                Buy DPT tokens, DeFi dApps, or NFT licenses with DPT, crypto, or fiat.
              </p>
              
              {marketplaceExpanded && (
                <>
                  <div className="space-y-4 mb-4">
                    {marketplaceItems.map((item, index) => (
                      <div key={index} className="glass-card p-4 border border-border/30">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-white font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.type}</p>
                          </div>
                          <span className="text-primary font-medium">{item.price}</span>
                        </div>
                        <button className="glass-button mt-3 w-full flex items-center justify-center group text-sm py-1.5">
                          Purchase
                          <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-white font-medium mb-2">Payment Options</h4>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <div className="glass-button py-1 px-2 text-xs flex items-center justify-center">
                        <span className="text-white">DPT</span>
                      </div>
                      <div className="glass-button py-1 px-2 text-xs flex items-center justify-center">
                        <span className="text-white">ETH</span>
                      </div>
                      <div className="glass-button py-1 px-2 text-xs flex items-center justify-center">
                        <span className="text-white">USDC</span>
                      </div>
                      <div className="glass-button py-1 px-2 text-xs flex items-center justify-center">
                        <span className="text-white">Fiat</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Includes staking rewards calculator for DPT payments
                    </p>
                  </div>
                </>
              )}
            </div>
            
            {/* Dashboard Features - Collapsible */}
            <div>
              <button
                className="w-full flex items-center justify-between mb-3"
                onClick={() => setDashboardExpanded(!dashboardExpanded)}
              >
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 text-primary/60 mr-2" />
                  <h3 className="text-md font-medium text-white">Dashboard Features</h3>
                </div>
                {dashboardExpanded ? (
                  <ChevronUp className="w-4 h-4 text-primary/60" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-primary/60" />
                )}
              </button>
              
              {dashboardExpanded && (
                <div className="space-y-4">
                  <div className="activity-item">
                    <Wallet className="w-4 h-4 text-primary/60" />
                    <div className="flex-1">
                      <p className="font-medium text-white">Portfolio Tracking</p>
                      <p className="text-sm text-muted-foreground">
                        Track DPT stakes, NFT sales, and dApp performance
                      </p>
                    </div>
                  </div>
                  
                  <div className="activity-item">
                    <BarChart className="w-4 h-4 text-primary/60" />
                    <div className="flex-1">
                      <p className="font-medium text-white">Automated Management</p>
                      <p className="text-sm text-muted-foreground">
                        Automated reward distribution, liquidity pool management, and governance voting
                      </p>
                    </div>
                  </div>
                  
                  <div className="activity-item">
                    <Bell className="w-4 h-4 text-primary/60" />
                    <div className="flex-1">
                      <p className="font-medium text-white">Alerts</p>
                      <p className="text-sm text-muted-foreground">
                        Alerts for staking changes, yield drops, and network issues
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <Link
                to="/defi/dashboard"
                className="glass-button mt-4 w-full flex items-center justify-center group"
              >
                Open Dashboard
                <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Navigation */}
      <div className="glass-card p-6 mt-8">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          <Link to="/defi/docs" className="text-white hover:text-primary transition-colors">
            DeFi Documentation
          </Link>
          <Link to="http://localhost:8085/autheo/channels/decentralized-finance" className="text-white hover:text-primary transition-colors">
            Community
          </Link>
          <Link to="/defi/governance" className="text-white hover:text-primary transition-colors">
            Governance Proposals
          </Link>
          <Link to="/defi/support" className="text-white hover:text-primary transition-colors">
            Support
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DeFi