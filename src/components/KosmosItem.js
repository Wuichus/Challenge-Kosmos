import React, { useEffect, useState } from 'react'

import Moveable from "react-moveable";

export default function KosmosItem({albumId, thumbnailUrl, title, url, id, EraseItem}) {
  const [target, setTarget] = useState();
  const frame = {
    translate: [0,0],
  }
  const containerWidth= 500
  const containerHeigth = 500

  const checkForX = ({ actualWidth, x }) =>{
    const widthDiff= containerWidth - actualWidth
    return x < 0 ? 0 : x > widthDiff ? widthDiff : x
  }

  const checkForY = ({ actualHeight, y }) =>{
    const heigthDiff= containerHeigth - actualHeight

    return y < 0 ? 0 : y > heigthDiff ? heigthDiff : y
  }

  useEffect(() => {
      //Target the element container by id to make it Moveable
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
            
            // New position on x and y
            let x = e.beforeTranslate[0]
            let y = e.beforeTranslate[1]
            
            // Check if is the new position in x is lower than 0 or heigher than max-width
            const newX= checkForX({x, actualWidth})
            
            // Check if is the new position in y is lower than 0 or heigher than max-height
            const newY= checkForY({y, actualHeight})

            // Assign new value to beforeTranslate
            x = newX
            y = newY
            
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
          // New position on x and y
          const x = beforeTranslate[0]
          const y = beforeTranslate[1]
          
          // Check if is the new position in x is lower than 0 or heigher than max-width
          const newX= checkForX({x, actualWidth})

          // Check if is the new position in y is lower than 0 or heigher than max-height
          const newY= checkForY({y, actualHeight})

          // Check if the new container is wider than max-width
          const isWider = containerWidth <= actualWidth
          
          // Check if the new container is heigher than max-height
          const isHeigher = containerHeigth <= actualHeight
          
          // Assign new width 
          e.target.style.width = `${isWider? containerWidth : e.width}px`;
          
          // Assign new height 
          e.target.style.height = `${isHeigher ? containerHeigth: e.height}px`;
          
          // Transform to new position without getting out of the container
          e.target.style.transform = `translate(${newX}px, ${newY}px)`;
          
          // Assign new value to beforeTranslate
          e.drag.beforeTranslate[0] = newX
          e.drag.beforeTranslate[1] = newY

        }}
      />
    </div>
  )
}
