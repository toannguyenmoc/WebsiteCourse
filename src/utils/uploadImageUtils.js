import axios from "axios";

/**
 * Upload an image to Cloudinary
 * @param {File} file - The image file to upload
 * @returns {Promise<string>} - Returns secure URL of the uploaded image
 */
export const uploadImageToCloudinary = async (file) => {
  if (!file) throw new Error("Không có file ảnh");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await axios.post(
      import.meta.env.VITE_CLOUDINARY_UPLOAD_URL,
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("Lỗi khi upload ảnh:", error);
    throw error;
  }
};
