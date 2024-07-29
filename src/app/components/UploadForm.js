"use client";


import React, { useState } from 'react';
import axios from 'axios';
import { Button, Checkbox, Form, Input, Image } from "antd";
import { UploadOutlined, InboxOutlined, FileImageOutlined } from "@ant-design/icons";
import { message, Upload } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import useImage from 'use-image';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';




const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


export default function UploadForm() {
  const [ image, setImage ] = useState(null);
  const [ resultImage, setResultImage ] = useState(null);
  const [ previewOpen, setPreviewOpen ] = useState(false);
 console.log("previewOpen ", previewOpen);
  const [ previewImage, setPreviewImage ] = useState('');
 console.log("previewImage ", previewImage);

 console.log("resultImage ", resultImage);
 const MainImage = () => {
  const [image] = useImage("http://localhost:3000" + "/uploads/"+resultImage);
  return resultImage ? <KonvaImage image={image} />: null;
};

  const handlePreview = async (file) => {
    console.log("LOG ~ handlePreview ~ file:", file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || (file.preview));
    setPreviewOpen(true);
  };


  const handleUpload = async () => {
    const formData = new FormData();
    formData.delete('image', image);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("response ", response);

      const imageUrl = [
        window.location.origin,
        "uploads",
        response.data.imageUrl
      ].join("/");
      console.log("imageUrl ", imageUrl);
      setResultImage(imageUrl);
      //       removeBackground(imageUrl).then((canvas) => {
      //  console.log("canvas ", canvas);
      //       });
    } catch (error) {
      console.error('Error uploading the image', error);
    }
  };

  return (
    <div className="flex">

      <Form
        name="basic"
        layout='vertical'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="image"
          rules={[ { required: true, message: 'Please input your username!' } ]}
        >
          <div className="flex">
            {previewImage && (
              <Image
              wrapperStyle={{ display: 'none' }}
              preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(''),
                }}
                className='h-full max-w-[100px] object-cover'
                src={"/uploads/"+previewImage}
              />
            )}
            <Dragger
              className='grow'
              name={'image'}
              onPreview={handlePreview}
              multiple={false}
              action={'http://localhost:3001/upload'}
              onChange={(info) => {
                const { status } = info.file;

                if (status !== 'uploading') {
                  console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                  setPreviewImage(info.file.response.data.origFileName);
                  setResultImage(info.file.response.data.imageUrl);
                  message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                  message.error(`${info.file.name} file upload failed.`);
                }
              }}
            >
              <p className="ant-upload-drag-icon">
                <FileImageOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              {/* <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                banned files.
              </p> */}
            </Dragger>
          </div>
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

      </Form>


      <Stage width={600} height={800}>
        <Layer draggable>
          <MainImage />
        </Layer>
      </Stage>



    </div>
  );
}