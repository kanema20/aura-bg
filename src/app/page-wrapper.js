"use client";

import Image from "next/image";
import "./page.module.css";

import UploadForm from "./components/UploadForm";
import { ConfigProvider, theme, Button, Layout, Typography } from "antd";
import Avatar from "antd/es/avatar/avatar";

import aura from "../../public/images/aura.jpg";
import THEME from "./_theme";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useCallback, useState } from "react";
const { defaultAlgorithm, darkAlgorithm } = theme;
const {
  Header, Footer, Sider, Content
} = Layout;
const { Text } = Typography;

const PageWrapper = ({ mode }) => {

  const [ isDarkMode, setIsDarkMode ] = useState(true);

  const handleChangeTheme = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [ isDarkMode ]);

  const bgColor = isDarkMode ? "bg-gray-800" : "bg-slate-300";

  return (
    <ConfigProvider
      theme={{
        ...THEME,
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm
      }}>
      <Layout className="flex min-h-[100vh]">
        <Header
          className={`w-full flex justify-between ${bgColor}`}>
          <div>
            <Avatar size="large" icon={<Image src={aura} />} />
            <Text className="ml-1 text-xl">AURA</Text>
          </div>
          <div>
            <Button
              onClick={handleChangeTheme}
              icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />} />
          </div>
        </Header>
        <Content className="grow p-4 my-5 flex flex-col items-center ">
          <div className="w-full max-w-[1024px]">
            <UploadForm mode={mode} />
          </div>
        </Content>
        <Footer className={`pt-[10px] py-[10px] flex justify-center text-white opacity-50 ${bgColor}`}>
          <Text className="text-sm">Copyright by AURA</Text>
        </Footer>
      </Layout>
    </ConfigProvider>
  );

};

export default PageWrapper;
