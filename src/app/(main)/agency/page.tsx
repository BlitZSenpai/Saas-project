import { getAuthUserDetails, verifyAndAcceptInvitation } from "@/lib/queries";
import { currentUser } from "@clerk/nextjs";
import { Plan } from "@prisma/client";
import { redirect } from "next/navigation";

type AgencyPageProps = {
  params: {
    plan: Plan;
    state: string;
    code: string;
  };
};

const AgencyPage = async ({ params }: AgencyPageProps) => {
  const agencyId = await verifyAndAcceptInvitation();

  const user = await getAuthUserDetails();
  if (agencyId) {
    if (user?.role === "SUBACCOUNT_USER" || user?.role === "SUBACCOUNT_GUEST") {
      return redirect("/subaccount");
    } else if (user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN") {
      if (params.plan) {
        return redirect(`/agency/${agencyId}/billing?plan=${params.plan}`);
      }
      if (params.state) {
        const statePath = params.state.split("__")[0];
        const stateAgencyId = params.state.split("___")[1];
        if (!stateAgencyId) return <div>Unauthorised</div>;

        return redirect(`/agency/${stateAgencyId}/${statePath}?code=${params.code}`);
      } else return redirect(`/agency/${agencyId}`);
    } else {
      return <div>Unauthorised</div>;
    }
  }

  return (
    <div>
      AgencyPage
      <div></div>
    </div>
  );
};

export default AgencyPage;
