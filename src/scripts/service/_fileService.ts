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

  public getDataFromServer = (): Array<any> => {
    // save to local
    LocalData.save('items', serverData);
    return serverData;
  };

  public createNewFile = (newFile: IFileCreateInput): boolean => {
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
    return true;
  };

  public Data() {
    return this.p_data;
  }
}

export default FileService;
