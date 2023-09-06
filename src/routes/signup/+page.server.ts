import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';

import { config } from '../../utils/config';

export const actions = {
	OAuth2: async () => {
		const client = new OAuth2Client(
			config.oAuthClientID,
			config.oAuthclientSecret,
			config.oAuthCallbackUrl
		);
		const url = client.generateAuthUrl({
			access_type: 'offline',
			scope: config.scopes,
			prompt: 'consent'
		});

		throw redirect(302, url);
	}
};
