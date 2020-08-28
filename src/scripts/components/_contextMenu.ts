import $ from 'jquery';

class ContextMenu {
  constructor() {
    this.init();
  }

  private checkboxGroup = $('.chkChonFile');

  private init() {
    if (this.checkboxGroup)
      this.checkboxGroup.on('click', function() {
        const group = `input:checkbox[name='${$(this).prop(
          'name',
        )}']`;
        $(group)
          .not(this)
          .prop('checked', false);
        // $(this).attr('checked', 'true');
      });
  }
}

export default ContextMenu;
