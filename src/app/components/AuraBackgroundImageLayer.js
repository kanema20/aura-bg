/* eslint-disable react/no-multi-comp */
"use client";

import { useEffect } from "react";
import useImage from "use-image";
import { Image as KonvaImage } from "react-konva";
import BACKGROUND_IMAGES from "./BACKGROUND_IMAGES";
import { BRIGHTNESS, ENHANCE, CANVAS_WIDTH } from "./CONSTANTS";



const AuraBackgroundImageLayer = ({
  selectedBackgroundIndex, backgroundImageRef, setEditMode, canvasWidth = CANVAS_WIDTH, canvasHeight = CANVAS_WIDTH
}) => {
  const [ image ] = useImage(`${window.location.origin}/${BACKGROUND_IMAGES[selectedBackgroundIndex]}`);

  useEffect(() => {
    if (backgroundImageRef.current && image) {
      const img = new window.Image();
      img.src = BACKGROUND_IMAGES[selectedBackgroundIndex];
      img.onload = () => {
        const imageNode = backgroundImageRef.current;
        // imageNode.width(img.width);
        imageNode.width(canvasWidth);
        // imageNode.height(img.height);
        imageNode.height(canvasHeight);

        const scaleX = 1;
        // const scaleX = CANVAS_WIDTH / img.width;
        const scaleY = 1;
        // const scaleY = CANVAS_WIDTH / img.height;
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
        onClick={() => setEditMode(false)}
        image={image}
        ref={backgroundImageRef} />
    </>
  );
};



module.exports = AuraBackgroundImageLayer;
