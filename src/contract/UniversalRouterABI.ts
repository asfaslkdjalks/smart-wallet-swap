const abi = [
    {
      type: 'constructor',
      inputs: [
        {
          internalType: 'struct RouterParameters',
          name: 'params',
          type: 'tuple',
          components: [
            { internalType: 'address', name: 'permit2', type: 'address' },
            { internalType: 'address', name: 'weth9', type: 'address' },
            { internalType: 'address', name: 'seaportV1_5', type: 'address' },
            { internalType: 'address', name: 'seaportV1_4', type: 'address' },
            { internalType: 'address', name: 'openseaConduit', type: 'address' },
            { internalType: 'address', name: 'nftxZap', type: 'address' },
            { internalType: 'address', name: 'x2y2', type: 'address' },
            { internalType: 'address', name: 'foundation', type: 'address' },
            { internalType: 'address', name: 'sudoswap', type: 'address' },
            { internalType: 'address', name: 'elementMarket', type: 'address' },
            { internalType: 'address', name: 'nft20Zap', type: 'address' },
            { internalType: 'address', name: 'cryptopunks', type: 'address' },
            { internalType: 'address', name: 'looksRareV2', type: 'address' },
            { internalType: 'address', name: 'routerRewardsDistributor', type: 'address' },
            { internalType: 'address', name: 'looksRareRewardsDistributor', type: 'address' },
            { internalType: 'address', name: 'looksRareToken', type: 'address' },
            { internalType: 'address', name: 'v2Factory', type: 'address' },
            { internalType: 'address', name: 'v3Factory', type: 'address' },
            { internalType: 'bytes32', name: 'pairInitCodeHash', type: 'bytes32' },
            { internalType: 'bytes32', name: 'poolInitCodeHash', type: 'bytes32' }
          ]
        }
      ],
      stateMutability: 'nonpayable'
    },
    {
      type: 'error',
      name: 'BalanceTooLow',
      inputs: []
    },
    {
      type: 'error',
      name: 'BuyPunkFailed',
      inputs: []
    },
    {
      type: 'error',
      name: 'ContractLocked',
      inputs: []
    },
    {
      type: 'error',
      name: 'ETHNotAccepted',
      inputs: []
    },
    {
      type: 'error',
      name: 'ExecutionFailed',
      inputs: [
        { internalType: 'uint256', name: 'commandIndex', type: 'uint256' },
        { internalType: 'bytes', name: 'message', type: 'bytes' }
      ]
    },
    {
      type: 'error',
      name: 'FromAddressIsNotOwner',
      inputs: []
    },
    {
      type: 'error',
      name: 'InsufficientETH',
      inputs: []
    },
    {
      type: 'error',
      name: 'InsufficientToken',
      inputs: []
    },
    {
      type: 'error',
      name: 'InvalidBips',
      inputs: []
    },
    {
      type: 'error',
      name: 'InvalidCommandType',
      inputs: [
        { internalType: 'uint256', name: 'commandType', type: 'uint256' }
      ]
    },
    {
      type: 'error',
      name: 'InvalidOwnerERC1155',
      inputs: []
    },
    {
      type: 'error',
      name: 'InvalidOwnerERC721',
      inputs: []
    },
    {
      type: 'error',
      name: 'InvalidPath',
      inputs: []
    },
    {
      type: 'error',
      name: 'InvalidReserves',
      inputs: []
    },
    {
      type: 'error',
      name: 'InvalidSpender',
      inputs: []
    },
    {
      type: 'error',
      name: 'LengthMismatch',
      inputs: []
    },
    {
      type: 'error',
      name: 'SliceOutOfBounds',
      inputs: []
    },
    {
      type: 'error',
      name: 'TransactionDeadlinePassed',
      inputs: []
    },
    {
      type: 'error',
      name: 'UnableToClaim',
      inputs: []
    },
    {
      type: 'error',
      name: 'UnsafeCast',
      inputs: []
    },
    {
      type: 'error',
      name: 'V2InvalidPath',
      inputs: []
    },
    {
      type: 'error',
      name: 'V2TooLittleReceived',
      inputs: []
    },
    {
      type: 'error',
      name: 'V2TooMuchRequested',
      inputs: []
    },
    {
      type: 'error',
      name: 'V3InvalidAmountOut',
      inputs: []
    },
    {
      type: 'error',
      name: 'V3InvalidCaller',
      inputs: []
    },
    {
      type: 'error',
      name: 'V3InvalidSwap',
      inputs: []
    },
    {
      type: 'error',
      name: 'V3TooLittleReceived',
      inputs: []
    },
    {
      type: 'error',
      name: 'V3TooMuchRequested',
      inputs: []
    },
    {
      type: 'event',
      name: 'RewardsSent',
      inputs: [
        { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' }
      ],
      anonymous: false
    },
    {
      type: 'function',
      name: 'collectRewards',
      inputs: [
        { internalType: 'bytes', name: 'looksRareClaim', type: 'bytes' }
      ],
      outputs: [],
      stateMutability: 'nonpayable'
    },
    {
        type: 'function',
        name: 'execute',
        inputs: [
          { internalType: 'bytes', name: 'commands', type: 'bytes' },
          { internalType: 'bytes[]', name: 'inputs', type: 'bytes[]' }
        ],
        outputs: [],
        stateMutability: 'payable'
      },
      {
        type: 'function',
        name: 'execute',
        inputs: [
          { internalType: 'bytes', name: 'commands', type: 'bytes' },
          { internalType: 'bytes[]', name: 'inputs', type: 'bytes[]' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' }
        ],
        outputs: [],
        stateMutability: 'payable'
      },
      {
        type: 'function',
        name: 'onERC1155BatchReceived',
        inputs: [
          { internalType: 'address', name: '', type: 'address' },
          { internalType: 'address', name: '', type: 'address' },
          { internalType: 'uint256[]', name: '', type: 'uint256[]' },
          { internalType: 'uint256[]', name: '', type: 'uint256[]' },
          { internalType: 'bytes', name: '', type: 'bytes' }
        ],
        outputs: [
          { internalType: 'bytes4', name: '', type: 'bytes4' }
        ],
        stateMutability: 'pure'
      },
      {
        type: 'function',
        name: 'onERC1155Received',
        inputs: [
          { internalType: 'address', name: '', type: 'address' },
          { internalType: 'address', name: '', type: 'address' },
          { internalType: 'uint256', name: '', type: 'uint256' },
          { internalType: 'uint256', name: '', type: 'uint256' },
          { internalType: 'bytes', name: '', type: 'bytes' }
        ],
        outputs: [
          { internalType: 'bytes4', name: '', type: 'bytes4' }
        ],
        stateMutability: 'pure'
      },
      {
        type: 'function',
        name: 'onERC721Received',
        inputs: [
          { internalType: 'address', name: '', type: 'address' },
          { internalType: 'address', name: '', type: 'address' },
          { internalType: 'uint256', name: '', type: 'uint256' },
          { internalType: 'bytes', name: '', type: 'bytes' }
        ],
        outputs: [
          { internalType: 'bytes4', name: '', type: 'bytes4' }
        ],
        stateMutability: 'pure'
      },
      {
        type: 'function',
        name: 'supportsInterface',
        inputs: [
          { internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }
        ],
        outputs: [
          { internalType: 'bool', name: '', type: 'bool' }
        ],
        stateMutability: 'pure'
      },
      {
        type: 'function',
        name: 'uniswapV3SwapCallback',
        inputs: [
          { internalType: 'int256', name: 'amount0Delta', type: 'int256' },
          { internalType: 'int256', name: 'amount1Delta', type: 'int256' },
          { internalType: 'bytes', name: 'data', type: 'bytes' }
        ],
        outputs: [],
        stateMutability: 'nonpayable'
      },
      {
        type: 'receive',
        stateMutability: 'payable'
      }
    ] as const;
    
export default abi;
    