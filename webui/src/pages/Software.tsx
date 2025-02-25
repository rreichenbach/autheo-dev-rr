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
  Package,
  Cpu,
  Layers,
  ChevronDown,
  ChevronUp,
  X,
  Boxes,
  Library,
  LayoutGrid
} from 'lucide-react'

// Mock data for Software page
const developmentTools = [
  { name: 'Autheo Software SDK', type: 'SDK', downloads: 1245 },
  { name: 'dApp Development Kit', type: 'Development Kit', downloads: 987 }
]

const frameworks = [
  { name: 'Mesh Framework', type: 'Framework', downloads: 756 },
  { name: 'DePAIN Integration Library', type: 'Library', downloads: 543 }
]

const tutorials = [
  { title: 'Build a dApp for DePAIN', level: 'Intermediate', duration: '60 min' },
  { title: 'Create a Framework for Meshes', level: 'Advanced', duration: '90 min' },
  { title: 'Integrate SDKs with LLMs', level: 'Intermediate', duration: '45 min' }
]

const deploymentGuides = [
  { title: 'Deploy a dApp on Autheo Meshes', level: 'Advanced', duration: '50 min' },
  { title: 'Integrate Frameworks with DePAIN', level: 'Intermediate', duration: '40 min' }
]

const marketplaceItems = [
  { name: 'dApp License', price: '$150/year', type: 'License' },
  { name: 'Framework SDK', price: '$100/license', type: 'SDK' }
]

const resources = [
  { title: 'Software Architecture Guides', type: 'Guide', count: 12 },
  { title: 'DePIN Integration', type: 'Documentation', count: 8 },
  { title: 'API Documentation', type: 'Reference', count: 24 }
]

// Hero image URL - using a local placeholder image
const heroImageUrl = '/software-hero-image.png'
// Note: Replace with a proper hero image for production

const Software: React.FC = () => {
  // State for collapsible sections
  const [tutorialsExpanded, setTutorialsExpanded] = React.useState(false)
  const [guidesExpanded, setGuidesExpanded] = React.useState(false)
  const [dashboardExpanded, setDashboardExpanded] = React.useState(false)
  const [toolsExpanded, setToolsExpanded] = React.useState(false)
  const [marketplaceExpanded, setMarketplaceExpanded] = React.useState(false)
  const [resourcesExpanded, setResourcesExpanded] = React.useState(false)
  const [developmentExpanded, setDevelopmentExpanded] = React.useState(false)
  const [frameworksExpanded, setFrameworksExpanded] = React.useState(false)
  
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
              placeholder="Search for dApps, frameworks, or SDKs"
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
              <span className="text-xs bg-background/40 text-white px-2 py-1 rounded-md">DePIN compatibility</span>
              <span className="text-xs bg-background/40 text-white px-2 py-1 rounded-md">License</span>
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
                  placeholder="Search for dApps, frameworks, or SDKs"
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
                  {developmentTools.map((tool, index) => (
                    <div key={index} className="activity-item group">
                      <Package className="w-4 h-4 text-primary/60" />
                      <div className="flex-1">
                        <p className="font-medium text-white">{tool.name}</p>
                        <p className="text-sm text-muted-foreground">{tool.downloads} downloads</p>
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
                    <span className="text-white">dApps</span>
                  </div>
                  <div className="glass-button py-2 px-3 text-sm flex items-center justify-center">
                    <span className="text-white">Frameworks</span>
                  </div>
                  <div className="glass-button py-2 px-3 text-sm flex items-center justify-center">
                    <span className="text-white">SDKs</span>
                  </div>
                  <div className="glass-button py-2 px-3 text-sm flex items-center justify-center">
                    <span className="text-white">Libraries</span>
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
            Code the Future on Autheo
          </h1>
          <p className="text-lg text-white/90 mb-2">
            8 dApps, 3 Frameworks, 95% Toolkits & SDKs
          </p>
          <p className="text-md text-muted-foreground mb-4">
            Build and Deploy with DePAIN. Start Now!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link to="/software/build" className="glass-button py-3 px-6 flex items-center justify-center group">
              Build Software
              <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link to="/software/deploy" className="glass-button py-3 px-6 flex items-center justify-center group">
              Deploy dApps
              <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content - Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Build & Develop */}
        <div className="space-y-6">
          <div className="glass-card p-6 min-h-[450px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Build & Develop</h2>
              <Code className="w-5 h-5 text-primary/60" />
            </div>
            
            {/* Development Tools - Collapsible */}
            <div className="mb-4">
              <button
                className="w-full flex items-center justify-between mb-3"
                onClick={() => setDevelopmentExpanded(!developmentExpanded)}
              >
                <div className="flex items-center">
                  <Package className="w-4 h-4 text-primary/60 mr-2" />
                  <h3 className="text-md font-medium text-white">Development Tools & Integrations</h3>
                </div>
                {developmentExpanded ? (
                  <ChevronUp className="w-4 h-4 text-primary/60" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-primary/60" />
                )}
              </button>
              
              {developmentExpanded && (
                <div className="space-y-3 mb-4">
                  {developmentTools.map((tool, index) => (
                    <div key={index} className="activity-item group">
                      <Package className="w-4 h-4 text-primary/60" />
                      <div className="flex-1">
                        <p className="font-medium text-white">{tool.name}</p>
                        <p className="text-sm text-muted-foreground">{tool.downloads} downloads</p>
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
            
            {/* Frameworks - Collapsible */}
            <div className="mb-4">
              <button
                className="w-full flex items-center justify-between mb-3"
                onClick={() => setFrameworksExpanded(!frameworksExpanded)}
              >
                <div className="flex items-center">
                  <Boxes className="w-4 h-4 text-primary/60 mr-2" />
                  <h3 className="text-md font-medium text-white">Frameworks & Libraries</h3>
                </div>
                {frameworksExpanded ? (
                  <ChevronUp className="w-4 h-4 text-primary/60" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-primary/60" />
                )}
              </button>
              
              {frameworksExpanded && (
                <div className="space-y-3 mb-4">
                  {frameworks.map((framework, index) => (
                    <div key={index} className="activity-item group">
                      <Library className="w-4 h-4 text-primary/60" />
                      <div className="flex-1">
                        <p className="font-medium text-white">{framework.name}</p>
                        <p className="text-sm text-muted-foreground">{framework.downloads} downloads</p>
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
            
            {/* Tutorials - Collapsible */}
            <div className="mb-4">
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
            
            {/* Resources - Collapsible */}
            <div>
              <button
                className="w-full flex items-center justify-between mb-3"
                onClick={() => setResourcesExpanded(!resourcesExpanded)}
              >
                <div className="flex items-center">
                  <FileCode className="w-4 h-4 text-primary/60 mr-2" />
                  <h3 className="text-md font-medium text-white">Resources</h3>
                </div>
                {resourcesExpanded ? (
                  <ChevronUp className="w-4 h-4 text-primary/60" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-primary/60" />
                )}
              </button>
              
              {resourcesExpanded && (
                <div className="space-y-3">
                  {resources.map((resource, index) => (
                    <div key={index} className="activity-item group">
                      <FileCode className="w-4 h-4 text-primary/60" />
                      <div className="flex-1">
                        <p className="font-medium text-white">{resource.title}</p>
                        <p className="text-sm text-muted-foreground">{resource.count} {resource.type.toLowerCase()} items</p>
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
        
        {/* Center Column: Buy & License */}
        <div className="space-y-6">
          <div className="glass-card p-6 min-h-[450px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Buy & License</h2>
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
                Buy dApps, frameworks, or SDK licenses.
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
                      Includes staking rewards for software providers
                    </p>
                  </div>
                </>
              )}
              
              <Link
                to="/software/marketplace"
                className="glass-button mt-4 w-full flex items-center justify-center group"
              >
                Browse Marketplace
                <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Right Column: Deploy & Manage */}
        <div className="space-y-6">
          <div className="glass-card p-6 min-h-[450px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Deploy & Manage</h2>
              <Server className="w-5 h-5 text-primary/60" />
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
            <div className="mb-6">
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
                  <p className="text-muted-foreground">• dApp deployment scripts</p>
                  <p className="text-muted-foreground">• Mesh integration</p>
                  <p className="text-muted-foreground">• Filecoin storage for code</p>
                </div>
              )}
              
              <Link
                to="/software/deploy"
                className="glass-button mt-4 w-full flex items-center justify-center group"
              >
                Deploy Software
                <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
              </Link>
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
                    <LayoutGrid className="w-4 h-4 text-primary/60" />
                    <div className="flex-1">
                      <p className="font-medium text-white">Performance Monitoring</p>
                      <p className="text-sm text-muted-foreground">
                        Monitor dApp performance, framework usage, and SDK adoption
                      </p>
                    </div>
                  </div>
                  
                  <div className="activity-item">
                    <Layers className="w-4 h-4 text-primary/60" />
                    <div className="flex-1">
                      <p className="font-medium text-white">Automated Management</p>
                      <p className="text-sm text-muted-foreground">
                        Automated updates, AI-driven testing, and DPT staking for software nodes
                      </p>
                    </div>
                  </div>
                  
                  <div className="activity-item">
                    <Bell className="w-4 h-4 text-primary/60" />
                    <div className="flex-1">
                      <p className="font-medium text-white">Alerts</p>
                      <p className="text-sm text-muted-foreground">
                        Alerts for bugs, performance drops, or reward distributions
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <Link
                to="/software/dashboard"
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
          <Link to="/software/docs" className="text-white hover:text-primary transition-colors">
            Software Documentation
          </Link>
          <Link to="http://localhost:8085/autheo/channels/software" className="text-white hover:text-primary transition-colors">
            Community
          </Link>
          <Link to="/software/governance" className="text-white hover:text-primary transition-colors">
            Governance Proposals
          </Link>
          <Link to="/software/support" className="text-white hover:text-primary transition-colors">
            Support
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Software