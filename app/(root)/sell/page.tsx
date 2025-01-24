"use client";

import SaleInfo from "@/components/sale-info";
import { NFT_COLLECTION } from "@/contracts";
import client from "@/lib/client";
import { useState } from "react";
import { Hex, NFT as NFTType } from "thirdweb";
import { getOwnedNFTs } from "thirdweb/extensions/erc721";
import {
  MediaRenderer,
  NFTDescription,
  NFTMedia,
  NFTProvider,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import BackButton from "@/components/common/back-button";
import Loading from "@/components/common/loading";

export const dynamic = "force-dynamic";

export default function Sell() {
  const [selectedNft, setSelectedNft] = useState<NFTType>();
  const account = useActiveAccount();

  const {
    data: NFTs,
    error: Error,
    isLoading: isLoading,
  } = useReadContract(getOwnedNFTs, {
    contract: NFT_COLLECTION,
    owner: account?.address as Hex,
    queryOptions: {
      enabled: !!account?.address,
    },
  });
  console.log("NFTs", NFTs);

  return (
    <div className={"mt-10"}>
      <div className={"flex w-full items-center justify-between"}>
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          Sell NFTs
        </h1>
        {!selectedNft && <BackButton className={"h-fit"} />}
      </div>

      <div className="my-8">
        {!selectedNft ? (
          <>
            {isLoading ? (
              <Loading />
            ) : Error ? (
              <p>Error loading NFTs: {Error.message}</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {NFTs && NFTs.length > 0 ? (
                  <>
                    {NFTs.map((nft: NFTType) => (
                      <div
                        key={nft.id.toString()}
                        className="cursor-pointer rounded-lg border p-4"
                        onClick={() => setSelectedNft(nft)}
                      >
                        <NFTProvider contract={NFT_COLLECTION} tokenId={nft.id}>
                          <NFTMedia className="h-48 w-full rounded-lg object-cover" />
                          <h2 className="mt-2 text-lg font-semibold">
                            {nft.metadata.name}
                          </h2>
                          <p className="text-sm text-gray-600 dark:text-gray-200">
                            Token ID: {nft.id.toString()}
                          </p>
                          <NFTDescription className="mt-2 text-sm" />
                        </NFTProvider>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="flex h-[500px] justify-center">
                    <p className="max-w-lg text-center text-lg font-semibold text-black dark:text-white">
                      Looks like you don&#39;t own any NFTs in this collection.
                      Head to the buy page to buy some!
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="mt-0 flex max-w-full gap-8">
            <div className="flex w-full flex-col">
              <div>
                <MediaRenderer
                  client={client}
                  src={selectedNft.metadata.image}
                  className="!h-auto !w-full rounded-lg bg-white/[.04]"
                />
              </div>
            </div>

            <div className="relative top-0 w-full max-w-full">
              <h1 className="mb-1 break-words text-3xl font-semibold">
                {selectedNft.metadata.name}
              </h1>
              <p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                #{selectedNft.id.toString()}
              </p>
              <p className="text-text dark:text-white/60">
                You&rsquo;re about to list the following item for sale.
              </p>

              <div className="relative flex flex-1 flex-col overflow-hidden rounded-lg bg-transparent py-4">
                <SaleInfo nft={selectedNft} />
              </div>
              <div
                className={
                  "flex w-full cursor-pointer items-center justify-center rounded-md bg-gray-200 py-3 text-sm text-black"
                }
                onClick={() => {
                  setSelectedNft(undefined);
                }}
              >
                Cancel
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
