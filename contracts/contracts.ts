import client, {
  address_collection_contract,
  address_marketplace_contract,
  POLYGON_ZKEVM_CARDONA_TESTNET,
} from "@/lib/client";
import { getContract } from "thirdweb";

/** Replace the values below with the addresses of your smart contracts. */
// 1. Set up the network your smart contracts are deployed to.
// First, import the chain from the package, then set the NETWORK variable to the chain.

export const MARKETPLACE = getContract({
  client,
  chain: POLYGON_ZKEVM_CARDONA_TESTNET,
  address: address_marketplace_contract,
});

export const NFT_COLLECTION = getContract({
  client,
  chain: POLYGON_ZKEVM_CARDONA_TESTNET,
  address: address_collection_contract,
});

// (Optional) Set up the URL of where users can view transactions on
export const POLYGONSCAN_URL = "https://cardona-zkevm.polygonscan.com";
