import { NextResponse } from 'next/server';
import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' });

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

const bucketName = 'my-bucket';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const transcriptId = searchParams.get('transcriptId');
  
    const queryParams = {
      TableName: 'Comments',
      KeyConditionExpression: 'transcriptId = :id',
      ExpressionAttributeValues: {
        ':id': transcriptId,
      },
    };
  
    try {
      const data = await dynamoDb.query(queryParams).promise();
      return NextResponse.json(data.Items);
    } catch (error) {
      console.error('Error fetching comments:', error);
      return NextResponse.json({ error: 'Could not retrieve comments' }, { status: 500 });
    }
  }

export async function POST(req) {
    const body = await req.json();
    const { comment, transcriptId, file } = body;
  
    let fileUrl = '';
    if (file) {
      const uploadParams = {
        Bucket: 'your-s3-bucket-name',
        Key: `files/${Date.now()}_${file.name}`,
        Body: file.data,
        ContentType: file.type,
      };
      try {
        const uploadResult = await s3.upload(uploadParams).promise();
        fileUrl = uploadResult.Location;
      } catch (error) {
        return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
      }
    }
  
    const params = {
      TableName: 'Comments',
      Item: {
        id: Date.now().toString(),
        transcriptId,
        comment,
        fileUrl,
        createdAt: new Date().toISOString(),
      },
    };
  
    try {
      await dynamoDb.put(params).promise();
      return NextResponse.json({ message: 'Comment added' }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Could not add comment' }, { status: 500 });
    }
  }

export async function DELETE(req) {
    const { searchParams } = new URL(req.url);
    const commentId = searchParams.get('id');
  
    const deleteParams = {
      TableName: 'Comments',
      Key: { id: commentId },
    };
  
    try {
      await dynamoDb.delete(deleteParams).promise();
      return NextResponse.json({ message: 'Comment deleted' });
    } catch (error) {
      return NextResponse.json({ error: 'Could not delete comment' }, { status: 500 });
    }
  }

export async function PUT(req) {
    const body = await req.json();
    const { id: updateId, updatedComment } = body;
  
    const updateParams = {
      TableName: 'Comments',
      Key: { id: updateId },
      UpdateExpression: 'set comment = :comment',
      ExpressionAttributeValues: {
        ':comment': updatedComment,
      },
      ReturnValues: 'UPDATED_NEW',
    };
  
    try {
      const result = await dynamoDb.update(updateParams).promise();
      return NextResponse.json(result.Attributes);
    } catch (error) {
      return NextResponse.json({ error: 'Could not update comment' }, { status: 500 });
    }
  }