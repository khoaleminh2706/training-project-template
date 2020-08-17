import { HomePage } from '../service/_fileService';

export {};
declare global {
  interface IBaseModel {
    id: string;
    name: string;
    createdAt: Date;
    createBy: string;
    modifiedAt: Date;
    modifiedBy: string;
  }
}
