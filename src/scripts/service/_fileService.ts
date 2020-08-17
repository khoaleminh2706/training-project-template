import serverData from '../constants/server';
import mapObjs from '../utilities/_mapObj';
import LocalData from '../utilities/_LocalData';

class FileService {
  public getData = (): Array<IBaseModel | undefined> => {
    let data = LocalData.get<IBaseModel>('items');

    if (data.length === 0) {
      data = this.getDataFromServer();
    }
    // merge data to file type
    const result: Array<IBaseModel | undefined> = [];
    data.forEach(obj => {
      let entry: IBaseModel | undefined;
      switch (obj.type) {
        case 'file':
          entry = mapObjs<IFile>(obj);
          break;
        case 'folder':
          entry = mapObjs<IFile>(obj);
      }
      result.push(entry);
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
