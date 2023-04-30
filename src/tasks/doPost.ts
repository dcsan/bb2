import bsky from '@atproto/api';

type PostParams = {
  agent: bsky.BskyAgent,
  params?: any
  opts?: any
  config?: any
  did?: string
}

const config = {
  uri: 'https://staging.bsky.app/profile/dcsan.xyz',
}


export async function doPost(opts: PostParams) {
  const { agent } = opts;

  const bleet = '[test] Hello API v3 @dcsan.xyz';

  const response = await agent.post({
    text: bleet,
    facets: [
      {
        index: {
          byteStart: bleet.indexOf('API'),
          byteEnd: bleet.indexOf('API') + 3
        },
        features: [
          {
            $type: 'app.bsky.richtext.facet#link',
            uri: config.uri,
          }
        ]
      }
    ],
    embed: {
      $type: 'app.bsky.embed.external',
      external: {
        uri: config.uri,
        title: "DCsan.xyz",
        description: "DCsan's profile page",
      },
    },
  });
  return {
    response,
  }
}

