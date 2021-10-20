import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

function SideVideo() {
  const [SideVideo, setSideVideo] = useState([]);

  useEffect(() => {
    axios.get("/api/video/getVideos").then((res) => {
      if (res.data.success) {
        console.log(res.data.videos);
        setSideVideo(res.data.videos);
      } else {
        alert("Unable to Load Videos!");
      }
    });
  }, []);

  const sideVideoItem = SideVideo.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return (
      <div
        key={index}
        style={{ display: "flex", marginTop: "1rem", padding: "0 2rem" }}
      >
        <div style={{ width: "40%", marginRight: "1rem" }}>
          <a href={`/video/${video._id}`} style={{ color: "gray" }}>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt={`http://localhost:5000/${video.title}`}
            />
          </a>
        </div>

        <div style={{ width: "50%" }}>
          <a href={`/video/${video._id}`} style={{ color: "gray" }}>
            <span style={{ fontSize: "1rem", color: "black" }}>
              {video.title}{" "}
            </span>
            <br />
            <span>{video.writer.name}</span>
            <br />
            <span>{moment(video.createdAt).format("MMM Do YY")}</span>
            <br />
          </a>
        </div>
      </div>
    );
  });

  return <>{sideVideoItem}</>;
}

export default SideVideo;
