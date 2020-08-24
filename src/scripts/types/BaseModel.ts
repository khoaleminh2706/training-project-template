interface BaseModel {
  id: string;
  name: string;
  type: string;
  createdAt: Date;
  createdBy: string;
  modifiedAt: Date;
  modifiedBy: string;
}

export default BaseModel;
