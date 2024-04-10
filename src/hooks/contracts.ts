import { Abi, Address, type Chain } from 'viem';
import { base } from 'viem/chains';
import { useAccount } from 'wagmi';
import SWAdopterABI from '../contract/SWAdopter';
import UniversalRouterABI from '../contract/UniversalRouterABI'

type ContractInstance = {
  chain: Chain;
  address: Address;
  deactivated?: boolean;
};

type UseContractReturn<T extends Abi> = { abi: T; supportedChains: Chain[] } & (
  | { address: Address; status: 'ready' }
  | { status: 'onUnsupportedNetwork' }
  | { status: 'notConnected' }
  | { status: 'deactivated' }
);

type Spec<T extends Abi> = {
  abi: T;
  [chainId: number]: ContractInstance;
};

/**
 * Generates a hook that returns contract data based on the current network.
 */
export function generateContractHook<T extends Abi>({ abi, ...spec }: Spec<T>) {
  function useContract(): UseContractReturn<typeof abi> {
    const { chain, isConnected } = useAccount();
    const supportedChains = Object.values(spec).map((s) => s.chain);

    if (!isConnected) {
      return { abi, status: 'notConnected', supportedChains };
    }

    if (chain && chain.id in spec) {
      if (spec[chain.id].deactivated) {
        return { abi, status: 'deactivated', supportedChains };
      }

      return {
        abi,
        address: spec[chain.id].address,
        status: 'ready',
        supportedChains,
      };
    }

    return {
      abi,
      status: 'onUnsupportedNetwork',
      supportedChains,
    };
  }

  return useContract;
}

export const useUniversalRouterContract = generateContractHook({
  abi: UniversalRouterABI,
  [base.id]: {
    chain: base,
    address: '0x198EF79F1F515F02dFE9e3115eD9fC07183f02fC',
  },
});
