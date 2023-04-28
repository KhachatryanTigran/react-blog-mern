import React, { useEffect, useState } from "react";
import EditorComponent from "../components/editor/Editor";
import MultilineTextFields from "../UI/TextField";
import Tags from "../UI/Autocomplete";
import Button from "@mui/material/Button";
import { NavLink, Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import s from "./AddPost.module.scss";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import axios from "axios";

const AddPost = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.data);
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [text, setText] = useState("");

  const [isLoading, setLoading] = React.useState(false);
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);

      const { data } = await axios.post("/uploads", formData, {
        headers: { Authorization: `Bearer ${isAuth.token}` },
      });
      setFile(data.url);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async () => {
    try {
      const post = {
        title,
        tags,
        text,
        imageUrl: file,
      };

      // const { data } = await axios.post("/posts", post, {
      //   headers: { Authorization: `Bearer ${isAuth.token}` },
      // });

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, post, {
            headers: { Authorization: `Bearer ${isAuth.token}` },
          })
        : await axios.post("/posts", post, {
            headers: { Authorization: `Bearer ${isAuth.token}` },
          });

      const _id = isEditing ? id : data._id;

      navigate(`/posts/${_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setFile(data.imageUrl);
          setTags(data.tags);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  // if (!isAuth) {
  //   return <Navigate to="/" />;
  // }
  return (
    <div>
      <div className={s.upload}>
        <Button variant="contained" component="label">
          Upload photo
          <input
            type="file"
            hidden
            onChange={(e) => {
              handleChangeFile(e);
            }}
          />
        </Button>

        {file && (
          <div className={s.image_block}>
            <Button
              variant="contained"
              color="error"
              onClick={() => setFile("")}
            >
              Remove
            </Button>
            <img
              src={`${process.env.REACT_APP_API_URL}${file}`}
              className={s.image}
            />
          </div>
        )}
      </div>
      <MultilineTextFields value={title} onChange={setTitle} />
      <Tags value={tags} onChange={setTags} />
      <EditorComponent text={text} setText={setText} />

      <div>
        <Button variant="contained" onClick={onSubmit}>
          {isEditing ? "Save" : "Share"}
        </Button>

        <NavLink to="/ " className="">
          <Button>cancel</Button>
        </NavLink>
      </div>
    </div>
  );
};

export default AddPost;
