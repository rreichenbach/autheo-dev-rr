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
  Database,
  Cpu,
  Layers,
  ChevronDown,
  ChevronUp,
  X,
  LineChart,
  PieChart,
  Network,
  BarChart
} from 'lucide-react'

// Mock data for DnA page
const dataOracles = [
  { name: 'DePAIN Price Oracle', latency: '50ms', type: 'Financial' },
  { name: 'Mesh Performance Oracle', latency: '120ms', type: 'Network' }
]

const dataPipelines = [
  { name: 'LLM Training Pipeline', throughput: '500MB/s', type: 'AI' },
  { name: 'Mesh Analytics Pipeline', throughput: '250MB/s', type: 'Network' }
]

const networkBridges = [
  { name: 'Ethereum-DePAIN Bridge', transactions: '1.2M', type: 'Blockchain' },
  { name: 'Filecoin Data Bridge', transactions: '850K', type: 'Storage' }
]

const tutorials = [
  { title: 'Build a Data Pipeline for LLMs', level: 'Intermediate', duration: '60 min' },
  { title: 'Create an Oracle for DePAIN Meshes', level: 'Advanced', duration: '75 min' },
  { title: 'Analyze Mesh Performance', level: 'Beginner', duration: '45 min' }
]

const deploymentGuides = [
  { title: 'Deploy a Data Pipeline on DePAIN', level: 'Advanced', duration: '50 min' },
  { title: 'Integrate Oracles with Meshes', level: 'Intermediate', duration: '40 min' }
]

const marketplaceItems = [
  { name: 'Premium Oracle License', price: '$150/year', type: 'License' },
  { name: 'Data Pipeline Template', price: '$80/license', type: 'Template' }
]

// Hero image URL - using a local placeholder image
const heroImageUrl = '/dna-hero-image.png'
// Note: Replace with a proper hero image for production

const DnA: React.FC = () => {
  // State for collapsible sections
  const [tutorialsExpanded, setTutorialsExpanded] = React.useState(false)
  const [guidesExpanded, setGuidesExpanded] = React.useState(false)
  const [dashboardExpanded, setDashboardExpanded] = React.useState(false)
  const [toolsExpanded, setToolsExpanded] = React.useState(false)
  const [marketplaceExpanded, setMarketplaceExpanded] = React.useState(false)
  const [oraclesExpanded, setOraclesExpanded] = React.useState(false)
  const [pipelinesExpanded, setPipelinesExpanded] = React.useState(false)
  const [bridgesExpanded, setBridgesExpanded] = React.useState(false)
  
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
              placeholder="Search for data interfaces, oracles, or pipelines"
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
              <span className="text-xs bg-background/40 text-white px-2 py-1 rounded-md">Type</span>
              <span className="text-xs bg-background/40 text-white px-2 py-1 rounded-md">Mesh compatibility</span>
              <span className="text-xs bg-background/40 text-white px-2 py-1 rounded-md">Latency</span>
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
                  placeholder="Search for data interfaces, oracles, or pipelines"
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
                  {dataOracles.map((oracle, index) => (
                    <div key={index} className="activity-item group">
                      <Database className="w-4 h-4 text-primary/60" />
                      <div className="flex-1">
                        <p className="font-medium text-white">{oracle.name}</p>
                        <p className="text-sm text-muted-foreground">Latency: {oracle.latency}</p>
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
                    <span className="text-white">Data Oracles</span>
                  </div>
                  <div className="glass-button py-2 px-3 text-sm flex items-center justify-center">
                    <span className="text-white">Data Pipelines</span>
                  </div>
                  <div className="glass-button py-2 px-3 text-sm flex items-center justify-center">
                    <span className="text-white">Network Bridges</span>
                  </div>
                  <div className="glass-button py-2 px-3 text-sm flex items-center justify-center">
                    <span className="text-white">Analytics Tools</span>
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
            Master Data on Autheo
          </h1>
          <p className="text-lg text-white/90 mb-2">
            156 Network Bridges, 45 Oracles, 12 Data Pipelines
          </p>
          <p className="text-md text-muted-foreground mb-4">
            Analyze and Optimize with DePAIN. Dive In Now!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link to="/dna/analyze" className="glass-button py-3 px-6 flex items-center justify-center group">
              Analyze Data
              <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link to="/dna/pipelines" className="glass-button py-3 px-6 flex items-center justify-center group">
              Build Pipelines
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
              {/* Data Oracles - Collapsible */}
              <div className="mb-4">
                <button
                  className="w-full flex items-center justify-between mb-3"
                  onClick={() => setOraclesExpanded(!oraclesExpanded)}
                >
                  <div className="flex items-center">
                    <Database className="w-4 h-4 text-primary/60 mr-2" />
                    <h3 className="text-md font-medium text-white">Top Data Oracles</h3>
                  </div>
                  {oraclesExpanded ? (
                    <ChevronUp className="w-4 h-4 text-primary/60" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-primary/60" />
                  )}
                </button>
                
                {oraclesExpanded && (
                  <div className="space-y-3 mb-4">
                    {dataOracles.map((oracle, index) => (
                      <div key={index} className="activity-item group">
                        <Database className="w-4 h-4 text-primary/60" />
                        <div className="flex-1">
                          <p className="font-medium text-white">{oracle.name}</p>
                          <p className="text-sm text-muted-foreground">Latency: {oracle.latency}</p>
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
              
              {/* Data Pipelines - Collapsible */}
              <div className="mb-4">
                <button
                  className="w-full flex items-center justify-between mb-3"
                  onClick={() => setPipelinesExpanded(!pipelinesExpanded)}
                >
                  <div className="flex items-center">
                    <LineChart className="w-4 h-4 text-primary/60 mr-2" />
                    <h3 className="text-md font-medium text-white">Popular Pipelines for DePAIN</h3>
                  </div>
                  {pipelinesExpanded ? (
                    <ChevronUp className="w-4 h-4 text-primary/60" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-primary/60" />
                  )}
                </button>
                
                {pipelinesExpanded && (
                  <div className="space-y-3 mb-4">
                    {dataPipelines.map((pipeline, index) => (
                      <div key={index} className="activity-item group">
                        <LineChart className="w-4 h-4 text-primary/60" />
                        <div className="flex-1">
                          <p className="font-medium text-white">{pipeline.name}</p>
                          <p className="text-sm text-muted-foreground">Throughput: {pipeline.throughput}</p>
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
              
              {/* Network Bridges - Collapsible */}
              <div>
                <button
                  className="w-full flex items-center justify-between mb-3"
                  onClick={() => setBridgesExpanded(!bridgesExpanded)}
                >
                  <div className="flex items-center">
                    <Network className="w-4 h-4 text-primary/60 mr-2" />
                    <h3 className="text-md font-medium text-white">Popular Network Bridges</h3>
                  </div>
                  {bridgesExpanded ? (
                    <ChevronUp className="w-4 h-4 text-primary/60" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-primary/60" />
                  )}
                </button>
                
                {bridgesExpanded && (
                  <div className="space-y-3">
                    {networkBridges.map((bridge, index) => (
                      <div key={index} className="activity-item group">
                        <Network className="w-4 h-4 text-primary/60" />
                        <div className="flex-1">
                          <p className="font-medium text-white">{bridge.name}</p>
                          <p className="text-sm text-muted-foreground">Transactions: {bridge.transactions}</p>
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
                  <span className="text-white">Autheo DnA SDK</span>
                </div>
                <div className="glass-button py-2 px-3 text-sm flex items-center justify-center">
                  <span className="text-white">Data Pipeline Libraries</span>
                </div>
                <div className="glass-button py-2 px-3 text-sm flex items-center justify-center">
                  <span className="text-white">Oracle Integration Kits</span>
                </div>
                <div className="glass-button py-2 px-3 text-sm flex items-center justify-center">
                  <span className="text-white">Analytics Tools</span>
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
                  <p className="text-muted-foreground">• Pipeline deployment scripts</p>
                  <p className="text-muted-foreground">• Mesh data routing</p>
                  <p className="text-muted-foreground">• Filecoin storage for datasets</p>
                </div>
              )}
              
              <Link
                to="/dna/deploy"
                className="glass-button mt-4 w-full flex items-center justify-center group"
              >
                Deploy DnA Solution
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
                Buy data tools, oracles, or pipeline templates.
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
                      Includes staking rewards for data services
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
                    <LineChart className="w-4 h-4 text-primary/60" />
                    <div className="flex-1">
                      <p className="font-medium text-white">Performance Monitoring</p>
                      <p className="text-sm text-muted-foreground">
                        Monitor data pipelines, oracle performance, and mesh analytics
                      </p>
                    </div>
                  </div>
                  
                  <div className="activity-item">
                    <PieChart className="w-4 h-4 text-primary/60" />
                    <div className="flex-1">
                      <p className="font-medium text-white">Automated Analytics</p>
                      <p className="text-sm text-muted-foreground">
                        Automated data quality checks, AI-driven insights, and DPT staking for data nodes
                      </p>
                    </div>
                  </div>
                  
                  <div className="activity-item">
                    <Bell className="w-4 h-4 text-primary/60" />
                    <div className="flex-1">
                      <p className="font-medium text-white">Alerts</p>
                      <p className="text-sm text-muted-foreground">
                        Alerts for data latency, pipeline failures, and reward distributions
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <Link
                to="/dna/dashboard"
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
          <Link to="/dna/docs" className="text-white hover:text-primary transition-colors">
            DnA Documentation
          </Link>
          <Link to="http://localhost:8085/autheo/channels/data--analytics" className="text-white hover:text-primary transition-colors">
            Community
          </Link>
          <Link to="/dna/governance" className="text-white hover:text-primary transition-colors">
            Governance Proposals
          </Link>
          <Link to="/dna/support" className="text-white hover:text-primary transition-colors">
            Support
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DnA