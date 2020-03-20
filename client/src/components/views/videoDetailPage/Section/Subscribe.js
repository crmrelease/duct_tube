import React, { useState,useEffect } from 'react';
import axios from 'axios';

function Subscribe(props){

    const [subscribeNumber,setsubscribeNumber]=useState(0)
    const [subscribedStatus,setsubscribedStatus]=useState(false)

    useEffect(() => {
        let variable={userTo:props.userTo}

        axios.post('/subscribe/number',variable)
        .then(response=>{
            if(response.data.success){
                console.log(response.data)
                setsubscribeNumber(response.data.subscribeNumber)
            }else{
                alert('구독자 수 로딩 실패!')
            }
        })

        let variable_my={userTo:props.userTo, userFrom:localStorage.getItem('userId')}

        axios.post('/subscribe/mystatus',variable_my)
        .then(response=>{
            if(response.data.success){
                console.log(response.data)
                setsubscribedStatus(response.data.subscribedStatus)
            }else{
                alert('정보 ㄴㄴ!')
            }
                })
    }, [])

    const onSubscribe=()=>{

    }

    return(
        <div>
            <button style={{
                backgroundColor: `${subscribeNumber ? '#AAAAAA' : '#CC0000'}`,
                borderRadius: '4px', color: 'white',
                padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }} onClick={onSubscribe} >
             {subscribeNumber} {subscribedStatus ? '구독중' : '구독하실?'}
            </button>
        </div>
    )

}
    export default Subscribe