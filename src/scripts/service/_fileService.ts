import serverData from '../constants/_serverData';
import LocalData from '../utilities/_LocalData';

class FileService {
  private p_data: Array<IBaseModel> = [];

  public getData = (): Array<IBaseModel> => {
    this.p_data = LocalData.get<IBaseModel>('items');

    if (this.p_data.length === 0) {
      this.p_data = this.getDataFromServer();
    }

    // merge data to file type
    const result: Array<IBaseModel> = [];

    this.p_data.forEach(obj => {
      if (!obj !== undefined && obj?.type) {
        switch (obj.type) {
          case 'file':
            obj = <IFile>obj;
            break;
          case 'folder':
            obj = <IFolder>obj;
        }
        result.push(obj);
      }
    });

    return result;
  };

  public getDataFromServer = (): Array<any> => {
    // save to local
    LocalData.save('items', serverData);
    return serverData;
  };
}

export default FileService;
