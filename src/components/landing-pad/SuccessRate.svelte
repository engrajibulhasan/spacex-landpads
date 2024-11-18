<script lang="ts">
	export let progress: number = 0;
	export let text: string | null = null;

	const getColorClass = (progress: number) => {
		if (progress > 70) {
			return 'bg-green-400';
		} else if (progress > 40) {
			return 'bg-yellow-400';
		} else {
			return 'bg-red-400';
		}
	};

	$: colorClass = getColorClass(progress);
	const spanClass = 'text-xs text-gray-500';
</script>

{#if progress > 0}
	<div class="h-2 w-full rounded-full bg-gray-200">
		<div class={`h-full ${colorClass} rounded-full`} style="width: {progress}%"></div>
		<span class={spanClass}>{text && text} {progress}%</span>
	</div>
{:else}
	<span class={spanClass}>N/A</span>
{/if}
