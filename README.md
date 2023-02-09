# Frontend for the "Coin." banking project

The 'server' folder should be placed separately from the 'client' folder in order to avoid constant reloads.

## What it does

- Has a login page
- Has the main dashboard with all opened accounts (you can create new accounts and sort them)
- In each account you can send money
- The default account receives 'test' transfers from the test server
- Can exchange currencies on the corresponding page
- Exchange page has a websocket feed

## Running the project

1. place the 'server' separately from the this root
2. Install all necessary dependancies in both folders

```
npm i
```

3. from the 'server' folder run

```
npm start
```

### To use dev build:

4. In the this root run

```
npm run dev
```

### To use production build:

4. Make the production build

```
npm run build
```

5. Move to /dist folder

```
cd dist
```

6. If you have [serve] package installed run

```
serve -s
```

7. Otherwise run

```
npx serve -s
```

8. Type 'y' in the terminal when promted

9. Open the localhost

You can run cypress tests with

```
npm run cypress:open
```
