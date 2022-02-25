import * as React from "react";
import { graphql, PageProps } from "gatsby";
import Helmet from "react-helmet";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Video } from "../../typings/Video";
import TranscriptItemComponent from "../../components/TranscriptItem";

interface DataProps {
  videosJson: Video;
}

export default function Component({
  data: { videosJson },
}: PageProps<DataProps>) {
  const { youtubeSlug, title } = videosJson;
  return (
    <main className="p-4 pt-3 max-w-prose sm:mx-auto bg-slate-200 rounded-lg">
      <Helmet bodyAttributes={{ class: "bg-slate-100 p-2 sm:p-6 md:py-8" }} />
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
      <div className="grid grid-cols-1 gap-2">
        {videosJson.transcript.map((item) => (
          <TranscriptItemComponent item={item} />
        ))}
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
        startTimecode
        endTimecode
      }
      title
    }
  }
`;