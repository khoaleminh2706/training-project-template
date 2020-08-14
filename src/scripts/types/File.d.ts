export {};

declare global {
  namespace HomePage {
    interface File extends BaseModel {
      extension: string;
    }
  }
}
