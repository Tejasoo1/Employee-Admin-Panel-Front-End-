import Axios from "axios";

export async function uploadImageToCloudinary(image) {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "chat-app"); // Use your Cloudinary upload preset
  formData.append("cloud_name", "dizk5mov0");

  const cloud_name = "dizk5mov0";

  try {
    const response = await Axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, // Your Cloudinary endpoint
      formData
    );

    return response.data.secure_url; // Get the uploaded image URL
  } catch (error) {
    console.error("Error uploading image", error);
    return null;
  }
}
