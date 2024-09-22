export type Mode = "wait" | "normal" | "waitKey" | "prompt";
export type LogItem = {
  ts: number;
  message: string;
};

export type PropmtItem = {
  label: string;
  value: string;
};
