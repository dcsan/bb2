import bsky from '@atproto/api';

type GetFirehoseParams = {
  agent: bsky.BskyAgent,
  params?: any
  opts?: any
}

// com.atproto.sync.subscribeRepos
// https://github.com/bluesky-social/atproto/blob/main/lexicons/com/atproto/sync/subscribeRepos.json


export async function getRepos(funcParams: GetFirehoseParams) {
  const { agent } = funcParams;
  let { params } = funcParams;

  params = {
    ...params,
    limit: 3,
  }

  const response = await agent.com.atproto.sync.listRepos(params)
  // console.log('response', response)
  const items = response.data.repos
  console.log('len', items.length)

  const repoList: any[] = []
  let idx = 0
  for (const repo of items) {
    // console.log(`[${idx}]`, repo)
    const result = await agent.com.atproto.repo.describeRepo({ repo: repo.did })
    const info = ({
      index: idx++,
      handle: result.data.handle,
      // data: result.data,
      repo,
    })
    console.log('info:', JSON.stringify(info, null, 2))
    repoList.push(info)
  }

  console.log('repoList', repoList)

  return { response }

}

