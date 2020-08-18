import $ from 'jquery';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/modal';

import ready from '../utilities/_helper';
import FileService from '../service/_fileService';
import tableRow from '../components/_tableRow';
import renderForm from '../components/_modalForm';

const point = document.getElementById('doc-list-body');

ready(() => {
  const service = new FileService();
  if (point !== null) tableRow(service.getData(), point);

  $('#file-modal').on('show.bs.modal', function(event) {
    const btn = event.relatedTarget;
    if (!btn) {
      console.error('Không tìm thấy button');
      return;
    }
    const btnJquery = $(btn);
    const task = btnJquery.data('task');
    const fileType = btnJquery.data('file');

    const modal = $(this);
    modal.find('.modal-title').text(`${task} ${fileType}`);
    // render form body
    modal.find('.modal-body').html(renderForm());
    modal.find('.modal-footer').html(`<button type="submit"
    class="btn btn-primary" id="btnSubmitForm">${task}</button>`);
  });
});
