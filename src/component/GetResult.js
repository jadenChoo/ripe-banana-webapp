import React, { useState } from "react";

const GetResult = (props) => {
    const [imageName, setImageName] = useState(props.imageName);

    return (
        <div>
            {props.imageName}
            {imageName && (
                <div/>
            )}
        </div>
      );
  };
  
  export default GetResult;