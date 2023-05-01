import { doLogin } from './tasks/doLogin.js';

import { doPost } from './tasks/doPost.js';
// import { getTimeline } from './tasks/getTimeline.js';
// import { getProfile } from './tasks/getProfile.js';
import { getRecent } from './tasks/getRecent.js';
import { getRepos } from './tasks/getRepos.js';
import { getByHandle, User } from './data/users.js';
import { getTimeline } from './tasks/getTimeline.js';


async function main() {
  const agent = await doLogin()

  const params = {}
  const opts = {}
  const func = getRepos
  // const func = getTimeline
  // const func = getRecent
  // const func = doPost
  const user: User = getByHandle('pfrazee.com')
  const did = user.repo.did

  func({ agent, params, opts, did }).then(res => {
    // console.log('done', res)
  }).catch(err => {
    console.log('err', err)
  })
}

main()
