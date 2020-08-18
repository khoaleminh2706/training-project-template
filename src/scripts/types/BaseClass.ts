import { isPlainObject } from 'jquery';

export class BaseClass implements IBaseModel {
  public id: string;
  public name: string;
  public type: string;
  public createdAt: Date;
  public createBy: string;
  public modifiedAt: Date;
  public modifiedBy: string;

  constructor(obj?: IBaseModel) {
    this.id = obj?.id || '';
    this.name = obj?.name || '';
    this.type = obj?.type || '';
    this.createBy = obj?.createBy || '';
    this.createdAt = obj?.createdAt || new Date();
    this.modifiedBy = obj?.modifiedBy || '';
    this.modifiedAt = obj?.modifiedAt || new Date();
  }
}
