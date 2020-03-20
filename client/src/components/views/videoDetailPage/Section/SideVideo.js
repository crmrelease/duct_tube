import React, { useState,useEffect } from 'react';
import axios from 'axios';

function SideVideo(){

    const [sideVideo,setsideVideo]=useState([])

 
    useEffect(()=>{
        axios.get('/video/getVideo')
        .then(response=>{
            if(response.data.success){
                setsideVideo(response.data.videos)
            }else{
                alert('비디오 목록 조회 실패!!! ㅅㄱ')
            }
        })
    },[])


    const sideVideoItem = sideVideo.map(( video, index) => {

       return <div style={{ display: 'flex', marginTop: '1rem', padding: '0 2rem' }}>
        <div style={{ width:'40%', marginRight:'1rem' }}>
            <a href={`/videos/${video._id}`}  style={{ color:'gray' }}>
                <img style={{ width: '100%' }} src={`http://localhost:3299/server/${video.thumbnail}`} alt="thumbnail" style={{height:'100px' ,width:'200px'}} />
            </a>
        </div>

        <div style={{ width:'50%' }}>
            <a href={`/video/${video._id}`} style={{ color:'gray' }}>
                <span style={{ fontSize: '1rem', color: 'black' }}>{video.title}  </span><br />
                <span>{video.writer.name}</span><br />
                <span>{video.views}</span><br />
            </a>
        </div>
    </div>
    })
    return(
        <div>

<React.Fragment>
            <div style={{ marginTop:'3rem' }}></div>
            {sideVideoItem}


        </React.Fragment>
        

        </div>
    )
}

export default SideVideo