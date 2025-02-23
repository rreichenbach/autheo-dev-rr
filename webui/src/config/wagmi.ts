import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, sepolia } from 'wagmi/chains'
import { http } from 'viem'

export const wagmiConfig = getDefaultConfig({
  appName: 'Autheo',
  projectId: 'd06dd613e5ac56fe184f7f767f806895',
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})