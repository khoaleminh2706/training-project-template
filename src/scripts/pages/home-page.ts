import * as $ from 'jquery';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/modal';

import ready from '../utilities/_helper';
import FileService from '../service/_fileService';
import tableRow from '../components/_tableRow';

const modal = document.getElementById('file-modal');
const point = document.getElementById('doc-list-body');

ready(() => {
  const service = new FileService();

  document
    .getElementById('btn-file-moi')
    ?.addEventListener('click', () => openModal('file'));
  document
    .getElementById('btn-folder-moi')
    ?.addEventListener('click', () => openModal('folder'));

  if (point !== null) tableRow(service.getData(), point);
});

function openModal(task: string) {
  if (modal !== null) {
    modal.style.display = 'block';
  }
}
