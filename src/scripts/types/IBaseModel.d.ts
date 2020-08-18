export {};
declare global {
  interface IBaseModel {
    id: string;
    name: string;
    type: string;
    createdAt: Date;
    createdBy: string;
    modifiedAt: Date;
    modifiedBy: string;
  }
}
