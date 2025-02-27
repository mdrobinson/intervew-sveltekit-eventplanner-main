<script lang="ts">
	import { enhance } from '$app/forms';

	let isSubmitting = $state(false);
</script>

<form
	method="POST"
	use:enhance={() => {
		isSubmitting = true;

		return async ({ update }) => {
			await update();
			isSubmitting = false;
		};
	}}
>
	<!-- form for creating new event -->
	<label for="title">Title</label>
	<input type="text" id="title" name="title" required />
	<textarea id="description" name="description" rows="4" cols="50" placeholder="Description"
	></textarea>
	<label for="date">Date</label>
	<input type="datetime-local" id="date" name="date" required />
	{#if isSubmitting}
		<p>Submitting event...</p>
	{:else}
		<button type="submit" disabled={isSubmitting}>Create Event</button>
	{/if}
</form>
