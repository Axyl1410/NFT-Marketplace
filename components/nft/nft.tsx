"use client";

import React, { useEffect, useState } from "react";
import { NFT } from "thirdweb";
import { DirectListing, EnglishAuction } from "thirdweb/extensions/marketplace";
import { MediaRenderer } from "thirdweb/react";
import { getNFT } from "thirdweb/extensions/erc721";
import { useRouter } from "next/navigation";
import { NFT_COLLECTION } from "@/contracts/contracts";
import client from "@/lib/client";
import Skeleton from "@/components/skeleton/skeleton";

type Props = {
  tokenId: bigint;
  nft?: NFT;
  directListing?: DirectListing;
  auctionListing?: EnglishAuction;
  overrideOnclickBehavior?: (nft: NFT) => void;
};

export default function NFTComponent({
  tokenId,
  directListing,
  auctionListing,
  overrideOnclickBehavior,
  ...props
}: Props) {
  const router = useRouter();
  const [nft, setNFT] = useState(props.nft);

  useEffect(() => {
    if (nft?.id !== tokenId) {
      getNFT({
        contract: NFT_COLLECTION,
        tokenId: tokenId,
        includeOwner: true,
      }).then((nft) => {
        setNFT(nft);
      });
    }
  }, [tokenId, nft?.id]);

  if (!nft) return <LoadingNFTComponent />;

  return (
    <div
      className="flex h-[350px] w-full cursor-pointer flex-col justify-stretch overflow-hidden rounded-lg border border-white/10 bg-white/[.04] transition-all hover:scale-105 hover:shadow-lg"
      onClick={
        overrideOnclickBehavior
          ? () => overrideOnclickBehavior(nft!)
          : () =>
              router.push(
                `/token/${NFT_COLLECTION.address}/${tokenId.toString()}`
              )
      }
    >
      <div className="relative h-64 w-full overflow-hidden bg-white/[.04]">
        {nft.metadata.image && (
          <MediaRenderer
            src={nft.metadata.image}
            client={client}
            className="object-cover object-center"
          />
        )}
      </div>
      <div className="flex w-full flex-1 items-center justify-between bg-gray-200 px-3 shadow dark:bg-neutral-800">
        <div className="flex flex-col justify-center py-3">
          <p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-lg text-black dark:text-white">
            {nft.metadata.name}
          </p>
          <p className="text-sm font-semibold text-text dark:text-white/60">
            #{nft.id.toString()}
          </p>
        </div>

        {(directListing || auctionListing) && (
          <div className="flex flex-col items-end justify-center">
            <p className="mb-1 max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-medium text-text dark:text-white/60">
              Price
            </p>
            <p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-text dark:text-white">
              {directListing
                ? `${directListing?.currencyValuePerToken.displayValue}${directListing?.currencyValuePerToken.symbol}`
                : `${auctionListing?.minimumBidCurrencyValue.displayValue}${auctionListing?.minimumBidCurrencyValue.symbol}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function LoadingNFTComponent() {
  return (
    <div className="h-[350px] w-full rounded-lg">
      <Skeleton width="100%" height="100%" />
    </div>
  );
}
