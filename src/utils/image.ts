import { uploadImage } from '../api/image';

export const generateFormData = (image: string | File) => {
  const formData = new FormData();
  formData.append('file', image);

  return formData;
};

export const getImageObjectKey = async (image: any, token: string) => {
  if (image) {
    const formData = generateFormData(image);
    const { data } = await uploadImage(token, formData);

    return data.objectKey;
  }
};
