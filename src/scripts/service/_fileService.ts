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
    parentId?: string,
  ): ServiceResult => {
    // check duplicate file name
    if (this.hasAlreadyExisted(newFile.name, parentId)) {
      return {
        success: false,
        errorMessage: 'File đã tồn tại',
      };
    }

    try {
      let fileToAdd: IBaseModel = {
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
          this.p_data.push({
            ...fileToAdd,
            extension: newFile.extension,
          } as IFile);
          break;
        case 'folder':
          this.p_data.push({
            ...fileToAdd,
            subFiles: [],
          } as IFolder);
          break;
        case 'subfile':
          let doc = this.p_data.find(
            x => x.id === parentId,
          ) as IFolder;
          if (!doc) throw Error('Không tìm thấy parent doc.');
          else if (doc.subFiles) {
            doc.subFiles.push(fileToAdd as IFile);

            this.p_data.map(item => {
              if (item.id === parentId) {
                return doc;
              }
              return item;
            });
          } else {
            this.p_data.map(item => {
              if (item.id === parentId) {
                return {
                  ...item,
                  subFile: [fileToAdd as IFile],
                };
              }
              return item;
            });
          }
          break;
        case 'subfolder':
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

  public getDoc(id: string): ServiceResult {
    let doc = this.p_data.find(x => x.id === id);
    if (doc) return { success: true, data: doc };
    else return { success: false };
  }

  public editFileName(id: string, name: string): ServiceResult {
    this.p_data = this.p_data.map(item => {
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
    LocalData.save('items', this.p_data);
    return { success: true };
  }

  public removeItem(id: string): ServiceResult {
    this.p_data = this.p_data.filter(x => x.id !== id);

    // TODO: check errors if any
    // save new data to localStorage
    LocalData.save('items', this.p_data);

    return { success: true };
  }

  private hasAlreadyExisted = (
    fileName: string,
    parentId?: string,
  ): boolean => {
    // check subfile
    if (parentId) {
      let doc = this.p_data.find(
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
    if (!this.p_data.find(x => x.name === fileName)) {
      return true;
    }

    return false;
  };

  public Data() {
    return this.p_data;
  }

  public isFolder(id: string) {
    let item = this.p_data.find(x => x.id === id);
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
