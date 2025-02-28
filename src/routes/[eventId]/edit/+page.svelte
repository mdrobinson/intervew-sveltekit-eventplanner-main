<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	let { data }: { data: PageData } = $props();
	const { eventId, streamed } = data;

	streamed.eventById.then((loadedEvent) => {
		title = loadedEvent!.title as string;
		description = loadedEvent!.description as string;
		date = loadedEvent!.date as string;
	});

	let isSubmitting = $state(false);

	let title = $state<string>('');
	let description = $state<string>('');
	let date = $state<string>('');
</script>

<h1>Edit Event #{eventId}</h1>

{#await streamed.eventById}
	<p>Loading event #{eventId}...</p>
{:then}
	<form
		method="POST"
		use:enhance={({ formData }) => {
			isSubmitting = true;

			formData.set('eventId', eventId.toString());

			return async ({ update }) => {
				await update();
				isSubmitting = false;
			};
		}}
	>
		<!-- form for creating new event -->
		<label for="eventId">Event ID</label>
		<input type="number" id="eventId" name="eventId" required value={eventId} disabled />

		<label for="title">Title</label>
		<input type="text" id="title" name="title" required bind:value={title} />

		<textarea
			id="description"
			name="description"
			rows="4"
			cols="50"
			placeholder="Description"
			bind:value={description}
		></textarea>

		<label for="date">Date</label>
		<input type="datetime-local" id="date" name="date" required bind:value={date} />
		{#if isSubmitting}
			<p>Submitting event...</p>
		{:else}
			<button type="submit" disabled={isSubmitting}>Save Event</button>
		{/if}
	</form>
{:catch error}
	<p>Error loading event: {error.message}</p>
{/await}
