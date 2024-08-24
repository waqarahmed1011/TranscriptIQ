import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' });

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      // Handle creating a new comment
      const { comment, transcriptId } = req.body;
      const params = {
        TableName: 'Comments',
        Item: {
          id: Date.now().toString(),
          transcriptId,
          comment,
          createdAt: new Date().toISOString(),
        },
      };
      try {
        await dynamoDb.put(params).promise();
        res.status(201).json({ message: 'Comment added' });
      } catch (error) {
        res.status(500).json({ error: 'Could not add comment' });
      }
      break;

    case 'GET':
      // Handle reading comments
      const { transcriptId: id } = req.query;
      const queryParams = {
        TableName: 'Comments',
        KeyConditionExpression: 'transcriptId = :id',
        ExpressionAttributeValues: {
          ':id': id,
        },
      };
      try {
        const data = await dynamoDb.query(queryParams).promise();
        res.status(200).json(data.Items);
      } catch (error) {
        res.status(500).json({ error: 'Could not retrieve comments' });
      }
      break;

    case 'DELETE':
      // Handle deleting a comment
      const { id: commentId } = req.query;
      const deleteParams = {
        TableName: 'Comments',
        Key: { id: commentId },
      };
      try {
        await dynamoDb.delete(deleteParams).promise();
        res.status(200).json({ message: 'Comment deleted' });
      } catch (error) {
        res.status(500).json({ error: 'Could not delete comment' });
      }
      break;

    case 'PUT':
      // Handle updating a comment
      const { id: updateId, updatedComment } = req.body;
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
        res.status(200).json(result.Attributes);
      } catch (error) {
        res.status(500).json({ error: 'Could not update comment' });
      }
      break;

    default:
      res.setHeader('Allow', ['POST', 'GET', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}