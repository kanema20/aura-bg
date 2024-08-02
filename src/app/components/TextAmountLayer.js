/* eslint-disable react/no-multi-comp */
"use client";

import { useRef, useEffect } from "react";
import { Transformer, Text as KonvaText } from "react-konva";
import { CANVAS_SIZE, TEXT_BOTTOM_PADDING } from "./CONSTANTS";



const TextAmountLayer = ({
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
        shadowColor="white"
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



module.exports = TextAmountLayer;
