<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	let { data }: { data: PageData } = $props();

	const { eventId, streamed } = data;
</script>

{#await streamed.eventById}
	<p>Loading event #{eventId}...</p>
{:then event}
	<div>
		{#if event}
			<h2 class="text-lg font-bold">{event.id}: {event.title}</h2>
			<p>{event.description}</p>
			<p>{event.date}</p>
			<a role="button" href={`/${eventId}/edit`}>Edit Event</a>

			<form
				action="?/delete"
				method="POST"
				use:enhance={() => {
					return async ({ update }) => {
						await update();
						goto('/');
					};
				}}
			>
				<input type="hidden" name="eventId" value={eventId} />
				<button>Delete Event</button>
			</form>
		{/if}
	</div>
{:catch error}
	<p>Error loading event: {error.message}</p>
{/await}
