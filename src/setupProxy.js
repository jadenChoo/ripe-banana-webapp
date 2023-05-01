// eslint-disable-next-line import/no-extraneous-dependencies
const { createProxyMiddleware } = require('http-proxy-middleware');
const getS3Url = () => {
	return (
		 process.env.REACT_APP_AWS_S3_URL
	);
};
const getApiUrl = () => {
	return (
		 process.env.REACT_APP_AWS_URL
	);
};
const getS3Bucket = () => {
	return (
		 "/"+process.env.REACT_APP_AWS_S3_BUCKET
	);
};
const getAWSKey = () => {
	return (
		 process.env.REACT_APP_AWS_TOKEN
	);
};

const s3target = getS3Url();
const s3bucket = getS3Bucket();
const apitarget = getApiUrl();
const awsKey = getAWSKey();

module.exports = function (app) {
	app.use(
		s3bucket, //proxy가 필요한 path prameter를 입력합니다.
        createProxyMiddleware({
            target: s3target, //타겟이 되는 api url를 입력합니다.
            changeOrigin: true, //대상 서버 구성에 따라 호스트 헤더가 변경되도록 설정하는 부분입니다.
            headers: {
                'x-api-key': awsKey,
              },
        })  
	);
    // app.use(
	// 	"/", //proxy가 필요한 path prameter를 입력합니다.
    //     createProxyMiddleware({
    //         target: apitarget, //타겟이 되는 api url를 입력합니다.
    //         changeOrigin: true, //대상 서버 구성에 따라 호스트 헤더가 변경되도록 설정하는 부분입니다.
    //         headers: {
    //             'x-api-key': awsKey,
    //           },
    //     })  
	// );
};
