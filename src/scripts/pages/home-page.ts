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
  const fileType = btn.data('file');

  const modal = $(event.target);
  modal.find('.modal-title').text(`${task} ${fileType}`);
  // render form body
  modal.find('.modal-body').html(renderForm());
  modal.find('.modal-footer').html(`<button type="submit"
  class="btn btn-primary" id="btnSubmitForm">${task}</button>`);

  $('#btnSubmitForm').on('click', event => {
    const name = modal.find('input#file-name').val();
    if (name === undefined) {
      console.error('File required');
      return;
    }
    handleSubmit(event, {
      name: name.toString(),
      type: fileType,
      extension: fileType === 'file' ? 'xlsx' : undefined,
    });
    modal.modal('hide');
    tableRow(service.Data(), point);
  });
}

function handleSubmit(
  event: JQuery.ClickEvent,
  newFile: IFileCreateInput,
) {
  event.preventDefault();
  service.createNewFile(newFile);
}
