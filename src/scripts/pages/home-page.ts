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
let service: FileService;

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

  service = new FileService();
  service.getData();
  tableRow(service.Data(), point);

  $('#file-modal').on('show.bs.modal', event =>
    handleModalShow(event),
  );
});

function handleModalShow(event: ModalEventHandler<HTMLElement>) {
  const btnElement = event.relatedTarget;
  if (!btnElement) {
    console.error('Không tìm thấy button');
    return;
  }
  const btn = $(btnElement);
  const task = btn.data('task');
  const type = btn.data('file');

  const modal = $(event.target);
  modal.find('.modal-title').text(`${task} ${type}`);
  // render form body
  modal.find('.modal-body').html(renderForm());
  modal.find('.modal-footer').html(`<button type="submit"
  class="btn btn-primary" id="btnSubmitForm">${task}</button>`);
  const errorList = modal.find('#error-messages');

  $('#btnSubmitForm').on('click', event => {
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

    const result = handleSubmit(event, {
      name,
      type,
      extension,
    });
    if (result) {
      errorList.append(`<li class="text-danger">${result}</li>`);
      return;
    }

    // hide modal
    modal.modal('hide');

    // rerender doc list
    tableRow(service.Data(), point);
  });
}

function handleSubmit(
  event: JQuery.ClickEvent,
  newFile: IFileCreateInput,
): string | undefined {
  event.preventDefault();
  const { success, errorMessage } = service.createNewFile(newFile);
  if (!success && errorMessage) return errorMessage;
  return undefined;
}
