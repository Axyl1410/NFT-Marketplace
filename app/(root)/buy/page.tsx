import { NFTGridLoading } from "@/components/nft/nft-grid";
import React, { Suspense } from "react";
import ListingGrid from "@/components/nft/listing-grid";
import { MARKETPLACE, NFT_COLLECTION } from "@/contracts/contracts";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Buy() {
  return (
    <div className="mt-10">
      <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl">Buy NFTs</h1>

      <div className="my-8">
        <Suspense fallback={<NFTGridLoading />}>
          <ListingGrid
            marketplace={MARKETPLACE}
            collection={NFT_COLLECTION}
            emptyText={
              "Looks like there are no listed NFTs in this collection. Check back later!"
            }
          />
        </Suspense>
      </div>
    </div>
  );
}
