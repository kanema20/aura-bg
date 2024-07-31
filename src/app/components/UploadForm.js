/* eslint-disable react/no-multi-comp */
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { Button, Checkbox, Form, Image, Row, Col, Radio, message, Upload, Input, ColorPicker, Select } from "antd";
import { FileImageOutlined, SaveOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import useImage from "use-image";
import { Stage, Layer, Image as KonvaImage, Transformer, Text as KonvaText } from "react-konva";
import _ from "lodash";
import Script from "next/script";
import ALL_FILTER_OPTIONS from "./FILTER_OPTIONS";

const SELECTED_FILTERS = [
  "No Filter",
  "Displacement",
  "Dark Aura",
  "Evening Hues",
  "Mystic",
  "Red Glitters",
  "Emerald Shift",
  "Blue Mood",
  "Coral Reef"
];

const FILTER_OPTIONS = _(ALL_FILTER_OPTIONS)
  .filter((option) => _.includes(SELECTED_FILTERS, option.label))
  .thru(arr =>
    _.concat([ {
      label: "No Filter",
      value: ""
    } ], arr)
  )
  .value();


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
Konva.Filters;
const BRIGHTNESS = -0.1;
const ENHANCE = -0.1;
const CANVAS_SIZE = 600;
const TEXT_BOTTOM_PADDING = 50;
const INITIALS = {
  textColor: "#18ff00",
  inputText: "+ 664,569 aura",
  selectedBackgroundIndex: "0",
  imageFilter: ""
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function UploadForm() {
  const [ image, setImage ] = useState(null);
  const [ resultImageUrl, setResultImageUrl ] = useState("");
  // const [ resultImageUrl, setResultImageUrl ] = useState("34e8cf0a-9441-491a-8c6b-5d92ac1f0fb1___photo_2024-07-27_16-26-46.jpg");
  const [ origFileName, setOrigFileName ] = useState("");
  const [ selectedBackgroundIndex, setSelectedBackgroundIndex ] = useState("0");
  const [ previewOpen, setPreviewOpen ] = useState(false);
  const [ previewImage, setPreviewImage ] = useState("");
  const [ isSelected, setIsSelected ] = useState(false);
  const [ inputText, setInputText ] = useState("+ 664,569 aura");
  const [ textColor, setTextColor ] = useState(INITIALS.textColor);
  const [ imageFilter, setImageFilter ] = useState(INITIALS.imageFilter);
  const [ pixelsJsLoaded, setPixelsJsLoaded ] = useState(false);
  const [ form ] = Form.useForm();

  const stageRef = useRef(null);
  const mainImageRef = useRef(null);
  const backgroundImageRef = useRef(null);
  const mainImageTransformRef = useRef(null);
  const textTransformRef = useRef(null);

  const handleExport = useCallback(() => {
    const uri = stageRef.current.toDataURL();
    downloadURI(uri, `aura__${(new Date()).getTime()}.png`);
  }, [ stageRef ]);

  const downloadURI = useCallback((uri, name) => {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Image saved successfully!");
  }, []);

  const handleReset = useCallback(() => {
    setImage(null);
    setResultImageUrl(null);
    setSelectedBackgroundIndex(INITIALS.selectedBackgroundIndex);
    setPreviewOpen(false);
    setPreviewImage("");
    setIsSelected(false);
    setInputText(INITIALS.inputText);
    setTextColor(INITIALS.textColor);
    setImageFilter(INITIALS.imageFilter);
    form.setFieldsValue({
      selectedBackgroundIndex: INITIALS.selectedBackgroundIndex,
      inputText: INITIALS.inputText,
      inputColor: INITIALS.textColor,
      filterImage: INITIALS.imageFilter
    });
  }, [ form ]);
  const handleRandomize = useCallback(() => {
    setSelectedBackgroundIndex(_.random(0, BACKGROUNDS.length - 1).toString());
    const randomInput = `+ ${_.random(100, 999)},${_.random(100, 999)} aura`;
    setInputText(randomInput);
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    // setTextColor(randomColor);
    const randomImageFilter = _.sample(FILTER_OPTIONS).value;
    setImageFilter(randomImageFilter);
    form.setFieldsValue({
      selectedBackgroundIndex: _.random(0, BACKGROUNDS.length - 1).toString(),
      inputText: randomInput,
      inputColor: randomColor,
      filterImage: randomImageFilter
    });
  }, [ form ]);

  useEffect(() => {
    if (isSelected && mainImageTransformRef.current && mainImageRef.current) {
      mainImageTransformRef.current.nodes([ mainImageRef.current ]);
      mainImageTransformRef.current.getLayer().batchDraw();
    }
  }, [ isSelected, mainImageRef, mainImageTransformRef ]);

  const handlePreview = async(file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || (file.preview));
    setPreviewOpen(true);
  };

  const handleUpload = async() => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ADDRESS}/upload`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      const imageUrl = [ window.location.origin, "uploads", response.data.imageUrl ].join("/");
      setResultImageUrl(imageUrl);
    }
    catch (error) {
      console.error("error ", error);
    }
  };

  return (
    <>

      <Script
        src="https://cdn.jsdelivr.net/gh/silvia-odwyer/pixels.js@0.8.1/dist/Pixels.js"
        strategy="lazyOnload"
        onLoad={() => {
          setPixelsJsLoaded(true);
          console.info("Script loaded successfully");
        }}
        onError={(e) => {
          setPixelsJsLoaded(false);
          console.error("Script failed to load", e);
        }} />

      <Row gutter={16}>
        <Col span={8}>
          <Form
            form={form}
            name="basic"
            layout="vertical"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: CANVAS_SIZE }}
            initialValues={{ remember: true }}
            autoComplete="off">
            <Form.Item
              layout="vertical"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              label="Upload your avatar or pp"
              name="image">
              <div className="flex">
                {previewImage && (
                  <Image
                    wrapperStyle={{ display: "none" }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) => !visible && setPreviewImage("")
                    }}
                    className="h-full max-w-[100px] object-cover"
                    src={`/uploads/${previewImage}`} />
                )}
                <Dragger
                  className="grow w-full"
                  name="image"
                  onPreview={handlePreview}
                  multiple={false}
                  action={`${process.env.NEXT_PUBLIC_API_ADDRESS}/upload`}
                  onChange={(info) => {
                    const { status } = info.file;
                    if (status !== "uploading") {
                      console.info("status ", status);
                    }
                    if (status === "done") {
                      setPreviewImage(info.file.response.data.origFileName);
                      setResultImageUrl(info.file.response.data.imageUrl);
                      message.success(`${info.file.name} file uploaded successfully.`);
                    }
                    else if (status === "error") {
                      message.error(`${info.file.name} file upload failed.`);
                    }
                  }}>
                  <p className="ant-upload-drag-icon">
                    <FileImageOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Dragger>
              </div>
            </Form.Item>

            <Form.Item
              className="mt-5"
              label="Aura Backgrounds"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValue={String(selectedBackgroundIndex)}>
              <Radio.Group
                value={String(selectedBackgroundIndex)}
                className="flex flex-wrap">
                {_.map(BACKGROUNDS, (bg, index) => (
                  <Radio
                    key={index}
                    onChange={e => {
                      setSelectedBackgroundIndex(e.target.value);
                      form.setFieldsValue({ selectedBackgroundIndex: e.target.value });
                    }}
                    value={String(index)}>
                    <Image width={32} src={bg} />
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>


            <Form.Item
              className="mt-5"
              name="filterImage"
              label="Avatar Filters"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValue={imageFilter}>
              <Select
                defaultValue={imageFilter}
                onChange={setImageFilter}
                options={FILTER_OPTIONS} />
            </Form.Item>


            <Row
              className="mt-5"
              gutter={10}>
              <Col span={16}>
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Text to add"
                  initialValue={inputText}
                  shouldUpdate={(prevValues, curValues) => inputText !== curValues.inputText}
                  name="inputText"
                  wrapperCol={{ span: 24 }}>
                  <Input
                    name="inputText"
                    value={inputText}
                    onChange={(e) => {
                      setInputText(e.target.value);
                      form.setFieldValue("inputText", e.target.value);
                    }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <ColorPicker
                  className="mt-[30px]"
                  name="inputColor"
                  showText
                  defaultFormat="hex"
                  disabledAlpha
                  value={textColor}
                  onChangeComplete={color => {
                    setTextColor(color.toHexString());
                  }} />
              </Col>
            </Row>
          </Form>

          <div className="flex items-center justify-center w-full">
            <Button
              onClick={handleReset}
              className="grow"
              size="large">RESET</Button>
            <Button
              onClick={handleRandomize}
              className="grow"
              size="large">RANDOMIZE</Button>

          </div>
        </Col>

        <Col span={16}>
          <div className="flex flex-col items-end">
            <Stage id="stage" width={CANVAS_SIZE} height={CANVAS_SIZE}
              ref={stageRef}>
              <Layer>
                <BackgroundImage
                  setIsSelected={setIsSelected}
                  selectedBackgroundIndex={selectedBackgroundIndex}
                  backgroundImageRef={backgroundImageRef} />
                <MainImage
                  pixelsJsLoaded={pixelsJsLoaded}
                  imageFilter={imageFilter}
                  resultImageUrl={resultImageUrl}
                  mainImageRef={mainImageRef}
                  isSelected={isSelected}
                  setIsSelected={setIsSelected}
                  mainImageTransformRef={mainImageTransformRef} />
                <ResizableText
                  inputText={inputText}
                  textColor={textColor}
                  textTransformRef={textTransformRef}
                  isSelected={isSelected}
                  setIsSelected={setIsSelected} />
              </Layer>
            </Stage>
            <div className="flex justify-end mt-2">
              <Button
                onClick={handleExport}
                className="px-10"
                disabled={!resultImageUrl}
                size="large"
                color="primary"
                icon={<SaveOutlined />}>
                SAVE IMAGE
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

const MainImage = ({
  resultImageUrl, mainImageRef, isSelected, setIsSelected, mainImageTransformRef, imageFilter, pixelsJsLoaded
}) => {
  const fullUrl = resultImageUrl ? `${window.location.origin}/uploads/${resultImageUrl}` : null;
  const [ image ] = useImage(fullUrl);

  useEffect(() => {
    if (!mainImageRef.current || !image || !pixelsJsLoaded) return;
    const img = new window.Image();
    img.src = fullUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);

      let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
      if (imageFilter) {
        imgData = window.pixelsJS?.filterImgData(imgData, imageFilter);
      }
      context.putImageData(imgData, 0, 0);

      const filteredImg = new window.Image();
      filteredImg.src = canvas.toDataURL();

      filteredImg.onload = () => {
        const imageNode = mainImageRef.current;

        const scaleX = CANVAS_SIZE / filteredImg.width;
        const scaleY = CANVAS_SIZE / filteredImg.height;
        const scale = Math.min(scaleX, scaleY);
        imageNode.cache();
        imageNode.image(filteredImg);
        imageNode.scaleX(scale);
        imageNode.scaleY(scale);
        imageNode.cache();
        imageNode.filters([ Konva.Filters.Brighten, Konva.Filters.Enhance ]);
        imageNode.brightness(BRIGHTNESS);
        imageNode.enhance(ENHANCE);
        imageNode.getLayer().batchDraw();
      };
    };
  }, [ resultImageUrl, fullUrl, image, pixelsJsLoaded, imageFilter ]);


  useEffect(() => {
    if (!mainImageRef.current || !image || !pixelsJsLoaded) return;
    const img = new window.Image();
    img.src = fullUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);

      let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
      if (imageFilter) {
        imgData = window.pixelsJS?.filterImgData(imgData, imageFilter);
      }
      context.putImageData(imgData, 0, 0);

      const filteredImg = new window.Image();
      filteredImg.src = canvas.toDataURL();

      filteredImg.onload = () => {
        const imageNode = mainImageRef.current;
        imageNode.image(filteredImg);
        imageNode.getLayer().batchDraw();
      };
    };
  }, [ imageFilter, pixelsJsLoaded ]);


  if (!resultImageUrl) return null;

  return (
    <>
      <KonvaImage
        image={image}
        ref={mainImageRef}
        draggable
        onClick={() => setIsSelected(oldState => !oldState)}
        shadowColor="white"
        shadowBlur={10}
        shadowOffset={{
          x: 0,
          y: -5
        }}
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
        onDragEnd={(e) => { }} />
      {isSelected && (
        <Transformer
          ref={mainImageTransformRef}
          anchorSize={5}
          borderDash={[ 6, 2 ]}
          enabledAnchors={[ "top-left", "top-right", "bottom-left", "bottom-right" ]}
          rotateEnabled={false}
          boundBoxFunc={(oldBox, newBox) => ((newBox.width < 5 || newBox.height < 5) ? oldBox : newBox)} />
      )}
    </>
  );
};

const BackgroundImage = ({
  selectedBackgroundIndex, backgroundImageRef, setIsSelected
}) => {
  const [ image ] = useImage(`${window.location.origin}/${BACKGROUNDS[selectedBackgroundIndex]}`);

  useEffect(() => {
    if (backgroundImageRef.current && image) {
      const img = new window.Image();
      img.src = BACKGROUNDS[selectedBackgroundIndex];
      img.onload = () => {
        const imageNode = backgroundImageRef.current;
        // imageNode.width(img.width);
        imageNode.width(CANVAS_SIZE);
        // imageNode.height(img.height);
        imageNode.height(CANVAS_SIZE);

        const scaleX = 1;
        // const scaleX = CANVAS_SIZE / img.width;
        const scaleY = 1;
        // const scaleY = CANVAS_SIZE / img.height;
        const scale = Math.min(scaleX, scaleY);
        imageNode.cache();
        imageNode.scaleX(scale);
        imageNode.scaleY(scale);
        imageNode.cache();
        imageNode.filters([ Konva.Filters.Brighten, Konva.Filters.Enhance ]);
        imageNode.brightness(BRIGHTNESS);
        imageNode.enhance(ENHANCE);
        imageNode.getLayer().batchDraw();
      };
    }
  }, [ image, selectedBackgroundIndex ]);

  return (
    <>
      <KonvaImage
        onClick={() => setIsSelected(false)}
        image={image}
        ref={backgroundImageRef} />
    </>
  );
};

const ResizableText = ({
  inputText, textColor, textTransformRef, isSelected, setIsSelected
}) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (isSelected && textTransformRef.current && textRef.current) {
      textTransformRef.current.nodes([ textRef.current ]);
      textTransformRef.current.getLayer().batchDraw();
    }
  }, [ isSelected, textTransformRef, textRef ]);

  useEffect(() => {
    if (!textRef.current) return;
    const textNode = textRef.current;
    const textWidth = textNode.width();
    textNode.x((CANVAS_SIZE - textWidth) / 2);
    textNode.y(CANVAS_SIZE - textNode.height() - TEXT_BOTTOM_PADDING);
  }, []);

  if (!inputText) return null;

  return (
    <>
      <KonvaText
        text={inputText}
        fontSize={32}
        fill={textColor}
        ref={textRef}
        shadowForStrokeEnabled
        fontStyle="bold"
        align="center"
        draggable
        onClick={() => setIsSelected(oldState => !oldState)}
        shadowBlur={10}
        // shadowColor="rgba(255,255,255,1)"
        shadowColor="rgba(0,0,0,1)"
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
        }} />
      {isSelected && (
        <Transformer
          ref={textTransformRef}
          enabledAnchors={[ "top-left", "top-right", "bottom-left", "bottom-right" ]}
          rotateEnabled={false}
          boundBoxFunc={(oldBox, newBox) =>
            ((newBox.width < 5 || newBox.height < 5) ? oldBox : newBox)} />
      )}
    </>
  );
};
