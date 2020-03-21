import React,{useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment';
import { Card, Avatar, Col, Typography, Row } from 'antd';

const { Title } = Typography;
const { Meta } = Card;

function Subscription(){

    const [subVideo,setsubVideo]= useState([])

    useEffect(() => {

        let variable={userFrom:localStorage.getItem('idKey')}
        
        axios.post('/video/subvideo',variable)
        .then(response=>{
            if(response.data.success){
                console.log(response.data)
                setsubVideo(response.data.subVideo)
            }else{
                alert('구독하는 영상 조회 실패~')
            }
        })

    }, [])
    
    const renderCards2 = subVideo.map((video, index) => {

    return <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <a href={`/videos/${video._id}`} >
                <img style={{ height:'140px' ,width:'230px' }} alt="thumbnail" src={`http://localhost:3299/server/${video.thumbnail}`} />
                </a>
            </div><br />
            <Meta
                avatar={
                    <Avatar  />
                }
                title={video.title}
            />
            <span>업로드한놈:{video.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {video.views}</span>
            - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
        </Col>

    })

    return(

        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > 당신이 구독하는 비디오 </Title>
            <hr />

            <Row gutter={16}>
                {renderCards2}
            </Row>
        </div>

    )

}



export default Subscription
