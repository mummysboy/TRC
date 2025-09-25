const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');

// Use the built-in AWS SDK v3 (no need to configure credentials in Lambda)
const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));
  
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests (for both REST API v1 and HTTP API v2)
  const httpMethod = event.requestContext?.http?.method || event.httpMethod;
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Check if this is a valid POST request
  if (!httpMethod || httpMethod !== 'POST') {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ message: 'Not Found' })
    };
  }

  try {
    // Parse the request body
    const body = JSON.parse(event.body || '{}');
    const { name, age, email, phone, experience, message } = body;

    // Validate required fields
    if (!name || !age || !email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing required fields: name, age, and email are required'
        })
      };
    }

    // Create the item to store in DynamoDB
    const item = {
      id: Date.now().toString(), // Simple ID generation
      name,
      age: parseInt(age),
      email,
      phone: phone || '',
      experience: experience || '',
      message: message || '',
      timestamp: new Date().toISOString(),
      status: 'new' // Track submission status
    };

    // Store in DynamoDB
    const command = new PutCommand({
      TableName: process.env.DYNAMODB_TABLE || 'trc-rugby-club-form-submissions-dev',
      Item: item
    });

    await dynamodb.send(command);

    // Return success response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Form submitted successfully',
        id: item.id
      })
    };

  } catch (error) {
    console.error('Error processing form submission:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
};
