import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import config from '@config/index';

const client = new S3Client({
  region: config.aws.S3_BUCKET_REGION,
  credentials: {
    secretAccessKey: config.aws.AWS_SECRET_ACCESS_KEY,
    accessKeyId: config.aws.AWS_ACCESS_KEY_ID
  }
});

const s3Helpers = {
  uploadToS3: async ({ file, userID }: { file: any, userID: string }) => {
    const key = `${userID}_${uuid()}`;
    const bucket = config.aws.S3_BUCKET;
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    })

    try {
      await client.send(command);
    } catch (error) {
      console.log('Error: ', error);
    }
  }
}

export default s3Helpers;