import bsky from '@atproto/api';

import { paginateAll } from '../utils/atHelpers.js';

type GetTimelineParams = {
  agent: bsky.BskyAgent,
  params?: any
  opts?: any
  actor?: string
}

export async function getTimeline(funcParams: GetTimelineParams) {
  const { agent, opts } = funcParams;
  let { params, actor } = funcParams;

  // const res2 = await agent.com.atproto.repo.listRecords({
  //   repo: alice.did,
  //   collection: 'app.bsky.feed.post'
  // })

  actor = agent.session!.did!;

  params = {
    ...params,
    algorithm: 'reverse-chronological'
  }

  const timeline = await agent.getTimeline(
    params,
    opts
  )

  console.log('timeline', timeline)

  const paginator = async (cursor?: string) => {
    console.log('actor', actor)

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
        ...res.feed.map((e) => ({
          text: (e.post.record as any).text,
          uri: e.post.uri.replace('app.bsky.feed.', '').replace('at://', 'https://staging.bsky.app/profile/'),
          likeCount: e.post.likeCount,
          did: e.post.author.did,
          handle: e.post.author.handle,
          isOwn: e.post.author.did === actor,
          repostCount: e.post.repostCount,
          isRepost: e.post.repostCount === 0 ? false : true,
          createdAt: (e.post.record as any).createdAt,
        })),
      );
    }
  });

  console.log('posts', posts)

  return { posts }

}

