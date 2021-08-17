import { MouseEvent, KeyboardEvent } from "react";

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const enterKeyFilter = async (
  e: MouseEvent | KeyboardEvent,
  func,
): Promise<void> => {
  if (e.nativeEvent instanceof KeyboardEvent) {
    if (e.nativeEvent.key !== "Enter") return;
  }

  e.preventDefault();
  await func();
};
