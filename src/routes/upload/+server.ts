import service from '$lib/service';
import stream, { Readable } from 'stream';
import {
	collectAsyncIterable,
	convertBase64Uint8ArrayToImageData,
	streamToAsyncIterable
} from '../../utils/helpers';

export async function POST({ request }) {
	const body = await request.body;
	const drive = service();
	const folderId = import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID;
	const ok = await streamToAsyncIterable(body!);
	const asyncIterableBody = stream.Readable.from(ok);
	const content = await collectAsyncIterable(asyncIterableBody);

	const final = convertBase64Uint8ArrayToImageData(content);
	const base64ImageSplit = final.split(';base64,').pop();
	const imageBuffer = Buffer.from(base64ImageSplit ?? '', 'base64');

	const imageStream = new Readable();
	imageStream.push(imageBuffer);
	imageStream.push(null);

	const file = await drive.files.create({
		media: { mimeType: 'image/*', body: imageStream },
		fields: 'id, name, webViewLink',
		requestBody: {
			name: 'aaa.jpeg',
			parents: [folderId]
		}
	});

	const fileId = file.data.id;
	await drive.permissions.create({
		fileId: fileId ?? '',
		requestBody: {
			role: 'reader',
			type: 'anyone'
		}
	});

	console.log(file.data);

	return new Response(JSON.stringify({ fileId }), {
		status: 200
	});
}
