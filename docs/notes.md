
## ESM hassles

type system is only useable with ts-node-esm

```
src/index.ts:12:9 - error TS2339: Property 'BskyAgent' does not exist on type 'typeof AtpAgent'.

12 const { BskyAgent } = bsky;
           ~~~~~~~~~
```
