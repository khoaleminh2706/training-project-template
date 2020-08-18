import serverData from '../constants/_serverData';
import LocalData from '../utilities/_LocalData';

class FileService {
  private p_data: Array<IBaseModel> = [];

  public getData = () => {
    let jsonData = LocalData.get<IBaseModel>('items');

    if (jsonData.length === 0) {
      jsonData = this.getDataFromServer();
    }

    // merge data to file type
    jsonData.forEach(obj => {
      if (!obj !== undefined && obj?.type) {
        switch (obj.type) {
          case 'file':
            obj = <IFile>obj;
            break;
          case 'folder':
            obj = <IFolder>obj;
        }
        this.p_data.push(obj);
      }
    });
  };

  private getDataFromServer = (): Array<any> => {
    // save to local
    LocalData.save('items', serverData);
    return serverData;
  };

  public createNewFile = (
    newFile: IFileCreateInput,
  ): ServiceResult => {
    // check duplicate file name
    if (this.hasAlreadyExisted(newFile.name)) {
      return {
        success: false,
        errorMessage: 'File đã tồn tại',
      };
    }

    try {
      switch (newFile.type) {
        case 'file':
          this.p_data.push({
            id: Date.now().toString(),
            name: newFile.name,
            type: newFile.type,
            extension: newFile.extension,
            createdAt: new Date(),
            createdBy: 'Khoa',
            modifiedAt: new Date(),
            modifiedBy: 'Khoa',
          } as IFile);
          break;
        case 'folder':
          this.p_data.push({
            id: Date.now().toString(),
            name: newFile.name,
            type: newFile.type,
            createdAt: new Date(),
            createdBy: 'Khoa',
            modifiedAt: new Date(),
            modifiedBy: 'Khoa',
            subFiles: [],
          } as IFolder);
          break;
      }

      // save new data to localStorage
      LocalData.save('items', this.p_data);
    } catch (err) {
      console.error('Error', err);
      return { success: false, errorMessage: err };
    }

    return { success: true };
  };

  private hasAlreadyExisted = (fileName: string): boolean => {
    if (this.p_data.find(x => x.name === fileName) === undefined) {
      return false;
    }
    return true;
  };

  public Data() {
    return this.p_data;
  }
}

type ServiceResult = { success: boolean; errorMessage?: string };

export default FileService;
