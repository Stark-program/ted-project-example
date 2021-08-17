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
    axios
      .post("http://localhost:4000/cors", input, null)
      .then((res) => console.log(res));

    // .then
    // fetch("https://graphql.ted.com", {
    //   method: "POST",

    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    //   body: JSON.stringify({
    //     query: `
    //   query {
    //     video(id:${inputId}) {
    //       title
    //       speakers {
    //         firstName
    //         lastName
    //       }
    //       primaryImageSet {
    //         url
    //       }
    //     }
    //   }
    //   `,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.data.video === null) {
    //       setVideoTitle("Could not find video title");
    //       setVideoSpeaker("Could not find speaker");
    //       setVideoImage("Could not find image");
    //     } else {
    //       setVideoTitle(data.data.video.title);
    //       setVideoSpeaker(
    //         data.data.video.speakers[0].firstName +
    //           " " +
    //           data.data.video.speakers[0].lastName
    //       );
    //       setVideoImage(data.data.video.primaryImageSet[0].url);
    //     }

    //     console.log(data.data.video);
    //     setVideoData(true);
    //   })
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
