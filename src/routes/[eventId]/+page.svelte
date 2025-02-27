<script lang="ts">
	import type { PageData } from './$types';

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
		{/if}
	</div>
{:catch error}
	<p>Error loading event: {error.message}</p>
{/await}
