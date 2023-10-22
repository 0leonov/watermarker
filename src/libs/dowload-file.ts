export function downloadFile(blob: Blob, fileName: string) {
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;

  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(url);
}
