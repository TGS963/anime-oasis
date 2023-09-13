import { google } from 'googleapis';
import { encryptedKey } from '$lib/service-account.enc';
import { decrypt } from '$lib/decrypt';

export const getDriveService = () => {
	const SCOPES = [
		'https://www.googleapis.com/auth/drive.file',
		'https://www.googleapis.com/auth/drive'
	];
	const { type, private_key, client_email, client_id, universe_domain } = JSON.parse(
		decrypt(encryptedKey)
	);
	const auth = new google.auth.GoogleAuth({
		credentials: {
			type,
			private_key,
			client_email,
			client_id,
			universe_domain
		},
		scopes: SCOPES
	});
	const driveService = google.drive({ version: 'v3', auth });
	console.log(driveService.files.list());
	return driveService;
};

export default getDriveService;
