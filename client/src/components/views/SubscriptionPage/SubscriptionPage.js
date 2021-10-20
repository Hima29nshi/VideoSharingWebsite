import React, { useEffect, useState } from "react";
import { Card, Avatar, Col, Typography, Row } from "antd";
import axios from "axios";
import moment from "moment";

const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage() {
  const [Videos, setVideos] = useState([]);

  useEffect(() => {
    let variable = { userFrom: localStorage.getItem("userId") };

    axios.post("/api/video/getSubscribedVideos", variable).then((res) => {
      if (res.data.success) {
        setVideos(res.data.videos);
      } else {
        alert("Unable to get Subscribed Videos!");
      }
    });
  }, []);

  const renderCards = Videos.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return (
      <Col
        key={index}
        lg={5}
        md={8}
        xs={24}
        style={{ marginBottom: "2rem", marginRight: "1rem" }}
      >
        <div style={{ position: "relative" }}>
          <a href={`/video/${video._id}`}>
            <img
              src={`http://localhost:5000/${video.thumbnail}`}
              alt={`http://localhost:5000/${video.title}`}
              style={{ width: "100%" }}
            />
            <div
              className="duration"
              style={{
                bottom: 0,
                right: 0,
                position: "absolute",
                margin: "4px",
                color: "#fff",
                backgroundColor: "rgba(17, 17, 17, 0.8)",
                opacity: 0.8,
                padding: "2px 4px",
                borderRadius: "2px",
                letterSpacing: "0.5px",
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: "12px",
              }}
            >
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </a>
        </div>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />}
          title={video.title}
        />
        <span>{video.writer.name}</span>
        <span style={{ marginLeft: "0.5rem" }}>{video.views} views </span>
        <span> &nbsp;{moment(video.createdAt).format("MMM Do YY")}</span>
      </Col>
    );
  });

  return (
    <div style={{ width: "95%", margin: "3rem auto" }}>
      <Title level={2}>Subscribed Channel Videos</Title>
      <hr />
      <Row style={{ marginLeft: "2rem" }}>{renderCards}</Row>
    </div>
  );
}

export default SubscriptionPage;
