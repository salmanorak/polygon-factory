export const downloadFile = (data: string, filename: string, type: string) => {
  const fileBlob = new Blob([data], { type });
  const downloadLink = document.createElement("a");

  downloadLink.download = filename;
  downloadLink.href = URL.createObjectURL(fileBlob);
  downloadLink.style.display = "none";

  document.body.appendChild(downloadLink);
  downloadLink.click();

  document.body.removeChild(downloadLink);
};

export const exporToJson = (json: object, fileName: string) => {
  const jsonString = JSON.stringify(json, null, 2);
  downloadFile(jsonString, fileName, "application/json");
};

export const parseJsonFile = (file: File, cb: (json: object) => void) => {
  new Response(file).json().then(
    (json) => cb(json),
    (err) => console.log(err)
  );
};
