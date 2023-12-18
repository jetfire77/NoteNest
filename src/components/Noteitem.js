import React from "react";
import noteContext from "../context/notes/noteContext";
import { useContext } from "react";

import ReactReadMoreReadLess from "react-read-more-read-less";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context; // destructuring
  const { note, updateNote } = props; // destructuring

  var like = (index) => {
    document.getElementById(index).style.color = "green";
  };

  var dislike = (index) => {
    document.getElementById(index).style.color = "black";
  };

  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const [searchkey, setSearchKey] = React.useState("");

  const handleSearch = (searchkey) => {
    // Get the user's input for the search query (replace with your own logic)
    // const userInput = prompt("Enter your Google search query:");
    const searchString = typeof note.title === "string" ? note.title : "";
    setSearchKey(searchString);
    // setSearchKey(userInput ? userInput : searchkey);

    if (searchString) {
      // Construct the Google search URL and navigate to it
      const searchQuery = encodeURIComponent(searchString);
      window.location.href = `https://www.google.com/search?q=${searchQuery}`;
    }
  };

  return (
    <>
      {
        // <div
        //   className="row"
        //   style={{
        //     backgroundColor: "skyblue",
        //     display: "inline-block",
        //     borderRadius: "5px",
        //   }}
        // >
        <div className="col-md-3">
          <div className="card" style={{ width: "16rem", margin: "10px" }}>
            <div className="card-body">
              {/* <h4 className="card-title text-center">{note.title}</h4> */}
              <h4
                className="card-title display-7 text-center "
                style={{ color: "#F05941" }}
              >
                {" "}
                {capitalize(note.title)}
                {/* {note.title} */}
              </h4>
              {/* <h1 class="display-4 text-center ">Change   <span style="color: #F05941 "> Password</span> </h1> */}
              <hr></hr>

              <h6 className="card-subtitle mb-2 text-muted"> #{note.tag}</h6>

              <p className="card-text">
                <ReactReadMoreReadLess
                  charLimit={25}
                  readMoreText={"Read more ▼"}
                  readLessText={"Read less ▲"}
                >
                  {note.description}
                </ReactReadMoreReadLess>
              </p>
            </div>

            <div className="container-fluid mb-2">
              <hr></hr>
              {/* <button
                  // onClick={() => EditPost(index)}
                  onClick={() => {
                    updateNote(note);
                  }}
                  className="btn btn-primary"
                >
                  Edit
                </button> */}
              <i
                className="fa-regular fa-pen-to-square mx-2"
                style={{ color: "green" }}
                onClick={() => {
                  updateNote(note);
                }}
              ></i>
              &nbsp;&nbsp;
              {/* <button
                  // onClick={() => Delete(index)}
                  onClick={() => {
                    deleteNote(note._id);
                    props.showAlert("Deleted Successfully", "success");
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </button> */}
              <i
                className="fa-solid fa-trash-can mx-2"
                style={{ color: "red" }}
                onClick={() => {
                  deleteNote(note._id);
                  props.showAlert("Deleted Successfully", "success");
                }}
              ></i>
              &nbsp;&nbsp;
              <i
                className="fa fa-thumbs-up mx-2"
                id={note._id}
                onClick={() => like(note._id)}
                style={{ Color: "black" }}
              ></i>
              &nbsp;&nbsp;
              <i
                className="fa fa-thumbs-down mx-2"
                id={note._id}
                onClick={() => dislike(note._id)}
                style={{ Color: "black" }}
              ></i>
              &nbsp;&nbsp;
              <i
                className="fa fa-search mx-2"
                onClick={handleSearch}
                style={{ Color: "black" }}
              ></i>
              {/* <button
                  id={note._id}
                  onClick={() => like(note._id)}
                  className="btn"
                  style={{ backgroundColor: "yellow" }}
                >
                  Like
                </button> */}
            </div>
          </div>
        </div>
        // </div>
      }
    </>
  );

  // return (
  //   <div className="col-md-3">
  //     <div className="card my-3">
  //       <div className="card-body bg-info">
  //         <h5 className="card-title">{note.title}</h5>
  //         <p className="card-text">{note.description}</p>
  //         <i
  //           className="fa-solid fa-trash-can mx-2"
  //           onClick={() => {
  //             deleteNote(note._id);
  //             props.showAlert("Deleted Successfully", "success");
  //           }}
  //         ></i>
  //         <i
  //           className="fa-regular fa-pen-to-square mx-2"
  //           onClick={() => {
  //             updateNote(note);
  //           }}
  //         ></i>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Noteitem;
