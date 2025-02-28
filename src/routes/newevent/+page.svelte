<script lang="ts">
	import { enhance } from '$app/forms';

	let isSubmitting = $state(false);

	let errorMessage = $state(null);
</script>

<form
	class="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-md"
	method="POST"
	use:enhance={() => {
		isSubmitting = true;

		return async ({ update, result }) => {
			if (result.type === 'error') {
				errorMessage = result.error.message;
			} else {
				await update();
			}
			isSubmitting = false;
		};
	}}
>
	<h1 class="text-2xl font-semibold mb-4">Add New Event</h1>

	<!-- form for creating new event -->
	<label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
	<input
		type="text"
		id="title"
		name="title"
		required
		class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
	/>

	<label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
	<textarea
		id="description"
		name="description"
		rows="4"
		cols="50"
		class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
	>
	</textarea>

	<label for="date" class="block text-sm font-medium text-gray-700 mb-1">Date</label>
	<input
		type="datetime-local"
		id="date"
		name="date"
		required
		class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
	/>
	{#if isSubmitting}
		<p>Submitting event...</p>
	{:else}
		<button
			type="submit"
			disabled={isSubmitting}
			class="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
			>Create Event</button
		>
	{/if}

	{#if errorMessage}
		<p>Error: {errorMessage}</p>
	{/if}
</form>
