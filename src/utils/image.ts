export const generateFormData = (image: string | File) => {
  const formData = new FormData();
  formData.append('file', image);

  return formData;
};
