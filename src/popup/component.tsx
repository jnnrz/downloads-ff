import React, {
  FunctionComponent,
  useEffect,
  useState,
  MouseEvent,
} from "react";
import { browser } from "webextension-polyfill-ts";
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
    if (
      (e as KeyboardEvent).key !== undefined &&
      (e as KeyboardEvent).key !== "Enter"
    )
      return;

    e.preventDefault();
    await browser.downloads.open(id);
  };

  const removeDownload = async (e: MouseEvent, id: number) => {
    if (
      (e as KeyboardEvent).key !== undefined &&
      (e as KeyboardEvent).key !== "Enter"
    )
      return;

    e.preventDefault();

    if (repo.has(id)) {
      await repo.remove(id);
      await browser.downloads.erase({ id: id });
      setDownloads((prevState) => [...prevState.filter((v) => v.id !== id)]);
    }
  };

  const showDownload = async (e: MouseEvent | KeyboardEvent, id: number) => {
    if (
      (e as KeyboardEvent).key !== undefined &&
      (e as KeyboardEvent).key !== "Enter"
    )
      return;

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
                    <a href="#" onClick={(e) => openFile(e, dw.id)}>
                      {dw.filenameOnly}
                    </a>
                  </div>
                  <div className="ds">
                    <div className="filepath">{dw.filename}</div>
                    <div className="actions">
                      <div
                        className="button"
                        role="button"
                        tabIndex={0}
                        onClick={(e) => showDownload(e, dw.id)}
                        onKeyDown={(e) => showDownload(e, dw.id)}
                      >
                        <span role="img" aria-label="open download">
                          📁
                        </span>
                      </div>
                      <div
                        className="button"
                        role="button"
                        tabIndex={0}
                        onClick={(e) => removeDownload(e, dw.id)}
                        onKeyDown={(e) => removeDownload(e, dw.id)}
                      >
                        <span role="img" aria-label="delete download">
                          ❌
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="filesize">{dw.fileSize / 1000} KB</div>
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
