import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { dbTypeConverter } from '$lib/converter';

export async function GET() {
	const collectionRef = collection(db, 'mockup').withConverter(dbTypeConverter);

	// Get all documents in the collection
	const snapshot = await getDocs(collectionRef);
	const documents = snapshot.docs.map((doc) => doc.data());

	return new Response(JSON.stringify(documents), {
		status: 200
	});
}
