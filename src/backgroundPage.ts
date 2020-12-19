import { browser, Downloads } from "webextension-polyfill-ts";
import * as repo from "./storage";

const pre = async (dw: Downloads.DownloadItem) => {
  try {
    const icon = await browser.downloads.getFileIcon(dw.id);
    const dr = { ...dw, icon: icon };
    await repo.set(dr);
  } catch (error) {
    console.log(`Error: ` + error);
  }
};

const post = async (dd: Downloads.OnChangedDownloadDeltaType) => {
  const dw = await browser.downloads.search({ id: dd.id });
  const dr = await repo.get(dw[0].id);
  dr.totalBytes = dr.fileSize = dw[0].totalBytes;
  dr.state = dd.state.current === "complete" ? "complete" : "in_progress";
  dr.exists = dd.exists.current;
  const fileArr = dr.filename.split("\\");
  dr.filenameOnly = fileArr[fileArr.length - 1];

  repo.set(dr);
};

browser.downloads.onCreated.addListener(pre);
browser.downloads.onChanged.addListener(post);
