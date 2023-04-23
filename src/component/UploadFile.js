import React, { useState } from "react";
// import Http from './api';
import axios from 'axios';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const { REACT_APP_AWS_URL, REACT_APP_AWS_TOKEN } = process.env;

const UploadAndDisplayImage = (props) => {

  const { AWS_URL, AWS_TOKEN } = process.env;
  const [selectedImage, setSelectedImage] = useState(null);

  function handleSubmit(e){
    e.preventDefault();

    // make image name
    var today = new Date();
    var name = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() 
    + "_" + today.getHours() + '-' + today.getMinutes() + '-' + today.getSeconds()
    + "-" + today.getMilliseconds() + "_" + selectedImage.name;

    // alert(name);
    props.handelImageName(name);

    // send file
    const formData = new FormData();
    formData.append('files',selectedImage);

    alert(REACT_APP_AWS_URL + 'uploadfile'+'?imagename='+name);

    const response = axios( {
        method: 'post',
        url: REACT_APP_AWS_URL + '/uploadfile'+'?imagename='+name,
        data: formData,
        headers: { 
            'Content-Type': 'multipart/form-data',
            'x-api-key': REACT_APP_AWS_TOKEN,
        },
    });

    console.log(response);

    // const response = axios( {
    //     method: 'post',
    //     url: REACT_APP_AWS_URL + '/uploadfile'+'?imagename='+name,
    //     headers: { 
    //         'Content-Type': 'application/json',
    //         'x-api-key': REACT_APP_AWS_TOKEN,
    //     },
    // });

    // // 👇 Uploading the file using the fetch API to the server
    // fetch(REACT_APP_AWS_URL + 'uploadfile'+'?imagename='+name, {
    //   method: 'POST',
    //   body: selectedImage,
    //   // 👇 Set headers manually for single file upload
    //   headers: {
    //     'content-type': selectedImage.type,
    //     'content-length': `${selectedImage.size}`, // 👈 Headers need to be a string
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.error(err));
  }

  return (
    <div>
        <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
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