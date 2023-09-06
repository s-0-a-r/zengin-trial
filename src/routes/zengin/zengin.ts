import zenginCode from "zengin-code";

export const bankList = Object.keys(zenginCode).map((key) => zenginCode[key]);
export type Bank = typeof bankList[number];
