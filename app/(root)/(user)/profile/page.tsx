"use client";

import MenuSection from "@/components/ui/menu-section";
import client, { POLYGON_ZKEVM_CARDONA_TESTNET } from "@/lib/client";
import "@/styles/profile.module.scss";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaCamera, FaCopy, FaEthereum } from "react-icons/fa";
import { Blobbie, useActiveAccount, useWalletBalance } from "thirdweb/react";
import CollectedPage from "@/app/(root)/(user)/profile/collection";

const ProfilePage: React.FC = () => {
  const account = useActiveAccount();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: balance, isLoading: isLoading } = useWalletBalance({
    client: client,
    chain: POLYGON_ZKEVM_CARDONA_TESTNET,
    address: account?.address,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [joinDate, setJoinDate] = useState<string>("Loading...");
  //SET AVATAR AND COVER PROFILE
  const [avatar, setAvatar] = useState<string>("https://placehold.co/100x100");
  const [coverPhoto, setCoverPhoto] = useState<string>(
    "https://placehold.co/800x400"
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `/api/user-data?address=${account?.address}`
        );
        const data = await response.json();
        setJoinDate(data.joinDate || "Unknown");
        setAvatar(data.avatar || avatar);
        setCoverPhoto(data.coverPhoto || coverPhoto);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (account?.address) {
      fetchUserData().then((r) => r);
    }
  }, [account?.address, avatar, coverPhoto]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setCoverPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const shortenAddress = (address: string | undefined) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  // Function copy address
  const [copied, setCopied] = useState(false);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const handleCopy = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address).then((r) => r);
      setCopied(true);
      setTooltip("Copied!");
      setTimeout(() => {
        setCopied(false);
        setTooltip(null);
      }, 200);
    }
  };
  // FUNCTION MENU
  const [activeMenu, setActiveMenu] = useState<string>("Collected");

  const renderContent = () => {
    switch (activeMenu) {
      case "Collected":
        return <CollectedPage />;
      case "Offers made":
        return <p>Displaying Offers made...</p>;
      case "Deals":
        return <p>Displaying Deals...</p>;
      case "Created":
        return <p>Displaying Created items...</p>;
      case "Favorited":
        return <p>Displaying Favorited items...</p>;
      case "Activity":
        return <p>Displaying Activity...</p>;
      default:
        return <p>No items found for this menu.</p>;
    }
  };
  return (
    <div>
      {/* Header Section */}

      {/* Cover Section */}
      <div className="overflow-hidde relative h-64 rounded-b-md md:h-16 lg:h-80">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverPhoto}
          alt="Cover"
          className="absolute inset-0 h-full w-full cursor-pointer rounded object-cover"
          onClick={() => document.getElementById("coverPhotoInput")?.click()}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleCoverPhotoChange}
          className="hidden"
          id="coverPhotoInput"
        />
        <div className="absolute right-4 top-4 cursor-pointer text-white">
          <FaCamera
            size={16}
            onClick={() => document.getElementById("coverPhotoInput")?.click()}
          />{" "}
          {/* React Icon for camera */}
        </div>
      </div>

      {/* Avatar Section */}
      <div className="relative -mt-32 ml-6 flex">
        <div className="relative">
          {/*<img*/}
          {/*  src={avatar}*/}
          {/*  alt="Profile"*/}
          {/*  className="profile-avatar h-48 w-48 cursor-pointer rounded-full border-4 border-white object-cover"*/}
          {/*  onClick={() => document.getElementById("avatarInput")?.click()}*/}
          {/*/>*/}
          <Blobbie
            address={`${account?.address}`}
            className={
              "h-48 w-48 rounded-full border-4 border-white object-cover sm:h-48 sm:w-48"
            }
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
            id="avatarInput"
          />
          <div className="absolute bottom-0 right-0 cursor-pointer text-white">
            <FaCamera
              size={16}
              onClick={() => document.getElementById("avatarInput")?.click()}
            />{" "}
            {/* React Icon for camera */}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-2xl font-bold">Unnamed</h1>
            <span> | </span>
            {/* Address info */}
            <section className="text-500 flex">
              {/* Wallet Info Section */}
              <div className="">
                <div className="flex items-center">
                  <FaEthereum className="mr-2 text-xl" /> {/* Ethereum Icon */}
                  <span className="relative">
                    {/* Shortened Address Display */}
                    <span
                      onClick={handleCopy}
                      onMouseEnter={() => setTooltip("Copy")} // Show "Copy" on hover
                      onMouseLeave={() => setTooltip(null)} // Hide tooltip when mouse leaves
                      className="flex cursor-pointer gap-4"
                    >
                      {shortenAddress(account?.address)} <FaCopy size={18} />
                    </span>

                    {/* Tooltip */}
                    {tooltip && !copied && (
                      <div className="absolute left-1/2 mt-1 -translate-x-1/2 transform rounded border bg-white px-2 py-1 text-sm text-gray-700">
                        {tooltip}
                      </div>
                    )}
                    {/* "Copied!" Tooltip */}
                    {copied && (
                      <div className="absolute left-1/2 mt-1 -translate-x-1/2 transform rounded border bg-white px-2 py-1 text-sm text-green-500">
                        Copied!
                      </div>
                    )}
                  </span>
                </div>
              </div>
            </section>
          </div>

          <div className="setting cursor-pointer">
            <Dropdown>
              <DropdownTrigger>
                <Button>
                  <BsThreeDots size={24} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">
                  <Link href="/profile/setting">Setting</Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="mt-6 flex overflow-auto">
        <MenuSection
          items={[
            "Collected",
            "Offers made",
            "Deals",
            "Created",
            "Favorited",
            "Sell",
            "Activity",
          ]}
          activeItem={activeMenu}
          onItemSelect={setActiveMenu}
          layout="horizontal" // Change to "vertical" for vertical layout
        />
      </div>
      <hr className="mt-6" />
      {/* Items Section */}
      <div className="mt-10 text-center">{renderContent()}</div>
    </div>
  );
};

export default ProfilePage;
