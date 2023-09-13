import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

export async function POST({ request }) {
	const body = await request.json();
	console.log(body);
	const collectionRef = collection(db, 'mockup');

	// Add the document to the collection
	const docRef = await addDoc(collectionRef, body);
	return new Response(docRef.id, {
		status: 200
	});
}
