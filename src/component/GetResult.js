import React, { useState, useEffect } from "react";
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const { REACT_APP_AWS_URL, REACT_APP_AWS_TOKEN} = process.env;

const GetResult = (props) => {
    const [imageName, setImageName] = useState(props.imageName);
    const [modelResponse, setModelResponse] = useState(null);
    const [modelResponseStatus, setModelResponseStatus] = useState(null);
    const [modelResult, setModelResult] = useState(null);
    const [finalResponse, setFinalResponse] = useState(null);
    const [displayResult, setDisplayResult] = useState(null);
    const [displayColor, setDisplayColor] = useState(null);
    const [dataToSend, setDataToSend] = useState(null);

    const [hpno, setHpno] = useState('');
    const [showRadio, setShowRadio] = useState('');
    const [resultCorrect, setResultCorrect] = useState('');

    function cleanLocalData(){
        setImageName(null);
        setModelResponse(null);
        setModelResponseStatus(null);
        setModelResult(null);
        setFinalResponse(null);
        setDisplayResult(null);
        setDataToSend(null);
        setHpno('');
        setShowRadio('');
        setResultCorrect('');
    }

    const getResult = async() => {
        const res = await axios( {
            method: 'post',
            url: REACT_APP_AWS_URL + '/'+ "modelResult2",
            data: { "image_name": props.imageName },
            headers: { 
                'Content-Type': 'application/json',
                'x-api-key': REACT_APP_AWS_TOKEN,
            },
        });
        setModelResponse(res.data);
        setModelResponseStatus(res.status);
        console.log(res.status);
    };

    const sendData = async() => {
        const res = await axios( {
            method: 'post',
            url: REACT_APP_AWS_URL + '/'+ "insertRDS",
            data: dataToSend,
            headers: { 
                'Content-Type': 'application/json',
                'x-api-key': REACT_APP_AWS_TOKEN,
            },
        });
        // setResponse(res.status);
        console.log(res.status);
        if(res.status === 200){
            setFinalResponse(true);
            cleanLocalData();
            props.cleanup();
        }
        alert("제출해주셔서 감사합니다.\n화면 초기화됩니다.");
      };

    useEffect(() => {
        // console.log(props.uploadImageYn);
        // console.log(props.imageName);
        // send file
        setImageName(props.imageName);
        if (props.uploadImageYn === true) {
            getResult();
            // console.log(modelResponse); // FIXME: remove this
        }
        // console.log("dddd");
       
        
    }, [props.uploadImageYn]);

    useEffect(() => {
        // console.log(modelResponse);
        if(modelResponse !== null){
            const jsonStr = JSON.stringify(modelResponse);
            // console.log('jsonStr: '+jsonStr); // FIXME: remove this
            if (modelResponseStatus === 200) {
                const jsonObj = JSON.parse(jsonStr);
                // console.log(jsonObj.body);
                setModelResult(jsonObj.body);
            }
        }
    }, [modelResponse]);

    useEffect(() => {
        if(modelResult !== null){
            const data = JSON.parse(modelResult);
            // console.log("data: ");
            // console.log(data.result);
            // setResponseBodyResult(data.result);
            if (data.result === 0) {//(unripe:0, overripe:1, ripe:2)
                setDisplayResult("아직 익지 않았습니다!");
                setDisplayColor("#33FF57");
            } else if (data.result === 1) {
                setDisplayResult("너무 익었습니다!");
                setDisplayColor("#D1AB58");
            } else {
                setDisplayResult("딱 먹기좋게 익었습니다!");
                setDisplayColor("#DBFF33");
            }
        }
    }, [modelResult]);

    function handleHpnoChange(e){
        // console.log(e.target.value);
        setHpno(e.target.value);
    }

    function makeDataToSend(resultCode, correct, hpno){
        const parsedData = JSON.parse(modelResult);
        const data = {
            "img_name": parsedData.image_name,
            "result": parsedData.result,
            "stat_unripe": parsedData.stat_unripe,
            "stat_overripe": parsedData.stat_overripe,
            "stat_ripe": parsedData.stat_ripe,
            "correct": correct,
            "result_correct": resultCode,
            "hpno": hpno
        };
        setDataToSend(data);
    }

    useEffect(() => {
        if(dataToSend !== null){
            sendData();
        }
    }, [dataToSend]);

    function handleSuccessClick(e){
        e.preventDefault();
        setShowRadio(false);
        console.log("success 초기화");
        const parsedData = JSON.parse(modelResult);
        makeDataToSend(parsedData.result, 1, hpno);
    }

    function handleErrorClick(e){
        e.preventDefault();

        setShowRadio(true);
    }

    function handleRadio(e){
        // console.log(e.target.value);
        setResultCorrect(e.target.value);
    }

    function sendWrongData(){
        console.log("failure 초기화");
        makeDataToSend(resultCorrect, 2, hpno);
    }

    return (
        <div>
            {/* {props.imageName} */}
            {displayResult &&  (
                <div>
                    <br />
                    <div style={{ backgroundColor: displayColor}}> {/*TODO */}
                        <h4>{displayResult}</h4>
                    </div>
                    
                    <br />
                     아래에 휴대폰 번호 입력 후 결과를 제출해주시면
                     <br /> 
                     격주로 추첨을 통해 소정의 상품을 드립니다!
                     <br /> 
                    <Stack spacing = {1} alignItems="center" justifyContent="center" >
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label="Phone number is ..."
                            value={hpno}
                            onChange={handleHpnoChange}
                        />

                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" >
                        
                            <Button variant="contained" color="success"
                                onClick={handleSuccessClick}>
                                    맞습니다</Button>
                            <Button variant="outlined" color="error"
                                onClick={handleErrorClick}>
                                    틀립니다</Button>
                        </Stack>
                        <br/>
                        {showRadio && (
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group">생각하시는 정답은?</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group"
                                    name="row-radio-buttons-group"
                                    value={resultCorrect}
                                    onChange={handleRadio}
                                >
                                    <FormControlLabel value="0" control={<Radio />} label="안 익음" />
                                    <FormControlLabel value="2" control={<Radio />} label="적당히 익음" />
                                    <FormControlLabel value="1" control={<Radio />} label="너무 익음" />
                                </RadioGroup>
                                <Button variant="outlined"
                                    onClick={sendWrongData}>
                                    오류제보</Button>
                            </FormControl>
                        )}
                    </Stack>
                </div>
            )}
            {}
        </div>
      );
  };
  
  export default GetResult;