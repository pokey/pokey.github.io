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
    <main className=" p-2 lg:py-8">
      <div className="flex flex-col p-2 pt-2 sm:mx-auto bg-slate-200 rounded-lg h-full">
        <Helmet bodyAttributes={{ class: "bg-slate-100 " }} />
        <title>{title}</title>
        <h1 className="text-2xl text-center mt-0 mb-2">
          {title}{" "}
          <a
            className="text-sm mb-1 inline-block align-middle hover:text-purple-600 text-purple-800"
            href={`https://youtu.be/${youtubeSlug}`}
            target="_blank"
          >
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </a>
        </h1>
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
