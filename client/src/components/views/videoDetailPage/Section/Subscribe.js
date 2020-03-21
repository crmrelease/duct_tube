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

        let variable_my={userTo:props.userTo, userFrom:localStorage.getItem('idKey')}

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
        let variable ={
            userTo: props.userTo,
            userFrom: props.userFrom
        }
        if(subscribedStatus){
            axios.post('/subscribe/subscribing',variable)
            .then(response=>{
                if(response.data.success){
                    setsubscribeNumber(subscribeNumber+1)
                    setsubscribedStatus(!subscribedStatus)
                }else{
                    alert('구독하기 실패')
                }
            })
        }else{
            axios.post('/subscribe/unsubscribing',variable)
            .then(response=>{
                if(response.data.success){
                   setsubscribeNumber(subscribeNumber-1)
                   setsubscribedStatus(!subscribedStatus)
                }else{
                    alert('구독취소하기 실패')
                }
            })
    }}

    return(
        <div>
            <button style={{
                backgroundColor: `${subscribedStatus ?'#CC0000' : '#AAAAAA' }`,
                borderRadius: '4px', color: 'white',
                padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }} onClick={onSubscribe} >
             {subscribeNumber} {subscribedStatus ? '구독하실?' : '구독중'}
            </button>
        </div>
    )

}
    export default Subscribe