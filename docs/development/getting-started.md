# 💻 development

this project uses node.js and the twitter api v2 client.

## prerequisites

before you begin, ensure you have:

- node.js (v20 recommended)
- npm
- git
- x developer account and api credentials

## setting up local development

1. clone the repository:
   ```bash
   git clone https://github.com/captradeoff/x-post-action.git
   cd x-post-action
   ```

2. install dependencies:
   ```bash
   npm install
   ```

3. for testing with actual api calls, create a `.env` file:
   ```bash
   cp .env.sample .env
   ```
   
4. edit the `.env` file to add your x api credentials

## project structure

- `index.js`: main entry point
- `action.yaml`: github action definition
- `index.test.js`: unit tests
- `integration.test.js`: api integration tests
- `integration-action.test.js`: action function tests
- `dist/`: compiled action code

## building the action

the action uses @vercel/ncc to compile the node.js code and dependencies into a single file:

```bash
npm run build
```

this will create a `dist/index.js` file that is referenced in `action.yaml`.

## development workflow

1. make changes to the code
2. update or add tests to cover your changes
3. run tests to ensure everything works:
   ```bash
   npm test
   ```
4. build the action:
   ```bash
   npm run build
   ```
5. commit and push your changes
6. create a pull request 