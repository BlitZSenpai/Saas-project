"use client";

import { AgencySidebarOption, SubAccount, SubAccountSidebarOption } from "@prisma/client";
import { LucideIcon } from "lucide-react";
import React from "react";

type MenuOptionsProps = {
  defaultOpen?: boolean;
  subAccounts: SubAccount[];
  sidebarOptions: AgencySidebarOption[] | SubAccountSidebarOption[];
  sidebarLogo: string | LucideIcon;
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
  return <div>MenuOptions</div>;
};

export default MenuOptions;
