import Image from "next/image";
import styles from "./page.module.css";

import UploadForm from './components/UploadForm';
import { ConfigProvider, Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Avatar from "antd/es/avatar/avatar";


import aura from '../../public/images/aura.jpg';
import THEME from "./_theme";


const Page = () => (
  <ConfigProvider
    theme={{ token: THEME }}>
    <Layout className="flex h-[100vh]">
      <Header className="w-full">
        <Avatar size="large" icon={<Image src={aura}></Image>}></Avatar>
        <span class="ml-1 text-xl">AURA</span>
      </Header>
      <Content className="grow p-4 my-5 flex justify-center">
        <div className="max-w-[960px]">
          <UploadForm />
        </div>
      </Content>
      <Footer className="bg-gray-800 text-white">Footer</Footer>
    </Layout>
  </ConfigProvider>
);

export default Page;