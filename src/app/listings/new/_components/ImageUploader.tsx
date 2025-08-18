"use client";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import FilePondPluginImageEditor from "@pqina/filepond-plugin-image-editor";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import { FilePond, registerPlugin } from "react-filepond";

registerPlugin(FilePondPluginImageEditor, FilePondPluginImagePreview);

export const ImageUploader = () => {
  return (
    <div>
      <FilePond
        allowMultiple={true}
        maxFiles={9}
        acceptedFileTypes={["image/*"]}
        itemInsertLocation="after"
        imagePreviewHeight={120}
        credits={false}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        className="filepond-grid"
      />
      <style jsx global>{`
        .filepond--root {
          border: 1px solid var(--input) !important;
          border-radius: 0.5rem !important;
          background: color-mix(
            in oklab,
            var(--input) 30%,
            transparent
          ) !important;
        }
        .filepond-grid .filepond--item {
          width: calc(33% - 0.5em);
        }
        .filepond--panel-root {
          color: var(--foreground) !important;
          background: transparent !important;
        }
        .filepond--drop-label {
          color: var(--van-text-color-2) !important;
          font-size: var(--text-sm) !important;
        }
        .filepond--label-action {
          color: var(--van-text-color-2) !important;
        }
      `}</style>
    </div>
  );
};
