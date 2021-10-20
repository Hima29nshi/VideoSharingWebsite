import React, { useEffect, useState } from "react";
import axios from "axios";

function CSubscriber(props) {
  const userTo = props.userTo;
  const userFrom = props.userFrom;

  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  const onSubscribe = () => {
    let subscribeVar = {
      userTo: userTo,
      userFrom: userFrom,
    };

    if (Subscribed) {
      axios.post("/api/subscribe/unSubscribe", subscribeVar).then((res) => {
        if (res.data.success) {
          setSubscribeNumber(SubscribeNumber - 1);
          setSubscribed(!Subscribed);
        } else {
          alert("Failed to Unsubscribe");
        }
      });
    } else {
      axios.post("/api/subscribe/subscribe", subscribeVar).then((res) => {
        if (res.data.success) {
          setSubscribeNumber(SubscribeNumber + 1);
          setSubscribed(!Subscribed);
        } else {
          alert("Failed to Subscribe");
        }
      });
    }
  };

  useEffect(() => {
    const subscribeNoVar = { userTo: userTo, userFrom: userFrom };
    axios.post("/api/subscribe/subscribeNo", subscribeNoVar).then((res) => {
      if (res.data.success) {
        setSubscribeNumber(res.data.subscribeNo);
      } else {
        alert("Failed to get Subscriber count");
      }
    });

    axios.post("/api/subscribe/subscribed", subscribeNoVar).then((res) => {
      if (res.data.success) {
        setSubscribed(res.data.subscribed);
      } else {
        alert("Failed to get Subscribed info");
      }
    });
  }, []);

  return (
    <div>
      <button
        onClick={onSubscribe}
        style={{
          backgroundColor: `${Subscribed ? "grey" : "red"}`,
          borderRadius: "4px",
          border: "none",
          outline: "none",
          color: "white",
          padding: "7px 16px",
          fontWeight: "700",
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        {SubscribeNumber} {Subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
}

export default CSubscriber;
