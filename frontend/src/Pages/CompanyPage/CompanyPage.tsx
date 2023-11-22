// interface Props {}

import { useParams } from "react-router";
import { CompanyProfile } from "../../company";
import { useEffect, useState } from "react";
import { getCompanyProfile } from "../../api";

const CompanyPage = () => {
  // localhost:5173
  // eslint-disable-next-line prefer-const
  let { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile>();

  useEffect(() => {
    const getProfileInit = async () => {
      const result = await getCompanyProfile(ticker!);
      setCompany(result?.data[0]);
    };
    // Must call the async function after
    getProfileInit();
    // [] ensures it only runs once
  }, []);
  return (
    <>
      {company ? (
        <div>{company.companyName}</div>
      ) : (
        <div>Company not found</div>
      )}
    </>
  );
};

export default CompanyPage;
