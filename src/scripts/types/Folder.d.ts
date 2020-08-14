export {};

declare global {
  namespace HomePage {
    interface Folder extends BaseModel {
      files: File[];
      subFolders: Folder[];
    }
  }
}
