import { Divider, Input, Button, AutoComplete, message, Spin } from "antd";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { postRequest } from "../../services/BaseAPI";

const CreatePosstStyle = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  padding-bottom: 50px;
  max-width: 60vw;
  margin: 10px auto;
  min-height: calc(100vh - 80px);
`;

export default function CreatePost() {
    const [tags, setTags] = useState<any[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 200)
    }, [])
    const options = [
        {
            value: "#123",
        },
        {
            value: "#456",
        },
        {
            value: "#789",
        },
        {
            value: "#1011",
        },
    ];
    const handleCreatePost = async () => {
        let newPost = {
            title: title,
            content: content,
            date: Date.now(),
            tags: tags,
            like: [],
            comment: [],
        };
        await postRequest("/posts/create", newPost)
            .then((data) => message.success("Succes"))
            .catch((err) => message.error(err));
    };
    return (
        <Spin spinning={loading}>
            <CreatePosstStyle>
                <Input
                    placeholder="New post title here..."
                    style={{ fontSize: "50px", fontWeight: "1000" }}
                    bordered={false}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <AutoComplete
                    dropdownClassName="certain-category-search-dropdown"
                    dropdownMatchSelectWidth={500}
                    style={{ width: "50%" }}
                    value={tags.join(", ")}
                    options={options}
                    onChange={(vl) => !tags.includes(vl) && setTags([...tags, vl])}
                >
                    <Input
                        placeholder="Add up to tags..."
                        bordered={false}
                        onChange={() => setTags(tags)}
                    />
                </AutoComplete>
                <Divider />
                <Input.TextArea
                    placeholder="Write your post content here..."
                    style={{ fontSize: "20px", fontWeight: "400" }}
                    bordered={false}
                    autoSize={{ minRows: 21, maxRows: 21 }}
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                />
                <Button
                    type="primary"
                    style={{ float: "right" }}
                    onClick={handleCreatePost}
                >
                    Post
                </Button>
            </CreatePosstStyle>
        </Spin>
    );
}
