<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { pageTitle, streamed } = data;
</script>

<h1 class="text-xl">{pageTitle}</h1>
{#await streamed.loadedEvents}
	<p>Loading events...</p>
{:then events}
	{#each events as event}
		<div>
			<h2 class="text-lg font-bold"><a href={`/${event.id}`}>{event.id}: {event.title}</a></h2>
			<p>{event.description}</p>
			<p>{event.date}</p>
		</div>
	{/each}
{:catch error}
	<p>Error loading events: {error.message}</p>
{/await}

<a class="btn" href="/newevent" role="button">Add Event</a>
