import { Avatar, Tag, Button } from "antd";
import React from "react";
import styled from "styled-components";
import { HeartOutlined, CommentOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getRequest, postRequest } from "../services/BaseAPI";
import moment from "moment";
const PostItemStyle = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  margin: 5px 10px 10px 10px;
  cursor: pointer;
  &:hover {
    border: 1px solid rgba(0, 0, 255, 0.25);
  }
`;

export default function PostItem(props: any) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/" + props.id);
    };
    const handleLike = async (e: any) => {
        e.stopPropagation()
        await postRequest("/posts/addlike",
            { id: props.id }
        )
            .then(async data => {
                let posts = await getRequest("/posts")
                props.setPosts(posts)
            })
            .catch(err => console.log(err))
    }
    return (
        <PostItemStyle onClick={handleClick}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                    size={35}
                    style={{ marginRight: "10px" }}
                    src="https://getbootstrap.com.vn/blog/wp-content/uploads/2020/02/min-la-ai.jpg"
                >
                    A
                </Avatar>
                <div>
                    <span style={{ fontWeight: "500" }}>{props.author}</span>
                    <br />
                    <span style={{ fontSize: "12px" }}>
                        {moment(props.date).format("MMM Do")}
                    </span>
                </div>
            </div>
            <div style={{ marginLeft: "43px" }}>
                <div>
                    <h1>{props.title}</h1>
                    <div>
                        {props.tags?.map((tag: any) => (
                            <Tag key={tag}>{tag}</Tag>
                        ))}
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginRight: "10px",
                        marginTop: "10px",
                    }}
                >
                    <div style={{ marginLeft: "-12px" }}>
                        <Button type="text" onClick={handleLike}>
                            <HeartOutlined />
                            {props?.like?.length} Like
                        </Button>
                        <Button type="text">
                            <CommentOutlined />
                            {props?.comment?.length} Comment
                        </Button>
                    </div>
                    <Button>Save</Button>
                </div>
            </div>
        </PostItemStyle>
    );
}
