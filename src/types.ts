
// embed images

import { BskyAgent } from "@atproto/api";

export type MakeEmbedParams = {
  agent: BskyAgent;
  imageUrl: string;
  imageAlt?: string
  encoding?: string;
}

export type ImageItem = {
  image: any
  alt: string
}

export type ImageEmbed = {
  $type: "app.bsky.embed.images"
  images: ImageItem[]
}
