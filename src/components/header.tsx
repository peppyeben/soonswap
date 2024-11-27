import Link from "next/link";
import { cn } from "@/lib/utils";
import { Fragment, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";

import { Button } from "./ui/button";
import { NextOptimizedImage } from "./next-image";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog";

const navigationLinks: {
    title: string;
    href: string;
}[] = [
    { title: "Home", href: "/" },
    // { title: "Swap", href: "/swap" },
];

export default function Component() {
    return (
        <header
            className={`w-full flex items-center justify-center px-[2rem] py-4 bg-[#002900] shadow-lg`}
        >
            <div
                className={`h-[2.5rem] flex items-center justify-between max-w-[91.75rem] w-full`}
            >
                <Link href="/" className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-[#008F00] rounded-full flex items-center justify-center">
                        <span className="text-[#CFFFCF] font-bold text-lg">
                            sw
                        </span>
                    </div>
                    <span className="text-[#CFFFCF] font-semibold text-xl tracking-wider">
                        SOONSWAP
                    </span>
                </Link>

                <NavigationMenu>
                    <NavigationMenuList className={`gap-4`}>
                        {navigationLinks.map(function (value, index) {
                            return <NavItem key={index} {...value} />;
                        })}
                    </NavigationMenuList>
                </NavigationMenu>

                <ConnectWalletButton />
            </div>
        </header>
    );
}

function NavItem({ title, href }: { title: string; href: string }) {
    return (
        <NavigationMenuItem className={`rounded-xl overflow-hidden group`}>
            <Link
                href={href}
                legacyBehavior
                passHref
                className={`bg-transparent`}
            >
                <NavigationMenuLink
                    className={`
                        ${navigationMenuTriggerStyle()} 
                        group-hover:bg-[#008F00]/20 
                        group-hover:text-[#A7FFA7] 
                        transition-all 
                        duration-300 
                        text-[#CFFFCF]
                    `}
                >
                    {title}
                </NavigationMenuLink>
            </Link>
        </NavigationMenuItem>
    );
}

function ConnectWalletButton() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { publicKey, disconnect, connected, wallets, select, connecting } =
        useWallet();

    return (
        <AlertDialog open={isModalOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    className={`
                        rounded-full 
                        bg-[#008F00] 
                        hover:bg-[#008F00]/90 
                        text-[#CFFFCF] 
                        transition-all 
                        duration-300 
                        flex 
                        items-center 
                        gap-2
                    `}
                    onClick={() => setIsModalOpen(true)}
                    disabled={connecting}
                >
                    {connected ? (
                        <span className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#A7FFA7] rounded-full animate-pulse"></div>
                            {publicKey?.toBase58().slice(0, 4)}...
                            {publicKey?.toBase58().slice(-4)}
                        </span>
                    ) : connecting ? (
                        <Fragment>
                            <span>Connecting...</span>
                            <Loader2 className="animate-spin" />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <span>Login</span>
                            <ArrowRight className="w-4 h-4" />
                        </Fragment>
                    )}
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="bg-[#002900] text-[#CFFFCF] border-[#008F00] border-2 rounded-xl shadow-2xl">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl font-bold text-[#A7FFA7]">
                        {connected ? "SOONSWAP" : "Login to SOONSWAP"}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-[#CFFFCF]">
                        {connected
                            ? `Hello ${publicKey
                                  ?.toBase58()
                                  .slice(0, 4)}...${publicKey
                                  ?.toBase58()
                                  .slice(-4)} !`
                            : "Select your favorite wallet to login"}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter
                    className={cn(`gap-5`, `sm:justify-center sm:flex-col`)}
                >
                    <div
                        className={`w-full flex items-center justify-center gap-4 flex-wrap`}
                    >
                        {!publicKey
                            ? wallets
                                  .filter(
                                      (wallet) =>
                                          wallet.readyState === "Installed" ||
                                          "Loadable"
                                  )
                                  .map(function (value, index) {
                                      return (
                                          <Button
                                              key={index}
                                              onClick={() => {
                                                  select(value.adapter.name);
                                                  setIsModalOpen(false);
                                              }}
                                              className="
                                                  bg-[#008F00] 
                                                  text-[#CFFFCF] 
                                                  hover:bg-[#008F00]/90 
                                                  flex 
                                                  items-center 
                                                  gap-2 
                                                  rounded-lg 
                                                  transition-colors 
                                                  duration-300
                                              "
                                          >
                                              <NextOptimizedImage
                                                  alt={value.adapter.name}
                                                  src={value.adapter.icon}
                                                  className={`size-5`}
                                              />
                                              <span>{value.adapter.name}</span>
                                          </Button>
                                      );
                                  })
                            : null}
                    </div>

                    <Button
                        className="
                            bg-[#008F00] 
                            hover:bg-[#008F00]/90 
                            text-[#CFFFCF] 
                            rounded-lg 
                            transition-colors 
                            duration-300
                        "
                        onClick={() => {
                            setIsModalOpen(false);
                            disconnect();
                        }}
                    >
                        Logout
                    </Button>
                    <AlertDialogCancel
                        className="
                            bg-[#002900] 
                            text-[#CFFFCF] 
                            border-[#008F00] 
                            hover:bg-[#008F00]/20 
                            rounded-lg 
                            transition-colors 
                            duration-300
                        "
                        onClick={() => setIsModalOpen(false)}
                    >
                        {connected ? "Close" : "Cancel"}
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
