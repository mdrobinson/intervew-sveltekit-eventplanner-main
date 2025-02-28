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

{#await streamed.eventById}
	<p>Loading event #{eventId}...</p>
{:then}
	<form
		class="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-md"
		method="POST"
		use:enhance={({ formData }) => {
			isSubmitting = true;

			return async ({ update }) => {
				await update();
				isSubmitting = false;
			};
		}}
	>
		<h1 class="text-2xl font-semibold mb-4">Edit Event #{eventId}</h1>
		<!-- form for creating new event -->
		<label for="eventId" hidden>Event ID</label>
		<input type="hidden" id="eventId" name="eventId" value={eventId} />

		<label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
		<input
			type="text"
			id="title"
			name="title"
			required
			bind:value={title}
			class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
		/>

		<label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label
		>
		<textarea
			id="description"
			name="description"
			rows="4"
			cols="50"
			bind:value={description}
			class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
		></textarea>

		<label for="date" class="block text-sm font-medium text-gray-700 mb-1">Date</label>
		<input
			type="datetime-local"
			id="date"
			name="date"
			required
			bind:value={date}
			class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
		/>
		{#if isSubmitting}
			<p>Submitting event...</p>
		{:else}
			<button
				type="submit"
				disabled={isSubmitting}
				class="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
				>Save Event</button
			>
		{/if}
	</form>
{:catch error}
	<p>Error loading event: {error.message}</p>
{/await}
