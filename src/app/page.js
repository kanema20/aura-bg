import Image from "next/image";
import styles from "./page.module.css";

import UploadForm from "./components/UploadForm";
import { ConfigProvider, Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Avatar from "antd/es/avatar/avatar";


import aura from "../../public/images/aura.jpg";
import THEME from "./_theme";
import PageWrapper from "./page-wrapper";


const Page = () => {

  return (
    <PageWrapper />
  );

};

export default Page;
