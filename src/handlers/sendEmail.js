const AWS = require('aws-sdk');

const ses = new AWS.SES({ region: 'eu-west-1' });

const handler = async (event, context) => {
  console.log("event: ", event);
  const record = event.Records[0];
  console.log("record: ", record);

  const { subject, body, recipient } = JSON.parse(record.body);

  const params = {
    Source: 'gigorko35@gmail.com',
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        Text: {
          Data: body
        }
      },
      Subject: {
        Data: subject
      }
    }
  }
  try {
    const result = await ses.sendEmail(params).promise();
    console.log("result: ", result);
    return result
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  handler
}


