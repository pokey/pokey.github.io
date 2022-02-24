import * as React from "react";
import { graphql, PageProps } from "gatsby";

interface DataProps {
  videosJson: { youtubeSlug: string };
}

export default function Component({
  data: { videosJson },
}: PageProps<DataProps>) {
  return <main className="text-2xl">{videosJson.youtubeSlug}</main>;
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
