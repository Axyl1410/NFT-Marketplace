import { TransactionButton } from "thirdweb/react";
import { setApprovalForAll } from "thirdweb/extensions/erc721";
import { NFT_COLLECTION, MARKETPLACE } from "@/contracts/contracts";
import { toast } from "sonner";

export default function ApprovalButton() {
  return (
    <TransactionButton
      transaction={() => {
        return setApprovalForAll({
          contract: NFT_COLLECTION,
          operator: MARKETPLACE.address,
          approved: true,
        });
      }}
      onTransactionSent={() => {
        toast.info("Approving...");
      }}
      onError={(error) => {
        toast.error(`Approval Failed!`);
        console.error(error);
      }}
      onTransactionConfirmed={(txResult) => {
        toast.success("Approval successful.");
        console.log(txResult);
      }}
    >
      Approve
    </TransactionButton>
  );
}
