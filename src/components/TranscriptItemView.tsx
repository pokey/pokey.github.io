import React from "react";
import { TranscriptItem } from "../typings/Video";
import { formatDuration } from "../util/duration";

type Props = {
  item: TranscriptItem;
  isHighlighted: boolean;
};

export default function TranscriptItemView({ item, isHighlighted }: Props) {
  return (
    <a
      id={item.id}
      href={`#${item.id}`}
      className={
        (isHighlighted
          ? "border-purple-400 dark:border-purple-600 border-2"
          : "") + " block bg-stone-200 dark:bg-stone-800 p-2 max-w-prose "
      }
    >
      <h3
        className={
          isHighlighted
            ? "text-lg"
            : "text-sm text-stone-600 dark:text-stone-400"
        }
      >
        <span
          className={
            (isHighlighted
              ? "text-sm dark:text-purple-500"
              : "text-xs dark:text-purple-600") +
            " inline-block mr-1 hover:text-purple-500 text-purple-800 dark:hover:text-purple-300"
          }
        >
          <a href={`#${item.id}`}>{formatDuration(item.startOffset)}</a>
        </span>
        <span>{item.phrase}</span>
      </h3>
      {isHighlighted ? <CommandList item={item} /> : null}
    </a>
  );
}
type CommandListProps = {
  item: TranscriptItem;
};
function CommandList({ item }: CommandListProps) {
  return (
    <ol className="text-sm px-2 text-stone-800 dark:text-stone-200">
      {item.commands.map((command) => (
        <li>
          {command.phrase}:{" "}
          {command.isCursorlessCommand ? (
            <em>cursorless command</em>
          ) : (
            <a
              href={command.ruleUri}
              target="_blank"
              className="font-mono bg-stone-300 dark:bg-stone-700 hover:bg-blue-300 text-blue-500 dark:text-blue-400 inline-block px-[2px] my-[2px] rounded"
            >
              {command.grammar}
            </a>
          )}
        </li>
      ))}
    </ol>
  );
}
