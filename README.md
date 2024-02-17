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
"start": "tsx ./src/requestor.ts",
"start:node": "node ./dist/requestor.js", // Runs task on Golem Testnet (requires compilation)
"compile": "tsc", // Compiles (used for local development)
"image:build": "docker build --progress=plain -t lordevendim/simgolem-simulation:latest .", // Build docker image
"image:publish": "gvmkit-build --push lordevendim/simgolem-simulation:latest", // Push image to Golem Registry
"build:executor": "tsup src/requestor.ts",
"build:task": "tsup src/task.ts", // Bundles task used in Dockerimage
"publish": "yarn run compile && yarn run image:build && yarn run image:publish", // Pushes object to
"generate": "yarn build:task && node ./dist/task.js" // Generate gif locally
```
