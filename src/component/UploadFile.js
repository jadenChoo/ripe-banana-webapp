import React, { useState } from "react";
// import Http from './api';
import axios from 'axios';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const { REACT_APP_AWS_URL, REACT_APP_AWS_TOKEN, REACT_APP_AWS_S3_URL, REACT_APP_AWS_S3_BUCKET } = process.env;

const UploadAndDisplayImage = (props) => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [awsImage, setAwsImage] = useState(null);

  function makeImageName(event){
    console.log(event.target.files[0]);// FIXME: remove this
    setSelectedImage(event.target.files[0]);

    // make image name
    var today = new Date();
    var name = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() 
    + "_" + today.getHours() + '-' + today.getMinutes() + '-' + today.getSeconds()
    + "-" + today.getMilliseconds() + "_" + event.target.files[0].name;
    console.log(name); // FIXME: remove this
    setAwsImage(name);
  }

  function handleSubmit(e){
    e.preventDefault();

    alert(awsImage);
    props.handelImageName(awsImage);

    // send file // TODO
    // const formData = new FormData();
    // formData.append('file',selectedImage);

    // const response = axios( {
    //     method: 'put',
    //     url: REACT_APP_AWS_S3_URL + "/" + REACT_APP_AWS_S3_BUCKET + "/" + awsImage,
    //     data: selectedImage,
    //     headers: { 
    //         'Content-Type': 'multipart/form-data',
    //         'x-api-key': REACT_APP_AWS_TOKEN,
    //     },
    // });

    // console.log(response); // FIXME: remove this
  }

  return (
    <div>
        <input
        type="file"
        name="myImage"
        onChange={makeImageName}
      />
      <br />
      <br />

      {selectedImage && (
        <div>
          <img
            alt="not found"
            width={"255px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" >
            <Button variant="contained"
                onClick={() => setSelectedImage(null)}>
                    Remove</Button>
            <Button variant="contained"
                onClick={handleSubmit}>
                    Send</Button>
            </Stack>
        </div>
      )}
     
    </div>
  );
};

export default UploadAndDisplayImage;