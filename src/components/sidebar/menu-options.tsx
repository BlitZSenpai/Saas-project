"use client";

import { AgencySidebarOption, SubAccount, SubAccountSidebarOption } from "@prisma/client";
import { ChevronsUpDown, LucideIcon, Menu } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Compass from "../icons/compass";

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
            <PopoverContent className="w-80 h-80 mt-4 z-[200]"></PopoverContent>
          </Popover>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuOptions;
