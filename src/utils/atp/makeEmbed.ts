import fs from 'fs'
import { ImageEmbed, MakeEmbedParams } from '../../types.js';
import { clog } from '../clogger.js';

function guessImageFormat(imageUrl: string) {
  const ext = imageUrl.split('.').pop()
  if (ext === 'png') return 'image/png'
  if (ext === 'jpg') return 'image/jpeg'
  if (ext === 'jpeg') return 'image/jpeg'
  if (ext === 'gif') return 'image/gif'
  throw new Error(`Unable to guess encoding for ${imageUrl}`)
}

/**
 * returns an image embed object from a local image file
 * @param params
 * @returns
 */
export const makeEmbed = async (params: MakeEmbedParams) => {
  let { agent, imageUrl, imageAlt, encoding } = params;
  encoding = encoding || guessImageFormat(imageUrl)
  imageAlt = imageAlt || 'image'

  const check = fs.existsSync(imageUrl)
  if (!check) {
    const msg = `Unable to find image ${imageUrl}`;
    console.error(msg);
    // FIXME dont crash in prod env if an image is missing
    throw new Error(msg);
    // return
  }
  clog.log('file exists', { imageUrl, encoding })
  const data = fs.readFileSync(imageUrl);

  // const buffer = await data.buffer
  // const data = new Uint8Array(buffer);
  // const buffer = await image.arrayBuffer();

  let bytes = new Uint8Array(data);

  clog.log('read data', {
    length: bytes.length,
    // buffer: typeof buffer,
    data: typeof data,
    bytes: typeof bytes,
  })

  // let response: any = {
  //   data: {
  //     blob: null
  //   }
  // }

  // try {
  const response = await agent.uploadBlob(
    data, { encoding: 'image/jpeg' }
  )
  if (response.success) {
    console.log("Uploaded the blob", response)
  } else {
    console.error("error uploading", response);
  }

  console.log('continue ')
  const { data: { blob: image } } = response;

  const embed: any = {
    $type: "app.bsky.embed.images",
    images: [
      {
        image,
        alt: imageAlt,
      },
    ],
  }

  clog.log('embed', embed)

  return embed

}
