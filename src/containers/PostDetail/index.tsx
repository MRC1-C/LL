import React, { useEffect, useState } from "react";
import { Avatar, Button, Divider, Input, Spin, Tag } from "antd";
import moment from "moment";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { getRequest } from "../../services/BaseAPI";
import { useParams } from "react-router-dom";
import CommentItem from "../../components/CommentItem";

const PostDetailStyle = styled.div`
  min-height: calc(100vh - 110px);
  padding: 20px;
  margin: 5px 10px;
  overflow-y: auto;
  background-color: white;
  max-width: 60vw;
  margin: 15px auto;
`;

export const SytleComment = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin-top: 10px;
`

export default function PostDetail() {
    const [post, setPost] = useState<any>();
    const [loading, setLoading] = useState(false)
    const [reply, setReply] = useState("")

    const { id } = useParams()
    useEffect(() => {
        setLoading(true)
        const getPost = async () => {
            await getRequest("/posts/" + id)
                .then((data) => { setPost(data); setLoading(false) })
                .catch((err) => console.log(err));
        };
        getPost();

    }, [id]);
    return (
        <Spin spinning={loading}>
            <PostDetailStyle>
                <div style={{ marginBottom: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                            size={35}
                            style={{ marginRight: "10px" }}
                            src="https://getbootstrap.com.vn/blog/wp-content/uploads/2020/02/min-la-ai.jpg"
                        >
                            A
                        </Avatar>
                        <div>
                            <span style={{ fontWeight: "500" }}>{post?.author}</span>
                            <br />
                            <span style={{ fontSize: "12px" }}>
                                {moment(post?.createdAt).format("MMM Do")}
                            </span>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h1>{post?.title}</h1>
                            <div>
                                {post?.tags?.map((tag: any) => (
                                    <Tag key={tag}>{tag}</Tag>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <ReactMarkdown children={post?.content} />
                </div>
                <Divider />
                <div>
                    <h2>Comment</h2>
                    <SytleComment>
                        <Avatar src="https://getbootstrap.com.vn/blog/wp-content/uploads/2020/02/min-la-ai.jpg" />
                        <div style={{ width: "calc(100% - 80px)" }}>
                            <Input.TextArea value={reply} onChange={(e) => setReply(e.target.value)} autoSize={{ minRows: 4, maxRows: 6 }} />
                            <Button style={{ marginTop: "10px" }} type="primary" onClick={() => console.log(reply)}>Submit</Button>
                        </div>
                    </SytleComment>
                    {post?.comment.length > 0 && post.comment.map((cm: any) => <CommentItem content={cm.content} like={cm.like} reply={cm.reply} />
                    )}
                </div>
            </PostDetailStyle>
        </Spin>
    );
}
