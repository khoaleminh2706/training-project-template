export {};

declare global {
  type FileType = BaseModel & {
    extension: string;
  };
}
