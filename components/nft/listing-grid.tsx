"use client";

import React, { useEffect, useState } from "react";
import {
  DirectListing,
  EnglishAuction,
  getAllValidAuctions,
  getAllValidListings,
} from "thirdweb/extensions/marketplace";
import { NFT as NFTType, ThirdwebContract } from "thirdweb";
import { MARKETPLACE, NFT_COLLECTION } from "@/contracts/contracts";
import NFTGrid, { NFTGridLoading } from "@/components/nft/nft-grid";
import { toast } from "sonner";

type Props = {
  marketplace: ThirdwebContract;
  collection: ThirdwebContract;
  overrideOnclickBehavior?: (nft: NFTType) => void;
  emptyText: string;
};

interface NFTData {
  tokenId: bigint;
  nft?: NFTType;
  directListing?: DirectListing;
  auctionListing?: EnglishAuction;
}

const ListingGrid: React.FC<Props> = (props) => {
  const [nftData, setNftData] = useState<NFTData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    const listingsPromise = getAllValidListings({
      contract: MARKETPLACE,
    });
    const auctionsPromise = getAllValidAuctions({
      contract: MARKETPLACE,
    });

    const [listings, auctions] = await Promise.all([
      listingsPromise,
      auctionsPromise,
    ]);

    // Retrieve all NFTs from the listings
    const tokenIds = Array.from(
      new Set([
        ...listings
          .filter((l) => l.assetContractAddress === NFT_COLLECTION.address)
          .map((l) => l.tokenId),
        ...auctions
          .filter((a) => a.assetContractAddress === NFT_COLLECTION.address)
          .map((a) => a.tokenId),
      ])
    );

    const nftData = tokenIds.map((tokenId) => {
      return {
        tokenId: tokenId,
        directListing: listings.find((listing) => listing.tokenId === tokenId),
        auctionListing: auctions.find((listing) => listing.tokenId === tokenId),
      };
    });

    setNftData(nftData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData()
      .then(() => {})
      .catch((Error) => toast.error("Error fetch data") + Error); // Fetch data initially

    const interval = setInterval(() => {
      fetchData()
        .then(() => {})
        .catch((Error) => toast.error("Error fetch data") + Error);
    }, 10000); // Fetch data every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return loading ? (
    <NFTGridLoading />
  ) : (
    <NFTGrid
      nftData={nftData}
      emptyText={props.emptyText}
      overrideOnclickBehavior={props.overrideOnclickBehavior}
    />
  );
};

export default ListingGrid;
