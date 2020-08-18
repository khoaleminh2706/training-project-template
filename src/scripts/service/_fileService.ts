import serverData from '../constants/_serverData';
import mapObjs from '../utilities/_mapObj';
import LocalData from '../utilities/_LocalData';

class FileService {
  private p_data: Array<BaseModel> = [];

  public getData = (): Array<BaseModel | undefined> => {
    this.p_data = LocalData.get<BaseModel>('items');

    if (this.p_data.length === 0) {
      this.p_data = this.getDataFromServer();
    }

    // merge data to file type
    const result: Array<BaseModel> = [];

    this.p_data.forEach(obj => {
      if (!!obj && obj?.type) {
        let entry: BaseModel | undefined;
        switch (obj.type) {
          case 'file':
            entry = mapObjs<FileType>(obj);
            break;
          case 'folder':
            entry = mapObjs<FolderType>(obj);
        }
        result.push(entry as BaseModel);
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
