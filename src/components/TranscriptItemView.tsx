import * as React from "react";
import { TranscriptItem } from "../typings/Video";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  item: TranscriptItem;
  isHighlighted: boolean;
};

export default function TranscriptItemView({ item, isHighlighted }: Props) {
  const border = isHighlighted ? "border-purple-400" : "border-slate-300";
  return (
    <div
      id={item.id}
      className={`bg-slate-200 rounded-lg p-2 ${border} border-2 max-w-prose border-solid`}
    >
      <h3 className="text-lg">
        <span>{item.phrase}</span>
        <span className="text-xs mb-1 ml-1 inline-block align-middle hover:text-purple-500 text-purple-800">
          <a href={`#${item.id}`}>
            <FontAwesomeIcon icon={faLink} />
          </a>
        </span>
      </h3>
      <ol className="text-sm px-2 text-slate-800">
        {item.commands.map((command) => (
          <li>
            {command.phrase}:{" "}
            {command.isCursorlessCommand ? (
              <em>cursorless command</em>
            ) : (
              <a
                href={command.ruleUri}
                target="_blank"
                className="font-mono bg-slate-350 hover:bg-blue-300 text-blue-700 inline-block px-[2px] rounded"
              >
                {command.grammar}
              </a>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
