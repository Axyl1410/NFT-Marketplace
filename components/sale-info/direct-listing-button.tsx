"use client";

import { useRouter } from "next/navigation";
import { NFT as NFTType } from "thirdweb";
import { TransactionButton } from "thirdweb/react";
import { createListing } from "thirdweb/extensions/marketplace";
import { MARKETPLACE, NFT_COLLECTION } from "@/contracts/contracts";
import { toast } from "sonner";

export default function DirectListingButton({
  nft,
  pricePerToken,
}: {
  nft: NFTType;
  pricePerToken: string;
}) {
  const router = useRouter();
  return (
    <TransactionButton
      transaction={() => {
        return createListing({
          contract: MARKETPLACE,
          assetContractAddress: NFT_COLLECTION.address,
          tokenId: nft.id,
          pricePerToken,
        });
      }}
      onTransactionSent={() => {
        toast.info("Listing...");
      }}
      onError={(error) => {
        toast.error(`Listing Failed!`);
        console.error(error);
      }}
      onTransactionConfirmed={(txResult) => {
        toast.success("Listed Successfully!");
        console.log(txResult);
        router.push(`/token/${NFT_COLLECTION.address}/${nft.id.toString()}`);
      }}
    >
      List for Sale
    </TransactionButton>
  );
}
