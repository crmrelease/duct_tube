import React, { useState } from 'react';
import { Typography, Button, Form, message, Input } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const PrivateOption = [
    {value:0,label:"Private"},
    {value:1,label:"Public"}
]


const CategoryOption = [
    {value:0,label:"DaMi"},
    {value:1,label:"SoHee"},
    {value:2,label:"SeungYeon"},
    {value:3,label:"MiNa"},
    {value:4,label:"ChaeYeon"},
]

function VideoUploadPage(props) {

    const [videoTitle, setVideoTitleTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("DaMi")

    const onTitleChange =(e)=>{
        setVideoTitleTitle(e.currentTarget.value)
    }
    const onDescription=(e)=>{
        setDescription(e.currentTarget.value)
    }

    const onCategoryChange=(e)=>{
        setPrivate(e.currentTarget.value)
    }

    const onPrivateChange=(e)=>{
        setCategory(e.currentTarget.value)
    }

    const onDrop = (files)=>{
        let formData = new FormData;
        const config = {
            header:{'content-type':'multipart/form-data'}
        }
        formData.append("file",files[0])
        
        axios.post('/video/uploadfile',formData,config)
        .then(response=>{
            if(response.data.success){
                let variable={
                    url:response.data.url,
                    fileName:response.data.fileName
                }                
                axios.post('/video/thumbnail',variable)
                .then(response=>{
                if(response.data.success){

                }else{
                    alert('썸네일 ㄴㄴ')
                }
                }   
                 )

            }else{
                alert('업로드 실패!!!')         
            }
        })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} > Upload Video</Title>
            </div>

        <Form onSubmit>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Dropzone 
                onDrop={onDrop}
                multiple={false}
                maxSize={999999999999}>
                    {({ getRootProps, getInputProps }) => (
                    <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        여기에 업로드 하세여
                        (클릭!클릭!)
                        </div>
                        )}
                        </Dropzone>
                        <div>
                        <img src alt />
                </div>
                </div>

        <br />
        <br />
        <label>Title</label>
        <Input
            onChange={onTitleChange}
            value={videoTitle}
        />
        <br />
        <br />
        <label>Description</label>
        <TextArea
            onChange={onDescription}
            value={Description}
        />
        <br />
        <br />
        <select onChnage={onCategoryChange}>

            {PrivateOption.map((item,index)=>(
                <option key={index} value={item.value}>{item.label}</option>
            ))}

            </select>

        <select onChnage={onPrivateChange}>
            {CategoryOption.map((item,index)=>(
                <option key={index} value={item.value}>{item.label}</option>
            ))}

        </select>

        <Button type="primary" size="large" onClick>
            Submit
        </Button>

        </Form>
        </div>
        )
}

export default VideoUploadPage
