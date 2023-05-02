import React, { useState, useEffect } from "react";
// import Http from './api';
import axios from 'axios';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const { REACT_APP_AWS_TOKEN, REACT_APP_AWS_S3_URL, REACT_APP_AWS_S3_BUCKET } = process.env;

const UploadAndDisplayImage = (props) => {

  const [fileSelected, setFileSelected] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [awsImage, setAwsImage] = useState(null);
  // const [response, setResponse] = useState(null);

  const resetFileInput = () => {
    // resetting the input value
    // inputRef.current.value = null;
    setSelectedImage(null);
    setDisplayImage(null);
    setFileSelected(false);
  };

  function cleanLocalData(){
    setSelectedImage(null);
    setDisplayImage(null);
    setAwsImage(null);
    setFileSelected(false);
    resetFileInput();
  }

  useEffect(() => {
    // console.log("uploadFile clean:");
    if (props.clean) {
      console.log(props.clean);
      cleanLocalData();
      props.handelClean(false);
    }
    
    
  }, [props.clean]);

  const sendImage = async() => {
    const res = await axios( {
        method: 'put',
        url: REACT_APP_AWS_S3_URL + "/" + REACT_APP_AWS_S3_BUCKET + "/" + awsImage,
        data: selectedImage,
        headers: { 
            'Content-Type': 'multipart/form-data',
            'x-api-key': REACT_APP_AWS_TOKEN,
        },
    });
    // setResponse(res.status);
    // console.log(res.status);
    if(res.status === 200){
      props.handelUploadYn(true);
    }
  };
  

  function makeImageName(event){
    const image = event.target.files[0];
    if (!image) {
      alert("이미지를 업로드해주세요!");
      cleanLocalData();
      return false;
    }

    if (!image.name.match(/\.(jpg|jpeg|png)$/)) {
      alert("파일 형식이 jpg/jpeg/png가 아닙니다.");
      cleanLocalData();
      return false;
    }

    // console.log(event.target.files[0]);// FIXME: remove this
    setSelectedImage(image);
    setDisplayImage(image);
    setFileSelected(true);

    // make image name
    var today = new Date();
    var name = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() 
    + "_" + today.getHours() + '-' + today.getMinutes() + '-' + today.getSeconds()
    + "-" + today.getMilliseconds() + "_" + event.target.files[0].name;
    // console.log(name); // FIXME: remove this
    setAwsImage(name);
  }

  function handleSubmit(e){
    e.preventDefault();

    // alert(awsImage);
    props.handelImageName(awsImage);

    const formData = new FormData();
    formData.append('file',selectedImage);

    sendImage();
    setDisplayImage(null);
    setFileSelected(true);
  }

  return (
    <div>
      {!fileSelected && ( 
        <div>
          <input
          accept="image/*"
          type="file"
          name="myImage"
          onChange={makeImageName}
        />
        <br />
        <br />
        </div>
      )}
      
      {selectedImage && (
        <div>
          <img
            alt="not found"
            width={"255px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
        </div>
      )}

      {displayImage && (
        <div>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" >
            <Button variant="contained"
                onClick={resetFileInput}>
                    Select Other</Button>
            <Button variant="contained"
                onClick={handleSubmit}>
                    Show Result</Button>
            </Stack>
        </div>
      )}
     
    </div>
  );
};

export default UploadAndDisplayImage;