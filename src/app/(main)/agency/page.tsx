import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const AgencyPage = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  return (
    <div>
      AgencyPage
      <div></div>
    </div>
  );
};

export default AgencyPage;
