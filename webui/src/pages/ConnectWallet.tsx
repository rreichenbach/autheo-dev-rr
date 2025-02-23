import * as React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const ConnectWallet: React.FC = () => {
  return (
    <div className="max-w-md mx-auto animate-fade-in">
      {/* Header with glow effect */}
      <div className="text-center mb-12 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30 blur-3xl" />
        </div>
        <h1 className="text-3xl font-bold mb-3 text-foreground">Connect Your Wallet</h1>
        <p className="text-lg text-muted-foreground">
          Choose a wallet to participate in governance
        </p>
      </div>

      {/* Custom styled RainbowKit connect button */}
      <div className="glass-card p-8">
        <div className="flex justify-center">
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              mounted,
            }) => {
              const ready = mounted
              const connected = ready && account && chain

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    style: {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                  className="flex flex-col items-center space-y-6"
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button
                          onClick={openConnectModal}
                          type="button"
                          className="glass-button bg-primary/20 hover:bg-primary/30 py-3 px-6 text-lg"
                        >
                          Connect Wallet
                        </button>
                      )
                    }

                    return (
                      <div className="flex flex-col items-center space-y-4">
                        <button
                          onClick={openChainModal}
                          type="button"
                          className="glass-button bg-primary/20 hover:bg-primary/30"
                        >
                          {chain.name}
                        </button>

                        <button
                          onClick={openAccountModal}
                          type="button"
                          className="glass-button bg-primary/20 hover:bg-primary/30"
                        >
                          {account.displayName}
                          {account.displayBalance
                            ? ` (${account.displayBalance})`
                            : ''}
                        </button>
                      </div>
                    )
                  })()}
                </div>
              )
            }}
          </ConnectButton.Custom>
        </div>
      </div>

      {/* Terms of service with gradient border */}
      <div className="mt-12">
        <div className="gradient-border">
          <div className="glass-card px-4 py-3">
            <p className="text-sm text-center text-muted-foreground">
              By connecting, you agree to our Terms of Service
            </p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10" />
      </div>
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none" />
      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none" />
    </div>
  )
}

export default ConnectWallet