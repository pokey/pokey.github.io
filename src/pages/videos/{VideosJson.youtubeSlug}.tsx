import * as React from "react";
import { graphql, PageProps } from "gatsby";
import Helmet from "react-helmet";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Video } from "../../typings/Video";
import TranscriptItemView from "../../components/TranscriptItemView";
import YouTube from "react-youtube";
import VideoWithTranscript from "../../components/VideoWithTranscript";

interface DataProps {
  videosJson: Video;
}

export default function Component({
  data: { videosJson },
}: PageProps<DataProps>) {
  const { youtubeSlug, title } = videosJson;
  return (
    <main className="fixed top-0 bottom-0 left-0 right-0 p-2 lg:p-4 xl:p-6">
      <Helmet bodyAttributes={{ class: "bg-slate-100 " }} />
      <div className="h-full max-w-[110vh] lg:max-w-[130vh] wide:max-w-none flex flex-col p-2 mx-auto bg-slate-200 rounded-lg">
        <title>{title}</title>
        <VideoWithTranscript video={videosJson} />
      </div>
    </main>
  );
}

// This is the page query that connects the data to the actual component. Here you can query for any and all fields
// you need access to within your code. Again, since Gatsby always queries for `id` in the collection, you can use that
// to connect to this GraphQL query.

export const query = graphql`
  query ($id: String!) {
    videosJson(id: { eq: $id }) {
      youtubeSlug
      transcript {
        commands {
          phrase
          grammar
          isCursorlessCommand
          ruleUri
        }
        id
        phrase
        startOffset
        endOffset
      }
      title
    }
  }
`;
