# Job Matching Application

## Overview

The Job Matching Application is an advanced cloud-based system designed to assist both job seekers and recruiters in the employment process. The primary objective of this application is to optimize resumes for job seekers, enhancing their chances of being selected by companies that utilize Applicant Tracking Systems (ATS). Simultaneously, it aids recruiters by streamlining the process of matching job candidates with potential job opportunities.

Leveraging the capabilities of Amazon Web Services (AWS), the application automates the extraction of relevant data from resumes and compares it against job descriptions provided by recruiters. By calculating a matching score, the system provides job seekers with insights into how well their qualifications align with specific job roles and offers guidance on how to improve their resumes for better ATS compatibility. At the same time, recruiters can quickly identify the most suitable candidates for their job postings.

## Features

### For Job Seekers

- **Resume Optimization**: Analyze resumes to provide a matching score against job descriptions, offering suggestions for improving ATS compatibility.
- **Job Application History**: View the history of applications submitted and their respective matching scores.

### For Recruiters

- **Candidate Matching**: Automatically calculate a matching score between job descriptions and candidate resumes to quickly identify the best candidates.
- **Resume Storage and Processing**: Store and manage resumes securely, with automated data extraction and matching.

## Architecture

![Architecture Screenshot](screenshots/architecture_diagram.jpg)

The Job Matching Application is built using a variety of AWS services to deliver a seamless and efficient job matching solution:

1. **Frontend Hosting**: The web application frontend is built using React+Vite and hosted using AWS services configured in the CloudFormation stack.
2. **User Authentication**: Managed by Amazon Cognito, providing secure user sign-up, sign-in, and multi-factor authentication.
3. **API Management**: AWS API Gateway routes requests to the appropriate AWS Lambda functions, ensuring secure and scalable backend communication.
4. **Resume Upload and Processing**: Resumes uploaded by users are stored in AWS S3. AWS Lambda functions are triggered to process resumes using Amazon Textract to extract relevant data.
5. **Data Storage and Matching Score Calculation**: Extracted resume data and job descriptions are stored in AWS DynamoDB. AWS Lambda functions calculate a matching score and store the results in DynamoDB.
6. **Job Application History Retrieval**: AWS Lambda functions allow users to retrieve their job application history and view their matching scores.

## Technology Stack

- **Frontend**: React+Vite (JavaScript), deployed using AWS services as specified in the CloudFormation script.
- **Backend**: AWS Lambda (Node.js), for serverless function execution.
- **Authentication**: Amazon Cognito for secure user management.
- **Database**: AWS DynamoDB for storing job application details and extracted resume data.
- **Storage**: AWS S3 for storing resume files.
- **API Management**: AWS API Gateway for routing requests and managing API interactions.
- **Text Extraction**: Amazon Textract for extracting text from uploaded resumes.

## Setup and Deployment

### Prerequisites

1. **AWS Account**: Required to set up and run the CloudFormation stack.
2. **AWS CLI**: To interact with AWS services from your command line (optional if you prefer using the AWS Management Console).

### Deployment Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/ChristinSaji/Job-Matching-App.git
   cd Job-Matching-App
   ```

2. **Upload Lambda Functions and CloudFormation Script**:

   - Upload the Lambda function `.zip` files to an S3 bucket. Make sure to create the S3 bucket with the name specified in your CloudFormation script or modify the script to match the bucket name you created.
   - Modify the CloudFormation script (`job-matching-cloudformation-stack.yaml`) to reference the correct S3 bucket where the Lambda function `.zip` files are stored.

3. **Review and Modify IAM Roles in CloudFormation Script**:

   - Review the IAM roles defined in the CloudFormation script to ensure they have the necessary permissions for accessing AWS services like S3, DynamoDB, and Textract.
   - If needed, adjust the IAM policies attached to these roles to grant the appropriate permissions. For example, ensure that the Lambda execution role has permissions to access S3, DynamoDB, and other required AWS services.

4. **Deploy the CloudFormation Stack**:

   - You can use the AWS Management Console or AWS CLI to create a CloudFormation stack. To use the AWS CLI, run the following command:

   ```bash
   aws cloudformation create-stack --stack-name JobMatchingAppStack --template-body file://job-matching-cloudformation-stack.yaml --capabilities CAPABILITY_IAM
   ```

   - This command will initiate the deployment based on the configurations provided in the CloudFormation template. The output will display the stack creation progress and any errors if they occur.

5. **Monitor the Deployment**:

   - Monitor the deployment process in the AWS CloudFormation console to ensure all resources are created successfully. The CloudFormation stack will handle the setup of all necessary AWS services, including deploying the frontend application, backend services, and configuring all required permissions and integrations.

6. **Update CloudFormation Stack for Any Changes**:
   - If you make changes to the stack, upload the updated Lambda `.zip` files and modify the CloudFormation template as needed. Then update the stack using the AWS CLI:
   ```bash
   aws cloudformation update-stack --stack-name JobMatchingAppStack --template-body file://job-matching-cloudformation-stack.yaml --capabilities CAPABILITY_IAM
   ```

## Usage

- **Job Seekers**: Upload resumes, receive optimization feedback, and view job application history.
- **Recruiters**: Upload job descriptions, view matched candidates, and manage candidate interactions.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.
