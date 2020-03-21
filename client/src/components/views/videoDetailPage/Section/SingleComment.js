import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useSelector} from 'react-redux';
import {Comment, Button, Input} from 'antd';


function SingleComment(props){
    const user = useSelector(state=>state.user)

    const [openReply, setopenReply]= useState(false)
    const [commentValue, setcommentValue] = useState("")

    const onClickReply = ()=>{
        setopenReply(!openReply)
    }

    const onSubmit = (event)=>{
        event.preventDefault();
        const variable = {
            content:commentValue,
            writer:user.userData._id,
            postId:props.postId,
            responseTo: props.comment._id
        }

        axios.post('/comment/save',variable)
        .then(response=>{
            if(response.data.success){
                setcommentValue("")
                setopenReply(false)
                props.refreshFunction(response.data.result)
            }else{
                alert('댓글저장실패')
            }
        })
    }

    const actions =[
        <span onClick={onClickReply} key="comment-basic-reply-to">댓글달기</span>
    ]

    const onHandleChange = (event)=>{
        setcommentValue(event.currentTarget.value)
    }

return(
    <div>
        <Comment
        actions={actions}
        author={props.comment.writer.name}
        content= {<p>{props.comment.content}</p>}
        ></Comment>

        {openReply&&
        
        <form style={{display:'flex'}} onSubmit={onSubmit}>
                <textarea
                style={{width:'100%',borderRadius:'5px'}}
                onChange={onHandleChange}
                value={commentValue}
                placeholder='대댓글은 여기!'
                />
            <br/>
            <button style={{width:'20%', height:'52px'}} onClick={onSubmit}>등록</button>
            </form>
        }


    </div>
)

}

export default SingleComment