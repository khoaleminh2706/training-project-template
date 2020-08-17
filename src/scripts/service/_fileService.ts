import { data } from '../constants/data';
import mapObjs from '../utilities/_mapObj';

class FileService {
  public getData = (): Array<IBaseModel | undefined> => {
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
}

export default FileService;
