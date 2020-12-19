import { Downloads } from "webextension-polyfill-ts";

export interface Download extends Downloads.DownloadItem {
  icon: string;
  filenameOnly?: string;
}
