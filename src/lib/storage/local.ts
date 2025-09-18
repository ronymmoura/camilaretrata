interface UploadResponse {
  success: boolean;
  data?: {
    url: string;
    filename: string;
    originalName: string;
    size: number;
    type: string;
    isImage: boolean;
    isVideo: boolean;
  };
  message?: string;
}

export async function storageUpload(filename: string, file: File | Blob): Promise<string> {
  const formData = new FormData();
  formData.append("file", file, filename);

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data: UploadResponse = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to upload file");
    }

    if (!data.data?.url) {
      throw new Error("No URL returned from upload");
    }

    console.log('File uploaded successfully:', data.data);
    return data.data.url;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}