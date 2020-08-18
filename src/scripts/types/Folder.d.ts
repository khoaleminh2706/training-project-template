export {};

declare global {
  type FolderType = BaseModel & {
    subFiles?: BaseModel[];
  };
}
