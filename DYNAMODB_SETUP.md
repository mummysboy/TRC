# DynamoDB Setup Guide for Tenderloin Youth Rugby Club

## Prerequisites

1. **AWS Account**: You need an AWS account with appropriate permissions
2. **AWS CLI**: Install and configure AWS CLI
3. **Node.js**: Version 18.x or higher

## Setup Instructions

### 1. AWS Configuration

First, configure your AWS credentials:

```bash
aws configure
```

Enter your:
- AWS Access Key ID
- AWS Secret Access Key  
- Default region (e.g., `us-west-2`)
- Default output format (`json`)

### 2. Environment Variables

Create a `.env` file in the root directory:

```bash
cp env.example .env
```

Edit `.env` with your AWS credentials:

```env
# React App Environment Variables (must start with REACT_APP_)
REACT_APP_API_ENDPOINT=https://your-api-id.execute-api.us-west-2.amazonaws.com/dev

# Server-side AWS Configuration (for serverless deployment)
AWS_REGION=us-west-2
AWS_ACCESS_KEY_ID=your_actual_access_key
AWS_SECRET_ACCESS_KEY=your_actual_secret_key
DYNAMODB_TABLE=TRC-FormSubmissions
```

### 3. Deploy the API

Deploy the serverless function to AWS:

```bash
npm run deploy:api
```

This will:
- Create a DynamoDB table for form submissions
- Deploy the Lambda function
- Provide you with the API endpoint

### 4. Update React App

After deployment, update your React app's environment:

Update your `.env` file with the actual API endpoint:

```env
REACT_APP_API_ENDPOINT=https://your-api-id.execute-api.us-west-2.amazonaws.com/dev
```

Replace `your-api-id` with the actual API Gateway ID from the deployment output.

**Important**: Only variables starting with `REACT_APP_` are accessible in the React app. The AWS credentials are only used server-side by the Lambda function.

### 5. Local Development

To test locally with DynamoDB:

```bash
# Start the serverless offline
npm run deploy:offline

# In another terminal, start the React app
npm start
```

The API will be available at `http://localhost:3001/dev/submit-form`

## DynamoDB Table Structure

The form submissions are stored in DynamoDB with the following structure:

```json
{
  "id": "1703123456789",
  "name": "John Doe",
  "age": 15,
  "email": "john@example.com",
  "phone": "+1234567890",
  "experience": "beginner",
  "message": "I'm interested in joining the team",
  "timestamp": "2023-12-21T10:30:00.000Z",
  "status": "new"
}
```

## Available Scripts

- `npm run deploy:api` - Deploy the API to AWS
- `npm run deploy:offline` - Run API locally for development
- `npm run deploy:remove` - Remove the deployed API and DynamoDB table

## Security Notes

- **Never commit your `.env` file to version control**
- **React Environment Variables**: Only variables starting with `REACT_APP_` are exposed to the browser - never put sensitive credentials here
- **AWS Credentials**: These are only used server-side by the Lambda function and should never be in React environment variables
- Use IAM roles with minimal required permissions
- Consider using AWS Secrets Manager for production
- The API endpoint is safe to expose in React as it's a public API Gateway URL

## Troubleshooting

### Common Issues

1. **Permission Denied**: Ensure your AWS user has DynamoDB and Lambda permissions
2. **CORS Errors**: The API includes CORS headers, but check your domain configuration
3. **Table Not Found**: Make sure the DynamoDB table was created during deployment

### Monitoring

- Check AWS CloudWatch logs for Lambda function errors
- Monitor DynamoDB metrics in the AWS console
- Use AWS X-Ray for detailed tracing (optional)

## Cost Considerations

- DynamoDB pay-per-request pricing is cost-effective for low to moderate usage
- Lambda has a generous free tier
- API Gateway charges per request

For a youth rugby club with moderate form submissions, costs should be minimal.
