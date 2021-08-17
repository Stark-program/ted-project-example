import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [inputId, setInputId] = useState("");
  const [videoData, setVideoData] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoSpeaker, setVideoSpeaker] = useState("");
  const [videoImage, setVideoImage] = useState("");
  const handleClick = async () => {
    let input = { videoId: inputId };
    console.log(input);
    axios.post("http://localhost:4000/cors", input, null).then((res) => {
      console.log(res);
      if (res.data.data.video === null || res.data.data.video === undefined) {
        setVideoTitle("Could not find video title");
        setVideoSpeaker("Could not find speaker");
        setVideoImage("Could not find image");
      } else {
        setVideoTitle(res.data.data.video.title);
        setVideoSpeaker(
          res.data.data.video.speakers[0].firstName +
            " " +
            res.data.data.video.speakers[0].lastName
        );
        setVideoImage(res.data.data.video.primaryImageSet[0].url);
      }

      // console.log(res.data.data.data.video);
      setVideoData(true);
    });
  };

  const renderInfo = (title, speaker, image) => {
    return (
      <div>
        <div className="title">{`Title of video: ${title}`}</div>
        <div className="speaker">{`Speaker: ${speaker}`}</div>
        <div>
          <img src={image} width="500" height="300" className="image"></img>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className="project-wrapper">
        <div className="content-wrapper">
          <input
            type="number"
            min="0"
            onChange={(e) => setInputId(e.target.value)}
            className="number-input"
          ></input>
          <button onClick={handleClick} className="btn-input">
            click this
          </button>
          {videoData ? renderInfo(videoTitle, videoSpeaker, videoImage) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
