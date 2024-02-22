import { getAuthUserDetails } from "@/lib/queries";
import { BrainCircuit } from "lucide-react";
import React from "react";
import MenuOptions from "./menu-options";

type SidebarProps = {
  id: string;
  type: "agency" | "subaccount";
};

export const Sidebar = async ({ id, type }: SidebarProps) => {
  const user = await getAuthUserDetails();

  if (!user) return;
  if (!user.Agency) return;

  const userSubaccount = user.Agency.SubAccount.find((subaccount) => subaccount.id === id);

  const details = type === "agency" ? user.Agency : userSubaccount;

  if (!details) return;

  const whiteLabeledAgency = user.Agency.whiteLabel;

  let sidebarLogo = user.Agency.agencyLogo || "/assets/logo.svg";
  if (!whiteLabeledAgency) {
    if (type === "subaccount") {
      sidebarLogo = userSubaccount?.subAccountLogo || user.Agency.agencyLogo;
    }
  }

  const sidebarOptions =
    type === "agency" ? user.Agency.SidebarOption || [] : userSubaccount?.SidebarOption || [];

  const subaccounts = user.Agency.SubAccount.filter((subaccount) =>
    user.Permissions.find((permission) => permission.subAccountId === subaccount.id && permission.access)
  );
  return (
    <>
      <MenuOptions
        defaultOpen={true}
        details={details}
        id={id}
        sidebarLogo={sidebarLogo}
        sidebarOptions={sidebarOptions}
        subAccounts={subaccounts}
        user={user}
      />
      <MenuOptions
        details={details}
        id={id}
        sidebarLogo={sidebarLogo}
        sidebarOptions={sidebarOptions}
        subAccounts={subaccounts}
        user={user}
      />
    </>
  );
};
