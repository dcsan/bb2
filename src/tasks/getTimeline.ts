import bsky from '@atproto/api';

import { paginateAll, formatPost } from '../utils/atHelpers.js';

type GetTimelineParams = {
  agent: bsky.BskyAgent,
  params?: any
  opts?: any
  actor?: string
  did?: string,
}

export async function getTimeline(funcParams: GetTimelineParams) {
  const { params, agent, opts, did } = funcParams;
  const actor = did || agent.session!.did!;
  console.log('getTimeline did:', did)

  const paginator = async (cursor?: string) => {
    const res = await agent.getAuthorFeed({
      actor: actor!,
      cursor,
      limit: 100,
    });
    return res.data;
  };

  const paginatedAll = await paginateAll(paginator);

  const posts: object[] = [];

  paginatedAll.forEach((res) => {
    if (typeof res.feed[0] !== 'undefined') {
      posts.push(
        ...res.feed.map((e) => {
          return (formatPost(e, actor!));
        }
        ));
    }
  });

  console.log('posts', posts?.length)
  return { posts }

}

