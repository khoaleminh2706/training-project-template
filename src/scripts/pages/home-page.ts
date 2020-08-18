import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/modal';

import ready from '../utilities/_helper';
import FileService from '../service/_fileService';
import tableRow from '../components/_tableRow';

let modal = document.getElementById('file-modal');

ready(() => {
  document
    .getElementById('btn-file-moi')
    ?.addEventListener('click', () => openModal('file'));
  document
    .getElementById('btn-folder-moi')
    ?.addEventListener('click', () => openModal('folder'));

  const service = new FileService();
  let point = document.getElementById('doc-list-body');

  if (point !== null)
    point.innerHTML += tableRow(
      service.getData() as Array<BaseModel>,
    );
});

function openModal(task: string) {
  if (modal !== null) {
    modal.style.display = 'block';
  }
}
