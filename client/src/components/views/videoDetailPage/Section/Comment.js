import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useSelector} from 'react-redux';
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'


function Comment(props){
    const user = useSelector(state=>state.user)
    const [commentValue,setcommentValue]=useState("")
    const videoId = props.postId
    //const videoId = props.match.params.videoId
    //url에서 가져오기
    

    const typing = (e)=>{
        setcommentValue(e.currentTarget.value)
    }

    const onSubmit = (e)=>{
        e.preventDefault();
        const variable = {
            content:commentValue,
            writer:user.userData._id,
            //로컬스토리지 말고 리덕스에서 가져오기
            postId:videoId
        }

        axios.post('/comment/save',variable)
        .then(response=>{
            if(response.data.success){
                setcommentValue("")
                props.refreshFunction(response.data.result)
            }else{
                alert('댓글저장실패')
            }
        })
    }

    return(
        <div>
            <br/>
            <p>댓글</p>
            <hr/>
            {props.commentlist&&props.commentlist.map((key,index)=>(
                (!key.responseTo&&
                    <React.Fragment>
                    <SingleComment refreshFunction={props.refreshFunction} comment={key} postId={props.postId}/>
                    <ReplyComment refreshFunction={props.refreshFunction} parentcommentId={key._id} commentlist={props.commentlist} postId={props.postId}/>
                    </React.Fragment>
                )
    ))}

            <form style={{display:'flex'}} onSubmit={onSubmit}>
                <textarea
                style={{width:'100%',borderRadius:'5px'}}
                onChange={typing}
                value={commentValue}
                placeholder='댓글 여기에 쓰세여'
                />
            <br/>
            <button style={{width:'20%', height:'52px'}} onClick={onSubmit}>등록</button>
            </form>
        </div>
    )
}

export default Comment