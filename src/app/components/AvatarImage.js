/* eslint-disable react/no-multi-comp */
"use client";

import { useEffect } from "react";
import useImage from "use-image";
import { Image as KonvaImage, Transformer } from "react-konva";
import { BRIGHTNESS, ENHANCE, CANVAS_SIZE } from "./CONSTANTS";



const AvatarImage = ({
  resultImageUrl, mainImageRef, isSelected, setIsSelected, mainImageTransformRef, imageFilter, pixelsJsLoaded, shadowEnabled = false
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
        shadowEnabled={shadowEnabled}
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



module.exports = AvatarImage;
