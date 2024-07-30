import dynamic from "next/dynamic";
import PageWrapper from "./page-wrapper";


const Page = () => {

  return (
    <PageWrapper />
  );

};

export default dynamic(() => Promise.resolve(Page), { ssr: false });
