import * as React from "react";
import { TranscriptItem } from "../typings/Video";

type Props = {
  item: TranscriptItem;
};

export default function TranscriptItemView({ item }: Props) {
  return <div>{item.phrase}</div>;
}
