import * as dotenv from 'dotenv';
import process from 'node:process';
import bsky from '@atproto/api';
// import { doPost } from './tasks/post.js';
// import { getTimeline } from './tasks/getTimeline.js';
// import { getProfile } from './tasks/getProfile.js';
// import { getRecent } from './tasks/getRecent.js';
import { getRepos } from './tasks/getRepos.js';

dotenv.config();

const { BskyAgent } = bsky;

async function doLogin() {
  const agent: bsky.BskyAgent = new BskyAgent({
    service: 'https://bsky.social',
  });

  const loginConfig = {
    identifier: process.env.BSKY_USERNAME!,
    password: process.env.BSKY_PASSWORD!,
  }
  // console.log('loginConfig', loginConfig)

  await agent.login(loginConfig);
  return agent
}

async function main() {
  const agent = await doLogin()

  const params = {}
  const opts = {}
  const func = getRepos // getProfile // getTimeline // getRecent

  func({ agent, params, opts }).then(res => {

    // console.log('done', res)
  }).catch(err => {
    console.log('err', err)
  })
}

main()
