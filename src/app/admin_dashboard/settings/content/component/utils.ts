export const uploadImageToCloudinary = async (base64Image: string): Promise<string> => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Missing Cloudinary configuration");
  }

  const formData = new FormData();
  formData.append("file", base64Image);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to upload image');
  }
  
  return data.secure_url;
};

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const colors = [
  "#E9C46A",
  "#FEEDC2",
  "#DFDACF",
  "#F6F4F4",
  "#FFE1E1",
  "#E1FFF6",
];
