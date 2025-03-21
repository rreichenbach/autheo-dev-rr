import * as React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Sun, Moon } from 'lucide-react'

interface NavbarProps {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ isDark, setIsDark }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Glass background with blur effect */}
      <div className="glass-card border-b border-white/10 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and main navigation */}
            <div className="flex items-center space-x-8">
              <Link 
                to="/" 
                className="text-xl font-bold text-foreground hover:text-primary/90 transition-colors"
              >
                Autheo
              </Link>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                <Link to="http://localhost:8082/explore/repos" className="nav-link">
                  Repositories
                </Link>
               <Link to="http://localhost:8081/projects" className="nav-link">
                  Project Management
                </Link>
                <Link to="http://localhost:8082/explore/organizations" className="nav-link">
                  Governance (DAO)
                </Link>
                <Link to="http://localhost:8083/home/workflows" className="nav-link">
                  Agentic AI Workflows
                </Link>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-4">
              {/* Theme toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-foreground" />
                ) : (
                  <Moon className="w-5 h-5 text-foreground" />
                )}
              </button>

              {/* Create Repository button */}
              <Link
                to="http://localhost:8082/repo/create"
                className="hidden md:inline-flex glass-button"
              >
                Create Repository
              </Link>

              {/* Connect Wallet button */}
              <Link
                to="/connect-wallet"
                className="glass-button bg-primary/20 hover:bg-primary/30"
              >
                Connect Wallet
              </Link>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <Menu className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-slide-in">
          <div className="glass-card mt-16 border-b border-white/10 backdrop-blur-xl">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                <Link
                  to="/repositories"
                  className="nav-link py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Repositories
                </Link>
                <Link
                  to="/community"
                  className="nav-link py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Community
                </Link>
                <Link
                  to="/governance"
                  className="nav-link py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Governance
                </Link>
                <Link
                  to="/repositories/create"
                  className="glass-button text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create Repository
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </nav>
  )
}

export default Navbar