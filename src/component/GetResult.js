import React, { useState, useEffect } from "react";

const { REACT_APP_AWS_URL, REACT_APP_AWS_TOKEN, REACT_APP_AWS_S3_URL, REACT_APP_AWS_S3_BUCKET } = process.env;

const GetResult = (props) => {
    const [imageName, setImageName] = useState(props.imageName);
    const [modelResult, setModelResult] = useState(null);

    useEffect(() => {
        console.log("dddd");
    }, [props.imageName])

    return (
        <div>
            {props.imageName}
            {/* {imageName && (
                <div/>
            )} */}
        </div>
      );
  };
  
  export default GetResult;