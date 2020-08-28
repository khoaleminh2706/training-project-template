import $ from 'jquery';

import BaseModel from '../types/BaseModel';
import Folder from '../types/Folder';
import File from '../types/FileType';

class FileService {
  private data: Array<BaseModel> = [];

  public getData = async () => {
    let jsonData: any[] = [];

    jsonData = await $.ajax('/api/files', {
      type: 'GET',
      async: true,
      success: data => {
        return data;
      },
      error: err => console.log(err),
    });

    // merge data to file type
    jsonData.forEach(obj => {
      if (!obj !== undefined && obj?.type) {
        try {
          switch (obj.type) {
            case 'file':
              this.data.push(<File>obj);
              break;
            case 'folder':
              this.data.push(<Folder>obj);
              break;
            default:
              throw new Error(
                `Wrong file type${JSON.stringify(obj)}`,
              );
          }
        } catch (err) {
          console.error(err);
        }
      }
    });
  };

  public createNewFolder = (name: string, parentId?: string) =>
    new Promise<ServiceResult>((resolve, reject) => {
      // check duplicate file name
      if (this.hasAlreadyExisted(name, parentId)) {
        reject({
          success: false,
          errorMessage: 'Folder đã tồn tại',
        });
      }

      $.ajax({
        type: 'POST',
        url: '/api/files/folder',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ name }),
        dataType: 'json',
      })
        .done(data => {
          // save new data to localdata
          const addnew: File = {
            id: data.id,
            // TODO: Sửa lại chỗ này
            name,
            extension: data.extension,
            type: data.type,
            modifiedAt: data.modifiedAt,
            modifiedBy: data.modifiedBy,
            createdAt: data.createdAt,
            createdBy: data.createdBy,
          };

          this.data.push(addnew);

          resolve({ success: true });
        })
        .catch(err => {
          console.error(err.responseText);
          reject({
            success: false,
            errorMessage: err.responseText
              ? err.responseText
              : (err as any).error,
          });
        });
    });

  public uploadFile = (formData: FormData, parentId?: string) =>
    new Promise<ServiceResult>((resolve, reject) => {
      $.ajax({
        type: 'post',
        url: '/api/files',
        processData: false,
        contentType: false,
        data: formData,
      })
        .done(result => {
          result.name = (formData.getAll(
            'uploadFile',
          )[0] as any).name;
          this.data.push(result);
          resolve({ success: true });
        })
        .catch(err => {
          console.error(err.responseText);
          reject({
            success: false,
            errorMessage: err.responseText
              ? err.responseText
              : (err as any).error,
          });
        });
    });

  public getDoc(id: string): ServiceResult {
    const doc = this.data.find(x => x.id == id);
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
    // LocalData.save('items', this.data);
    return { success: true };
  }

  public removeItem(id: string): ServiceResult {
    this.data = this.data.filter(x => x.id !== id);

    // TODO: check errors if any
    // save new data to localStorage
    // LocalData.save('items', this.data);

    return { success: true };
  }

  private hasAlreadyExisted = (
    fileName: string,
    parentId?: string,
  ): boolean => {
    // check subfile
    if (parentId) {
      const doc = this.data.find(
        x => x.id == parentId && x.type === 'folder',
      );
      if (doc) {
        const folder = <Folder>doc;
        if (
          folder.subFiles &&
          folder.subFiles.find(x => x.name === fileName)
        ) {
          return true;
        }
      }
    }

    // check file
    if (this.data.find(x => x.name === fileName)) {
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
  data?: BaseModel;
};

export default FileService;
