import React from 'react'
import {useSelector} from 'react-redux';
import {Card} from 'antd'
import { Avatar, Col, Row, List } from 'antd';


function ProfilePage(){
    const email = localStorage.getItem('email')
    const name = localStorage.getItem('name')
    
return(
    <Row gutter={[16,16]}>
                <Col lg={18} xs={24}></Col>
    <div className="site-card-border-less-wrapper" style={{width:'100%', padding:"3rem 4rem"}}>
    <a stlye={{fontSize:'14px', margin:0, color:'red'}}>프로필</a>
    <Card title={name} bordered={false} style={{ width: 300 }}>
      <p>{email}</p>
    </Card>
  </div>
  </Row>

)

}


export default ProfilePage
