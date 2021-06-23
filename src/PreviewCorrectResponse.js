/**
 * @file PreviewCorrecrResponse component for common redirection 
 * @author Regu
 */
import React  from "react";
import SelectText from './SelectText/index'
import Matrix from './Matrix/index'


const PreviewCorrecrResponse = ({ content, onUpdate, existingResponseObject, showCorrectResponseOnly }) => {

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



  return (
    <>
      <itemType.CorrectResponse content={content} onUpdate={onUpdate} existingResponseObject={existingResponseObject} showCorrectResponse={showCorrectResponseOnly} />
    </>
  );
};

export default PreviewCorrecrResponse;
