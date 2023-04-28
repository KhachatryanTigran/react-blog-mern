import React from "react";
import Post from "../components/Post";
import Coments from "../components/Coments";
import s from "./FullPost.module.scss";
import MultilineTextFields from "../UI/TextField";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import { useParams } from "react-router";
import axios from "axios";

const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("error");
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} />;
  }

  return (
    <div>
      <div>
        <Post {...data} />
      </div>
      <div className={s.coments_block}>
        <h1>coments</h1>
        <Coments />
        <Coments />
        <Coments />{" "}
        <div className={s.editor_input}>
          <Avatar />
          <MultilineTextFields />
          <Button variant="contained">Send</Button>
        </div>
      </div>
    </div>
  );
};

export default FullPost;
