import bsky from '@atproto/api';
import { MakeEmbedParams } from '../types.js';
import { agent } from './doLogin.js';
import { makeEmbed } from '../utils/atp/makeEmbed.js';

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


export async function doImage(opts: PostParams) {
  const { agent } = opts;

  // const imagePath = './testdata/test-cat.jpg'
  // const imagePath = './testdata/slice.png'
  const imagePath = './testdata/test.png'

  const params: MakeEmbedParams = {
    agent,
    imageUrl: imagePath
  }
  const embed = await makeEmbed(params)
  const text = '[test] image post';

  const response = await agent.post({
    text,
    embed
  });
  return { response }
}

