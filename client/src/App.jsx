import { useState } from "react";
import "./App.css";
import axios from "axios";
import { saveAs } from "file-saver";
function App() {
  // states for input
  const [val, setval] = useState({
    name1: "",
    name2: "",
    name3: "",
  });
  //function for onchange event
  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setval((v) => {
      return { ...v, [name]: value };
    });
  };
  //function on submit event
  const handleSubmit = async () => {
    console.log("submit is fine");
    await axios.post("/pdf", val).then((res) => console.log(res));
    setTimeout(async () => {
      console.log("i will be executed  later");
      await axios.get("/pdfgen", { responseType: "blob" }).then((res) => {
        const pdfblob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfblob, "proposal.pdf");
      });
    }, 3000);

    // await axios
    //   .post("/pdf", val)
    //   .then((res) => {
    //     console.log(res);
    //     axios.get("/pdfgen", { responseType: "blob" });
    //   })
    //   .then((res) => {
    //     const pdfblob = new Blob([res.data], { type: "application/pdf" });
    //     saveAs(pdfblob, "result.pdf");
    //   })
    //   .catch((err) => console.log(err.response));
  };
  return (
    <div className="App">
      a pdf time
      <input
        type="text"
        placeholder="name of student 1"
        name="name1"
        onChange={handlechange}
      />
      <br></br>
      <input
        type="text"
        name="name2"
        placeholder="name of student 2"
        onChange={handlechange}
      />
      <br />
      <input
        type="text"
        name="name3"
        placeholder="name of fstudent 3"
        onChange={handlechange}
      />
      <br />
      <button onClick={handleSubmit}>Generate an download</button>
      <br></br>
      <input type="text" placeholder="mailer" />
      <button
        onClick={async () => {
          await axios
            .post("/mail", { name: "aslam" })
            .then((res) => console.log(res));
        }}
      >
        {" "}
        Send mail
      </button>
    </div>
  );
}

export default App;
