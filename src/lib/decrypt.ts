import crypto from 'crypto';

export const decrypt = (data: string) => {
	const algorithm = 'aes-128-cbc';
	const decipher = crypto.createDecipheriv(
		algorithm,
		import.meta.env.VITE_DRIVE_KEY,
		import.meta.env.VITE_DRIVE_IV
	);
	let decrypted = decipher.update(data, 'base64', 'utf8');
	decrypted += decipher.final('utf8');
	return JSON.parse(decrypted);
};
