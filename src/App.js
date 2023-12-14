import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import { About } from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useState } from "react";
function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar></Navbar>
          <Alert alert={alert} />

          <div className="container">
            {/* <Navbar
          title="WordCalci"
          aboutText=" About WordCalci"
          mode={mode}
          toggleMode={toggleMode}
        ></Navbar> */}
            {/* <Alert alert={alert}></Alert> */}
            {/* <div className="container my-3 "> */}
            <Routes>
              <Route exact path="/about" element={<About> </About>}></Route>
              <Route
                exact
                path="/"
                element={<Home showAlert={showAlert}> </Home>}
              ></Route>
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert}></Login>}
              ></Route>
              <Route
                exact
                path="/signup"
                element={<Signup showAlert={showAlert}></Signup>}
              ></Route>
            </Routes>{" "}
            {/* </div> */}
            {/* <About mode={mode}> </About> */}
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
