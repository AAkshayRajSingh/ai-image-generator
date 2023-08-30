
import React, { useRef,useState } from 'react'
import './ImageGenerator.css'
import defaultImage from '../Assets/default_image.svg'
const ImageGenerator = ()=> {
    const[image_url,setImage_url]=useState("/");
     let inputRef=useRef(null);
    const imageGenerator = async()=>{
        if(inputRef.current.value===""){
            return 0;
        }
        const response=await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:
                    "Bearer -----------",
                    "User-Agent":"Chrome",
                },
                body:JSON.stringify({
                    prompt:`${inputRef.current.value}`,
                    n:1,
                    size:"512x512",
                }),
            }
        );
        let data = await response.json();
        if (data.data && data.data.length > 0) {
            let data_array = data.data;
            setImage_url(data_array[0].url);
        } else {
            console.log("No image URL found in API response.");
        }

    };
  return (
    <div className='ai-image-generator'>
    <div className="header">
    Ai image <span>generator</span></div>
    <div className="img-loading">
    <img src={image_url==='/'?defaultImage:image_url} alt=""/>   
    </div>
    <div className="search-box">
        <input type="text" ref={inputRef} className='search-input' placeholder='Describe what you want to see'/ >
        <div className="generate-btn" onClick={imageGenerator}>Generate</div>
    </div>
    </div>
  )
}
export default ImageGenerator;
