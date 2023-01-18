import React from 'react'
import Dropzone from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from 'state'
import {BsImage, BsFilm, BsSoundwave} from 'react-icons/bs'


export default function UserPostWidget({picturePath}) {

    const dispatch = useDispatch()
    const [isImage, setIsImage] = React.useState(false)
    const [image, setImage] = React.useState(null)
    const [post, setPost] = React.useState("")
    const {_id, location} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token)

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        formData.append("location", location)
        if (image) {
          formData.append("picture", image);
          formData.append("picturePath", image.name);
        }
    
        const response = await fetch(`http://localhost:5000/posts`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setImage(null);
        setPost("");
      };
  return (
    <div className='new-user-post'>
        <div className='write'>
            <img src={`http://localhost:5000/assets/${picturePath}`} alt=""/>
            <input placeholder="What's on your mind..." onChange={(e) => setPost(e.target.value)} value={post} />
        </div>
        <div className='drop-box'>
            {isImage && 
            <Dropzone onDrop={acceptedFiles => setImage(acceptedFiles[0])}>
                {({getRootProps, getInputProps}) => (
                <section>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {!image ? <p>Add an image</p> : <p>{image.name}</p>}
                </div>
                </section>
                )}
            </Dropzone> }
        </div>
        <div className='buttons'>
            <BsImage size={30} onClick={() => setIsImage(!isImage)}/>
            <BsFilm size={30}/>
            <BsSoundwave size={30}/>
            <button disabled={!post} onClick={handlePost}> POST</button>
        </div>
        
    </div>
    

  )
}
