"use client";

import { cn } from "@/lib/utils";
import { AgencySidebarOption, SubAccount, SubAccountSidebarOption } from "@prisma/client";
import { ChevronsUpDown, Menu } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Compass from "../icons/compass";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { CommandInput, Command, CommandList, CommandEmpty, CommandGroup, CommandItem } from "../ui/command";
import Link from "next/link";

type MenuOptionsProps = {
  defaultOpen?: boolean;
  subAccounts: SubAccount[];
  sidebarOptions: AgencySidebarOption[] | SubAccountSidebarOption[];
  sidebarLogo: string;
  details: any;
  user: any;
  id: string;
};

const MenuOptions = ({
  defaultOpen,
  subAccounts,
  sidebarOptions,
  sidebarLogo,
  details,
  user,
  id,
}: MenuOptionsProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openState = useMemo(() => (defaultOpen ? { open: true } : {}), [defaultOpen]);

  if (!isMounted) return;

  return (
    <Sheet modal={false} {...openState}>
      <SheetTrigger className="absolute left-4 top-4 md:!hidden flex z-[100]" asChild>
        <Button variant={"outline"} size={"icon"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        showX={!defaultOpen}
        side={"left"}
        className={cn(
          "bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] p-6",
          defaultOpen && "hidden md:inline-block z-0 w-[300px]",
          !defaultOpen && "inline-block md:hidden w-full z-[100]"
        )}>
        <div>
          <AspectRatio ratio={16 / 5}>
            <Image src={sidebarLogo} fill className="rounded-md object-contain" alt="Sidebar Logo" />
          </AspectRatio>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="w-full my-4 flex items-center justify-between py-8" variant={"ghost"}>
                <div className="flex items-center text-left gap-2">
                  <Compass />
                  <div className="flex flex-col">
                    {details.name} <span className="text-muted-foreground">{details.address}</span>
                  </div>
                </div>
                <div>
                  <ChevronsUpDown size={16} className="text-muted-foreground" />
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 h-80 mt-4 z-[200]">
              <Command className="rounded-lg">
                <CommandInput placeholder="Search Accounts..." />
                <CommandList className="pb-16">
                  <CommandEmpty>No results found</CommandEmpty>
                  {(user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN") && user?.Agency && (
                    <CommandGroup heading="Agency">
                      <CommandItem className="!bg-transparent my-2 text-primary broder-[1px] border-border p-2 rounded-md hover:!bg-muted cursor-pointer transition-all">
                        {defaultOpen ? (
                          <Link href={`/agency/${user?.Agency?.id}`} className="flex gap-4 w-full h-full">
                            <div className="relative w-16">
                              <Image
                                src={user?.Agency?.agencyLogo}
                                alt="Agency Logo"
                                fill
                                className="rounded-md object-contain"
                              />
                            </div>
                            <div className="flex flex-col flex-1">
                              {user?.Agency?.name}
                              <span className="text-muted-foreground">{user?.Agency?.address}</span>
                            </div>
                          </Link>
                        ) : (
                          <SheetClose asChild>
                            <Link href={`/agency/${user?.Agency?.id}`} className="flex gap-4 w-full h-full">
                              <div className="relative w-16">
                                <Image
                                  src={user?.Agency?.agencyLogo}
                                  alt="Agency Logo"
                                  fill
                                  className="rounded-md object-contain"
                                />
                              </div>
                              <div className="flex flex-col flex-1">
                                {user?.Agency?.name}
                                <span className="text-muted-foreground">{user?.Agency?.address}</span>
                              </div>
                            </Link>
                          </SheetClose>
                        )}
                      </CommandItem>
                    </CommandGroup>
                  )}
                  <CommandGroup heading="Accounts">
                    {!!subAccounts
                      ? subAccounts.map((subaccount) => (
                          <CommandItem key={subaccount.id}>
                            {defaultOpen ? (
                              <Link
                                href={`/subaccount/${subaccount.id}`}
                                className="flex gap-4 w-full h-full">
                                <div className="relative w-16">
                                  <Image
                                    src={subaccount.subAccountLogo}
                                    alt="subaccount Logo"
                                    fill
                                    className="rounded-md object-contain"
                                  />
                                </div>
                                <div className="flex flex-col flex-1">
                                  {subaccount.name}
                                  <span className="text-muted-foreground">{subaccount.address}</span>
                                </div>
                              </Link>
                            ) : (
                              <SheetClose asChild>
                                <Link
                                  href={`/subaccount/${subaccount.id}`}
                                  className="flex gap-4 w-full h-full">
                                  <div className="relative w-16">
                                    <Image
                                      src={subaccount.subAccountLogo}
                                      alt="subaccount Logo"
                                      fill
                                      className="rounded-md object-contain"
                                    />
                                  </div>
                                  <div className="flex flex-col flex-1">
                                    {subaccount.name}
                                    <span className="text-muted-foreground">{subaccount.address}</span>
                                  </div>
                                </Link>
                              </SheetClose>
                            )}
                          </CommandItem>
                        ))
                      : "No Accounts"}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuOptions;
