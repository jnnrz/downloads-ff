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
import { formatBytes, enterKeyFilter } from "@src/utils";

export const Popup: FunctionComponent = () => {
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    const processDownloads = async () => {
      const downloadList = await repo.allGood();
      setDownloads(downloadList.reverse());
    };

    processDownloads();
  }, []);

  const openFile = async (id: number) => {
    await browser.downloads.open(id);
  };

  const removeDownload = async (id: number) => {
    if (repo.has(id)) {
      await repo.remove(id);
      await browser.downloads.erase({ id: id });
      setDownloads((prevState) => [...prevState.filter((v) => v.id !== id)]);
    }
  };

  const showDownload = async (id: number) => {
    await browser.downloads.show(id);
  };

  const ClearAllDownloads = async () => {
    await repo.clear();
    setDownloads([]);
  };

  return (
    <div className="popup-container">
      {downloads.length > 0 ? (
        <div>
          <div
            className="clear-all"
            onClick={(e) => enterKeyFilter(e, ClearAllDownloads)}
          >
            <button>Clear all</button>
          </div>
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
                        onClick={(e) =>
                          enterKeyFilter(e, () => openFile(dw.id))
                        }
                      >
                        {dw.filenameOnly}
                      </a>
                    </div>
                    <div className="filepath">
                      <span className="truncate">{dw.filename}</span>
                    </div>
                    <div className="filesize">
                      {formatBytes(dw.fileSize, 0)}
                    </div>
                  </div>
                  <div className="actions">
                    <div
                      className="button"
                      role="button"
                      tabIndex={0}
                      onClick={(e) =>
                        enterKeyFilter(e, () => removeDownload(dw.id))
                      }
                      onKeyDown={(e) =>
                        enterKeyFilter(e, () => removeDownload(dw.id))
                      }
                    >
                      <img src={removeIconPath} width="16px" height="16px" />
                    </div>
                    <div
                      className="button"
                      role="button"
                      tabIndex={0}
                      onClick={(e) =>
                        enterKeyFilter(e, () => showDownload(dw.id))
                      }
                      onKeyDown={(e) =>
                        enterKeyFilter(e, () => showDownload(dw.id))
                      }
                    >
                      <img src={folderIconPath} width="16px" height="16px" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="empty-sign">
          <h4>Empty</h4>
        </div>
      )}
    </div>
  );
};
