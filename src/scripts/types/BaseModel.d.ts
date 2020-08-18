export {};
declare global {
  type BaseModel = {
    id: string;
    name: string;
    type: string;
    createdAt: Date;
    createBy: string;
    modifiedAt: Date;
    modifiedBy: string;
  };
}
