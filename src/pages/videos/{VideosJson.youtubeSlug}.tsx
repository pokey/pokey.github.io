import * as React from "react";
import { graphql, PageProps } from "gatsby";
import Helmet from "react-helmet";

import { Video } from "../../typings/Video";
import VideoWithTranscript from "../../components/VideoWithTranscript";

interface DataProps {
  videosJson: Video;
}

export default function Component({
  data: { videosJson: video },
}: PageProps<DataProps>) {
  const { title } = video;
  return (
    <main className="fixed top-0 bottom-0 left-0 right-0 ">
      <Helmet bodyAttributes={{ class: "bg-slate-100 " }} />
      <div className="h-full wide:max-w-[260vh] wide:mx-auto">
        <div className="h-full p-2 max-w-[110vh] lg:max-w-[120vh] wide:max-w-none flex flex-col mx-auto">
          <title>{title}</title>
          <VideoWithTranscript video={video} />
        </div>
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
