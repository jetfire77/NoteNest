import React from "react";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <div>
      <h1 className="display-4 text-center">
        Empowering <span style={{ color: "#7bd3f7" }}> Students</span>{" "}
      </h1>

      <div className="  text-center">
        <div className="note-img">
          <div>
            <p className="px-2">
              A secure hub for creating, editing, and managing your notes
              hassle-free.
            </p>
          </div>
        </div>
      </div>

      <hr />

      <div className="container mt-1 ">
        <div className="row">
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h2 className="mb-3" style={{ fontWeight: "bold" }}>
              Unleashing{" "}
              <span style={{ color: "#7bd3f7" }}>Awesome Creations</span>{" "}
            </h2>
            <p>
              NoteNest was born out of the struggle of jotting down everything
              in a traditional notebook a task that can be quite exhausting.
              That's why we've crafted an online platform where you have the
              freedom to create, edit, upload, and delete your notes and
              information, all in a private and secure environment, free from
              any hassle. Your notes are not bound by location or time; access
              them anywhere in your world, at any time you need. Don't miss out
              on the opportunity to create notes; after all, the act of creating
              is always significant. Experience the convenience and freedom of
              NoteNest!
            </p>
            <div className="d-flex justify-content-center mt-2">
              {/* <a className="btn btn-dark" asp-controller="Book" asp-action="GetAllBooks" asp-route-returnUrl="@Context.Request.Path">Explore Books</a> */}
            </div>
          </div>
          <div className="col-md-6">
            <img
              className="img-fluid awesome"
              src="/pics/aboutUs1.jpg"
              alt="about-awesome"
              width="500"
              height="450"
            />
          </div>
        </div>

        <div className="row login mt-1 mb-1 p-1">
          <div className="col-md-6">
            <img
              className="img-fluid awesome"
              src="/pics/aboutUs2.jpg"
              alt="about-awesome"
              width="500"
              height="450"
            />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h2 className="mb-3" style={{ fontWeight: "bold" }}>
              Journey <span style={{ color: "#7bd3f7" }}> Unveiled</span>{" "}
            </h2>
            <p>
              Our journey began with a straightforward realization: the
              frustration of scribbling down every detail in a traditional
              notebook can be overwhelming. That's when the spark for NoteNest
              ignited. We envisioned a solution—an online platform designed for
              you to effortlessly create, edit, upload, and delete your notes
              and information. All this, in a private and secure space that
              ensures uninterrupted focus. NoteNest emerged from the need for
              simplicity in managing your thoughts and information. Join us on
              this journey of seamless and hassle-free note-taking!
            </p>
            <div className="d-flex justify-content-center mt-3">
              <Link className="btn btn-primary" to="/signup">
                Sign Up
              </Link>

              {/* <Link to="/signup">
        <button>Sign Up</button>
      </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
