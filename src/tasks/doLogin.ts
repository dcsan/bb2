import process from 'node:process';
import * as dotenv from 'dotenv';
import bsky from '@atproto/api';

dotenv.config();

const { BskyAgent } = bsky;

const agent: bsky.BskyAgent = new BskyAgent({
  service: 'https://bsky.social',
});

async function doLogin() {

  const loginConfig = {
    identifier: process.env.BOT_HANDLE!,
    password: process.env.BOT_PASSWORD!,
  }
  // console.log('loginConfig', loginConfig)

  await agent.login(loginConfig);
  return agent
}

export { agent, doLogin }
