export const secondsToString = (seconds: number) => {
  var numyears = Math.floor(seconds / 31536000);
  var numdays = Math.floor((seconds % 31536000) / 86400);
  var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
  var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
  var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;

  return (numyears > 0 ? numyears + " years " : "")
    + (numdays > 0 ? numdays + " days " : "")
    + (numhours > 0 ? numhours + " hours " : "")
    + (numminutes > 0 ? numminutes + " minutes " : "")
    + (numseconds > 0 ? numseconds + " seconds" : "");

}

// @ts-ignore
export const convertToFormData = (values: any): FormData => {
  const formData = new FormData();
  Object.entries(values).forEach(([key, val]) => {
    if (val !== undefined) {
      if (val instanceof File) {
        formData.append(key, val);
      } else {
        formData.append(key, val as string);
      }
    }
  });
  return formData;
};

export const encodeFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
  });
};

export const convertSpacesToUnderscore = (input: string) => {
  return input.replace(" ", "_");
}