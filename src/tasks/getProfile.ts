import bsky from '@atproto/api';

// getProfile

type GetProfileParams = {
  agent: bsky.BskyAgent,
  params?: any
  opts?: any
}

export async function getProfile(funcParams: GetProfileParams) {
  const { agent, opts } = funcParams;
  let { params } = funcParams;
  // console.log('getActor =>')

  const actor = agent.session!.did;
  console.log('agent.session.did', actor)

  params = {
    ...params,
    actor
  }

  const profile = await agent.getProfile(
    params,
    opts
  )

  console.log('profile', profile)

  return { response: profile }

}

