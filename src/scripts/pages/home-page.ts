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

const point = document.querySelector<HTMLElement>('#doc-list tbody');
const contextMenu = document.getElementById('context-menu');
let currentId: string | undefined = undefined;
let fileService: FileService;

ready(() => {
  // prevent enter and backspace
  $(function() {
    const keyStop: any = {
      8: ':not(input:text, textarea, input:file, input:password)', // stop backspace = back
      13: 'input:text, input:password', // stop enter = submit

      end: null,
    };
    $(document).bind('keydown', function(event) {
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

  window.addEventListener('click', function() {
    showContextMenu(false);
  });
});

function showContextMenu(show: boolean = true) {
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

  let item: IBaseModel | undefined = undefined;
  if (currentId) {
    let result = fileService.getDoc(currentId);
    if (result.success && result.data) item = result.data;
  }

  const modal = $(event.target);
  modal
    .find('.modal-title')
    .text(`${task} ${type} ${currentId ? currentId : ''}`);

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
    if (task === 'create' && task === 'edit') {
      // Data vilidation
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
        extension = name.split('.').pop();
        if (!extension) {
          // handle error
          errorList.append(
            '<li class="text-danger">Tên file phải có extension.</li>',
          );
          return;
        }
      }

      if (task === 'create') {
        const result = handleCreate({
          name,
          type,
          extension,
        });
        if (result) {
          errorList.append(`<li class="text-danger">${result}</li>`);
          return;
        }
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
  el.addEventListener('contextmenu', function(e) {
    e.preventDefault();

    contextMenu.style.display = 'block';
    contextMenu.style.top = e.y.toString();
    contextMenu.style.left = e.x.toString();

    currentId = this.getAttribute('data-id') ?? undefined;

    if (currentId) {
      // display id on context menu
      const contextMenuHeader = contextMenu.querySelector(
        '.dropdown-header',
      );

      if (contextMenuHeader)
        (contextMenuHeader as HTMLElement).innerText = `File Id = ${currentId}`;

      let subFolderbtn = contextMenu.querySelector(
        'button[data-file="subfolder"]',
      ) as HTMLElement;
      let subFilebtn = contextMenu.querySelector(
        'button[data-file="subfile"]',
      ) as HTMLElement;

      if (
        fileService.isFolder(currentId) &&
        subFilebtn &&
        subFolderbtn
      ) {
        subFilebtn.classList.remove('hidden');
        subFolderbtn.classList.remove('hidden');
      }
    } else {
      console.error('Không tìm thấy id của đối tượng');
      return;
    }

    return false;
  });
}

function handleCreate(newFile: IFileCreateInput): string | undefined {
  const { success, errorMessage } = fileService.createNewFile(
    newFile,
  );
  if (!success || errorMessage) return errorMessage;
  else return undefined;
}

function handleEdit(
  id: string,
  fileName: string,
): string | undefined {
  const { success, errorMessage } = fileService.editFileName(
    id,
    fileName,
  );
  if (!success || errorMessage) return errorMessage;
  else return undefined;
}

function handleDelete(id: string): string | undefined {
  console.log('run');
  const { success, errorMessage } = fileService.removeItem(id);
  if (!success || errorMessage) return errorMessage;
  else return undefined;
}
