export {};

declare global {
  interface IFile extends IBaseModel {
    extension: string;
  }
}
