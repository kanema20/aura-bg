import Image from "next/image";
import styles from "./page.module.css";

import UploadForm from './components/UploadForm';
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Avatar from "antd/es/avatar/avatar";


import aura from '../../public/images/aura.jpg';


const Page = () => (
  <Layout className="flex h-[100vh]">
    <Header className="w-full">
      <Avatar size="large" icon={<Image src={aura}></Image>}></Avatar>
    </Header>
    <Content className="grow p-4 my-5">
      <UploadForm />
    </Content>
    <Footer className="bg-gray-800 text-white">Footer</Footer>
  </Layout>
);

export default Page;