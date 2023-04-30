import bsky from '@atproto/api';

// getProfile

type GetFirehoseParams = {
  agent: bsky.BskyAgent,
  params?: any
  opts?: any
}

// com.atproto.sync.subscribeRepos
// https://github.com/bluesky-social/atproto/blob/main/lexicons/com/atproto/sync/subscribeRepos.json

export async function getRepos(funcParams: GetFirehoseParams) {
  const { agent, opts } = funcParams;
  let { params } = funcParams;

  const actor = agent.session!.did;
  console.log('agent.session.did', actor)
  params = {
    ...params,
    limit: 10,
  }

  const response = await agent.com.atproto.sync.listRepos(params)
  console.log('response', response)
  const items = response.data.repos
  console.log('len', items.length)

  items.map((repo, idx) => {
    console.log(`[${idx}]`, repo)
  })

  return { response }

}

