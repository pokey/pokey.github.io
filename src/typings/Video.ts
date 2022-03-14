export interface Video {
  youtubeSlug: string;
  title: string;
  transcript: TranscriptItem[];
}

interface Command {
  phrase: string;
  grammar: string;
  isCursorlessCommand: string;
  ruleUri: string;
}

export interface TranscriptItem {
  commands: Command[];
  id: string;
  phrase: string;
  graceStartOffset: number;
  startOffset: number;
  endOffset: number;
  graceEndOffset: number;
}
