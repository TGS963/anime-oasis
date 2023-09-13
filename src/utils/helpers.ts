export async function streamToAsyncIterable(stream: ReadableStream<Uint8Array>) {
	const reader = stream.getReader();
	return {
		async *[Symbol.asyncIterator]() {
			while (true) {
				const { done, value } = await reader.read();
				if (done) return;
				yield value;
			}
		}
	};
}

export async function collectAsyncIterable(iterable: any) {
	const chunks = [];

	for await (const chunk of iterable) {
		if (iterable.isEnded) {
			// Handle the end of the stream
			break;
		}

		chunks.push(chunk);
	}

	return new Uint8Array(chunks.reduce((acc, chunk) => acc.concat(Array.from(chunk)), []));
}

export function convertBase64Uint8ArrayToImageData(base64Uint8Array: Uint8Array) {
	// 1. Decode the base64 string from the Uint8Array
	const base64String = new TextDecoder('utf-8').decode(base64Uint8Array);

	return base64String;
}
