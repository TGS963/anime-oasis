import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { config } from '../../../../utils/config';
import { libraryApiSearch } from '../../../../utils/helpers';

export const GET = async ({ url }: { url: any }) => {
	const redirectURL = config.oAuthCallbackUrl;
	const code = await url.searchParams.get('code');

	try {
		const client = new OAuth2Client(config.oAuthClientID, config.oAuthclientSecret, redirectURL);

		const { tokens } = await client.getToken(code);

		console.log(tokens);
		client.setCredentials(tokens);
		const user = client.credentials;
		const data = await libraryApiSearch(user.access_token, {
			albumId: 'AFpGEba0UGkTjxD5nVjnsebInzq6KuRz2VsUNsydPYXzTq4DHPUoEZ1cdkRwOnGEytsfoalkZLnO'
		});
		console.log('photos: ', data.photos);
		console.log('Credentials: ', user);
	} catch (err) {
		console.log(err);
	}
	throw redirect(303, '/');
};
