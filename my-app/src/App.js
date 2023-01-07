
import "./App.css";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feed, setFeed] = useState("");
  const [message, setMessage] = useState("");
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:3000/feedback", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          email: email,
          feed:feed,
        }),
      });

  
      let resJson = await res.json();
      console.log(resJson)
      
      if (res.status === 200) {
        setName("");
        setEmail("");
        setFeed("")
      setMessage('Your feedback submitted successfully');
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
    <h1 className="heading">Dear Customer Please provide your valuable feedback</h1>
    <div className="App">
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          required
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={email}
          required
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
        className="feed"
          type="text"
          value={feed}
          required
          placeholder="Feed"
          onChange={(e) => setFeed(e.target.value)}
        />

        <button type="submit">Submit</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
    </div>
  );
}

export default App;