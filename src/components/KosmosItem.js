import React, { useEffect, useState } from 'react'

import Moveable from "react-moveable";

export default function KosmosItem({albumId, thumbnailUrl, title, url, id, EraseItem}) {
  const [target, setTarget] = useState();
  const frame = {
    translate: [0,0],
  }
  const containerWidth= 500
  const containerHeigth = 500

  useEffect(() => {
      setTarget(document.getElementById(id));
  }, [id]);

  return (
    <div className='MoveableContainer'>
      <div id={id}  className='itemContainer' >
        <button onClick={()=>EraseItem(id)}>Click on me if you want to erase me</button>
        <div className='itemImageContainer'>
          <img src={thumbnailUrl} alt={title} className='itemImage'/>
        </div>
      </div>
      <Moveable
        target={target}
        draggable={true}
        throttleDrag={0}
        startDragRotate={0}
        throttleDragRotate={0}
        zoom={1}
        origin={true}
        padding={{"left":0,"top":0,"right":0,"bottom":0}}
        onDragStart={e => {
            e.set(frame.translate);
        }}
        onDrag={e => {
            const actualWidth= e.width
            const actualHeight= e.height
            frame.translate = e.beforeTranslate;
            const x = e.beforeTranslate[0]
            const y = e.beforeTranslate[1]
            
            const newX= x + actualWidth >= containerWidth  ? containerWidth - actualWidth : x < 0 ? 0 : x
            
            const newY= actualHeight + y >= containerHeigth ? containerHeigth-actualHeight: y <= 0 ? 0 : y
            e.beforeTranslate[0] = newX
            e.beforeTranslate[1] = newY
            e.target.style.transform = `translate(${newX}px, ${newY}px)`;
        }}
        //resizable
        resizable={true}
        keepRatio={false}
        throttleResize={1}
        renderDirections={["nw","n","ne","w","e","sw","s","se"]}
        edge={false}
        onResizeStart={e => {
            e.setOrigin(["%", "%"]);
            e.dragStart && e.dragStart.set(frame.translate);
        }}
        onResize={e => {
          const actualWidth= e.width
          const actualHeight= e.height
          
          const beforeTranslate = e.drag.beforeTranslate;
          
          frame.translate = beforeTranslate;
          
          const x = beforeTranslate[0]
          const y = beforeTranslate[1]
          
          const widthDiff= containerWidth - actualWidth
          const heigthDiff= containerHeigth-actualHeight
          
          const newX= x < 0 ? 0 : x > widthDiff ? widthDiff : x
          const newY= y < 0 ? 0 : y > heigthDiff ? heigthDiff :  y 

          const isWider = containerWidth <= actualWidth
          const isHeigher = containerHeigth <= actualHeight
          
          e.target.style.width = `${isWider? containerWidth : e.width}px`;

          e.target.style.height = `${isHeigher ? containerHeigth: e.height}px`;
          
          e.target.style.transform = `translate(${newX}px, ${newY}px)`;

          e.drag.beforeTranslate[0] = newX
          e.drag.beforeTranslate[1] = newY

        }}
      />
    </div>
  )
}
