In the dynamic world of cryptocurrency, staying atop price shifts is essential. Dive into this tutorial to craft your own custom price alert bot, capable of monitoring thousands of tokens across multiple crypto networks. This tutorial will provide you with a vital tool that can be used to stay on top of your crypto investments.

## Getting Started

In this tutorial we will be using NodeJS + Typescript to build our bot. To get your environment setup create a new folder and open a terminal inside of it. Then execute the following commands:
- `npm init --y`: To setup your node environment and use all defaults
- `tsc --init`: To setup your Typescript environment
- `npm install axios`: To import the axios library for making get requests to crypto pricing APIs

## Price API and Setting up Utils

Before getting started we need access to an API that will allow us to fetch prices from crypto DEX pools. The best API that I've found for this is the GeckoTerminal API as it provides pricing data for millions of tokens across over 100 crypto networks. Visit their website to get an understanding of what you can do with it and what the API responses look like. This isn't necessary, but will help you in the future if you'd like to extend functionality for this bot.

To start we will create a `utils.ts` file which will include some useful functions that we will use throughout the project:
- `saveObject()`: To save alert data as JSON objects
- `loadObject()`: To load alert data as JSON objects
- `fetchTokenPrice()`: To fetch prices from the GeckoTerminal API
### 1. Loading data from files `loadObject()`
```typescript
export async function loadObject(fileName: string) {
  try {
    // Construct the path to the file
    const path = `./output/${fileName}`;
    
    // Read data from the file
    const data = fs.readFileSync(path, {encoding: 'utf8'});
    
    // Parse and return the JSON data
    return JSON.parse(data);
  } catch (err) {
    console.log("loading error");
    console.log(err);
    return [];
  }
}
```

- The function accepts the filename as an argument.
- It constructs the path to the file (assuming the file is in an `output` directory).
- The `fs.readFileSync` method reads the file synchronously, returning its content as a string.
- This string is then parsed into a JavaScript object using `JSON.parse()`.
- If there's any error during this process (like if the file doesn't exist), the function logs the error and returns an empty array.
### 2. Saving data to files: `saveObject()`
```typescript
export async function saveObject(fileName: string, data: Object, dir?: string) {
  try {
    // Determine the directory for saving/loading, default is 'output'
    const path = `./${dir ? dir : 'output'}/${fileName}`;
    
    // Save the object as a stringified JSON to the file
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
  } catch (err) {
    console.log(err);
    console.log("saving error");
  }
}
```

- The function takes in a filename, the data to be saved (as an object), and an optional directory name.
- It constructs the path to the file. If no directory is provided, it defaults to the `output` directory.
- The `JSON.stringify(data, null, 2)` method is used to convert the JavaScript object into a formatted JSON string.
- The `fs.writeFileSync` method then writes this string to the specified file.
- Any errors during this process are logged to the console.
### 3. Introducing Delays: `sleep()`
```typescript
export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

- This is a simple utility function to introduce delays in asynchronous functions.
- It takes in a duration in milliseconds.
- The function returns a Promise that resolves after the specified duration, effectively "sleeping" or pausing the execution for that time.
- This can be useful, for example, to avoid hitting rate limits when making rapid API calls.
### 4. Fetching Token Price: `fetchTokenPrice()`
```typescript
export const fetchTokenPrice = async (
  poolAddress: string,
  network: string = "eth"
): Promise<number> => {
  try {
    // Construct the URL for the API call
    const url = new URL(`https://api.geckoterminal.com/api/v2/networks/${network}/pools/${poolAddress.toLowerCase()}`);
    
    // Make the GET request to fetch data
    const req = await axios.get(url.toString());
    
    // Extract the token price from the response and return
    const price = req.data.data.attributes.base_token_price_usd;
    return price;
  } catch (e) {
    console.log(e);
    return -1;
  }
}
```

- This function is designed to fetch the current price of a token.
- It takes in the token's pool address and its network (defaulting to "eth" or Ethereum).
- A URL is constructed to make an API call to `geckoterminal.com` for the token's data.
- The function uses the `axios` library to make the GET request.
- Once the data is fetched, the function extracts the token price (in USD) from the response and returns it.
- If there's any error (like if the token doesn't exist or there's a network issue), the function logs the error and returns `-1` as an indicator of failure.
## Building the alerts

Now that we have our util methods setup we can move on to the core of the price alerts. To start create an `alert.ts` file in your project directory. The `alert.ts` file primarily consists of three main functions:

- `newAlert()`: To create and save a new price alert.
- `deleteAlert()`: To remove an existing alert.
- `checkAlerts()`: To monitor all the saved alerts and notify if any conditions are met.
### 1. Setting up newAlert()
```typescript
export const newAlert = async (
  tokenSymbol: string,
  poolAddress: string,
  network: string,
  price: number,
  alertType: "above" | "below" = "above"
): Promise<ALERT_DATA> => {
  // Load alerts from file
  let alerts = await loadObject("alerts.json") || {};

  // Create a unique title for the alert
  const title = `${tokenSymbol}-${alertType}-${price}`;

  // Construct the alert data
  const data: ALERT_DATA = {
    title: title,
    poolAddress: poolAddress,
    network: network,
    targetPrice: price,
    alertType: alertType,
  };

  // Update the alerts object with the new alert
  alerts[title] = data;

  // Save the updated alerts back to file
  saveObject("alerts.json", alerts);

  return data;
}
```

- This function accepts 5 parameters: the token's symbol, the pool address that has the token that you want to watch, the network it's on, the target price, and the alert type (either "above" or "below").
- `loadObject()` fetches existing alerts from the `alerts.json` file.
- A unique title for the alert is created using the token symbol, alert type, and target price.
- The new alert data is then constructed and added to the alerts object.
- Finally, the updated alerts object is saved back to the `alerts.json` file.
### 2. Setting up deleteAlert()
```typescript
export const deleteAlert = async (title: string) => {
  // load alerts file
  let alerts = await loadObject("alerts.json") || {};
  // delete the alert
  delete alerts[title];
  // save the alerts file
  saveObject("alerts.json", alerts);
}
```

- This function takes in one parameter, the title of the alert to be deleted.
- After loading the existing alerts from `alerts.json`, the function deletes the alert with the specified title.
- The updated alerts object (now without the deleted alert) is saved back to the `alerts.json` file.
### 3. Setting up checkAlerts()
```typescript
export const checkAlerts = async (deleteAlerts?: boolean) => {
  // Load all saved alerts
  const _alerts = await loadObject("alerts.json");
  const alerts: ALERT_DATA[] = Object.values(_alerts);

  // Loop through each alert
  for (const alert of alerts) {
    // Fetch the current price for the token
    let price = await fetchTokenPrice(alert.poolAddress, alert.network);
    // convert price into a Number
    price = Number(price); 
    // check if the price is valid
    if (price === -1) return;

    let message;
    if (alert.alertType === "above" && price > alert.targetPrice) {
      message = `${alert.title} is above ${alert.targetPrice}!`;
    } else if (alert.alertType === "below" && price < alert.targetPrice) {
      message = `${alert.title} is below ${alert.targetPrice}!`;
    }

    if (message) {
      console.log(message);
      if (deleteAlerts) {
        deleteAlert(alert.title);
      }
    }
  }
}
```

- This function optionally accepts a boolean `deleteAlerts` that determines whether an alert should be deleted after it's triggered.
- It begins by loading all saved alerts from `alerts.json`.
- For each alert, the function fetches the current price of the associated token.
- If the fetched price meets the alert's condition (either above or below the target price), a message is constructed.
- If a valid message exists (meaning the alert's condition was met), the message is logged to the console.
- If the `deleteAlerts` flag is true, the alert that was triggered is then deleted.

## Running the Alerts

Now that he have code that will allow us to create, delete, and check alerts, we now need to be able to run our code to keep track of prices and alert us if one of our alerts is triggered. To do this we will first create a new file named `main.ts`, which will consist of three methods
### 1. Creating a New Alert: `createNewAlert()`
```typescript
const createNewAlert = async () => {
  newAlert(
    "wUSDR", 
    "0x3fc28bfac25fc8e93b5b2fc15efbbd5a8aa44efe", 
    "base", 
    1.0748, 
    "below"
  );
}
```

- The function `createNewAlert` is defined to set up a new alert.
- It calls the `newAlert()` function from the `alert` module with predefined parameters:
    - **Token Symbol**: "wUSDR"
    - **Pool Address**: "0x3fc28bfac25fc8e93b5b2fc15efbbd5a8aa44efe"
    - **Network**: "base"
    - **Target Price**: 1.0748
    - **Alert Type**: "below" (this means the alert should trigger when the price goes below 1.0748)
### 2. The Core Execution Loop: `run()`
```typescript
const run = async () => {
  while (true) {
    await checkAlerts(true);
    await sleep(15000);
  }
}
```

- The function `run` is an infinite loop, ensuring the bot keeps running indefinitely.
- Within the loop, the bot does the following:
    - Calls `checkAlerts(true)`, which checks all the alerts. The `true` argument implies that if an alert's conditions are met, it should be deleted after being triggered.
    - The bot then "sleeps" for 15 seconds (15000 milliseconds) using the `sleep()` function. This is done to avoid making too many rapid requests and potentially hitting any rate limits.
### 3. Orchestrating the Bot: `main()`
```typescript
const main = async () => {
  // await createNewAlert();
  await run();
}

main();
```

- The `main` function is the primary orchestrator of the bot's execution.
- Inside this function, the `createNewAlert()` function is commented out. If uncommented, it would set up a new alert every time the bot starts.
- The `run()` function is called, which begins the core loop of checking alerts and waiting.
- Finally, invoking `main()` at the bottom of the script starts the bot.

The final `main.ts` file should look like this:

```typescript
import { sleep } from "./utils";
import { checkAlerts, newAlert } from "./alert";

const createNewAlert = async () => {
  newAlert(
    "wUSDR", 
    "0x3fc28bfac25fc8e93b5b2fc15efbbd5a8aa44efe", 
    "base", 
    1.0748, 
    "below"
  );
}

const run = async () => {
  while (true) {
    await checkAlerts(true);
    await sleep(15000);
  }
}


const main = async () => {
  // await createNewAlert();
  await run();
}

main();
```

The first two lines of the file import the methods that we've created in the `utils.ts` and `alert.ts` files. Whenever we want to create a new alert all we have to do is update the parameters in the `createNewAlert()` method in the and uncomment the `await createNewAlert()` line.

## Conclusion

Congratulations on completing this comprehensive journey into building your custom price alert bot! With the skills you've honed, you now possess a powerful tool that offers timely insights across a vast array of crypto networks and tokens. Happy trading, and may your alerts always keep you informed and ready!