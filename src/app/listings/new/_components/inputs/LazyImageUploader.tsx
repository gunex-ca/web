"use client";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import { ImageUploader } from "./ImageUploader";

interface LazyImageUploaderProps {
  files?: File[];
  onUpdate?: (files: File[]) => void;
}

export const LazyImageUploader: React.FC<LazyImageUploaderProps> = ({
  files,
  onUpdate,
}) => {
  return <ImageUploader files={files} onUpdate={onUpdate} />;
};
