/* eslint-disable react/no-multi-comp */
"use client";

import { useRef, useEffect } from "react";
import { Transformer, Text as KonvaText } from "react-konva";
import { CANVAS_WIDTH, TEXT_BOTTOM_PADDING } from "./CONSTANTS";



const TextPhraseLayer = ({
  inputText, textColor, textTransformRef, editMode, setEditMode, canvasWidth = CANVAS_WIDTH, canvasHeight = CANVAS_WIDTH
}) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (editMode && textTransformRef.current && textRef.current) {
      textTransformRef.current.nodes([ textRef.current ]);
      textTransformRef.current.getLayer().batchDraw();
    }
  }, [ editMode, textTransformRef, textRef ]);

  useEffect(() => {
    if (!textRef.current) return;
    const textNode = textRef.current;
    const textWidth = textNode.width();
    textNode.x((canvasWidth - textWidth) / 2);
    textNode.y(canvasHeight - textNode.height() - TEXT_BOTTOM_PADDING * 3);
  }, [ canvasHeight ]);


  useEffect(() => {
    if (!textRef.current) return;
    const textNode = textRef.current;
    const textWidth = textNode.width();
    textNode.x((canvasWidth - textWidth) / 2);
  }, [ inputText ]);

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
        onClick={() => setEditMode(oldState => !oldState)}
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
          const newX = Math.max(0, Math.min(canvasWidth - node.width(), e.target.x()));
          const newY = Math.max(0, Math.min(canvasHeight - node.height(), e.target.y()));
          node.x(newX);
          node.y(newY);
        }} />
      {editMode && (
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



module.exports = TextPhraseLayer;
