import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/modal';

import ready from '../utilities/_helper';
import FileService from '../service/_fileService';
import tableRow from '../components/_tableRow';

ready(() => {
  const service = new FileService();
  let point = document.querySelector('#doc-list-body');

  if (point !== null)
    point.innerHTML += tableRow(
      service.getData() as Array<IBaseModel>,
    );
});
