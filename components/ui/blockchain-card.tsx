import SkeletonImage from "@/components/skeleton/skeleton-image";
import React from "react";

interface CardProps {
  title: string;
  image: string;
  description: string;
  [key: string]: unknown;
}

const BlockchainCard: React.FC<CardProps> = ({
  title,
  image,
  description,
  ...props
}) => {
  return (
    <div
      className="hover-border-black flex flex-col gap-8 rounded-md border px-4 py-6"
      {...props}
    >
      <SkeletonImage
        src={image}
        height={"32px"}
        width={"32px"}
        className="aspect-square rounded-full"
      />
      <div className="text-md font-bold">{title}</div>
      <div className="text-sm/8 text-gray-500">{description}</div>
    </div>
  );
};

export default BlockchainCard;
