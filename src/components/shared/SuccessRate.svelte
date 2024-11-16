<script lang="ts">
	export let progress: number = 0; // Default progress

	// You can dynamically map the color to a Tailwind class
	const getColorClass = (progress: number) => {
		// Define the color classes manually
		if (progress > 70) {
			return 'bg-green-400';
		} else if (progress > 40) {
			return 'bg-yellow-400';
		} else {
			return 'bg-red-400';
		}
	};

	$: colorClass = getColorClass(progress);
</script>

{#if progress > 0}
	<div class="h-2 w-full rounded-full bg-gray-200">
		<div class={`h-full ${colorClass} rounded-full`} style="width: {progress}%"></div>
		<span class="text-xs text-gray-500">{progress}%</span>
	</div>
{:else}
	<span class="text-xs text-gray-500">N/A</span>
{/if}
