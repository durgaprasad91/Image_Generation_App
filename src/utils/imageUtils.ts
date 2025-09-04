export const downscaleImage = (file: File, maxSize: number = 1920): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(img.src); // Revoke the object URL after image is loaded

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      let width = img.width;
      let height = img.height;

      // Check if downscaling is needed (either width or height exceeds maxSize)
      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height = (maxSize / width) * height;
          width = maxSize;
        } else {
          width = (maxSize / height) * width;
          height = maxSize;
        }
      }

      canvas.width = width;
      canvas.height = height;

      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(URL.createObjectURL(blob));
        } else {
          reject(new Error('Failed to create Blob from canvas.'));
        }
      }, file.type);
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error('Failed to load image for downscaling.'));
    };
  });
};
