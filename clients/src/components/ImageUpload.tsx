import React, { useState } from "react";

interface ImageUploadProps {
  onUpload: (url: string) => void;
}

const ImageUpload = ({ onUpload }: ImageUploadProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append("file", image);

    const uploadPreset = "ml_maish";
    const cloudName = "dm7gq3tnh";
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();
      if (!data.secure_url)
        throw new Error(data.error?.message || "Upload failed");
      return data.secure_url;
    } catch (err: any) {
      console.error("Upload error:", err);
      throw err;
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      setError(null);
      try {
        const imageUrl = await uploadImage(file);
        onUpload(imageUrl);
      } catch (err: any) {
        setError(err.message || "Upload failed");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {loading && <p>Uploading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ImageUpload;
