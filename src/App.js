import "./App.css";
import { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, useParams } from "react-router-dom";

function App() {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoSpeaker, setVideoSpeaker] = useState("");
  const [videoImage, setVideoImage] = useState("");
  const [error, setError] = useState(false);

  const RenderInfo = () => {
    let { id } = useParams();
    console.log(id);

    axios.post("http://localhost:4000/cors", id, null).then((res) => {
      console.log(res);
      if (res.data.errors) {
        return setError(true);
      }
      if (res.data.data.video === null) {
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
    });
    const thereWasAnError = () => {
      return (
        <div>MAKE SURE TO PUT A NUMBER IN THE URL. EXAMPLE: ...talks/3</div>
      );
    };
    return (
      <div className="content-wrapper">
        <div className="video-title">
          <h1 className="title">{error ? thereWasAnError() : videoTitle}</h1>
        </div>
        <div className="video-speaker">
          <h4 className="speaker">{`${videoSpeaker}`}</h4>
        </div>

        <div className="video-image">
          <img src={videoImage} className="image"></img>
        </div>
      </div>
    );
  };
  return (
    <Router>
      <Route path="/talks/:id">
        <RenderInfo />
      </Route>
    </Router>
  );
}

export default App;
