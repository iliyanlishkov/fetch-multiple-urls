# Fetch multiple URLS
This package contains a function that fetches array of urls and returns their contents in a Promise.

## Installation
Run the following command in the terminal
```
npm install ft-fetch-multiple-urls
```

Set the `type` to `module` in the `package.json` file.
```
{
    "type": "module"
}
```
## Documentation

The function accepts a single argument of type `array` with `strings`. Each string must be a valid `URL`. It returns a Promise with the results.

## Usage

```js
import requestMultipleUrls from "ft-fetch-multiple-urls";

const urls = [
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json',
    // 'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd5g.json',
    // 'https://httpbin.org/status/400',
    // 'https://www.abv.bg/'
];
requestMultipleUrls(urls).then(urlContent => {
    console.log(urlContent)
});

```



## Dependencies
### node-fetch
[node-fetch](https://www.npmjs.com/package/node-fetch) is a light-weight module that brings [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to Node.js.