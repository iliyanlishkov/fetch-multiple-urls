# Fetch multiple URLS
This package contains a function that fetches the JSON content of multiple urls and returns their contents in a Promise.

## Installation
Run the following command in the terminal
```
npm install fetch-multiple-urls
```

Set the `type` to `module` in the `package.json` file.
```
{
    "type": "module"
}
```
## Documentation

The function accepts a single argument of type `array` with `objects`. Each object must containt a key `url` and it's value must be of type string which is valid `URL`. Each object could contain a second key `options` which should be of type `object` and represents the fetch options. It returns a Promise with the results.

## Usage

```js
import requestMultipleUrls from "./index.js";

const urls = [
	{
		url: 'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json'
	},
	{
		url: 'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json'
	},
	{
		url: 'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json',
		options: {
			method: "GET"
		}
	},

	// {
	// 	url: 'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd5g.json'
	// },

	// {
	// 	url: 'https://httpbin.org/status/400'
	// },

	// {
	// 	url: 'https://www.abv.bg/'
	// },

];
requestMultipleUrls(urls).then(urlContent => {
	console.log(urlContent)
});

```


## Dependencies
### node-fetch
[node-fetch](https://www.npmjs.com/package/node-fetch) is a light-weight module that brings [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to Node.js.