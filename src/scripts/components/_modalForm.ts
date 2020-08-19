function renderForm(item?: IBaseModel): string {
  const html = `
    <form>
      <div class="form-group">
        <input type="text" 
            class="form-control" 
            id="file-name"
            placeholder="Tên file"
            name="file-name"
            value="${item ? item.name : ''}"
        />
      </div>
      <div class="container">
        <ul id="error-messages"></ul>
      </div>
    </form>
    `;
  return html;
}

export default renderForm;
