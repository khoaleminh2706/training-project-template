import $ from 'jquery';
import { ModalEventHandler } from 'bootstrap';

import BaseModel from '../types/BaseModel';
import FileService from '../service/_fileService';
import FileCreateInput from '../types/FileCreateInput';

class CustomModal {
  private endpoint: ModalEventHandler<HTMLElement>;

  private fileService: FileService;

  constructor(
    endpoint: ModalEventHandler<HTMLElement>,
    fileService: FileService,
  ) {
    this.endpoint = endpoint;
    this.fileService = fileService;
  }

  renderModal = () =>
    new Promise((resolve, reject) => {
      const btnElement = this.endpoint.relatedTarget;
      if (!btnElement) {
        console.error('Không tìm thấy button');
        return;
      }
      const btn = $(btnElement);
      const task = btn.data('task');
      const type = btn.data('file');
      const currentId = btn.data('id');

      let item: BaseModel | undefined;
      if (currentId) {
        const result = this.fileService.getDoc(currentId);
        if (result.success && result.data) item = result.data;
      }

      const modal = $(this.endpoint.target);
      modal.find('.modal-title').text(`${task} ${type}`);

      // render form body
      const modalBody = modal.find('.modal-body');
      if (task == 'delete')
        modalBody.html(
          `<p>Are you sure you want to delete item Id=${currentId}</p>`,
        );
      else this.renderForm(modalBody, undefined, type);

      modal.find('.modal-footer').html(`<button type="submit"
  class="btn btn-primary" id="btnSubmitForm">${task}</button>`);
      const errorList = modal.find('#error-messages');

      $('#btnSubmitForm').on('click', event => {
        event.preventDefault();

        if (task === 'create' || task === 'edit') {
          // Data validation
          // const name = modal
          //   .find('input#file-name')
          //   .val()
          //   ?.toString();

          // if (name === undefined || name === '') {
          //   errorList.append(
          //     '<li class="text-danger">Vui lòng điền tên file.</li>',
          //   );
          //   return;
          // }

          // // get file extension
          // let extension: string | undefined;

          // if (type == 'folder') {
          //   if (name.lastIndexOf('.') !== -1) {
          //     extension = name
          //       .toString()
          //       .substr(name.lastIndexOf('.') + 1);
          //     if (!extension) {
          //       // handle error
          //       errorList.append(
          //         '<li class="text-danger">Tên file phải có extension.</li>',
          //       );
          //       return;
          //     }
          //   } else if (!extension) {
          //     // handle error
          //     errorList.append(
          //       '<li class="text-danger">Tên file phải có extension.</li>',
          //     );
          //     return;
          //   }
          // }

          if (type == 'folder') {
            const name = modal
              .find('input#file-name')
              .val()
              ?.toString();

            if (name)
              this.fileService
                .createNewFolder(name, currentId)
                .then(result => {
                  if (result.success) {
                    // Do something
                    // hide modal
                    modal.modal('hide');
                    resolve();
                  }
                })
                .catch(error => {
                  errorList.append(
                    `<li class="text-danger">${error.errorMessage}</li>`,
                  );
                  reject();
                });
          }

          if (type == 'file') {
            const file = modal.find('#fileupload');
            const formData = new FormData();
            formData.append('uploadFile', (file[0] as any).files[0]);

            this.fileService
              .uploadFile(formData, currentId)
              .then(result => {
                // hide modal
                modal.modal('hide');
                resolve();
              })
              .catch(error => {
                errorList.append(
                  `<li class="text-danger">${error.errorMessage}</li>`,
                );
                reject();
              });
          }
        }
      });
    });

  renderForm = (
    element: JQuery<HTMLElement>,
    item?: BaseModel,
    type = 'folder',
  ) => {
    if (type == 'folder') {
      element.html(`
      <form>
        <div class="form-group">
          <input type="text" 
              class="form-control" 
              id="file-name"
              placeholder="Tên file"
              name="file-name"
              value="${item ? item.name : ''}"
          />
        </div>
        <div class="container">
          <ul id="error-messages"></ul>
        </div>
      </form>
      `);
    } else {
      element.html(`
      <form>
      <div class="form-group">
        <input type="file" 
            class="form-control" 
            id="fileupload"
            placeholder="Tên file"
            name="fileupload"
        />
      </div>
      <div class="container">
        <ul id="error-messages"></ul>
      </div>
    </form>
      `);
    }
  };
}

export default CustomModal;
