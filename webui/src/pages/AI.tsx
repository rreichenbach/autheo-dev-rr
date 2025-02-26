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
  Bot,
  Cpu,
  Layers,
  ChevronDown,
  ChevronUp,
  X,
  ExternalLink
} from 'lucide-react'

// Mock data for AI page
const featuredLLMs = [
  { name: 'Mistral-7B', stars: 1245, type: 'Language Model' },
  { name: 'LLaMA-13B', stars: 987, type: 'Language Model' }
]

// AI Tools data
const aiTools = [
  {
    name: 'Flowise',
    description: 'Low-code LLM app builder with visual workflow editor',
    url: 'http://localhost:13000',
    logoUrl: 'https://remarkable-smakager-ddb2b7.netlify.app/opengraph-image.png?2eca201df198027c'
  },
  {
    name: 'n8n',
    description: 'Workflow automation platform for connecting various services',
    url: 'http://localhost:8083',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/53/N8n-logo-new.svg'
  }
]

const popularRPA = [
  { name: 'Data Extraction Workflow', downloads: 324, type: 'RPA' },
  { name: 'Document Processing', downloads: 256, type: 'RPA' }
]

const tutorials = [
  { title: 'Build an LLM-Powered Chatbot', level: 'Intermediate', duration: '45 min' },
  { title: 'Automate Data Extraction with RPA', level: 'Beginner', duration: '30 min' },
  { title: 'Optimize DePAIN Meshes with AI', level: 'Advanced', duration: '60 min' }
]

const deploymentGuides = [
  { title: 'Deploy LLMs on DePAIN Meshes', level: 'Advanced', duration: '50 min' },
  { title: 'Run RPA Workflows Across Nodes', level: 'Intermediate', duration: '40 min' }
]

const marketplaceItems = [
  { name: 'Premium RPA Workflow', price: '$50/license', type: 'RPA' },
  { name: 'AI Inference Stake', price: '500 DPT/month', type: 'Staking' }
]

// Hero image URL - using a placeholder image from Unsplash
const heroImageUrl = 'ai-hero-image.PNG'

const AI: React.FC = () => {
  // State for collapsible sections
  const [tutorialsExpanded, setTutorialsExpanded] = React.useState(false)
  const [guidesExpanded, setGuidesExpanded] = React.useState(false)
  const [dashboardExpanded, setDashboardExpanded] = React.useState(false)
  const [toolsExpanded, setToolsExpanded] = React.useState(false)
  const [llmsExpanded, setLlmsExpanded] = React.useState(false)
  const [rpaExpanded, setRpaExpanded] = React.useState(false)
  const [marketplaceExpanded, setMarketplaceExpanded] = React.useState(false)
  
  // State for search modal
  const [searchQuery, setSearchQuery] = React.useState('')
  const [searchModalOpen, setSearchModalOpen] = React.useState(false)
  
  // State for AI tools modal
  const [aiToolsModalOpen, setAiToolsModalOpen] = React.useState(false)
  
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
  
  // Open AI tools modal
  const openAiToolsModal = () => {
    setAiToolsModalOpen(true)
  }
  
  // Close AI tools modal
  const closeAiToolsModal = () => {
    setAiToolsModalOpen(false)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Search Bar (Full Width) */}
      <div className="glass-card p-4 mb-4 relative">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search LLMs, RPA scripts, or DePAIN nodes"
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
              <span className="text-xs bg-background/40 text-white px-2 py-1 rounded-md">Model size</span>
              <span className="text-xs bg-background/40 text-white px-2 py-1 rounded-md">Task type</span>
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
                  placeholder="Search LLMs, RPA scripts, or DePAIN nodes"
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
                  {featuredLLMs.map((llm, index) => (
                    <div key={index} className="activity-item group">
                      <Cpu className="w-4 h-4 text-primary/60" />
                      <div className="flex-1">
                        <p className="font-medium text-white">{llm.name}</p>
                        <p className="text-sm text-muted-foreground">{llm.stars} stars</p>
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
                    <span className="text-white">Language Models</span>
                  </div>
                  <div className="glass-button py-2 px-3 text-sm flex items-center justify-center">
                    <span className="text-white">RPA Workflows</span>
                  </div>
                  <div className="glass-button py-2 px-3 text-sm flex items-center justify-center">
                    <span className="text-white">Tutorials</span>
                  </div>
                  <div className="glass-button py-2 px-3 text-sm flex items-center justify-center">
                    <span className="text-white">Deployment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Tools Modal */}
      {aiToolsModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
          <div className="glass-card w-full max-w-4xl p-6 relative">
            <button
              onClick={closeAiToolsModal}
              className="absolute top-4 right-4 text-white hover:text-primary"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-white">AI Tools</h2>
              <p className="text-muted-foreground mt-2">
                Connect to these powerful AI tools to enhance your workflow
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aiTools.map((tool, index) => (
                <div key={index} className="glass-card p-4 border border-border/30 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-md overflow-hidden bg-background/30 flex items-center justify-center">
                      <img
                        src={tool.logoUrl}
                        alt={`${tool.name} logo`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">{tool.name}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {tool.description}
                  </p>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button py-2 px-4 flex items-center justify-center group text-sm"
                  >
                    Open {tool.name}
                    <ExternalLink className="ml-2 w-3 h-3" />
                  </a>
                </div>
              ))}
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
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            Power Your AI with Autheo
          </h1>
          <p className="text-sm text-muted-foreground mb-3">
          324 LLM Libraries, 89 RPA Workflows Created. Automate and Innovate on DePAIN. Start Building Now!
              </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={openAiToolsModal}
              className="glass-button py-3 px-6 flex items-center justify-center group"
            >
              Explore AI Tools
              <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
            </button>
            <Link to="/ai/rpa" className="glass-button py-3 px-6 flex items-center justify-center group">
              Automate with RPA
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
              {/* Top LLMs - Collapsible */}
              <div className="mb-4">
                <button
                  className="w-full flex items-center justify-between mb-3"
                  onClick={() => setLlmsExpanded(!llmsExpanded)}
                >
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-primary/60 mr-2" />
                    <h3 className="text-md font-medium text-white">Top LLMs</h3>
                  </div>
                  {llmsExpanded ? (
                    <ChevronUp className="w-4 h-4 text-primary/60" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-primary/60" />
                  )}
                </button>
                
                {llmsExpanded && (
                  <div className="space-y-3 mb-4">
                    {featuredLLMs.map((llm, index) => (
                      <div key={index} className="activity-item group">
                        <Cpu className="w-4 h-4 text-primary/60" />
                        <div className="flex-1">
                          <p className="font-medium text-white">{llm.name}</p>
                          <p className="text-sm text-muted-foreground">{llm.stars} stars</p>
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
              
              {/* RPA Workflows - Collapsible */}
              <div>
                <button
                  className="w-full flex items-center justify-between mb-3"
                  onClick={() => setRpaExpanded(!rpaExpanded)}
                >
                  <div className="flex items-center">
                    <Bot className="w-4 h-4 text-primary/60 mr-2" />
                    <h3 className="text-md font-medium text-white">Popular RPA Workflows</h3>
                  </div>
                  {rpaExpanded ? (
                    <ChevronUp className="w-4 h-4 text-primary/60" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-primary/60" />
                  )}
                </button>
                
                {rpaExpanded && (
                  <div className="space-y-3">
                    {popularRPA.map((rpa, index) => (
                      <div key={index} className="activity-item group">
                        <FileCode className="w-4 h-4 text-primary/60" />
                        <div className="flex-1">
                          <p className="font-medium text-white">{rpa.name}</p>
                          <p className="text-sm text-muted-foreground">{rpa.downloads} downloads</p>
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
                  <span className="text-white">Hugging Face</span>
                </div>
                <div className="glass-button py-2 px-3 text-sm flex items-center justify-center">
                  <span className="text-white">Autheo AI SDK</span>
                </div>
                <div className="glass-button py-2 px-3 text-sm flex items-center justify-center">
                  <span className="text-white">PyAutoGUI</span>
                </div>
                <div className="glass-button py-2 px-3 text-sm flex items-center justify-center">
                  <span className="text-white">UiPath</span>
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
                  <p className="text-muted-foreground">• Preloaded model templates</p>
                  <p className="text-muted-foreground">• Mesh allocation scripts</p>
                  <p className="text-muted-foreground">• Filecoin storage integration</p>
                </div>
              )}
              
              <button
                onClick={openAiToolsModal}
                className="glass-button mt-4 w-full flex items-center justify-center group"
              >
                View All Tools
                <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
              </button>
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
                License AI models, buy RPA templates, or stake DPT for AI inference.
              </p>
              
              {marketplaceExpanded && (
                <div className="space-y-4 mb-6">
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
                    <BarChart3 className="w-4 h-4 text-primary/60" />
                    <div className="flex-1">
                      <p className="font-medium text-white">Performance Monitoring</p>
                      <p className="text-sm text-muted-foreground">
                        Monitor LLM performance, RPA task status, and mesh health
                      </p>
                    </div>
                  </div>
                  
                  <div className="activity-item">
                    <Layers className="w-4 h-4 text-primary/60" />
                    <div className="flex-1">
                      <p className="font-medium text-white">AI Infrastructure</p>
                      <p className="text-sm text-muted-foreground">
                        AI-driven load balancing, automated scaling, and DPT staking analytics
                      </p>
                    </div>
                  </div>
                  
                  <div className="activity-item">
                    <Bell className="w-4 h-4 text-primary/60" />
                    <div className="flex-1">
                      <p className="font-medium text-white">Alerts</p>
                      <p className="text-sm text-muted-foreground">
                        Alerts for model drift, latency spikes, and reward payouts
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <Link
                to="/ai/dashboard"
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
          <Link to="/ai/docs" className="text-white hover:text-primary transition-colors">
            AI Documentation
          </Link>
          <Link to="http://localhost:8085/autheo/channels/artificial-intelligence" className="text-white hover:text-primary transition-colors">
            Community Forum
          </Link>
          <Link to="/ai/governance" className="text-white hover:text-primary transition-colors">
            Governance Proposals
          </Link>
          <Link to="/ai/support" className="text-white hover:text-primary transition-colors">
            Support
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AI