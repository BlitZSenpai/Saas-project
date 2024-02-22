import { Sidebar } from "@/components/sidebar";
import { Unauthorized } from "@/components/unauthorized";
import { getNotificationAndUser, verifyAndAcceptInvitation } from "@/lib/queries";
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

  let allNotifications: any = [];
  const notifications = await getNotificationAndUser(agencyId);
  if (notifications) allNotifications = notifications;

  return (
    <div>
      <Sidebar id={params.agencyId} type="agency" />
      <div className="md:pl-[300px]">{children}</div>
    </div>
  );
};

export default AgencyIdLayout;
