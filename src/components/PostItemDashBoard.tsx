import { Button } from "antd";
import React from "react";
import { deleteRequest, getRequest } from "../services/BaseAPI";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
export const PostItemDashBordStyle = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  margin: 5px 10px 10px 10px;
`;
export default function PostItemDashBoard(props: any) {
    const navigate = useNavigate();
    const handleDelete = async () => {
        await deleteRequest(`/posts/${props.id}`)
            .then(async () => {
                let posts = await getRequest("/posts/dashboard");
                props.setPosts(posts);
            })
            .catch((err: any) => console.log(err));
    };
    const handleEdit = () => {
        navigate(`/editpost/${props.id}`);
    };
    return (
        <PostItemDashBordStyle style={{ display: "flex" }}>
            <span
                style={{
                    width: "80%",
                    fontSize: "16px",
                    fontWeight: "500",
                    marginLeft: "10px",
                }}
            >
                {props.title}
            </span>
            <div>
                <Button danger onClick={handleDelete}>
                    Delete
                </Button>
                <Button
                    style={{
                        color: "#1890ff",
                        borderColor: "#1890ff",
                        marginLeft: "10px",
                    }}
                    onClick={handleEdit}
                >
                    Edit
                </Button>
            </div>
        </PostItemDashBordStyle>
    );
}
