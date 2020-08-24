import BaseModel from './BaseModel'

interface Folder extends BaseModel {
  subFiles: BaseModel[];
}

export default Folder