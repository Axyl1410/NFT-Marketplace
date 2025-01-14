import client from "@/lib/client";
/** Replace the values below with the addresses of your smart contracts. */
// 1. Set up the network your smart contracts are deployed to.
// First, import the chain from the package, then set the NETWORK variable to the chain.
import { defineChain, getContract } from "thirdweb";

export const NETWORK = defineChain({
  id: 2442,
  name: "Polygon zkEVM Cardona Testnet",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.cardona.zkevm-rpc.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://cardona-zkevm.polygonscan.com",
    },
  },
  testnet: true,
});

// 2. The address of the marketplace V3 smart contract.
// Deploy your own: https://thirdweb.com/thirdweb.eth/MarketplaceV3
const MARKETPLACE_ADDRESS = "";
export const MARKETPLACE = getContract({
  address: MARKETPLACE_ADDRESS,
  client,
  chain: NETWORK,
});

// 3. The address of your NFT collection smart contract.
const NFT_COLLECTION_ADDRESS = "";
export const NFT_COLLECTION = getContract({
  address: NFT_COLLECTION_ADDRESS,
  client,
  chain: NETWORK,
});

// (Optional) Set up the URL of where users can view transactions on
// For example, below, we use Mumbai.polygonscan to view transactions on the Mumbai testnet.
export const ETHERSCAN_URL = "https://sepolia.etherscan.io";
