export type Mode = "wait" | "normal" | "waitKey" | "prompt";
export type PromptItemStyle = "normal" | "primary" | "secondary";
export type LogItem = {
  ts: number;
  message: string;
};

export type PromptItem = {
  label: string;
  value: string;
  style?: PromptItemStyle;
};
