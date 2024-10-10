import React,{lazy,Suspense} from "react";
import CVForm from "./Forms/CVForm";
import CVTemplete from "./CVTemplete";



const Editor = () => {

  return (
    <div className="editor" >
      <div>
        <CVForm/>
      </div>
    </div>
  );
};

export default Editor;
