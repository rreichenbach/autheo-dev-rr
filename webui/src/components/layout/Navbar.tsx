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
                <Link to="devhub" className="nav-link">
                  DevHub
                </Link>
                <Link to="ai" className="nav-link">
                  AI
                </Link>
                <Link to="dna" className="nav-link">
                  DnA
                </Link>
                <Link to="hardware" className="nav-link">
                  Hardware
                </Link>
                <Link to="software" className="nav-link">
                  Software
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
                  to="/devhub"
                  className="nav-link py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  DevHub
                </Link>
                <Link
                  to="/ai"
                  className="nav-link py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  AI
                </Link>
                <Link
                  to="/dna"
                  className="nav-link py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  DnA
                </Link>
                <Link
                  to="/hardware"
                  className="glass-button text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Hardware
                </Link>
                <Link
                  to="/software"
                  className="glass-button text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Software
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