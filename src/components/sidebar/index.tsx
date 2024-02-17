import { getAuthUserDetails } from "@/lib/queries";
import { BrainCircuit } from "lucide-react";
import React from "react";

type SidebarProps = {
  id: string;
  type: "agency" | "subaccount";
};

const Sidebar = async ({ id, type }: SidebarProps) => {
  const user = await getAuthUserDetails();

  if (!user) return;
  if (!user.Agency) return;

  const userSubaccount = user.Agency.SubAccount.find((subaccount) => subaccount.id === id);

  const details = type === "agency" ? user.Agency : userSubaccount;

  if (!details) return;

  const whiteLabeledAgency = user.Agency.whiteLabel;

  let sidebarLogo = user.Agency.agencyLogo || BrainCircuit;
  if (!whiteLabeledAgency) {
    if (type === "subaccount") {
      sidebarLogo = userSubaccount?.subAccountLogo || user.Agency.agencyLogo;
    }
  }

  const sidebarOptions =
    type === "agency" ? user.Agency.SidebarOption || [] : userSubaccount?.SidebarOption || [];

  const subaccount = user.Agency.SubAccount.filter((subaccount) =>
    user.Permissions.find((permission) => permission.subAccountId === subaccount.id && permission.access)
  );
  return <div>Sidebar</div>;
};
