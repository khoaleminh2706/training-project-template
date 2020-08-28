import moment from 'moment';

import BaseModel from '../types/BaseModel';
import ContextMenu from './_contextMenu';

const tableRow = (
  data: Array<BaseModel>,
  container: HTMLElement | null,
) => {
  if (!container) {
    console.error('Cannot find conatiner');
    return;
  }
  let html = '';
  if (data?.length !== 0) {
    data.map(file => {
      html += `<tr data-id="${file.id}">
            <td data-label="File Type" scope="row">
              <span><i class="fas ${
                file.type == 'file'
                  ? 'fa-file-excel icon-excel'
                  : 'fa-folder'
              }"></i></span>
              <input type="checkbox" data-value='${
                file.id
              }' class='chkChonFile' name='chonFile' />
            </td>
            <td data-label="Name">
            <span>${
              file.type == 'file'
                ? `<a target='_blank' href='/api/files/${file.id}/download'>${file.name}</a>`
                : file.name
            }</span></td>
            <td data-label="Modified"><span>${moment(
              file.modifiedAt,
            ).format('DD/MM/YYYY')}</span></td>
            <td data-label="Modified By"><span>${
              file.modifiedBy
            }</span></td>
            <td></td>
        </tr>`;
    });
    container.innerHTML = html;
    const context = new ContextMenu();
  } else {
    container.innerHTML = 'Không có dữ liệu nào';
  }
};

export default tableRow;
