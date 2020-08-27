import BaseModel from '../types/BaseModel';
import FileType from '../types/FileType';

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
            </td>
            <td data-label="Name"><span>${file.name}</span></td>
            <td data-label="Modified"><span>${
              file.modifiedAt
            }</span></td>
            <td data-label="Modified By"><span>${
              file.modifiedBy
            }</span></td>
            <td></td>
        </tr>`;
    });
    container.innerHTML = html;
  } else {
    container.innerHTML = 'Không có dữ liệu nào';
  }
};

export default tableRow;
