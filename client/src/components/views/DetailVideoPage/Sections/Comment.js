import React, { useState } from "react";
import { Button, Input } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

const { TextArea } = Input;

function Comment(props) {
  const user = useSelector((state) => state.user);
  const [Comments, setComments] = useState("");

  const handleChange = (e) => {
    setComments(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: Comments,
      writer: user.userData._id,
      postId: props.postId,
    };

    axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        setComments("");
        props.refreshFunction(response.data.result);
      } else {
        alert("Failed to save Comment");
      }
    });
  };

  return (
    <div>
      <br />
      <p style={{ marginTop: "3em" }}>Comments</p>
      <hr />
      {/* Comment Lists  */}
      {console.log(props.CommentLists)}

      {props.CommentLists &&
        props.CommentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment key={index}>
                <SingleComment
                  comment={comment}
                  postId={props.postId}
                  refreshFunction={props.refreshFunction}
                />
                <ReplyComment
                  CommentLists={props.CommentLists}
                  postId={props.postId}
                  parentCommentId={comment._id}
                  refreshFunction={props.refreshFunction}
                />
              </React.Fragment>
            )
        )}

      {/* Root Comment Form */}
      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <TextArea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleChange}
          value={Comments}
          placeholder="write some comments"
        />
        <br />
        <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Comment;
