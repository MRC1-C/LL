import React, { useEffect, useState } from 'react';
import PostItem from '../../components/PostItem';
import styled from 'styled-components';
import { getRequest } from '../../services/BaseAPI';
import { Spin } from 'antd';

const StyleHome = styled.div`
  max-width: 60vw;
  margin: 0 auto;
  min-height: 100vh;
`

export default function Home() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      await getRequest("/posts")
        .then(data => { setPosts(data); setLoading(false) })
        .catch(err => console.log(err))
    }
    getData()
  }, [])
  return <Spin spinning={loading}>
    <StyleHome>
      {
        posts && posts.map(post =>
          <PostItem
            setPosts={setPosts}
            key={post?._id}
            id={post?._id}
            title={post?.title}
            content={post?.content}
            author={post?.author}
            date={post?.createdAt}
            like={post?.like}
            comment={post?.comment}
            tags={post?.tags}
          />
        )
      }
    </StyleHome>
  </Spin>
}
