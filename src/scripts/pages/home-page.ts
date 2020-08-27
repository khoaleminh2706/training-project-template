import $ from 'jquery';

import ready from '../utilities/_helper';
import FileService from '../service/_fileService';
import tableRow from '../components/_tableRow';
import CustomModal from '../components/_customModal';

require('bootstrap/js/dist/util');
require('bootstrap/js/dist/button');
require('bootstrap/js/dist/collapse');
require('bootstrap/js/dist/modal');

const point = document.querySelector<HTMLElement>('#doc-list tbody');
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
  fileService
    .getData()
    .then(() => tableRow(fileService.Data(), point))
    .catch(err => console.error(err));

  // Modal to handle create and edit
  $('#file-modal').on('show.bs.modal', event => {
    const customerModel = new CustomModal(event, fileService);
    customerModel.renderModel();
    tableRow(fileService.Data(), point);
  });
});
