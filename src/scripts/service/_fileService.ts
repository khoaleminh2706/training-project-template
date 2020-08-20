import serverData from '../constants/_serverData';
import LocalData from '../utilities/_LocalData';

class FileService {
  private data: Array<IBaseModel> = [];

  public getData = () => {
    let jsonData = LocalData.get<IBaseModel>('items');

    if (jsonData.length === 0) {
      jsonData = this.getDataFromServer();
    }

    // merge data to file type
    jsonData.forEach(obj => {
      if (!obj !== undefined && obj?.type) {
        if (obj.type === 'file') this.data.push(<IFile>obj);
        else if (obj.type === 'folder') this.data.push(<IFolder>obj);
      }
    });
  };

  private getDataFromServer = (): any => {
    // save to local
    LocalData.save('items', serverData);
    return serverData;
  };

  public createNewFile = (
    newFile: IFileCreateInput,
    parentId?: string,
  ) =>
    new Promise<ServiceResult>((resolve, reject) => {
      // check duplicate file name
      // if (this.hasAlreadyExisted(newFile.name, parentId)) {
      //   reject({
      //     success: false,
      //     errorMessage: 'File đã tồn tại',
      //   });
      // }

      try {
        const fileToAdd: IBaseModel = {
          id: Date.now().toString(),
          name: newFile.name,
          type: newFile.type,
          createdAt: new Date(),
          createdBy: 'Khoa',
          modifiedAt: new Date(),
          modifiedBy: 'Khoa',
        };
        switch (newFile.type) {
          case 'file':
            this.data.push({
              ...fileToAdd,
              extension: newFile.extension,
            } as IFile);
            break;
          case 'folder':
            this.data.push({
              ...fileToAdd,
              subFiles: [],
            } as IFolder);
            break;
          default:
            reject({ success: false, errorMessgae: 'Failed' });
            break;
        }

        // save new data to localStorage
        LocalData.save('items', this.data);
      } catch (err) {
        reject({ success: false, errorMessgae: err });
      }

      reject({ success: true });
    });

  public getDoc(id: string): ServiceResult {
    const doc = this.data.find(x => x.id === id);
    if (doc) return { success: true, data: doc };
    return { success: false };
  }

  public editFileName(id: string, name: string): ServiceResult {
    this.data = this.data.map(item => {
      if (item.id === id) {
        return {
          ...item,
          name,
        };
      }
      return item;
    });
    // TODO: file vs folder?
    // TODO: output error if any

    // save new data to localStorage
    LocalData.save('items', this.data);
    return { success: true };
  }

  public removeItem(id: string): ServiceResult {
    this.data = this.data.filter(x => x.id !== id);

    // TODO: check errors if any
    // save new data to localStorage
    LocalData.save('items', this.data);

    return { success: true };
  }

  private hasAlreadyExisted = (
    fileName: string,
    parentId?: string,
  ): boolean => {
    // check subfile
    if (parentId) {
      const doc = this.data.find(
        x => x.id === parentId && x.type === 'folder',
      );
      if (doc)
        if (
          (doc as IFolder).subFiles?.find(x => x.name === fileName)
        ) {
          return true;
        }
    }

    // check file
    if (!this.data.find(x => x.name === fileName)) {
      return true;
    }

    return false;
  };

  public Data() {
    return this.data;
  }

  public isFolder(id: string) {
    const item = this.data.find(x => x.id === id);
    if (item && item.type === 'folder') return true;
    return false;
  }
}

type ServiceResult = {
  success: boolean;
  errorMessage?: string;
  data?: IBaseModel;
};

export default FileService;
