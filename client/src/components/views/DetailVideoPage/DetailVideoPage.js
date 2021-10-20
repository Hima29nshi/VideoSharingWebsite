import React, { useEffect, useState } from "react";
import { List, Avatar, Typography, Row, Col } from "antd";
import axios from "axios";
import SideVideo from "./Sections/SideVideo";
import CSubscriber from "./Sections/CSubscriber";
import Comment from "./Sections/Comment";
import LikeDislikes from "./Sections/LikeDislikes";

const { Title } = Typography;

function DetailVideoPage(props) {
  const videoId = props.match.params.videoId;
  const [Video, setVideo] = useState([]);
  const [CommentLists, setCommentLists] = useState([]);

  const videoVariable = {
    videoId: videoId,
  };

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };

  useEffect(() => {
    axios.post("/api/video/getVideo", videoVariable).then((response) => {
      if (response.data.success) {
        setVideo(response.data.video);
      } else {
        alert("Failed to get video Info");
      }
    });

    axios.post("/api/comment/getComments", videoVariable).then((response) => {
      if (response.data.success) {
        setCommentLists(response.data.result);
      } else {
        alert("Failed to get video Info");
      }
    });
  }, []);

  if (Video.writer) {
    return (
      <Row>
        <Col lg={18} xs={24}>
          <div
            className="postPage"
            style={{ width: "100%", padding: "3rem 4em" }}
          >
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${Video.filePath}`}
              controls
            ></video>

            <List.Item
              actions={[
                <LikeDislikes
                  video
                  videoId={videoId}
                  userId={localStorage.getItem("userId")}
                />,
                <CSubscriber
                  userTo={Video.writer._id}
                  userFrom={localStorage.getItem("userId")}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                title={<a href="">{Video.title}</a>}
                description={Video.description}
              />
              <div></div>
            </List.Item>
            <Comment
              CommentLists={CommentLists}
              postId={Video._id}
              refreshFunction={updateComment}
            />
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <Title level={2}>Recommended</Title>
          <hr />
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default DetailVideoPage;
