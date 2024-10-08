// /netlify/functions/generate-report.js
exports.handler = async (event, context) => {
  const name = event.queryStringParameters.name || 'User';
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, ${name}! Your report has been generated.`,
    }),
  };
};
