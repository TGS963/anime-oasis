import type { QueryDocumentSnapshot } from 'firebase/firestore';
import type { dbType } from '$lib/types';

export const dbTypeConverter = {
	toFirestore(dbType: dbType) {
		return dbType;
	},
	fromFirestore(snapshot: QueryDocumentSnapshot): dbType {
		const data = snapshot.data();
		return {
			anime: data.anime,
			card: data.card,
			poster: data.poster,
			tags: data.tags
		} as dbType;
	}
};
