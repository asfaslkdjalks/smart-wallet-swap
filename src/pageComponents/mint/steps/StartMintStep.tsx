"use client";
import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { TransactionExecutionError } from 'viem';
import { Config, useConnect, useConnectors, useSwitchChain } from 'wagmi';
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import Button from '../../../components/Button/Button';
import { EXPECTED_CHAIN } from '../../../constants';
import { useUniversalRouterContract } from '../../../hooks/contracts';
import { MintSteps } from '../ContractDemo';
import MintCompleteStep from './MintCompleteStep';
import MintProcessingStep from './MintProcessingStep';
import OutOfGasStep from './OutOfGasStep';
import { CustomConnectButton } from '../../../components/Button/CustomConnectButton';
import { WriteContractMutate } from 'wagmi/query';
import { reloadIfNeeded } from '../../../utils/reloadIfNeeded';
import { ethers } from 'ethers'
import { AlphaRouter, SwapType, SwapOptions, SwapRoute } from '@uniswap/smart-order-router'
import { ChainId, Percent, CurrencyAmount, Ether, TradeType, Token } from '@uniswap/sdk-core'

if (typeof window !== "undefined") {
  // @ts-ignore
    window.Browser = {
      T: () => {
      }
    };
  }

type StartMintProps = {
  setMintStep: React.Dispatch<React.SetStateAction<MintSteps>>;
  mintStep: MintSteps;
};

export default function StartMintStep({ setMintStep, mintStep }: StartMintProps) {
  const [mintLifecycle, setMintLifecycle] = useState<'simulate' | 'readyToMint' | 'minting'>(
    'simulate',
  );

  const { chain, address } = useAccount();

  const contract = useUniversalRouterContract();
  
  const onCorrectNetwork = chain?.id === EXPECTED_CHAIN.id;
  const accountReady = onCorrectNetwork && address != undefined;
  console.log({ mintLifecycle, accountReady, chain });

  const TOKEN_B_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
  const tokenB = new Token(1, TOKEN_B_ADDRESS, 6, 'WETH', 'USDC');

  const [quote, setQuote] = useState<SwapRoute | null>(null);
  const [inputs, setInputs] = useState<`0x${string}`[]>([]);
  const [command, setCommand] = useState<`0x${string}`>('0x0b00')

  useEffect(() => {
    const fetchAndSetQuote = async () => {
      try {
          const provider = new ethers.providers.JsonRpcProvider('https://ethereum-rpc.publicnode.com');
          const router = new AlphaRouter({ chainId: 1, provider }); // Use the correct ChainId here
          const amountInWei = ethers.utils.parseUnits('.00001', 'ether');
          const amountIn = CurrencyAmount.fromRawAmount(Ether.onChain(1), amountInWei.toString()); // Use the correct ChainId
          const swapOptions = {
              type: SwapType.UNIVERSAL_ROUTER,
              recipient: address, // Assuming 'address' is the user's address
              slippageTolerance: new Percent(50, 10000), // 0.5% slippage tolerance
              deadlineOrPreviousBlockhash: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from now
          };
          const fetchedQuote = await router.route(amountIn, tokenB, TradeType.EXACT_INPUT, swapOptions as SwapOptions);
          console.log(fetchedQuote)
          setQuote(fetchedQuote); // Save the fetched quote to state
          if(quote?.methodParameters){
            const calldata = quote.methodParameters.calldata
            const iface = new ethers.utils.Interface(contract.abi);
            const decodedArgs = iface.parseTransaction({ data: calldata });

            // Assuming the first argument is commands and the second is inputs
            const commands = decodedArgs.args[0];
            const inputs = decodedArgs.args[1];
            setCommand(commands)
            setInputs(inputs)
            console.log('>>inputs', inputs, commands)
        }
      } catch (error) {
          console.error('Failed to fetch quote:', error);
      }
    };
  
    if (address) {
      fetchAndSetQuote();
    }
  }, [address, quote]); // Re-fetch quote if address or provider changes


  const simulation = useSimulateContract({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: 'execute',
    args: [command, inputs],
    query: {
      enabled: onCorrectNetwork && address != undefined && mintLifecycle !== 'minting',
    },
  });

  const { writeContractAsync, error: errorMint, data: dataMint } = useWriteContract();

  const { status: transactionStatus } = useWaitForTransactionReceipt({
    hash: dataMint,
    query: {
      enabled: !!dataMint,
    },
  });

  useEffect(() => {
    if (!accountReady) return;
  
    console.log('Mint Lifecycle:', mintLifecycle);
    console.log('Simulation fetched:', simulation?.isFetched);
    console.log('Simulation request:', simulation);
  
    if (mintLifecycle === 'simulate' && simulation?.isFetched) {
      if (simulation) {
        console.log('Simulation completed, ready to mint.');
        setMintLifecycle('readyToMint');
      } else {
        console.warn('Simulation completed but request is not ready.');
      }
    }
  }, [mintLifecycle, simulation?.isFetched]);
  

  useEffect(() => {
    if (!accountReady) return;
    if (transactionStatus === 'success') {
      setMintStep(MintSteps.MINT_COMPLETE_STEP);
      setMintLifecycle('simulate');
      simulation.refetch();
      console.log('resetting state to start');
    }

    if (errorMint) {
      const isOutOfGas =
        errorMint instanceof TransactionExecutionError &&
        errorMint.message.toLowerCase().includes('out of gas');
      setMintStep(isOutOfGas ? MintSteps.OUT_OF_GAS_STEP : MintSteps.START_MINT_STEP);

      console.error(errorMint);
      // Handle specific errors or display user-friendly error messages.
      if (
        errorMint.message.includes('User denied transaction') ||
        errorMint.message.includes('User rejected the request')
      ) {
        // User rejected the transaction
        setMintLifecycle('simulate');
        // You can display a message to the user here.
      } else {
        console.error('An error occurred while processing the transaction:', errorMint.message);
      }
    }
  }, [transactionStatus, setMintStep, errorMint]);

  const handleMint = useCallback(async () => {
    if (simulation?.data?.request) {
      setMintLifecycle('minting');
      try {
        await writeContractAsync?.(simulation?.data?.request);
      } catch {
        reloadIfNeeded();
      }
    } else {
      console.error('simulation request not found');
    }   
    setMintStep(MintSteps.MINT_PROCESSING_STEP);

    
  }, [simulation, writeContractAsync]);

  return (
    <>
      {mintStep === MintSteps.MINT_PROCESSING_STEP && <MintProcessingStep />}
      {mintStep === MintSteps.OUT_OF_GAS_STEP && <OutOfGasStep setMintStep={setMintStep} />}
      {mintStep === MintSteps.MINT_COMPLETE_STEP && (
        <MintCompleteStep setMintStep={setMintStep} />
      )}

      {mintStep === MintSteps.START_MINT_STEP && !!address && (
        <Button
          buttonContent="Mint"
          onClick={address ? handleMint : undefined}
          disabled={mintLifecycle !== 'readyToMint'}
          className={clsx(
            'lg:max-w-36',
            'bg-white',
            'lg:ml-0',
            'lg:mr-auto',
            'max-w-[120px]',
            'max-h-[40px]',
            'px-2',
            'py-4',
          )}
        />
      )}
      {!address && (
        <CustomConnectButton
          className={clsx(
            'lg:max-w-36',
            'bg-white',
            'lg:ml-0',
            'lg:mr-auto',
            'max-w-[160px]',
            'max-h-[40px]',
            'px-2',
            'py-4',
          )}
          buttonContent={address ? 'Mint' : 'Connect to Mint'}
        />
      )}
    </>
  );
}

