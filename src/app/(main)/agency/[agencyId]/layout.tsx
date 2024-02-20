import { Unauthorized } from "@/components/unauthorized";
import { verifyAndAcceptInvitation } from "@/lib/queries";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type AgencyIdLayoutProps = {
  children: React.ReactNode;
  params: { agencyId: string };
};

const AgencyIdLayout = async ({ children, params }: AgencyIdLayoutProps) => {
  const agencyId = await verifyAndAcceptInvitation();
  const user = await currentUser();

  if (!user) redirect("/");
  if (!agencyId) redirect("/agency");

  if (user.privateMetadata.role !== "AGENCY_OWNER" && user.privateMetadata.role !== "AGENCY_ADMIN") {
    return <Unauthorized />;
  }
};

export default AgencyIdLayout;
