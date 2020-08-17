const tableRow = (data: Array<IBaseModel>): string => {
  let html = '';
  if (data?.length !== 0) {
    data.map((file, index) => {
      html += `<tr>
            <td data-label="File Type" scope="row">
            <span><i class="fas ${
              <IFile>file === undefined
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
    return html;
  }
  return 'ahihi';
};
export default tableRow;
