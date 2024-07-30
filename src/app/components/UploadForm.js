"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Button, Checkbox, Form, Image, Row, Col, Radio, message, Upload, Input, ColorPicker } from "antd";
import { FileImageOutlined, SaveOutlined } from "@ant-design/icons";
import Dragger from 'antd/es/upload/Dragger';
import useImage from 'use-image';
import { Stage, Layer, Image as KonvaImage, Transformer, Text as KonvaText } from 'react-konva';
import _ from 'lodash';

const BACKGROUNDS = [
  "/images/aura-bg/0.jpg",
  "/images/aura-bg/1.jpg",
  "/images/aura-bg/2.jpg",
  "/images/aura-bg/3.jpg",
  "/images/aura-bg/4.jpg",
  "/images/aura-bg/5.jpg",
  "/images/aura-bg/6.jpg",
  "/images/aura-bg/7.jpg",
  "/images/aura-bg/8.jpg",
  "/images/aura-bg/9.jpg",
  "/images/aura-bg/10.jpg",
  "/images/aura-bg/11.jpg",
  "/images/aura-bg/12.jpg"
];

const CANVAS_SIZE = 600;
const TEXT_BOTTOM_PADDING = 50;
const INITIALS = {
  textColor: '#1677FF',
  inputText: '+ 664,569 AURA',
  selectedBackgroundIndex: 0,
}

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function UploadForm() {
  const [ image, setImage ] = useState(null);
  const [ resultImageUrl, setResultImageUrl ] = useState(null);
  const [ selectedBackgroundIndex, setSelectedBackgroundIndex ] = useState(0);
  const [ previewOpen, setPreviewOpen ] = useState(false);
  const [ previewImage, setPreviewImage ] = useState('');
  const [ isSelected, setIsSelected ] = useState(false);
  const [ inputText, setInputText ] = useState('+ 664,569 AURA');
  const [ textColor, setTextColor ] = useState('#1677FF');

  const stageRef = useRef(null);
  const mainImageRef = useRef(null);
  const backgroundImageRef = useRef(null);
  const mainImageTransformRef = useRef(null);
  const textTransformRef = useRef(null);

  const handleExport = useCallback(() => {
    const uri = stageRef.current.toDataURL();
    downloadURI(uri, `AURA__${(new Date).getTime()}.png`);
  }, [stageRef]);

  const downloadURI = useCallback((uri, name) => {
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const reset = useCallback(() => {
    setImage(null);
    setResultImageUrl(null);
    setSelectedBackgroundIndex(0);
    setPreviewOpen(false);
    setPreviewImage('');
    setIsSelected(false);
    setInputText(INITIALS.inputText);
    setTextColor(INITIALS.textColor);
  }, [])

  useEffect(() => {
    if (isSelected && mainImageTransformRef.current && mainImageRef.current) {
      mainImageTransformRef.current.nodes([ mainImageRef.current ]);
      mainImageTransformRef.current.getLayer().batchDraw();
    }
  }, [ isSelected, mainImageRef, mainImageTransformRef ]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || (file.preview));
    setPreviewOpen(true);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const imageUrl = [ window.location.origin, "uploads", response.data.imageUrl ].join("/");
      setResultImageUrl(imageUrl);
    } catch (error) {
      console.error('Error uploading the image', error);
    }
  };

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Form
          name="basic"
          layout='vertical'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: CANVAS_SIZE }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            layout='vertical'
            vertical
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            label="Upload your avatar or pp"
            name="image"
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
                  src={"/uploads/" + previewImage}
                />
              )}
              <Dragger
                className='grow w-full'
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
                    setResultImageUrl(info.file.response.data.imageUrl);
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
              </Dragger>
            </div>
          </Form.Item>

          <Form.Item
            label="Aura Backgrounds"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValue={selectedBackgroundIndex}>
            <Radio.Group className='flex flex-wrap'>
              {_.map(BACKGROUNDS, (bg, index) => (
                <Radio
                  onChange={e => {
                    console.log("e.target.value ", e.target.value);
                    setSelectedBackgroundIndex(e.target.value)
                  }}
                  value={index}>
                  <Image width={32} src={bg}></Image>
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>

          <Row gutter={10}>
            <Col span={16}>
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                label="Text to add"
                initialValue={inputText}
                name="inputText"
                wrapperCol={{ span: 24 }}
              >
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ marginTop: 30 }}
                label=""
                name="inputColor"
                wrapperCol={{ span: 24 }}
              >
                <ColorPicker
                  showText
                  onChangeComplete={color => {
                    console.log("color ", color);
                    setTextColor(color.toHexString())
                  }}
                  value={textColor} />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <div className="flex items-center justify-center">
          <Button className='grow' size="large">RESET</Button>
          <Button className='grow' size="large">RANDOMIZE</Button>
        </div>
      </Col>

      <Col span={16}>
        <Stage id='stage' width={CANVAS_SIZE} height={CANVAS_SIZE} ref={stageRef}>
          <Layer>
            <BackgroundImage
              setIsSelected={setIsSelected}
              selectedBackgroundIndex={selectedBackgroundIndex}
              backgroundImageRef={backgroundImageRef}
            />
            <MainImage
              resultImageUrl={resultImageUrl}
              mainImageRef={mainImageRef}
              isSelected={isSelected}
              setIsSelected={setIsSelected}
              mainImageTransformRef={mainImageTransformRef}
            />
            <ResizableText
              inputText={inputText}
              textColor={textColor}
              textTransformRef={textTransformRef}
              isSelected={isSelected}
              setIsSelected={setIsSelected}
            />
          </Layer>
        </Stage>
        <div className="flex justify-end mt-2">
          <Button
            className='px-10'
            disabled={!resultImageUrl}
            size="large"
            color="primary">
            <SaveOutlined />
            SAVE IMAGE
          </Button>
        </div>
      </Col>
    </Row>
  );
}

const MainImage = ({ resultImageUrl, mainImageRef, isSelected, setIsSelected, mainImageTransformRef }) => {
  const [ image ] = useImage(resultImageUrl ? "http://localhost:3000" + "/uploads/" + resultImageUrl : null);

  useEffect(() => {
    if (mainImageRef.current && image) {
      const img = new window.Image();
      img.src = resultImageUrl;
      img.onload = () => {
        const imageNode = mainImageRef.current;
        imageNode.width(img.width);
        imageNode.height(img.height);

        const scaleX = CANVAS_SIZE / img.width;
        const scaleY = CANVAS_SIZE / img.height;
        const scale = Math.min(scaleX, scaleY);
        imageNode.scaleX(scale);
        imageNode.scaleY(scale);
      };
    }
  }, [ image, resultImageUrl ]);

  if (!resultImageUrl) return null;

  return (
    <>
      <KonvaImage
        image={image}
        ref={mainImageRef}
        draggable
        onClick={() => setIsSelected(oldState => !oldState)}
        shadowColor="white"
        shadowBlur={50}
        shadowOffset={{ x: 0, y: 0 }}
        shadowEnabled
        shadowForStrokeEnabled
        shadowOpacity={1}
        onTransformEnd={() => {
          const node = mainImageRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          const nodeWidth = node.width() * scaleX;
          node.width(nodeWidth);
          const nodeHeight = node.height() * scaleY;
          node.height(nodeHeight);
        }}
        onDragEnd={(e) => { }}
      />
      {isSelected && (
        <Transformer
          ref={mainImageTransformRef}
          anchorSize={5}
          borderDash={[ 6, 2 ]}
          enabledAnchors={[ 'top-left', 'top-right', 'bottom-left', 'bottom-right' ]}
          rotateEnabled={false}
          boundBoxFunc={(oldBox, newBox) => (newBox.width < 5 || newBox.height < 5) ? oldBox : newBox}
        />
      )}
    </>
  );
};

const BackgroundImage = ({ selectedBackgroundIndex, backgroundImageRef, setIsSelected }) => {
  const [ image ] = useImage("http://localhost:3000/" + BACKGROUNDS[ selectedBackgroundIndex ]);

  useEffect(() => {
    if (backgroundImageRef.current && image) {
      const img = new window.Image();
      img.src = BACKGROUNDS[ selectedBackgroundIndex ];
      img.onload = () => {
        const imageNode = backgroundImageRef.current;
        imageNode.width(img.width);
        imageNode.height(img.height);

        const scaleX = CANVAS_SIZE / img.width;
        const scaleY = CANVAS_SIZE / img.height;
        const scale = Math.min(scaleX, scaleY);
        imageNode.scaleX(scale);
        imageNode.scaleY(scale);
      };
    }
  }, [ image, selectedBackgroundIndex ]);

  return (
    <>
      <KonvaImage
        onClick={() => setIsSelected(false)}
        image={image}
        ref={backgroundImageRef}
      />
    </>
  );
};

const ResizableText = ({ inputText, textColor, textTransformRef, isSelected, setIsSelected }) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (isSelected && textTransformRef.current && textRef.current) {
      textTransformRef.current.nodes([ textRef.current ]);
      textTransformRef.current.getLayer().batchDraw();
    }
  }, [ isSelected, textTransformRef, textRef ]);

  useEffect(() => {
    if (textRef.current) {
      const textNode = textRef.current;
      const textWidth = textNode.width();
      textNode.x((CANVAS_SIZE - textWidth) / 2);
      textNode.y(CANVAS_SIZE - textNode.height() - TEXT_BOTTOM_PADDING);
    }
  }, [ inputText, textColor ]);

  if (!inputText) return null;

  return (
    <>
      <KonvaText
        text={inputText}
        fontSize={32}
        fill={textColor}
        ref={textRef}
        shadowForStrokeEnabled
        fontStyle='bold'
        align='center'
        draggable
        onClick={() => setIsSelected(oldState => !oldState)}
        shadowBlur={10}
        shadowColor="rgba(255,255,255,1)"
        shadowOffsetX={0}
        shadowOffsetY={0}
        onTransformEnd={(e) => {
          const node = textRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          const newFontSize = node.fontSize() * Math.min(scaleX, scaleY);
          node.scaleX(1);
          node.scaleY(1);
          node.fontSize(newFontSize);
        }}
        onDragMove={(e) => {
          const node = textRef.current;
          const newX = Math.max(0, Math.min(CANVAS_SIZE - node.width(), e.target.x()));
          const newY = Math.max(0, Math.min(CANVAS_SIZE - node.height(), e.target.y()));
          node.x(newX);
          node.y(newY);
        }}
      />
      {isSelected && (
        <Transformer
          ref={textTransformRef}
          enabledAnchors={[ 'top-left', 'top-right', 'bottom-left', 'bottom-right' ]}
          rotateEnabled={false}
          boundBoxFunc={(oldBox, newBox) =>
            (newBox.width < 5 || newBox.height < 5) ? oldBox : newBox
          }
        />
      )}
    </>
  );
};