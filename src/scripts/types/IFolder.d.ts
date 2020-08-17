export {};

declare global {
  interface IFolder extends IBaseModel {
    files?: File[];
    subFolders?: IFolder[];
  }
}
