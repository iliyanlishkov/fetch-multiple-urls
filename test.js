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