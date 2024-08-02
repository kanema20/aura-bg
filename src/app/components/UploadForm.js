/* eslint-disable react/no-multi-comp */
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { Button, Form, Image, Row, Col, Radio, message, Input, ColorPicker, Select, Tabs, Checkbox } from "antd";
import { FileImageOutlined, SaveOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import { Stage, Layer, Rect } from "react-konva";
import _ from "lodash";
import Script from "next/script";
import ALL_FILTER_OPTIONS from "./FILTER_OPTIONS";

import TextAmountLayer from "./TextAmountLayer";
import TextPhraseLayer from "./TextPhraseLayer";
import AuraBackgroundImageLayer from "./AuraBackgroundImageLayer";
import AvatarImage from "./AvatarImage";
import BACKGROUND_IMAGES from "./BACKGROUND_IMAGES";
import { CANVAS_WIDTH, INITIALS } from "./CONSTANTS";
import ENABLED_FILTERS from "./ENABLED_FILTERS";
import AI_PHRASES from "./AI_PHRASES";



const MODES = {
  memeGenerator: "memeGenerator",
  mg: "memeGenerator",
  profilePictureMaker: "profilePictureMaker",
  pp: "profilePictureMaker"
};

const TABS = [
  {
    key: MODES.memeGenerator,
    label: "Meme Generator"
  },
  {
    key: MODES.profilePictureMaker,
    label: "Profile Picture Maker"
  }
];


const FILTER_OPTIONS = _(ALL_FILTER_OPTIONS)
  .filter((option) => _.includes(ENABLED_FILTERS, option.label))
  .thru(arr =>
    _.concat([ {
      label: "No Filter",
      value: ""
    } ], arr)
  )
  .sortBy(item => _.findIndex(ENABLED_FILTERS, sub => sub === item.label))
  .value();



const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function UploadForm({ mode }) {
  const [ image, setImage ] = useState(null);
  const [ resultImageUrl, setResultImageUrl ] = useState("");
  // const [ resultImageUrl, setResultImageUrl ] = useState("34e8cf0a-9441-491a-8c6b-5d92ac1f0fb1___photo_2024-07-27_16-26-46.jpg");
  const [ originalImageUrl, setOriginalImageUrl ] = useState("");
  const [ imageRatio, setImageRatio ] = useState(1);
  const [ selectedBackgroundIndex, setSelectedBackgroundIndex ] = useState("0");
  const [ editMode, setEditMode ] = useState(false);
  const [ inputText, setInputText ] = useState(INITIALS.inputText);
  const [ inputPhrase, setInputPhrase ] = useState(INITIALS.phraseText);
  const [ textColor, setTextColor ] = useState(INITIALS.textColor);
  const [ phraseColor, setPhraseColor ] = useState(INITIALS.phraseColor);
  const [ imageFilter, setImageFilter ] = useState(INITIALS.imageFilter);
  const [ pixelsJsLoaded, setPixelsJsLoaded ] = useState(false);
  const [ form ] = Form.useForm();
  const [ activeTab, setActiveTab ] = useState(MODES[mode] || MODES.memeGenerator);
  const [ enableDarkBackground, setEnableDarkBackground ] = useState(true);

  const stageRef = useRef(null);
  const avatarImageRef = useRef(null);
  const avatarOriginalImageRef = useRef(null);
  const avatarImageTransformRef = useRef(null);
  const avatarOriginalImageTransformRef = useRef(null);
  const backgroundImageRef = useRef(null);
  const textTransformRef = useRef(null);
  const textTransformRef2 = useRef(null);



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
    setOriginalImageUrl(null);
    setSelectedBackgroundIndex(INITIALS.selectedBackgroundIndex);
    setEditMode(false);
    setImageRatio(1);
    setInputPhrase(INITIALS.phraseText);
    setInputText(INITIALS.inputText);
    setTextColor(INITIALS.textColor);
    setPhraseColor(INITIALS.phraseColor);
    setImageFilter(INITIALS.imageFilter);
    form.setFieldsValue({
      selectedBackgroundIndex: INITIALS.selectedBackgroundIndex,
      inputText: INITIALS.inputText,
      textColor: INITIALS.textColor,
      phraseColor: INITIALS.phraseColor,
      filterImage: INITIALS.imageFilter,
      enableDarkBackground: true
    });
  }, [ form ]);
  const handleRandomize = useCallback(() => {
    setSelectedBackgroundIndex(_.random(0, BACKGROUND_IMAGES.length - 1).toString());
    const randomInput = `+ ${_.random(100, 9999)} aura`;
    setInputText(randomInput);
    const randomPhrase = _.sample(AI_PHRASES);
    setInputPhrase(randomPhrase);
    // const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    // setTextColor(randomColor);
    // setPhraseColor(randomColor);
    const randomImageFilter = _.sample(FILTER_OPTIONS).value;
    setImageFilter(randomImageFilter);
    form.setFieldsValue({
      selectedBackgroundIndex: _.random(0, BACKGROUND_IMAGES.length - 1).toString(),
      inputText: randomInput,
      inputPhrase: randomPhrase,
      // textColor: randomColor,
      // phraseColor: randomColor,
      filterImage: randomImageFilter
    });
  }, [ form ]);

  useEffect(() => {
    const targetImRef = activeTab === MODES.memeGenerator ? avatarOriginalImageRef : avatarImageRef;
    const targetTransformRef = activeTab === MODES.memeGenerator ? avatarOriginalImageTransformRef : avatarImageTransformRef;
    if (editMode && targetTransformRef.current && targetImRef.current) {
      targetTransformRef.current.nodes([ targetImRef.current ]);
      targetTransformRef.current.getLayer().batchDraw();
    }
  }, [ activeTab, editMode, avatarImageRef, avatarImageTransformRef, avatarOriginalImageTransformRef, avatarOriginalImageRef ]);


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

      <Row>
        <Col span={24}>
          <div className="flex justify-center mb-10 w-full">
            <Tabs
              className="w-full"
              animated
              centered
              more={false}
              size="large"
              popupClassName="hidden"
              activeKey={activeTab}
              items={TABS}
              onChange={setActiveTab} />
          </div>
        </Col>
      </Row>

      <Row
        gutter={16}
        align="top"
        justify="center"
        wrap>
        <Col
          className="mb-5"
          xs={24}
          sm={20}
          md={14}
          lg={10}
          xl={10}>
          <Form
            form={form}
            name="basic"
            layout="vertical"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: CANVAS_WIDTH }}
            initialValues={{ remember: true }}
            autoComplete="off">
            <Row>
              <Form.Item
                style={{ width: "100%" }}
                layout="vertical"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // label="Upload your avatar or pp"
                name="image">
                <div className="flex">
                  <Dragger
                    rootClassName="uploader"
                    className="grow w-full"
                    name="image"
                    multiple={false}
                    action={`${process.env.NEXT_PUBLIC_API_ADDRESS}/upload`}
                    onChange={(info) => {
                      const { status } = info.file;
                      if (status !== "uploading") {
                        console.info("status ", status);
                      }
                      if (status === "done") {
                        const img = new window.Image();
                        img.src = `/uploads/${info.file.response.data.origFileName}`;
                        img.onload = () => {
                          const ratio = img.width / img.height;
                          setImageRatio(ratio);
                          setOriginalImageUrl(info.file.response.data.origFileName);
                          console.log("info.file ", info.file);
                          setResultImageUrl(info.file.response.data.imageUrl);
                          message.success(`${info.file.name} file uploaded successfully.`);
                        };
                      }
                      else if (status === "error") {
                        message.error(`${info.file.name} file upload failed.`);
                      }
                    }}>
                    <p className="ant-upload-drag-icon">
                      <FileImageOutlined />
                    </p>
                    <p className="ant-upload-text">Upload Picture</p>
                  </Dragger>
                </div>
              </Form.Item>
            </Row>

            {activeTab === MODES.pp && (
              <Form.Item
                className="mt-5"
                label="Aura Backgrounds"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                initialValue={String(selectedBackgroundIndex)}>
                <Radio.Group
                  value={String(selectedBackgroundIndex)}
                  className="flex flex-wrap">
                  {_.map(BACKGROUND_IMAGES, (bg, index) => (
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
            )}


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


            {activeTab === MODES.memeGenerator && (
              <Row
                className=""
                gutter={10}>
                <Col span={16}>
                  <Form.Item
                    labelCol={{ span: 24 }}
                    label="1st Line phrase"
                    initialValue={inputPhrase}
                    shouldUpdate={(prevValues, curValues) => inputPhrase !== curValues.inputPhrase}
                    name="inputPhrase"
                    wrapperCol={{ span: 24 }}>
                    <Input
                      name="inputPhrase"
                      value={inputPhrase}
                      onChange={(e) => {
                        setInputPhrase(e.target.value);
                        form.setFieldValue("inputPhrase", e.target.value);
                      }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <ColorPicker
                    className="mt-[30px]"
                    name="phraseColor"
                    showText
                    defaultFormat="hex"
                    disabledAlpha
                    value={phraseColor}
                    onChangeComplete={color => {
                      setPhraseColor(color.toHexString());
                    }} />
                </Col>
              </Row>
            )}


            <Row
              className=""
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
                  name="textColor"
                  showText
                  defaultFormat="hex"
                  disabledAlpha
                  value={textColor}
                  onChangeComplete={color => {
                    setTextColor(color.toHexString());
                  }} />
              </Col>
            </Row>

            <Form.Item
              labelCol={{ span: 24 }}
              initialValue={enableDarkBackground}
              name="enableDarkBackground"
              wrapperCol={{ span: 24 }}>
              <Checkbox
                checked={enableDarkBackground}
                id="enableDarkBackground"
                onChange={(e) => {
                  setEnableDarkBackground(e.target.checked);
                  form.setFieldValue("enableDarkBackground", e.target.value);
                }} />
              <label htmlFor="enableDarkBackground" className="ml-3">Darken background</label>
            </Form.Item>

          </Form>

          <div className="flex items-center justify-center w-full">
            <Button
              onClick={handleReset}
              danger
              className="grow"
              size="">RESET</Button>
            <Button
              onClick={handleRandomize}
              className="grow"
              size="">RANDOMIZE</Button>

          </div>
        </Col>

        <Col
          sm={24}
          md={20}
          lg={14}
          xl={14}>
          <div className="flex flex-col items-center justify-center">
            <Stage id="stage" width={CANVAS_WIDTH} height={CANVAS_WIDTH / imageRatio}
              ref={stageRef}>
              <Layer>
                {activeTab === MODES.pp && (
                  <AuraBackgroundImageLayer
                    setIsSelected={setEditMode}
                    selectedBackgroundIndex={selectedBackgroundIndex}
                    backgroundImageRef={backgroundImageRef} />
                )}
                <AvatarImage
                  shadowEnabled={activeTab === MODES.profilePictureMaker}
                  pixelsJsLoaded={pixelsJsLoaded}
                  canvasHeight={CANVAS_WIDTH / imageRatio}
                  imageFilter={imageFilter}
                  resultImageUrl={activeTab === MODES.memeGenerator ? originalImageUrl : resultImageUrl}
                  mainImageRef={activeTab === MODES.memeGenerator ? avatarOriginalImageRef : avatarImageRef}
                  isSelected={editMode}
                  setIsSelected={setEditMode}
                  mainImageTransformRef={activeTab === MODES.memeGenerator ? avatarOriginalImageTransformRef : avatarImageTransformRef} />
                {enableDarkBackground && (
                  <Rect
                    width={CANVAS_WIDTH}
                    height={CANVAS_WIDTH / imageRatio}
                    draggable={false}
                    fill="black"
                    listening={false}
                    opacity={0.4} />
                )}
                {activeTab === MODES.memeGenerator && (
                  <TextPhraseLayer
                    inputText={inputPhrase}
                    textColor={phraseColor}
                    canvasHeight={CANVAS_WIDTH / imageRatio}
                    textTransformRef={textTransformRef}
                    isSelected={editMode}
                    setIsSelected={setEditMode} />
                )}
                <TextAmountLayer
                  inputText={inputText}
                  textColor={textColor}
                  canvasHeight={CANVAS_WIDTH / imageRatio}
                  textTransformRef={textTransformRef2}
                  isSelected={editMode}
                  setIsSelected={setEditMode} />
              </Layer>
            </Stage>
            <div className="flex justify-end mt-2">
              <Button
                onClick={handleExport}
                className="px-20 mt-3"
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
