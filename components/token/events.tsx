"use client";

import { useContractEvents } from "thirdweb/react";
import { transferEvent } from "thirdweb/extensions/erc721";
import { POLYGONSCAN_URL, NFT_COLLECTION } from "@/contracts/contracts";
import Link from "next/link";

export default function Events({ tokenId }: { tokenId: bigint }) {
  const { data: transferEvents } = useContractEvents({
    contract: NFT_COLLECTION,
    events: [transferEvent({ tokenId })],
  });

  return (
    <div className="mt-3 flex flex-col flex-wrap gap-4 divide-y">
      {transferEvents?.map((event) => (
        <div
          key={event.transactionHash}
          className="flex min-h-[32px] min-w-[128px] flex-1 items-center justify-between gap-1 border-white/20 py-2"
        >
          <div className="flex flex-col gap-1">
            <p className="text-text dark:text-white/60">Event</p>
            <p className="font-semibold text-text dark:text-white">Transfer</p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-text dark:text-white/60">From</p>
            <p className="font-semibold text-text dark:text-white">
              {event.args.from.slice(0, 4)}
              ...
              {event.args.from.slice(-2)}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-text dark:text-white/60">To</p>
            <p className="font-semibold text-text dark:text-white">
              {event.args.to.slice(0, 4)}
              ...
              {event.args.to.slice(-2)}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <Link
              className="h-6 w-6 p-2"
              href={`${POLYGONSCAN_URL}/tx/${event.transactionHash}`}
              target="_blank"
            >
              ↗
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
