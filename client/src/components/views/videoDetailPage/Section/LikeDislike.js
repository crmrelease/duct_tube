import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useSelector} from 'react-redux';
import {Tooltip,Button} from 'antd'

function LikeDislike(props){
    
    const [like, setlike] = useState(0)
    const [likeAction, setlikeAction] = useState(null)
    const [dislike, setdislike] = useState(0)
    const [dislikeAction, setdislikeAction] = useState(null)

    let variable={}

    if(props.video){
        variable ={videoId:props.videoId , userId:props.userId}
    }
        else{
        variable ={commentId:props.commentId , userId:props.userId}
        }
    

    useEffect(() => {
        axios.post('/like/getlike',variable)
        .then(response=>{
            if(response.data.success){
                setlike(response.data.likeInfo.length)
                response.data.likeInfo.map((key,index)=>{
                    if(key.userId===props.userId){
                        setlikeAction('liked')
                    }
                })
            }else{
                alert('라이크 정보 못가져왔음')
            }
        })

        axios.post('/like/getdislike',variable)
        .then(response=>{
            if(response.data.success){
                setdislike(response.data.dislikeInfo.length)
                response.data.dislikeInfo.map((key,index)=>{
                    if(key.userId===props.userId){
                        setdislikeAction('disliked')
                    }
                })
            }else{
                alert('디스라이크 정보 못가져왔음')
            }
        })

    },[])

    const onLike=()=>{

        if(likeAction===null){
            axios.post('/like/uplike',variable)
            .then(response=>{
                if(response.data.success){
                    setlike(like+1)
                    setlikeAction('liked')

                    if(dislike!==0){
                        setdislike(dislike-1)
                        setdislikeAction(null)

                    }
                }else{
                    alert('like올리기 실패')
                }
            })
        }else{
            axios.post('/like/downlike',variable)
            .then(response=>{
                if(response.data.success){
                    setlike(like-1)
                    setlikeAction(null)
                }else{
                    alert('like내리기 실패')
                }
            })
        }
        
    }

    const ondisLike=()=>{
        if(dislikeAction===null){
            axios.post('/like/updislike',variable)
            .then(response=>{
                if(response.data.success){
                    setdislike(dislike+1)
                    setdislikeAction('disliked')
    
                    if(like!==0){
                        setlike(like-1)
                        setlikeAction(null)
                    }
                }else{
                    alert('dislike올리기 실패')
                }
            })
        }else{
            axios.post('/like/downdislike',variable)
            .then(response=>{
                if(response.data.success){
                    setdislike(dislike-1)
                    setdislikeAction(null)
                }else{
                    alert('dislike내리기 실패')
                }
            })
        }
    }


return(
    <div>
        <span key="comment-basic-like">
    <Tooltip title="Like">
    <Button 
        type={likeAction==='liked'?'filled':'outlined'}
        theme="liked"
              onClick={onLike}/>
    </Tooltip>
    <span Style={{paddingLeft:'8px', cursor:'auto'}}>{like}</span>
        </span>
        
        <span key="comment-basic-Dislike">
    <Tooltip title="Dislike">
        <Button 
        type={dislikeAction==='disliked'?'filled':'outlined'}
        theme="Disliked"
              onClick={ondisLike}/>
    </Tooltip>
    <span Style={{paddingLeft:'8px', cursor:'auto'}}>{dislike}</span>
        </span>

    </div>
)

}

export default LikeDislike