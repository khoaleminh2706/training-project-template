export {};

declare global {
  interface IFileCreateInput {
    name: string;
    type: string;
    extension?: string;
  }
}
