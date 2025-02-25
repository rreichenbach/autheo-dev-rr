import * as React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@rainbow-me/rainbowkit/styles.css'

import { wagmiConfig } from './config/wagmi'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import DevHub from './pages/DevHub'
import AI from './pages/AI'
import DnA from './pages/DnA'
import DeFi from './pages/DeFi'
import Hardware from './pages/Hardware'
import Software from './pages/Software'
import Repositories from './pages/Repositories'
import Community from './pages/Community'
import Governance from './pages/Governance'
import CreateProposal from './pages/CreateProposal'
import ActiveProposals from './pages/ActiveProposals'
import ConnectWallet from './pages/ConnectWallet'

const queryClient = new QueryClient()

const App: React.FC = () => {
  const [isDark, setIsDark] = React.useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme ? savedTheme === 'dark' : true
  })

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={isDark ? darkTheme() : lightTheme()}
          coolMode
        >
          <Router>
            <div className="min-h-screen bg-background font-sans antialiased">
              {/* Animated background gradients */}
              <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
              <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-secondary/10 via-background to-background" />
              
              {/* Content */}
              <div className="relative">
                <Navbar isDark={isDark} setIsDark={setIsDark} />
                
                <main className="container mx-auto px-4 py-8 pt-24">
                  <div className="animate-fade-in">
                    <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/DevHub" element={<DevHub />} />
                    <Route path="/AI" element={<AI />} />
                    <Route path="/DeFi" element={<DeFi />} />
                    <Route path="/DnA" element={<DnA />} />
                    <Route path="/Hardware" element={<Hardware />} />
                    <Route path="/Software" element={<Software />} />
                    <Route path="/repositories" element={<Repositories />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/governance" element={<Governance />} />
                    <Route path="/governance/create" element={<CreateProposal />} />
                    <Route path="/governance/proposals" element={<ActiveProposals />} />
                    <Route path="/connect-wallet" element={<ConnectWallet />} />
                    </Routes>
                  </div>
                </main>

                {/* Decorative elements */}
                <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                <div className="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full">
                  <div className="h-[500px] w-[500px] bg-primary/5 blur-[100px]" />
                </div>
              </div>
            </div>
          </Router>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App