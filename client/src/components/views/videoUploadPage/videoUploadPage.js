import React, { useState } from 'react';
import { Typography, Button, Form, message, Input } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import {useSelector} from 'react-redux'

const { Title } = Typography;
const { TextArea } = Input;

const PrivateOption = [
    {value:0,label:"Private"},
    {value:1,label:"Public"}
]


const CategoryOption = [
    {value:0,label:"다미"},
    {value:1,label:"소희"},
    {value:2,label:"승연"},
    {value:3,label:"미나"},
    {value:4,label:"채연"},
]

function VideoUploadPage(props) {
    
    const user = useSelector(state=>state.user);
    const [videoTitle, setVideoTitleTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("다미")
    const [FilePath, setFilePath] = useState("")
    //const [Duration, setDuration] = useState("")
    const [ThumbnailPath, setThumbnailPath] = useState("")

    const onTitleChange =(e)=>{
        setVideoTitleTitle(e.currentTarget.value)
    }
    const onDescription=(e)=>{
        setDescription(e.currentTarget.value)
    }

    const onPrivateChange=(e)=>{
        setPrivate(e.currentTarget.value)
    }

    const onCategoryChange=(e)=>{
        setCategory(e.currentTarget.value)
    }

    const onDrop = (files)=>{
        let formData = new FormData;
        const config = {
            header:{'content-type':'multipart/form-data'}
        }
        formData.append("video_file",files[0])
        console.log(files)
        axios.post('/video/uploadfile',formData,config)
        .then(response=>{
            if(response.data.success){
                let variable={
                    filePath:response.data.filePath,
                    fileName:response.data.fileName,
                }
                setFilePath(response.data.filePath)
            }else{

            }
        })

    }

    
    const onDrop_thumbnail = (files)=>{
        let formData = new FormData;
        const config = {
            header:{'content-type':'multipart/form-data'}
        }
        formData.append("thumbnail_file",files[0])
        console.log(files)
        axios.post('/video/thumbnail',formData,config)
        .then(response=>{
            if(response.data.success){
                let variable={
                    filePath:response.data.filePath,
                    fileName:response.data.fileName,
                }
                setThumbnailPath(response.data.filePath)
                console.log(variable)
            }else{
                console.log(response)
                alert('썸네일업로드 실패!!!')         
            }
        })

    }

    const onSubmit = (event)=>{
        event.preventDefault();

        const variables ={
            writer:user.userData._id ,
            title: videoTitle,
            description: Description,
            privacy:Private,
            filePath:FilePath,
            category:Category,
            //duration:Duration,
            thumbnail:ThumbnailPath,

        }
        axios.post('/video/uploadvideo',variables)
        .then(response=>{
            if(response.data.success){
                alert('동영상이 등록되었습니다! 즐감~')
                setTimeout(()=>{
                    props.history.push('/')
                },1000)
            }else{
                alert('비디오 업로드 실패!!')
            }
        })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} > Upload Video</Title>
            </div>

        <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Dropzone 
                onDrop={onDrop}
                multiple={false}
                maxSize={999999999999}>
                    {({ getRootProps, getInputProps }) => (
                    <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        여기에는 동영상 업로드 하세여
                        (클릭!클릭!)
                        </div>
                        )}
                        </Dropzone>
                        <div>
                <Dropzone 
                onDrop={onDrop_thumbnail}
                multiple={false}
                maxSize={999999999999}>
                    {({ getRootProps, getInputProps }) => (
                    <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        {ThumbnailPath&&<img src={`http://localhost:3299/server/${ThumbnailPath}`} alt="thumbnail" style={{height:'240px' ,width:'300px'}}/>}
                        </div>
                        )}
                        </Dropzone>
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
        <select onChange={onPrivateChange}>

            {PrivateOption.map((item,index)=>(
                <option key={index} value={item.value}>{item.label}</option>
            ))}

            </select>

        <select onChange={onCategoryChange}>
            {CategoryOption.map((item,index)=>(
                <option key={index} value={item.value}>{item.label}</option>
            ))}

        </select>

        <Button type="primary" size="large" onClick={onSubmit}>
            Submit
        </Button>

        </Form>
        </div>
        )
}

export default VideoUploadPage
