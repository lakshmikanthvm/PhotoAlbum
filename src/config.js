const dev = {
    cognito: {
      region: "ap-south-1",
      userPool: "ap-south-1_j3S0wF3n7",
      identityPool: "ap-south-1:5a6fcbf5-0925-44da-b563-14c403e860e5",
      clientId: "1abmnlm3d1ne5tofuqk2o3otg1"
    },
    faceBookAppId: "2261023690890808"
  };

	const prod = {
        cognito: {
            region: "ap-south-1",
            userPool: "ap-south-1_j3S0wF3n7",
            identityPool: "ap-south-1:5a6fcbf5-0925-44da-b563-14c403e860e5",
            clientId: "1abmnlm3d1ne5tofuqk2o3otg1"
          },
          faceBookAppId: "2261023690890808"
  };
  
  const config = (process.env.REACT_APP_STAGE === 'production')
    ? prod
    : dev;
  
  export default {
    // Add common config values here
    // MAX_ATTACHMENT_SIZE: 5000000,
    ...config
  };  