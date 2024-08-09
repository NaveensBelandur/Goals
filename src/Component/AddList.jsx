import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import NavBar from "./NavBar";

const AddList = ({ heading, title, test }) => {
  const [goal, setGoal] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [success, setSuccess] = useState(false);

  /* Add Your Daily List */
  const [text, setText] = useState("");
  const [editorStateList, setEditorStateList] = useState(
    EditorState.createEmpty()
  );

  const onEditorStateChange = (state) => {
    setEditorState(state);
  };

  const onEditorStateChangeList = (state) => {
    setEditorStateList(state);
  };

  const handleSubmit = async () => {
    if (heading === "Daily List") {
      try {
        const contentState = editorStateList.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        const htmlContent = draftToHtml(rawContentState);

        await addDoc(collection(db, "DailyList"), {
          daily: text,
          text: htmlContent,
          timeStamp: serverTimestamp(),
        });

        setSuccess(true);
        setText("");
        setEditorStateList(EditorState.createEmpty());
      } catch (err) {
        console.error("Error adding document: ", err);
      }
    } else {
      try {
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        const htmlContent = draftToHtml(rawContentState);

        await addDoc(collection(db, "Goals"), {
          goal: goal,
          text: htmlContent,
          timeStamp: serverTimestamp(),
        });
        setSuccess(true);
        setGoal("");
        setEditorState(EditorState.createEmpty());
      } catch (err) {
        console.error("Error adding document: ", err);
      }
    }
  };

  return (
    <>
      {test && <NavBar />}
      <section className="py-4">
        {success && (
          <div className="alert alert-primary" role="alert">
            {heading === "Daily List" ? "Daily List added" : "Goals added"} successfully
          </div>
        )}
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="card">
                <div className="card-header">{heading}</div>
                <div className="card-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="inputPassword5" className="form-label">
                        {title}
                      </label>
                      <input
                        type="text"
                        id="inputPassword5"
                        className="form-control"
                        value={heading === "Daily List" ? text : goal}
                        onChange={
                          heading === "Daily List"
                            ? (e) => setText(e.target.value)
                            : (e) => setGoal(e.target.value)
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <Editor
                        editorState={
                          heading === "Daily List"
                            ? editorStateList
                            : editorState
                        }
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={
                          heading === "Daily List"
                            ? onEditorStateChangeList
                            : onEditorStateChange
                        }
                      />
                    </div>
                  </form>
                  <button
                    className="btn btn-primary w-100"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddList;
