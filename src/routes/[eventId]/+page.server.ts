import { deleteEventById, fetchEventById } from '$lib/server/remote-events';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const eventId = parseInt(params.eventId);
	return {
		eventId: eventId,
		streamed: {
			eventById: fetchEventById(eventId)
		}
	};
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const form = await request.formData();
		const eventId = parseInt(form.get('eventId')!.toString());
		await deleteEventById(eventId);
	}
};
