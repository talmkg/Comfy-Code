// import { useSelector } from "react-redux";
// import React from "react";
// import { DndContext } from "@dnd-kit/core";
// import { Draggable } from "./Draggable";
// import { Droppable } from "./Droppable";
// import { useState } from "react";
// import codeIcon from "../../../Files/Badges/code.png";
// import javascriptIcon from "../../../Files/Badges/javascript.png";
// import pythonIcon from "../../../Files/Badges/python.png";
// import learningIcon from "../../../Files/Badges/learning.png";
// import { useEffect } from "react";
// const Badges = () => {
//   const containers = ["A", "B", "C", "D"];
//   const [parent, setParent] = useState(null);
//   const [parent2, setParent2] = useState(null);
//   const [parent3, setParent3] = useState(null);
//   const [parent4, setParent4] = useState(null);
//   const draggable1 = (
//     <>
//       <Draggable id="draggable1" className="prevent-select">
//         <img src={codeIcon} style={{ width: "70px" }} />
//       </Draggable>
//     </>
//   );
//   const draggable2 = (
//     <>
//       <Draggable id="draggable2" className="prevent-select">
//         <img src={javascriptIcon} style={{ width: "70px" }} />
//       </Draggable>
//     </>
//   );
//   const draggable3 = (
//     <>
//       <Draggable id="draggable3" className="prevent-select">
//         <img src={pythonIcon} style={{ width: "70px" }} />
//       </Draggable>
//     </>
//   );
//   const draggable4 = (
//     <>
//       <Draggable id="draggable4" className="prevent-select">
//         <img src={learningIcon} style={{ width: "70px" }} />
//       </Draggable>
//     </>
//   );
//   return (
//     <>
//       <div className="center-flex pb-4 text-color">Choose your badges</div>
//       <DndContext onDragEnd={handleDragEnd}>
//         <div
//           className="d-flex justify-content-around w-100"
//           style={{ height: "100px" }}
//         >
//           {containers.map((placeholderName) => {
//             // We updated the Droppable component so it would accept an `id`
//             // prop and pass it to `useDroppable`

//             if (parent === placeholderName) {
//               return (
//                 <div
//                   className="center-flex bg-secondary rounded-circle 1"
//                   style={{ width: "80px", height: "80px" }}
//                 >
//                   <Droppable key={placeholderName} id={placeholderName}>
//                     {parent === placeholderName ? (
//                       draggable1
//                     ) : (
//                       <div className="test">Badge</div>
//                     )}
//                   </Droppable>
//                 </div>
//               );
//             }
//             if (parent2 === placeholderName) {
//               return (
//                 <div
//                   className=" center-flex bg-secondary rounded-circle 2"
//                   style={{ width: "80px", height: "80px" }}
//                 >
//                   <Droppable key={placeholderName} id={placeholderName}>
//                     {parent2 === placeholderName ? (
//                       draggable2
//                     ) : (
//                       <div className="test">Badge</div>
//                     )}
//                   </Droppable>
//                 </div>
//               );
//             }
//             if (parent3 === placeholderName) {
//               return (
//                 <div
//                   className=" center-flex bg-secondary rounded-circle 3"
//                   style={{ width: "80px", height: "80px" }}
//                 >
//                   <Droppable key={placeholderName} id={placeholderName}>
//                     {parent3 === placeholderName ? (
//                       draggable3
//                     ) : (
//                       <div className="test">Badge</div>
//                     )}
//                   </Droppable>
//                 </div>
//               );
//             }
//             if (parent4 === placeholderName) {
//               return (
//                 <div
//                   className=" center-flex bg-secondary rounded-circle 4"
//                   style={{ width: "80px", height: "80px" }}
//                 >
//                   <Droppable key={placeholderName} id={placeholderName}>
//                     {parent4 === placeholderName ? (
//                       draggable4
//                     ) : (
//                       <div className="test">Badge</div>
//                     )}
//                   </Droppable>
//                 </div>
//               );
//             }
//             //basic one
//             return (
//               <div
//                 className=" center-flex bg-secondary rounded-circle 5"
//                 style={{ width: "80px", height: "80px" }}
//               >
//                 <Droppable key={placeholderName} id={placeholderName}>
//                   {parent === placeholderName ? (
//                     draggable1
//                   ) : (
//                     <div className="test">Badge</div>
//                   )}
//                 </Droppable>
//               </div>
//             );
//           })}
//         </div>
//         <div className="w-100 d-flex justify-content-start p-4 prevent-select">
//           {parent === null ? draggable1 : null}
//           {parent2 === null ? draggable2 : null}
//           {parent3 === null ? draggable3 : null}
//           {parent4 === null ? draggable4 : null}
//         </div>
//       </DndContext>
//     </>
//   );
//   function handleDragEnd(event) {
//     console.log("handleDragEnd", event.active.id);
//     const { over } = event;

//     // If the item is dropped over a container, set it as the parent
//     // otherwise reset the parent to `null`

//     if (event.active.id === "draggable1") {
//       //over.id = [A-D]
//       setParent(over ? over.id : null);
//     }
//     if (event.active.id === "draggable2") {
//       setParent2(over ? over.id : null);
//     }
//     if (event.active.id === "draggable3") {
//       setParent3(over ? over.id : null);
//     }
//     if (event.active.id === "draggable4") {
//       setParent4(over ? over.id : null);
//     }
//   }
// };
// export default Badges;
import { useSelector } from "react-redux";
import React from "react";
import { DndContext } from "@dnd-kit/core";
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";
import { useState } from "react";
import codeIcon from "../../../Files/Badges/code.png";
import javascriptIcon from "../../../Files/Badges/javascript.png";
import pythonIcon from "../../../Files/Badges/python.png";
import learningIcon from "../../../Files/Badges/learning.png";
import { useEffect } from "react";
const Badges = () => {
  const containers = ["A", "B", "C", "D"];
  const [parent, setParent] = useState(null);
  const [parent2, setParent2] = useState(null);
  const PictureList = [
    {
      id: 1,
      url: "https://yt3.ggpht.com/ytc/AAUvwnjOQiXUsXYMs8lwrd4litEEqXry1-atqJavJJ09=s900-c-k-c0x00ffffff-no-rj",
    },
    {
      id: 2,
      url: "https://media-exp1.licdn.com/dms/image/C4D03AQExheo0sff_yQ/profile-displayphoto-shrink_200_200/0/1590072898568?e=1630540800&v=beta&t=_W-gWZewSBYQ-UAjpGvR8h_8Vvo202IHQQissbK2aKc",
    },
    {
      id: 3,
      url: "https://yt3.ggpht.com/pe57RF1GZibOWeZ9GwRWbjnLDCK2EEAeQ3u4iMAFNeaz-PN9uSsg1p2p32TZUedNnrUhKfoOuMM=s900-c-k-c0x00ffffff-no-rj",
    },
  ];
  const draggable = (
    <>
      <Draggable id="draggable1" className="prevent-select">
        <img src={codeIcon} style={{ width: "70px" }} />
      </Draggable>
    </>
  );
  const draggable2 = (
    <>
      <Draggable id="draggable2" className="prevent-select">
        <img src={javascriptIcon} style={{ width: "70px" }} />
      </Draggable>
    </>
  );

  return (
    <>
      <div className="center-flex pb-4 text-color">Choose your badges</div>
      <DndContext onDragEnd={handleDragEnd}>
        <div
          className="d-flex justify-content-around w-100"
          style={{ height: "100px" }}
        >
          {containers.map((placeholderName) => {
            return (
              <div
                className=" center-flex bg-secondary rounded-circle 5"
                style={{ width: "80px", height: "80px" }}
              >
                <Droppable key={placeholderName} id={placeholderName}>
                  {parent === placeholderName ? (
                    draggable
                  ) : (
                    <div className="test">Badge</div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
        <div className="w-100 d-flex justify-content-start p-4 prevent-select">
          {parent === null ? draggable : null}
          {parent2 === null ? draggable2 : null}
        </div>
      </DndContext>
    </>
  );
  function handleDragEnd(event) {
    console.log("handleDragEnd", event.active.id);
    const { over } = event;

    setParent(over ? over.id : null);
  }
};
export default Badges;
