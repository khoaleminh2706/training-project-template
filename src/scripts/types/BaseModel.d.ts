export {};

declare global {
  namespace HomePage {
    interface BaseModel {
      id: string;
      name: string;
      createdAt: Date;
      createBy: string;
      modifiedAt: Date;
      modifiedBy: string;
    }
  }
}
