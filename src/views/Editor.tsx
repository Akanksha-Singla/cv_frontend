import React,{lazy,Suspense} from "react";
import CVForm from "./Forms/CVForm";

const CVTemplete = lazy(() => import("./CVTemplete"));

const Editor = () => {
  return (
    <div className="editor">
      <div>
        
        <CVForm />
      </div>

      <div>
      <Suspense fallback={<div>Loading CV Preview...</div>}>
          <CVTemplete />
        </Suspense>
      </div>
    </div>
  );
};

export default Editor;
