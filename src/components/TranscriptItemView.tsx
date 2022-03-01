import * as React from "react";
import { TranscriptItem } from "../typings/Video";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  item: TranscriptItem;
  isHighlighted: boolean;
};

export default function TranscriptItemView({
  item,
  isHighlighted,
}: Props) {
  const className = isHighlighted ? "text-slate-900" : "text-slate-500";
  return (
    <div id={item.id} className={className}>
      {item.phrase}
      <a
        className="text-xs mb-1 ml-1 inline-block align-middle hover:text-purple-600 text-purple-800"
        href={`#${item.id}`}
      >
        <FontAwesomeIcon icon={faLink} />
      </a>
    </div>
  );
}
