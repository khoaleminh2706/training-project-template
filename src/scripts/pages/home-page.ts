import $ from 'jquery';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/modal';
import { ModalEventHandler } from 'bootstrap';

import ready from '../utilities/_helper';
import FileService from '../service/_fileService';
import tableRow from '../components/_tableRow';
import renderForm from '../components/_modalForm';
import BaseModel from '../types/BaseModel';
import FileCreateInput from '../types/FileCreateInput';

const point = document.querySelector<HTMLElement>('#doc-list tbody');
const contextMenu = document.getElementById('context-menu');
let fileService: FileService;

ready(() => {
  console.log('Error: noe lreaod');
  // prevent enter and backspace
  $(function () {
    const keyStop: any = {
      8: ':not(input:text, textarea, input:file, input:password)', // stop backspace = back
      13: 'input:text, input:password', // stop enter = submit

      end: null,
    };
    $(document).bind('keydown', function (event) {
      const selector = keyStop[event.which];

      if (selector !== undefined && $(event.target).is(selector)) {
        event.preventDefault(); // stop event
      }
      return true;
    });
  });

  fileService = new FileService();
  fileService.getData();
  tableRow(fileService.Data(), point);
  addContextMenu();

  // Modal to handle create and edit
  $('#file-modal').on('show.bs.modal', event =>
    handleModalShow(event),
  );

  window.addEventListener('click', function () {
    showContextMenu(false);
  });
});

function showContextMenu(show = true) {
  if (contextMenu)
    contextMenu.style.display = show ? 'block' : 'none';
}

/**
 * Hàm phụ trách về modal
 */
function handleModalShow(event: ModalEventHandler<HTMLElement>) {
  const btnElement = event.relatedTarget;
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
    const result = fileService.getDoc(currentId);
    if (result.success && result.data) item = result.data;
  }

  const modal = $(event.target);
  modal
    .find('.modal-title')
    .text(`${task} ${type} ${currentId === '' ? currentId : ''}`);

  // render form body
  if (task !== 'delete')
    modal.find('.modal-body').html(renderForm(item));
  else
    modal
      .find('.modal-body')
      .html(
        `<p>Are you sure you want to delete item Id=${currentId}</p>`,
      );
  modal.find('.modal-footer').html(`<button type="submit"
  class="btn btn-primary" id="btnSubmitForm">${task}</button>`);
  const errorList = modal.find('#error-messages');

  $('#btnSubmitForm').on('click', event => {
    event.preventDefault();

    if (task === 'create' || task === 'edit') {
      // Data validation
      const name = modal
        .find('input#file-name')
        .val()
        ?.toString();

      if (name === undefined || name === '') {
        errorList.append(
          '<li class="text-danger">Vui lòng điền tên file.</li>',
        );
        return;
      }

      // get file extension
      let extension: string | undefined;

      if (type === 'file') {
        if (name.lastIndexOf('.') !== -1) {
          extension = name
            .toString()
            .substr(name.lastIndexOf('.') + 1);
          if (!extension) {
            // handle error
            errorList.append(
              '<li class="text-danger">Tên file phải có extension.</li>',
            );
            return;
          }
        } else if (!extension) {
          // handle error
          errorList.append(
            '<li class="text-danger">Tên file phải có extension.</li>',
          );
          return;
        }
      }

      if (task === 'create') {
        handleCreate(
          {
            name,
            type,
            extension,
          },
          currentId,
        )
          .then(result => {
            if (result) {
              // Do something
            }
          })
          .catch(error => {
            errorList.append(`<li class="text-danger">${error}</li>`);
          });
      } else if (task === 'edit' && currentId) {
        handleEdit(currentId, name);
      }
    } else if (task === 'delete' && currentId) {
      handleDelete(currentId);
    }

    // hide modal
    modal.modal('hide');

    // rerender doc list
    tableRow(fileService.Data(), point);
    addContextMenu();
  });
}

function addContextMenu() {
  if (contextMenu) {
    const docs = document.querySelectorAll<HTMLElement>(
      '#doc-list tbody tr',
    );

    if (docs) {
      docs.forEach(doc => {
        contextMenuListener(doc, contextMenu);
      });
    }
  }
}

function contextMenuListener(
  el: HTMLElement,
  contextMenu: HTMLElement,
) {
  el.addEventListener('contextmenu', function (e) {
    e.preventDefault();

    contextMenu.style.display = 'block';
    contextMenu.style.top = e.y.toString();
    contextMenu.style.left = e.x.toString();

    const currentId = this.getAttribute('data-id') ?? undefined;

    if (currentId) {
      // display id on context menu
      const contextMenuHeader = contextMenu.querySelector(
        '.dropdown-header',
      );

      if (contextMenuHeader)
        (contextMenuHeader as HTMLElement).innerText = `File Id = ${currentId}`;

      const subFolderbtn = contextMenu.querySelector(
        'button[data-file="subfolder"]',
      ) as HTMLElement;
      const subFilebtn = contextMenu.querySelector(
        'button[data-file="subfile"]',
      ) as HTMLElement;
      const btnEdit = contextMenu.querySelector(
        'button[data-task="edit"]',
      ) as HTMLElement;
      const btnDelete = contextMenu.querySelector(
        'button[data-task="delete"]',
      ) as HTMLElement;

      if (btnEdit && btnDelete) {
        btnEdit.setAttribute('data-id', currentId);
        btnDelete.setAttribute('data-id', currentId);
      }

      if (
        fileService.isFolder(currentId) &&
        subFilebtn &&
        subFolderbtn
      ) {
        subFilebtn.classList.remove('hidden');
        subFilebtn.setAttribute('data-id', currentId);
        subFolderbtn.classList.remove('hidden');
        subFolderbtn.setAttribute('data-id', currentId);
      }
    } else {
      console.error('Không tìm thấy id của đối tượng');
      return;
    }

    return false;
  });
}

const handleCreate = async (
  newFile: FileCreateInput,
  parentId?: string,
) => {
  const { success, errorMessage } = await fileService.createNewFile(
    newFile,
    parentId,
  );
  if (!success || errorMessage) return errorMessage;
  return undefined;
};

function handleEdit(
  id: string,
  fileName: string,
): string | undefined {
  const { success, errorMessage } = fileService.editFileName(
    id,
    fileName,
  );
  if (!success || errorMessage) return errorMessage;
  return undefined;
}

function handleDelete(id: string): string | undefined {
  const { success, errorMessage } = fileService.removeItem(id);
  if (!success || errorMessage) return errorMessage;
  return undefined;
}
