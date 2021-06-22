/**
 * @file Correct Response component for Matrix Interaction item type 
 * @author Rajaguru
 */
import React, { useEffect, useState } from "react";
import { RadioButton, Checkbox } from "@progress/kendo-react-inputs";
import parse from 'html-react-parser';
import SelectText from './SelectText/index'
import Matrix from './Matrix/index'


const PreviewCorrecrResponse = ({ content, onUpdate,module, showCorrectResponseOnly }) => {

    const itemRepositories = [ {code:"MCRB", repository:Matrix}, 
    {code:"ST", repository:SelectText},];
    console.log("itemTypeCode",content.itemTypeCode)

    const [itemResponse, setItemResponse] = useState(setRepo());

  
       

        function setRepo() {
            let c = itemRepositories.find((r) => { return r.code === content.itemTypeCode});
            console.log("c ,,,,,,,,,,,,, ",c)
            if(c && c.repository) {
                console.log("c if,,,,,,,,,,,,, ",c)
                //setItemResponse(c.repository);
                return c.repository;
            }
            console.log("Test the item repo",itemResponse)
          }
      

          function setCorrectReponseOnly() {
            if (module === "PREVIEW" && showCorrectResponseOnly) {
               
                
                return true;
                
              }else{
                  return false;
              }
          }
       
      

        // useEffect(() => {
        //     console.log("Test the item repo",itemResponse)
        //     let c = itemRepositories.find((r) => { return r.code === content.itemTypeCode});
        //     if(c && c.repository) {
        //         setItemResponse(c.repository);
        //     }
        //     console.log(itemResponse)
        //   });

  return (
    <>
    {/* {itemCode === "ST" && (
            <CorrectResponse content={content} onUpdate={onUpdate} />
    )}
    {itemCode !== "ST" && (
            <MatrixCorrectResponse content={content} onUpdate={onUpdate} />
    )} */}
     <itemResponse.CorrectResponse content={content} onUpdate={onUpdate} module={module} showCorrectResponse={setCorrectReponseOnly()}/>
   
     </>
  );
};

export default PreviewCorrecrResponse;
