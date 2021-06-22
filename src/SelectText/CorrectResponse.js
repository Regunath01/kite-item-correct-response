/**
 * @file Correcr Response component for Select Text item type
 * @author Rajaguru & Regu
 */

import React, { useEffect, useState } from "react";
import {
  MANUALLY_SELECTED_RESPONSE,
  WHOLE_PARAGRAPHS,
  SELECT_TEXT_TAG,
  CLASS,
  SELECTED_RESPONSE_CLASS,
  CORRECT_RESPONSE_AREA,
  ST_RED,
  ST_BLACK,
  ST_YELLOW,
  WHOLE_WORDS,
  WHOLE_SENTENCES,
} from "./constants";

const CorrectResponse = ({ content, onUpdate, module, showCorrectResponse }) => {

  const setClassNames = () => {
    let newClass = {
      borderOnStart: "",
      borderOnHover: "",
      highlightStart: "",
      highlightHover: "",
    };

    if (content.borderAtStart === ST_RED) {
      newClass.borderOnStart = " st-border-start-red";
    } else if (content.borderAtStart === ST_BLACK) {
      newClass.borderOnStart = " st-border-start-black";
    } else {
      newClass.borderOnStart = " ";
    }

    if (content.borderOnHover === ST_RED) {
      newClass.borderOnHover = " st-border-hover-red";
    } else if (content.borderOnHover === ST_BLACK) {
      newClass.borderOnHover = " st-border-hover-black";
    } else {
      newClass.borderOnHover = " ";
    }

    if (content.highlightAtStart === ST_YELLOW) {
      newClass.highlightStart = " st-highlight-start";
    } else {
      newClass.highlightStart = " ";
    }

    if (content.highlightOnHover === ST_YELLOW) {
      newClass.highlightHover = " st-highlight-hover-yellow";
    } else {
      newClass.highlightHover = " st-highlight-hover-none";
    }

    return newClass;
  };

  const [classNameForCR, setClassNameForCR] = useState(setClassNames());

  const showCorrectResponses = setResponseObject();//Setting response object where user action has to be saved

  useEffect(() => {
    if (content.borderAtStart === ST_RED) {
      classNameForCR.borderOnStart = " st-border-start-red";
    } else if (content.borderAtStart === ST_BLACK) {
      classNameForCR.borderOnStart = " st-border-start-black";
    } else {
      classNameForCR.borderOnStart = " ";
    }

    if (content.borderOnHover === ST_RED) {
      classNameForCR.borderOnHover = " st-border-hover-red";
    } else if (content.borderOnHover === ST_BLACK) {
      classNameForCR.borderOnHover = " st-border-hover-black";
    } else {
      classNameForCR.borderOnHover = " ";
    }

    if (content.highlightAtStart === ST_YELLOW) {
      classNameForCR.highlightStart = " st-highlight-start";
    } else {
      classNameForCR.highlightStart = " ";
    }

    if (content.highlightOnHover === ST_YELLOW) {
      classNameForCR.highlightHover = " st-highlight-hover-yellow";
    } else {
      classNameForCR.highlightHover = " st-highlight-hover-none";
    }


    setClassNameForCR(classNameForCR);

    generateContentForCorrectResponse();
    // eslint-disable-next-line
  }, [content]);


  //This Handler is used to set the response object based on the module
  function setResponseObject() {
    if (module === "PREVIEW" && !showCorrectResponse) {
      /* If the request is from preview then we will be saving user action 
      in the new attribute(content.previewResponseAction) in content object */
      if (!content.previewResponseAction) {
        content.previewResponseAction = { responses: [] };
      }

      return content.previewResponseAction;
    } else if (module === "PREVIEW" && showCorrectResponse) {
      /* If the request is from preview to correct response only 
      then we will be showing the correct responses where the user cannot perform any actions*/      
      return content.correctResponse;
    } else {
      return content.correctResponse;
    }

  }


  //This Handler is used to build the correct response based on user selection
  const buildCorrectResponse = (e) => {
    e.preventDefault();
    if (!showCorrectResponse) {//if the preview is only for showing correct response then restricting user actions
      let id = e.target.id;
      if (id === undefined || id === "") {
        id = e.currentTarget.id;
      }
      let selectedText = document.getElementById(id);
      const responses = showCorrectResponses.responses;
      if (
        selectedText !== null &&
        selectedText.getAttribute(CLASS) !== null &&
        selectedText.getAttribute(CLASS) !== "" &&
        responses.includes(id)
      ) {
        let className = selectedText
          .getAttribute(CLASS)
          .replace(/st-border-select-black/gi, "")
          .replace(/st-border-select-red/gi, "")
          .replace(/st-selected-response/gi, "");

        selectedText.setAttribute(CLASS, className);
        if (responses.includes(id)) {
          const optIndex = responses.findIndex((element) => element === id);
          responses.splice(optIndex, 1);
        }
      } else {
        let className =
          selectedText.getAttribute(CLASS) + SELECTED_RESPONSE_CLASS;

        if (content.borderOnSelect === ST_RED) {
          className.replace(/st-border-select-black/gi, "");
          className = className + " st-border-select-red";
        } else if (content.borderOnSelect === ST_BLACK) {
          className.replace(/st-border-select-red/gi, "");
          className = className + " st-border-select-black";
        } else {
          className = selectedText.getAttribute(CLASS) + SELECTED_RESPONSE_CLASS;
        }

        if (
          content.maxResponseSelection === "" ||
          responses.length < content.maxResponseSelection
        ) {
          selectedText.setAttribute(CLASS, className);
          responses.push(id);
        }
      }
      onUpdate({ ...content });
    }
  };

  //This method is to set the content in the correct response section based on type selection
  const generateContentForCorrectResponse = () => {
    let passageContent = "";
    if (
      content.selectionType === WHOLE_SENTENCES ||
      content.selectionType === WHOLE_WORDS
    ) {
      let divElement = document.createElement("div");
      divElement.innerHTML = content.passageContent;
      passageContent = divElement.innerHTML;
    } else {
      passageContent = content.passageContent;
    }

    let updatedPassageContent = "";
    if (content.selectionType !== MANUALLY_SELECTED_RESPONSE) {
      for (let i = 0; i < content.foils.length; i++) {
        if (
          content.foils[i].foilText !== "" &&
          content.foils[i].foilText !== "-" &&
          content.selectionType === WHOLE_SENTENCES
        ) { // This logic will execute for make the correct response with selectable for Sentences
          let regex = "";

          let foilText = content.foils[i].foilText;
          passageContent = passageContent.replace(/&nbsp;/gi, " ");
          passageContent = passageContent.replace(/\?/gi, "QEST_MARK");
          foilText = foilText.replace(/\?/gi, "QEST_MARK");

          // eslint-disable-next-line
          let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
          if (
            foilText.slice(-1).match(format) === null &&
            foilText.slice(-1).match(/[a-z0-9]/i) === null
          ) {
            regex = new RegExp("(<=\\s|\\b)" + foilText);
          } else if (foilText.slice(-1).match(format) !== null && foilText.slice(0, 1).match(/[a-z0-9]/i) !== null) {
            regex = new RegExp("\\b" + foilText, "");
          } else if ((foilText.slice(-1).match(format) !== null || foilText.endsWith("QEST_MARK", foilText.length)) && foilText.slice(0, 1).match(/[a-z0-9]/i) === null) {
            //RegX below is used if the starting letter is any special character.
            regex = new RegExp("(?=[]\\b|\\W)" + foilText + "(?=[]\\b|\\s|$)");
          }
          else {
            regex = new RegExp("\\b" + foilText + "\\b", "");
          }

          passageContent = passageContent.replace(
            regex,
            buildDataForHighlight(content.foils[i].foilId, foilText)
          );
          passageContent = passageContent.replace(/QEST_MARK/gi, "?");

        } else if (
          content.foils[i].foilText !== "" &&
          content.foils[i].foilText !== "-" &&
          content.selectionType === WHOLE_WORDS
        ) { // This logic will execute for make the correct response with selectable for Word
          let regex = "";
          let foilText = HTMLEncode(content.foils[i].foilText);
          foilText = escapeRegExp(foilText);

          passageContent = passageContent.replace(/\?/gi, "@QEST_MARK");
          foilText = foilText.replace(/\?/gi, "@QEST_MARK");

          if (
            foilText.slice(-1) !== "." &&
            foilText.slice(-1).match(/[a-z]/i) === null &&
            foilText.slice((foilText.length - 1), 1).match(/[a-z0-9]/i) !== null &&
            foilText.slice(0, 1).match(/[a-z0-9]/i) !== null
          ) {
            regex = new RegExp("(<=\\s|\\b)" + foilText + "(?=[]\\b|\\s|$)");

          } else if (foilText.slice(-1) !== "." &&
            foilText.slice(-1).match(/[a-z]/i) === null &&
            foilText.slice((foilText.length - 1), 1).match(/[a-z0-9]/i) === null &&
            foilText.slice(0, 1).match(/[a-z0-9]/i) !== null) {

            regex = new RegExp("(<=\\s|\\b)" + foilText);

          } else if (foilText.slice(0, 1).match(/[a-z0-9]/i) === null) {
            regex = new RegExp("(?=[]\\b|\\W)" + foilText + "(?=[]\\b|\\s|$)");
          } else if (foilText.slice(-1) === ".") {
            regex = new RegExp("\\b" + foilText, "");
          } else {
            regex = new RegExp("\\b" + foilText + "\\b", "");
          }

          //Parsing the passage content to check the styles added, which will not be with the foilText
          const parser = new DOMParser();
          const doc = parser.parseFromString(
            content.passageContent,
            "text/html"
          );

          let pNodelist = doc.querySelectorAll("p");
          let fullFoilText = "";
          let pArray = [];
          for (let i = 0; i < pNodelist.length; i++) {
            if (fullFoilText.length < 1) {
              fullFoilText = pNodelist[i].innerHTML;
              pArray.push(0);
              pArray.push(fullFoilText.split(" ").length);
            } else {
              fullFoilText = fullFoilText + " " + pNodelist[i].innerHTML;
              pArray.push(fullFoilText.split(" ").length);
            }
          }
          fullFoilText = fullFoilText.replace(/\?/gi, "@QEST_MARK");

          let newFoilText = fullFoilText.split(" ");
          let currentIndexText = newFoilText[i];
          // eslint-disable-next-line
          let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.\/?~]/;
          let symbol = "";
          //Below logic is used to neglect if the last character is punctuation for Word splitting.
          if (currentIndexText !== undefined && currentIndexText.slice(-1).match(format) !== null) {
            symbol = " ##" + currentIndexText.slice(-1).match(format);
            passageContent = passageContent.replace(currentIndexText, (currentIndexText.slice(0, currentIndexText.length - 1) + symbol));
            currentIndexText = currentIndexText.slice(0, currentIndexText.length - 1);
          } if (currentIndexText !== undefined && currentIndexText.endsWith("@QEST_MARK", currentIndexText.length)) {
            symbol = " @QEST_MARK";
            passageContent = passageContent.replace(currentIndexText, (currentIndexText.slice(0, currentIndexText.length - 10) + symbol));
            currentIndexText = currentIndexText.slice(0, currentIndexText.length - 10);
          }

          //Logic below is used to created the regx if the starting letter is any special character
          if (currentIndexText !== undefined && foilText !== escapeRegExp(currentIndexText) &&
            currentIndexText.slice(0, 1).match(/[a-z0-9]/i) !== null) {
            regex = new RegExp("(<=\\s|\\b)" + currentIndexText);
            foilText = currentIndexText;
          } else if (currentIndexText !== undefined && currentIndexText.slice(0, 1).match(/[a-z0-9]/i) === null) {
            regex = new RegExp("(?=[]\\b|\\W)" + currentIndexText + "(?=[]\\b|\\s|$)");
            foilText = currentIndexText;
          }


          passageContent = passageContent.replace(
            regex,
            buildDataForHighlight(content.foils[i].foilId, foilText)
          );

          if (symbol !== "") {
            if (symbol === " @QEST_MARK") {
              passageContent = passageContent.replace(" @QEST_MARK", "@QEST_MARK");
            } else {
              passageContent = passageContent.replace(symbol, symbol.slice(-1));
            }
          }
          passageContent = passageContent.replace(/@QEST_MARK/gi, "?");
        } else if (
          content.foils[i].foilText !== "" &&
          content.foils[i].foilText !== "-"
        ) {
          let tempElement = document.createElement("div");
          tempElement.innerHTML = content.passageContent;
          let paragraphElements = tempElement.getElementsByTagName("p");
          if (paragraphElements[i] !== undefined) {
            let classNames = "";

            if (
              showCorrectResponses.responses.includes(
                content.foils[i].foilId
              )
            ) {
              classNames = getOnSelectClassNames();
            }

            classNames =
              classNames +
              classNameForCR.borderOnStart +
              classNameForCR.borderOnHover +
              classNameForCR.highlightHover +
              classNameForCR.highlightStart;
            paragraphElements[i].setAttribute(CLASS, classNames);
            updatedPassageContent =
              updatedPassageContent + paragraphElements[i].outerHTML;
          }
        }
      }
      if (passageContent !== "" && content.selectionType !== WHOLE_PARAGRAPHS) {
        //Regular expression is used for removing all the 'Cb_High_Light' strings from the correct response content
        updatedPassageContent = passageContent.replace(/Cb_High_Light/gi, "");
      }
    } else {
      updatedPassageContent = content.passageContent;
    }
    correctResponseHighlight(updatedPassageContent);
  };
  function escapeRegExp(str) {

    if (str !== undefined && str !== "") {
      // eslint-disable-next-line
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\\\^\$\|]/g, "\\$&");

    }
  }

  const correctResponseHighlight = (updatedPassageContent) => {
    document.getElementById(
      CORRECT_RESPONSE_AREA
    ).innerHTML = updatedPassageContent;

    if (
      content.selectionType === MANUALLY_SELECTED_RESPONSE &&
      content.foils.length > 0
    ) {
      for (let i = 0; i < content.foils.length; i++) {
        let classNames = "";
        if (
          showCorrectResponses.responses.includes(content.foils[i].foilId)
        ) {
          classNames = getOnSelectClassNames();
        }
        classNames =
          classNames +
          classNameForCR.borderOnStart +
          classNameForCR.borderOnHover +
          classNameForCR.highlightHover +
          classNameForCR.highlightStart;

        if (
          document
            .getElementById(CORRECT_RESPONSE_AREA)
            .getElementsByTagName(SELECT_TEXT_TAG)[i] !== undefined
        ) {
          document
            .getElementById(CORRECT_RESPONSE_AREA)
            .getElementsByTagName(SELECT_TEXT_TAG)
          [i].setAttribute(CLASS, classNames);
        }
      }
    }

    let element = document.getElementById(CORRECT_RESPONSE_AREA);

    if (element !== undefined) {
      let elementList = 0;
      let elementName = undefined;
      if (content.selectionType === WHOLE_PARAGRAPHS) {
        elementList = element.querySelectorAll("p").length;
        elementName = "p";
      } else if (content.selectionType === MANUALLY_SELECTED_RESPONSE) {
        elementList = element.querySelectorAll("selecttext").length;
        elementName = "selecttext";
      } else {
        elementList = element.querySelectorAll("span").length;
        elementName = "span";
      }
      for (let i = 0; i < elementList; i++) {
        element.querySelectorAll(elementName)[i].onclick = buildCorrectResponse;
      }
    }
  };

  //Common method to set the html element for highlighting
  const buildDataForHighlight = (foilId, foilText) => {
    let classNames = "";
    if (showCorrectResponses.responses.includes(foilId)) {
      classNames = getOnSelectClassNames();
    }
    let spanElement = document.createElement("span");
    spanElement.setAttribute("id", foilId);
    classNames =
      classNames +
      classNameForCR.borderOnStart +
      classNameForCR.borderOnHover +
      classNameForCR.highlightHover +
      classNameForCR.highlightStart;
    spanElement.setAttribute(CLASS, classNames);
    spanElement.innerHTML = "Cb_High_Light" + foilText;
    return spanElement.outerHTML;
  };

  function HTMLEncode(htmlText) {
    let element = document.createElement("div");
    element.innerText = element.textContent = htmlText;
    htmlText = element.innerHTML;
    return htmlText;
  }

  function getOnSelectClassNames() {
    let classNameForCR = "";

    if (content.highlightOnSelect === ST_YELLOW) {
      classNameForCR = SELECTED_RESPONSE_CLASS;
    } else {
      classNameForCR = " st-selected-response-none";
    }

    if (content.borderOnSelect === ST_RED) {
      if (content.boldedBorderOnSelect === true) {
        classNameForCR = classNameForCR + " st-bold-border-select-red";
      } else {
        classNameForCR = classNameForCR + " st-border-select-red";
      }
    } else if (content.borderOnSelect === ST_BLACK) {
      if (content.boldedBorderOnSelect === true) {
        classNameForCR = classNameForCR + " st-bold-border-select-black";
      } else {
        classNameForCR = classNameForCR + " st-border-select-black";
      }
    }

    return classNameForCR;
  }

  return (
    <>
      <div
        id="correctResponseArea"
        className="st-correct-response"
        data-testid="correct-response-panel"
      />
    </>
  );
};

export default CorrectResponse;
