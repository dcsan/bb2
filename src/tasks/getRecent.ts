import bsky from '@atproto/api';


type GetTimelineParams = {
  agent: bsky.BskyAgent,
  params?: any
  opts?: any
  actor?: string
}

export async function getRecent(funcParams: GetTimelineParams) {
  const { agent, opts } = funcParams;
  let { params, actor } = funcParams;
  actor = agent.session!.did!;

  const items = await agent.getAuthorFeed({
    actor: actor!,
    cursor,
    limit: 5,
  });

  const posts: object[] = [];

  items.forEach((res) => {
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

