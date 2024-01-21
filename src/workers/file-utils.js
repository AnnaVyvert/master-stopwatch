function downloadFile(content, fileName = 'file', contentTypeHeader = 'application/json') {
  const blob = new Blob([content], { type: contentTypeHeader });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  window.URL.revokeObjectURL(url);
  link.remove();
}

function uploadFile(handler) {
  return () => {
    const [file] = document.querySelector(UPLOAD_FILE_REF).files;
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        handler(reader.result);
      },
      false,
    );

    if (file) {
      reader.readAsText(file);
    }
  }
}