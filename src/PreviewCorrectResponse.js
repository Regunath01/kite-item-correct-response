/**
 * @file PreviewCorrecrResponse component for common redirection 
 * @author Regu
 */
import React, { useEffect, useState } from "react";
import { RadioButton, Checkbox } from "@progress/kendo-react-inputs";
import parse from 'html-react-parser';
import SelectText from './SelectText/index'
import Matrix from './Matrix/index'


const PreviewCorrecrResponse = ({ content, onUpdate, module, showCorrectResponseOnly }) => {

  const itemRepositories = [{ code: "MCRB", repository: Matrix },
  { code: "ST", repository: SelectText },];
  console.log("itemTypeCode", content.itemTypeCode)

  const itemType = setItemRepository();

 //This methos is used to set Item repositoy based on the itemTypeCode
  function setItemRepository() {
    let c = itemRepositories.find((r) => { return r.code === content.itemTypeCode });
    if (c && c.repository) {
      return c.repository;
    }
  }

 //Function is used to set the flag for correcr response only in the Preview
  function setCorrectReponseOnly() {
    if (module === "PREVIEW" && showCorrectResponseOnly) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>

      <itemType.CorrectResponse content={content} onUpdate={onUpdate} module={module} showCorrectResponse={setCorrectReponseOnly()} />

    </>
  );
};

export default PreviewCorrecrResponse;
