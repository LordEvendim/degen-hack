# SimGolem - simulation

## Running

If you want to run simulation locally create following folder structure.

### Getting started

```js
-> out
    -> gif;
```

### Commands

```json
  "scripts": {
    // run task on Golem Network
    "start:node": "node ./dist/requestor.js",
    // Bundle the requestor script
    "build:executor": "tsup src/requestor.ts",
    // Build tasks to run them locally
    "build:task": "tsup src/task.ts",
    // Build and publish image to Golem registry
    "golem:push": "yarn build:task && yarn run image:build && yarn run image:publish",
    // Runs tests
    "test": "vitest"
  },
```
