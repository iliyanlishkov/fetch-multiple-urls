import fetch from "node-fetch";

// Extending a little bit the error object to provide more information for the errors
class HTTPResponseError extends Error {
	constructor(response, ...args) {
		super(`HTTP Error Response: ${response.status} ${response.statusText}`, ...args);
		this.response = response;
	}
}

// check the status of the response
const checkStatus = response => {
	if (response.ok) {
		// response.status >= 200 && response.status < 300
		return response;
	} else {
		throw new HTTPResponseError(response);
	}
}

// parse the response and throw an error if it can't be parsed. We are doing this to have a separate error for this scenario
const parseRes = async (res) => {
	try {
		return await res.json()
	} catch (err) {
		throw new Error(`The response from '${res.url}' can't be parsed in JSON format!`);
	}
}


// check if the string is valid url
const isValidUrlString = urlString => {
	let urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
		'(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
	return !!urlPattern.test(urlString);
}

// accepts array with objects each with url and options as keys [{url: "", options: {}}];
// The url key is mandatory 
// The options key is optional
// If the response if not of type JSON, an error will be thrown!
const requestMultipleUrls = async (...urls) => {
	// argument validations
	if (urls.length === 0) throw new Error("Expected one argument of type array but none was passed!");
	if (urls.length > 1) throw new Error("The function accepts only a single argument of type array! More than one argument was passed!");
	if (!Array.isArray(urls[0])) throw new Error("The passed argument must be of type of array!");
	if (urls[0].length === 0) throw new Error("The array argument must contain at least one object with 'url' as key with value of type string!");

	for (let i = 0; i < urls[0].length; i++) {
		if (typeof urls[0][i] !== "object" || urls[0][i] === null) {
			throw new Error("The array must contain only objects!");
		}

		if (!urls[0][i].hasOwnProperty("url") || !isValidUrlString(urls[0][i].url)) {
			throw new Error("Each object in the array must have a 'url' key with value of type string!");
		}

		if (urls[0][i].hasOwnProperty("options") && (typeof urls[0][i].options !== "object" || urls[0][i].options === null)) {
			throw new Error("The 'options' key of the object must have an object as a value!");
		}
	}

	// fetch the urls
	return await Promise.all(
		urls[0].map((reqPair) =>
			fetch(reqPair.url, (reqPair.options ? reqPair.options : {}))
				.then(checkStatus)
				.then(parseRes)
		)
	).catch(err => {
		// it will catch all errors and status codes different than 2.X.X and if response.json() fails in case the response couldn't be converted to json.
		if (err instanceof HTTPResponseError) {
			throw err;
		} else {
			throw new Error(err);
		}
	});
}

export default requestMultipleUrls;