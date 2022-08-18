import React, { useState, useEffect } from "react";
import PostItemDashBoard from "../../components/PostItemDashBoard";
import { getRequest } from "../../services/BaseAPI";
import styled from "styled-components";
import { Spin } from "antd";

const DashboardStyle = styled.div`
  min-height: calc(100vh - 100px);
  padding: 20px;
  margin: 5px 10px;
  overflow-y: auto;
  max-width: 60vw;
  margin: 0 auto;
`;

export default function Dashboard() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            await getRequest("/posts/dashboard")
                .then(data => { setPosts(data); setLoading(false) })
                .catch(err => console.log(err))
        };
        getData();

    }, []);
    return (
        <Spin spinning={loading}>

            <DashboardStyle>
                <h1>Posts</h1>
                <div>
                    {posts.map((post) => (
                        <PostItemDashBoard
                            key={post._id}
                            id={post._id}
                            title={post.title}
                            content={post.content}
                            author={post.author}
                            date={post.date}
                            like={post.like}
                            comment={post.comment}
                            tags={post.tags}
                            setPosts={setPosts}
                        />
                    ))}
                </div>
            </DashboardStyle>
        </Spin>
    );
}
