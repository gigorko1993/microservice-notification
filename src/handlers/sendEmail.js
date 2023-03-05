const AWS = require('aws-sdk');

const ses = new AWS.SES({ region: 'eu-west-1' });

const handler = async (event, context) => {
  const params = {
    Source: 'gigorko35@gmail.com',
    Destination: {
      ToAddresses: ['gigorko35@gmail.com'],
    },
    Message: {
      Body: {
        Text: {
          Data: 'Hello from auction service'
        }
      },
      Subject: {
        Data: 'Test email from auction'
      }
    }
  }
  try {
    const result = await ses.sendEmail(params).promise();
    console.oog("result: ", result);
    return result
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  handler
}


