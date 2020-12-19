import React, {
  FunctionComponent,
  useEffect,
  useState,
  MouseEvent,
} from "react";
import { browser, Downloads } from "webextension-polyfill-ts";
import { Download } from "../types";
import * as repo from "../storage";
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

  const openFile = async (e: MouseEvent, id: number) => {
    e.preventDefault();
    await browser.downloads.open(id);
  };

  const removeDownload = async (e: MouseEvent, id: number) => {
    e.preventDefault();

    if (repo.has(id)) {
      await repo.remove(id);
      await browser.downloads.erase({ id: id });
      setDownloads((prevState) => [...prevState.filter((v) => v.id !== id)]);
    }
  };

  const showDownload = async (e: MouseEvent, id: number) => {
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
                <div className="dw-info">
                  <img src={dw.icon} width="32" height="32" />
                  <div className="dw-b">
                    <span className="filename truncate">
                      <a href="" onClick={(e) => openFile(e, dw.id)}>
                        {dw.filenameOnly}
                      </a>
                    </span>
                    <span className="filepath truncate">{dw.filename}</span>
                    <span className="filesize">{dw.fileSize / 1000} KB</span>
                  </div>
                </div>

                <div className="dw-actions">
                  <div
                    className="btn"
                    onClick={(e) => removeDownload(e, dw.id)}
                  >
                    ❌
                  </div>
                  <div className="btn" onClick={(e) => showDownload(e, dw.id)}>
                    📁
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
