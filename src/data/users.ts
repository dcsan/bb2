export type User = {
  index: number,
  handle: string,
  repo: {
    did: string,
    head: string,
  },
}


export const users: User[] = [
  {
    index: 0,
    handle: 'pfrazee.com',
    repo: {
      did: 'did:plc:ragtjsm2j2vknwkz3zp4oxrd',
      head: 'bafyreiadcro77bstknbo3bxdstcsmkrhs2nl44jtoy4serdf4dbcgnbore'
    },
    //
  },
  {
    index: 1,
    handle: 'divy.zone',
    repo: {
      did: 'did:plc:l3rouwludahu3ui3bt66mfvj',
      head: 'bafyreibelpuxufcqfdc6iwyl4swnxzxu4rkqwsbqryh5jajpp3up257gce'
    },
    //
  },
  {
    index: 2,
    handle: 'why.bsky.team',
    repo: {
      did: 'did:plc:vpkhqolt662uhesyj6nxm7ys',
      head: 'bafyreicyemnn6vmibzk6wrm2ggpevgnsi6aefob4lui64kwmk24cqnmmau'
    },
    //
  }
]

export const getByHandle = (handle: string): User => {
  const user = users.find((e) => e.handle === handle)
  if (!user) {
    throw new Error(`User not found: ${handle}`)
  }
  return user
}

