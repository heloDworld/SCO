import logo from './logo.svg';
import {useState} from "react";
import './App.css';
import axios from "axios";
import {FormData} from "form-data";
import * as fs from "fs";
const form = new FormData();
form.append('file', fs.readFileSync('audio.mp3'), 'audio.mp3');
form.append('model', 'whisper-1');

function App() {
  const [message, setMessage] = useState('');
  const [res, setResponse] = useState({});
  async function setMsg() {
    let ftch = await axios.get("http://localhost:8080/");
    const res = ftch.data;
    setMessage(res);
  }
  async function aiResponse() {
    const response = await axios.post(
      'https://api.openai.com/v1/audio/transcriptions',
      form,
      {
        headers: {
          ...form.getHeaders(),
          'Authorization': 'Bearer ' + "",
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    setResponse(response.data);
  }
  aiResponse();
  setMsg();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {message}
        </p>
        <span>
          {res}
        </span>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
