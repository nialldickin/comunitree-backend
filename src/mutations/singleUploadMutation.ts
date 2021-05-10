import { nanoid } from 'nanoid';
import path from 'path';
import { createWriteStream } from 'fs';
import { SingleUploadMutation } from '../types';

export const singleUpload: SingleUploadMutation = async (
  _,
  { file }
) => {
  console.log('Received request: singleUpload');
  console.log(file);
  const {
    createReadStream,
    mimetype,
    filename: originalFilename
  } = await file;

  const getExtension = () => {
    switch (mimetype) {
      case 'image/jpeg':
        return '.jpeg';
      case 'image/png':
        return '.png';
      case 'image/gif':
        return '.gif';
      default:
        throw new Error('Uknown mimetype' + mimetype);
    }
  };

  const newFilename = nanoid() + getExtension();
  const stream = createReadStream();
  const filePath = path.join(
    __dirname,
    '/../../uploads',
    newFilename
  );
  stream.pipe(createWriteStream(filePath));

  return { newFilename, originalFilename };
};
