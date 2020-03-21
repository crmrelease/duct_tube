import React,{useEffect, useState} from 'react'
import axios from 'axios'
import moment from 'moment';
import { Card, Avatar, Col, Typography, Row } from 'antd';

const { Title } = Typography;
const { Meta } = Card;

function LandingPage(props) {
    
    const [videos, setVideos] = useState([])

    const onClickHandler =()=>{
        axios.get('auth/logout').then(response=>{
                console.log(response.data)
                if(response.data.logoutSucess){
                    props.history.push("/login")
                }else{
                    alert('로그아웃이 실패')
                }
        })
    }

    useEffect(()=>{
        axios.get('/video/getVideo')
        .then(response=>{
            if(response.data.success){
                setVideos(response.data.videos)
            }else{
                alert('비디오 목록 조회 실패!!! ㅅㄱ')
            }
        })
    },[])

    //컴마 뒤가 없으면 계속실행, 비어있는괄호면 한번만

    const renderCards = videos.map((video, index) => {

        return <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <a href={`/videos/${video._id}`} >
                <img style={{ height:'140px' ,width:'230px' }} alt="thumbnail" src={`http://localhost:3299/server/${video.thumbnail}`} />
                </a>
            </div><br />
            <Meta
                avatar={
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
            />
            <span>비디오 제공자:{video.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {video.views}</span>
            - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
        </Col>

    })


    return (
        <div>
            <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > 오늘의 추천 비디오(즐감) </Title>
            <hr />

            <Row gutter={16}>
                {renderCards}
            </Row>
        </div>

            <button onClick={onClickHandler}>로그아웃</button>
        </div>
    )
}

export default LandingPage
