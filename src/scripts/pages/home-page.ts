import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/modal';

import ready from '../utilities/_helper';
import FileService from '../service/_fileService';

ready(() => {
  const service = new FileService();
  console.log(service.getData());
});
