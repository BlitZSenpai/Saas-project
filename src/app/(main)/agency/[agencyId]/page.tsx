import React from "react";

type AgencyIdProps = {
  params: {
    agencyId: string;
  };
};

const AgencyIdPage = ({ params }: AgencyIdProps) => {
  return <div>{params.agencyId}</div>;
};

export default AgencyIdPage;
