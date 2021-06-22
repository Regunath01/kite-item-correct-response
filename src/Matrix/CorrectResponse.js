/**
 * @file Correct Response component for Matrix Interaction item type 
 * @author Rajaguru
 */
import React, { useEffect } from "react";
import { RadioButton, Checkbox } from "@progress/kendo-react-inputs";
import parse from 'html-react-parser';

const CorrectResponse = ({ content, onUpdate }) => {
  console.log("Test Regu")

  useEffect(() => {
    onUpdate(content);
  }, [content, onUpdate]);

  var columnWidth = 100 / (content.rightoptions.length + 1) + "%"; // Variable used to align the grid 

  //Event handler for build correct response object
  const handleCorrectResponse = (e) => {
    const { name, id, checked, type } = e.target.element.current;
    const response = content.correctResponse;
    if (type === "radio") {
      if (response.length === 0) {
        response.push({
          foilId: name,
          options: id,
        });
      } else {
        for (let i = 0; i < response.length; i++) {
          if (checked === true && response[i].foilId === name) {
            response[i].options = id;
            break;
          } else if (checked === true && i === response.length - 1) {
            response.push({
              foilId: name,
              options: id,
            });
          }
        }
      }
    } else {
      if (response.length === 0) {
        response.push({
          foilId: name,
          options: [id],
        });
      } else {
        for (let i = 0; i < response.length; i++) {
          if (checked === true && response[i].foilId === name) {
            response[i].options.push(id);
            break;
          } else if (checked === false && response[i].foilId === name) {
            if (response[i].options.length === 1) {
              response.splice(i, 1);
              break;
            } else {
              for (let j = 0; j < response[i].options.length; j++) {
                if (response[i].options[j] === id) {
                  response[i].options.splice(j, 1);
                  if (response[i].options.length === 0) {
                    response.splice(i, 1);
                  }
                  break;
                }
              }
              break;
            }
          } else if (checked === true && i === response.length - 1) {
            response.push({
              foilId: name,
              options: [id],
            });
            break;
          }
        }
      }
    }
    onUpdate({ ...content });
  };

    //This method will return the boolen value for foil-id and option-id pair.
    const isCorrectResponse = (foilId, options) => {
      const response = content.correctResponse;
      if (response.length > 0) {
        for (let i = 0; i < response.length; i++) {
          if (
            response[i].foilId === foilId &&
            response[i].options.includes(options)
          ) {
            return true;
          }
        }
      }
      return false;
    };

  return (
    <div>
      <div className="scroll-bar">
        <table className="table table-bordered" data-testid="correctresponse-table">
          <tbody>
            {content.leftoptions.map(({ index, id, textHtml }) => (
              <tr id={"cr-" + id}>
                {index === 0 && (
                 <>
                    <th style={{ width: columnWidth }}>
                      <div id={id}>{parse(textHtml)}</div>
                    </th>
                    {content.rightoptions.map(({ id, textHtml }) => (
                      <th style={{ width: columnWidth }} id="table-alignment">
                        <div id={id}>{parse(textHtml)}</div>
                      </th>
                    ))}
                  </>
                )}
                {index > 0 && (
                  <>
                    <td>
                      <div id={id}>{parse(textHtml)}</div>
                    </td>
                    {content.rightoptions.map(({ id }) => (
                      <td>
                        <div style={{ textAlign: content.alignmentValue }}>
                          {content.multipleChoice === true && (
                            <Checkbox
                              id={id}
                              name={content.leftoptions[index].id}
                              onChange={handleCorrectResponse}
                              checked={isCorrectResponse(
                                content.leftoptions[index].id,
                                id
                              )}
                            />
                          )}
                          {content.multipleChoice === false && (
                            <RadioButton
                              id={id}
                              name={content.leftoptions[index].id}
                              onChange={handleCorrectResponse}
                              checked={isCorrectResponse(
                                content.leftoptions[index].id,
                                id
                              )}
                            />
                          )}
                        </div>
                      </td>
                    ))}
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CorrectResponse;
