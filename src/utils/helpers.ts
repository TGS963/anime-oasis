import { config } from './config';

class StatusError extends Error {
	constructor(status, title, serverMessage, ...params) {
		super(...params);
		this.status = status;
		this.statusTitle = title;
		this.serverMessage = serverMessage;
	}
}

async function checkStatus(response) {
	if (!response.ok) {
		// Throw a StatusError if a non-OK HTTP status was returned.
		let message = '';
		try {
			// Try to parse the response body as JSON, in case the server returned a useful response.
			message = await response.json();
		} catch (err) {
			// Ignore if no JSON payload was retrieved and use the status text instead.
		}
		throw new StatusError(response.status, response.statusText, message);
	}

	// If the HTTP status is OK, return the body as JSON.
	return await response.json();
}

export async function libraryApiSearch(authToken: string, parameters: object) {
	let photos: any[] = [];
	const nextPageToken = null;
	let error = null;

	parameters.pageSize = config.searchPageSize;

	try {
		// Loop while the number of photos threshold has not been met yet
		// and while there is a nextPageToken to load more items.
		do {
			console.log(`Submitting search with parameters: ${JSON.stringify(parameters)}`);

			// Make a POST request to search the library or album
			const searchResponse = await fetch(config.apiEndpoint + '/v1/mediaItems:search', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + authToken
				},
				body: JSON.stringify(parameters)
			});

			const result = await checkStatus(searchResponse);

			console.log(`Response: ${result}`);

			// The list of media items returned may be sparse and contain missing
			// elements. Remove all invalid elements.
			// Also remove all elements that are not images by checking its mime type.
			// Media type filters can't be applied if an album is loaded, so an extra
			// filter step is required here to ensure that only images are returned.
			const items =
				result && result.mediaItems
					? result.mediaItems
							.filter((x) => x) // Filter empty or invalid items.
							// Only keep media items with an image mime type.
							.filter((x) => x.mimeType && x.mimeType.startsWith('image/'))
					: [];

			photos = photos.concat(items);

			// Set the pageToken for the next request.
			parameters.pageToken = result.nextPageToken;

			console.log(`Found ${items.length} images in this request. Total images: ${photos.length}`);

			// Loop until the required number of photos has been loaded or until there
			// are no more photos, ie. there is no pageToken.
		} while (photos.length < config.photosToLoad && parameters.pageToken != null);
	} catch (err) {
		// Log the error and prepare to return it.
		error = err;
		console.error(error);
	}

	console.log('Search complete.');
	return { photos, parameters, error };
}

export async function libraryApiGetAlbums(authToken: string) {
	let albums: any[] = [];
	let error = null;

	let parameters = new URLSearchParams();
	parameters.append('pageSize', config.albumPageSize);

	try {
		// Loop while there is a nextpageToken property in the response until all
		// albums have been listed.
		do {
			console.log(`Loading albums. Received so far: ${albums.length}`);
			// Make a GET request to load the albums with optional parameters (the
			// pageToken if set).
			const albumResponse = await fetch(config.apiEndpoint + '/v1/albums?' + parameters, {
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + authToken
				}
			});

			const result = await checkStatus(albumResponse);

			console.log(`Response: ${result}`);

			if (result && result.albums) {
				console.log(`Number of albums received: ${result.albums.length}`);
				// Parse albums and add them to the list, skipping empty entries.
				const items = result.albums.filter((x) => !!x);

				albums = albums.concat(items);
			}
			if (result.nextPageToken) {
				parameters.set('pageToken', result.nextPageToken);
			} else {
				parameters.delete('pageToken');
			}

			// Loop until all albums have been listed and no new nextPageToken is
			// returned.
		} while (parameters.has('pageToken'));
	} catch (err) {
		// Log the error and prepare to return it.
		error = err;
		console.error(error);
	}

	console.info('Albums loaded.');
	return { albums, error };
}
