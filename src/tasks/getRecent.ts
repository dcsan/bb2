import bsky from '@atproto/api';
import { formatPost } from '../utils/atHelpers.js';


type GetTimelineParams = {
  agent: bsky.BskyAgent,
  params?: any
  opts?: any
  actor?: string
}

export async function getRecent(funcParams: GetTimelineParams) {
  const { params, agent, opts } = funcParams;
  let { actor } = funcParams;
  actor = agent.session!.did!;

  // params = {
  //   ...params,
  //   limit: 100,
  //   algorithm: 'reverse-chronological'
  // }

  // not sure of diff timeline vs authorFeed
  // const timeline = await agent.getTimeline(
  //   params,
  //   opts
  // )
  // console.log('timeline?.data?.feed', timeline?.data?.feed?.length)


  const response = await agent.getAuthorFeed({
    actor: actor!,
    // cursor,
    limit: 5,
  });

  const posts: object[] = [];
  console.log('response', response)

  response.data.feed.forEach((e) => {
    if (typeof e !== 'undefined') {
      posts.push(formatPost(e, actor!))
    }
  });

  console.log('posts', posts)

  return { posts }

}

