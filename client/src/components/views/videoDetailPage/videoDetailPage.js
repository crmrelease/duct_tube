import React, { useState,useEffect } from 'react';
import { Avatar, Col, Row, List } from 'antd';
import axios from 'axios'
import SideVideo from './Section/SideVideo'
import Subscribe from './Section/Subscribe'
import Comment from './Section/Comment'


function VideoDetailPage(props){

    const videoId = props.match.params.videoId
    const variable = {videoId:videoId}
    const [videoDetailInfo,setvideoDetailInfo]=useState([])
    const [commentAll,setcommentAll]=useState([])

    useEffect(() => {
        axios.post('/video/getVideoInfo',variable)
        .then(response=>{
         if(response.data.success){
            setvideoDetailInfo(response.data.videoDetailInfo)
         }else{
             alert('비디오 소환 실패!!')
         }   
        })

        axios.post('/comment/getAllcomment',variable)
        .then(response=>{
            if(response.data.success){
                setcommentAll(response.data.commentAll)
                console.log(response.data.commentAll)
            }else{
                alert('댓글 소환 실패!!')
            }   
           })
    }, [])

    const refreshFunction =(newComment)=>{
        setcommentAll(commentAll.concat(newComment))
    }

    if(videoDetailInfo.writer){

        const subscribeButton = videoDetailInfo.writer._id !==localStorage.getItem('idKey') &&<Subscribe userTo={videoDetailInfo.writer._id} userFrom={localStorage.getItem('idKey')}/>
        return(
            <Row gutter={[16,16]}>
                <Col lg={18} xs={24}>
                <div style={{width:'100%', padding:"3rem 4rem"}}>
                    <video style={{width:'100%'}} src={`http://localhost:3299/server/${videoDetailInfo.filePath}`} controls/>
                    <List.Item
                    actions={[subscribeButton]}
                    >
                       <List.Item.Meta
                       avatar={<Avatar src={videoDetailInfo.writer.image}/>}
                       title={videoDetailInfo.title}
                       description={videoDetailInfo.description}
                       />
                    <div></div>
                    </List.Item> 
        <Comment refreshFunction={refreshFunction} commentlist={commentAll} postId={videoDetailInfo._id}/>
        </div>
        
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo/>
                </Col>
           </Row>
        )
    }
    else{
        return(
            
            <div>로딩중...</div>
        )
    }
}

export default VideoDetailPage
