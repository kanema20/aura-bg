import dynamic from "next/dynamic";
import PageWrapper from "./page-wrapper";


const Page = ({ searchParams }) => {
  const mode = searchParams?.mode;
  return (
    <>
      <PageWrapper mode={mode} />
    </>
  );

};

export default dynamic(() => Promise.resolve(Page), { ssr: false });
