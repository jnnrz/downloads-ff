import { browser, Downloads } from "webextension-polyfill-ts";
import { Download } from "./types";

export const has = async (id: number): Promise<boolean> => {
  const rs = await browser.storage.local.get(id.toString());
  return rs ? true : false;
};

export const get = async (id: number): Promise<Download> => {
  const rs = await browser.storage.local.get(id.toString());
  return rs[id];
};

/**
 * Retrieves all the downloads that were completed
 */
export const allGood = async (): Promise<Download[]> => {
  const rs = await browser.storage.local.get();
  const keys = Object.keys(rs);
  const resultList = [];

  for (const key of keys) {
    if (rs[key].state === "complete") {
      resultList.push(rs[key]);
    }
  }
  return resultList;
};

export const set = async (dw: Download): Promise<void> => {
  try {
    await browser.storage.local.set({ [dw.id]: dw });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const remove = async (id: number): Promise<void> => {
  try {
    await browser.storage.local.remove(id.toString());
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const clear = async (): Promise<void> => {
  return await browser.storage.local.clear();
};
