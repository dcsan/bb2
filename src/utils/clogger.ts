const verbose = true

export const clog = {
  log: (...args: any[]) => {
    const msg = args.shift()
    if (verbose) console.log(msg, JSON.stringify(args, null, 2))
  }
}
