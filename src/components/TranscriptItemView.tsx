import * as React from "react";
import { TranscriptItem } from "../typings/Video";

type Props = {
  item: TranscriptItem;
  isHighlighted: boolean;
};

export default function TranscriptItemView({ item, isHighlighted }: Props) {
  const className = isHighlighted ? "text-slate-900" : "text-slate-500";
  return (
    <div id={item.id} className={className}>
      {item.phrase}
    </div>
  );
}
