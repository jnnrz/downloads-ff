import React, {
  FunctionComponent,
  useEffect,
  useState,
  MouseEvent,
  KeyboardEvent,
} from "react";
import { browser } from "webextension-polyfill-ts";
import { Download } from "../types";
import * as repo from "../storage";

import folderIconPath from "../assets/images/folder.svg";
import removeIconPath from "../assets/images/remove.svg";

import "./styles.scss";

export const Popup: FunctionComponent = () => {
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    const processDownloads = async () => {
      const downloadList = await repo.allGood();
      setDownloads(downloadList.reverse());
    };

    processDownloads();
  }, []);

  const openFile = async (e: MouseEvent | KeyboardEvent, id: number) => {
    if (e.nativeEvent instanceof KeyboardEvent) {
      if (e.nativeEvent.key !== "Enter") return;
    }

    e.preventDefault();
    await browser.downloads.open(id);
  };

  const removeDownload = async (e: MouseEvent | KeyboardEvent, id: number) => {
    if (e.nativeEvent instanceof KeyboardEvent) {
      if (e.nativeEvent.key !== "Enter") return;
    }

    e.preventDefault();

    if (repo.has(id)) {
      await repo.remove(id);
      await browser.downloads.erase({ id: id });
      setDownloads((prevState) => [...prevState.filter((v) => v.id !== id)]);
    }
  };

  const showDownload = async (e: MouseEvent | KeyboardEvent, id: number) => {
    if (e.nativeEvent instanceof KeyboardEvent) {
      if (e.nativeEvent.key !== "Enter") return;
    }

    e.preventDefault();
    await browser.downloads.show(id);
  };

  // Renders the component tree
  return (
    <div className="popup-container">
      {downloads.length > 0 ? (
        <div className="dw-wrapper">
          {downloads.map((dw: Download, i) => {
            return (
              <div className="dw" key={i}>
                <div className="icon">
                  <img src={dw.icon} width="32" height="32" />
                </div>
                <div className="info">
                  <div className="filename">
                    <a
                      href="#"
                      className="truncate"
                      onClick={(e) => openFile(e, dw.id)}
                    >
                      {dw.filenameOnly}
                    </a>
                  </div>
                  <div className="filepath">
                    <span className="truncate">{dw.filename}</span>
                  </div>
                  <div className="filesize">{dw.fileSize / 1000} KB</div>
                </div>
                <div className="actions">
                  <div
                    className="button"
                    role="button"
                    tabIndex={0}
                    onClick={(e) => removeDownload(e, dw.id)}
                    onKeyDown={(e) => removeDownload(e, dw.id)}
                  >
                    <img src={removeIconPath} width="16px" height="16px" />
                  </div>
                  <div
                    className="button"
                    role="button"
                    tabIndex={0}
                    onClick={(e) => showDownload(e, dw.id)}
                    onKeyDown={(e) => showDownload(e, dw.id)}
                  >
                    <img src={folderIconPath} width="16px" height="16px" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-sign">
          <h4>Empty</h4>
        </div>
      )}
    </div>
  );
};
