function renderForm(): string {
  const html = `
    <form>
      <div class="form-group">
        <input type="text" 
            class="form-control" 
            id="file-name"
            placeholder="Tên file"
            name="file-name"
        />
        </div>
    </form>
    `;
  return html;
}

export default renderForm;
