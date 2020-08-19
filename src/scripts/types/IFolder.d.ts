export {};

declare global {
  interface IFolder extends IBaseModel {
    subFiles: IBaseModel[];
  }
}
