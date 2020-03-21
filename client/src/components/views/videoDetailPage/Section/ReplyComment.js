import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useSelector} from 'react-redux';
import {Comment, Button, Input} from 'antd';
import SingleComment from './SingleComment'


function ReplyComment(props){

const [childcommentNumber,setchildcommentNumber]= useState(0)    
const [openReply, setopenReply]= useState(false)

useEffect(() => {
    let commentNumber = 0;
    props.commentlist.map((key)=>{
        if(key.responseTo===props.parentcommentId){
            commentNumber ++
        }
    })
    setchildcommentNumber(commentNumber)
}, [props.commentlist, props.parentcommentId])

let renderReply=(parentcommentId)=>
    //console.log(props.commentlist)
    props.commentlist.map((key,index)=>(
        <React.Fragment>
            {key.responseTo=== parentcommentId&&
                <div style={{width:'80%', marginLeft:'10%'}}>
            <SingleComment refreshFunction={props.refreshFunction} comment={key} postId={props.postId}/>
            <ReplyComment refreshFunction={props.refreshFunction} commentlist={props.commentlist} postId={props.postId} parentcommentId={key._id}/>
              </div>
            }
              </React.Fragment>
    ))


    const onhandlechange =()=>{
        setopenReply(!openReply)
    }

    return(
        <div>
            {childcommentNumber>0&&
            <p stlye={{fontSize:'14px', margin:0, color:'gray'}} onClick={onhandlechange}>
                {childcommentNumber}개의 대댓글이 있습니다!
            </p>}

                {openReply&&renderReply(props.parentcommentId)}
        </div>
    )
}

export default ReplyComment