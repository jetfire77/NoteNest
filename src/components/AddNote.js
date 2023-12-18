import React, { useState } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export const AddNote = (props) => {
  const context = useContext(noteContext);

  const { addNote } = context;

  // using useState hook
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault(); // taki page reload na ho
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
    props.showAlert("Added Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); //... is spread operator  ...note mean jo bhi value is note object mein hai vo toh rahey  lekin but jo propery agey likhi ja rahi hai unko add ya overwrite kardeyna
  };
  return (
    <div className="container my-3">
      <h1 class="display-5 text-center "> Add a Note </h1>

      <div className="row">
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <form className="container my-3">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                aria-describedby="emailHelp"
                value={note.title}
                onChange={onChange}
                minLength={5}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={note.description}
                onChange={onChange}
                minLength={5}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
                type="text"
                className="form-control"
                id="tag"
                name="tag"
                value={note.tag}
                onChange={onChange}
              />
            </div>

            <button
              disabled={note.title.length < 5 || note.description.length < 5}
              type="submit"
              className="btn btn-primary"
              onClick={handleClick}
            >
              Add Note
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <img
            className="img-fluid awesome"
            src="/pics/addNote.jpg"
            alt="about-awesome"
            width="500"
            height="450"
          />
        </div>
      </div>
    </div>
  );
};
