export {};
declare global {
  interface IBaseModel {
    id: string;
    name: string;
    type: string;
    createdAt: Date;
    createBy: string;
    modifiedAt: Date;
    modifiedBy: string;
  }
}
