import BaseModel from './BaseModel';

interface FileType extends BaseModel {
  extension: string;
}

export default FileType;
