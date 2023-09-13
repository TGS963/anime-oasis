import { google } from 'googleapis';
import { encryptedKey } from '$lib/service-account.enc';
import { decrypt } from '$lib/decrypt';

export const getDriveService = () => {
	const SCOPES = [
		'https://www.googleapis.com/auth/drive.file',
		'https://www.googleapis.com/auth/drive'
	];
	const credentials = decrypt(encryptedKey);
	const auth = new google.auth.GoogleAuth({
		credentials: {
			type: 'service_account',
			private_key:
				'-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCuODkX8fSSj35v\n7l931fTL4WgAy8BKQDl4s199MoyOK+Tss+XnnBmPK9/5Ba7GL2tXVTUr8FRSI5k3\nJ5BSutpDZH/iRZDOcr2B4q/mDq4nKaHHtqgy90Daz9Ex6a/5oSkQTcxujwTrf33E\nnCZPjwV7bBYdhaZ58BwCVxd8xSukjL8V6RmA31IkhtyCmWlSdOKJAlDBLIefp2UA\nIdbIJw+On511xB8q2pav4DzOpUPS34ucBRLq1CGdRD3e9jzN8MMnvz99g0IUIoBy\nKIaGXmwuW0oKpbTh9Ijwe+VJJ1X0wAdAi05Q0sG+nDQU5NXRca5yWMHNc/MijJ4x\nH9xXQY2lAgMBAAECggEABczQYHLehLyV5dhmluuUFUThUgQhLYz60iu3651HCaVT\ndJU+plnPjgZ/aTUeZEcIM1BJD2KWZA+pq6jmXfgOM9KA4WxrIucLVmt7a1TPc8qn\n3KlrlcVz2XUJZA3Wx8rs6OKLgkjCTgF2E0QW5cIqBA8NThlOJAlxh/Bp/e47LY9b\nP8SdrehBJ3i+huHpcbhMs5fh26ktGUZAnC4ZZmTpL+X6sh8bKFhyx/ARMYMYrU3s\nCShQopmKZ/zxyPAPRT9ZP5fn2Cv7pfefEzZKklzjzsCGD2n6R/Ns3AkB7SeACdbX\nJTUI37Xm9GOGdo2TM7oXUC8W8onggiQIpkJvCByL8QKBgQDc54u/F6q24b5x/pVq\n7Nfr9oYRtELENNMfiSs8gy2uFxLEUCmnk6BVO2HpjHuPxyBJ7YyMNEzk27sQk2mC\nP19kCx1afgGt/IMgHh4pKd5li4ZQppOBdVEpHdKpBI0mgKORa0GRl7zmptlcAXAZ\nX/Wg4dkcYRJ4hLn20v9U6GXuPQKBgQDJ5fJ9LYK0IN27TcarMVUbMUj6Sd0FmUBt\nJovhGZVTXtAHlEVtT21b1EEt+f0sSMSYKnM7QjYo7GY4C3wfDicqocRlx+4r2SGD\nPBTLJZzPoSuCZ0sVklYdELncroDlq5Wlo/y87ctAiCEAT9ayyV8RMGUnGZCLGYGF\n/cSLl9E7iQKBgQCcCf7fo8MV3c3dzfwThGtdJU08sj07RSkgrI7a9rpMr8W03/8c\nfR4TNpgKFg6t1/WJ4v+VhdgPDNtNcSNlOoiSLXu1kS50jNq+1Cdv4kBTMERXMeMd\n3hXPWl6Uvz9JRDLGJKIzSqDHuHHvGKDre6oQ05e+AR+/+9k0bYSooGRn7QKBgCZz\nLWAbh7XIQJIIONqndX7NPwmzgW0sh3GCEseWuLJ87v9ShHpR0xDW9mbMIiQJ467a\n/sD9VhUrGDh6L3Q2nMzoq996WOhu3IwCqC8cBaYhGokmJM2B5fZ5FfxqG1AiAkje\nVyaf3sJ2alqF2eyInxtF7S2qF7X18I3VC1ZOXmGJAoGAU+4VSCugY71tGG9iJl84\nSuBlKIGr24zD21MgDFZhVX4kpxIbRve5831dZKWKkSNftxCMjLXEYxli1GHWRnZ5\nqUKI5G8rasLJX+tPDsQGVQzCz027ovWvqs4SH8huu2m5DBBq62L+X6W0OsVyHeYI\n6ZjHkGlhlBMLHcN2KI5zeFM=\n-----END PRIVATE KEY-----\n',
			client_email: 'anime-oasis@anime-oasis-1693928826222.iam.gserviceaccount.com',
			client_id: '101109986420719292010',
			universe_domain: 'googleapis.com'
		},
		scopes: SCOPES
	});
	const driveService = google.drive({ version: 'v3', auth });
	console.log(driveService.files.list());
	return driveService;
};

export default getDriveService;
