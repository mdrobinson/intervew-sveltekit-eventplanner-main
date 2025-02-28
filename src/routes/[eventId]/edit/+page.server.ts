import { fetchEventById, updateEventById } from '$lib/server/remote-events';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';

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
	default: async ({ request }) => {
		const formdata = await request.formData();
		const eventId = parseInt(formdata.get('eventId')!.toString());
		const title = formdata.get('title')?.toString();
		const description = formdata.get('description')?.toString();
		const date = formdata.get('date')?.toString();
		if (!title || !date) {
			error(400, 'Title and Date are required');
		}
		const updatedEvent = await updateEventById(eventId, { title, description, date });
		redirect(303, `/${updatedEvent?.id}`);
	}
};
