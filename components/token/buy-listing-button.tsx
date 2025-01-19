"use client";

import { TransactionButton, useActiveAccount } from "thirdweb/react";
import {
  buyFromListing,
  buyoutAuction,
  DirectListing,
  EnglishAuction,
} from "thirdweb/extensions/marketplace";
import { MARKETPLACE } from "@/contracts/contracts";
import { toast } from "sonner";

export default function BuyListingButton({
  auctionListing,
  directListing,
}: {
  auctionListing?: EnglishAuction;
  directListing?: DirectListing;
}) {
  const account = useActiveAccount();
  return (
    <TransactionButton
      disabled={
        account?.address === auctionListing?.creatorAddress ||
        account?.address === directListing?.creatorAddress ||
        (!directListing && !auctionListing)
      }
      transaction={() => {
        if (!account) throw new Error("No account");
        if (auctionListing) {
          return buyoutAuction({
            contract: MARKETPLACE,
            auctionId: auctionListing.id,
          });
        } else if (directListing) {
          return buyFromListing({
            contract: MARKETPLACE,
            listingId: directListing.id,
            recipient: account.address,
            quantity: BigInt(1),
          });
        } else {
          throw new Error("No valid listing found for this NFT");
        }
      }}
      onTransactionSent={() => {
        toast.info("Purchasing...");
      }}
      onError={(error) => {
        toast.error("Purchase Failed!" + error.message);
      }}
      onTransactionConfirmed={() => {
        toast.success("Purchase Successful!");
      }}
    >
      Buy Now
    </TransactionButton>
  );
}
