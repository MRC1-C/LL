import { CommentOutlined, HeartOutlined } from '@ant-design/icons';
import { Avatar, Button, Input } from 'antd';
import React, { useState } from 'react';
import { SytleComment } from '../containers/PostDetail';

export default function CommentItem(props: any) {
    const [reply, setReply] = useState<any>()
    const handleReply = () => {
        if (props.reply.length > 0) {
            if (reply === undefined) {
                let rl = (
                    <>
                        <SytleComment>
                            <Avatar src="https://getbootstrap.com.vn/blog/wp-content/uploads/2020/02/min-la-ai.jpg" />
                            <div style={{ width: "calc(100% - 80px)" }}>
                                <Input.TextArea autoSize={{ minRows: 4, maxRows: 6 }} />
                                <Button style={{ marginTop: "10px" }} type="primary">Submit</Button>
                            </div>
                        </SytleComment>
                        {props.reply.map((rl: any) => <CommentItem content={rl.content} like={rl.like} reply={rl.reply} />)}
                    </>
                )
                setReply(rl)
            }
            else setReply(undefined)
        }
    }
    return <>

        <SytleComment>
            <Avatar src="https://getbootstrap.com.vn/blog/wp-content/uploads/2020/02/min-la-ai.jpg" />
            <div style={{ width: "calc(100% - 80px)", border: "1px solid #d9d9d9", padding: "10px", borderRadius: "5px" }}>
                <p>{props?.content}</p>
                <div>
                    <Button type="text" >
                        <HeartOutlined />
                        {props?.like?.length} Like
                    </Button>
                    <Button type="text" onClick={handleReply}>
                        <CommentOutlined />
                        {props?.reply?.length} Reply
                    </Button>
                </div>
            </div>
        </SytleComment>
        <div style={{ marginLeft: "20px" }}>
            {reply}
        </div>
    </>
}
