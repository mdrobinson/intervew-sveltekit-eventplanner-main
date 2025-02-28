<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { pageTitle, streamed } = data;
</script>

<div class="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-md">
	<h1 class="text-2xl font-semibold mb-4">{pageTitle}</h1>
	{#await streamed.loadedEvents}
		<p>Loading events...</p>
	{:then events}
		{#each events as event}
			<a
				href={`/${event.id}`}
				class="block bg-white p-6 mb-4 rounded-xl shadow-md border border-gray-200 transition duration-300 hover:shadow-lg hover:bg-gray-50"
			>
				<h2 class="text-lg font-bold text-blue-600">
					{event.title}
				</h2>
				<p class="text-gray-700 mt-2">{event.description}</p>
				<p class="text-sm text-gray-500 mt-1">{event.date}</p>
			</a>
		{/each}
	{:catch error}
		<p>Error loading events: {error.message}</p>
	{/await}

	<a
		class="block w-full mx-auto bg-green-600 text-white font-semibold py-3 rounded-lg text-center hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
		href="/newevent"
		role="button">Add Event</a
	>
</div>
