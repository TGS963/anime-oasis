import service from '$lib/service';

export async function POST({ request }) {
	const data = await request.json();
	const drive = service();
	const { fileId, ...body } = data;
	await drive.files.update({
		fileId: fileId,
		requestBody: body
	});
	return new Response('Success', {
		status: 200
	});
}
