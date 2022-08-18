import { Divider, Input, Button, AutoComplete, message, Spin } from "antd";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getRequest, patchRequest } from "../../services/BaseAPI";

const CreatePosstStyle = styled.div`
  background-color: white;
  border-radius: 5px;
  min-height: calc(100vh - 80px);
  padding: 20px;
  margin: 5px 10px;
  padding-bottom: 50px;
  max-width: 60vw;
  margin: 10px auto;
`;

export default function EditPost(props: any) {
    const [tags, setTags] = useState<any>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false)

    const { id } = useParams()
    useEffect(() => {
        setLoading(true)
        const getPost = async () => {
            await getRequest("/posts/" + id)
                .then((data) => {
                    setTitle(data.title);
                    setTags(data.tags);
                    setContent(data.content);
                    setLoading(false)
                })
                .catch((err) => console.log(err));
        };
        getPost();
    }, [id]);

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
        let editPost = {
            title: title,
            content: content,
            tags: tags,
        };
        await patchRequest("/posts/" + id, editPost)
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
                    Edit Post
                </Button>
            </CreatePosstStyle>
        </Spin>

    );
}
