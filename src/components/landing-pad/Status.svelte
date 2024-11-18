<script lang="ts">
	import { CircleMinusSolid, HammerSolid, RocketSolid } from 'flowbite-svelte-icons';

	export let status: string = '';
	export let size: string = 'sm';

	const getColorClass = (status: string) => {
		switch (status.toLowerCase()) {
			case 'active':
				return 'bg-green-100 text-green-800';
			case 'retired':
				return 'bg-red-200 text-red-800';
			case 'under construction':
				return 'bg-blue-100 text-blue-800';
			default:
				return 'bg-slate-100 text-slate-800';
		}
	};

	// Function to get the icon component based on status
	const getIcon = (status: string) => {
		switch (status.toLowerCase()) {
			case 'active':
				return RocketSolid;
			case 'retired':
				return CircleMinusSolid;
			case 'under construction':
				return HammerSolid;
			default:
				return HammerSolid; // Default icon
		}
	};

	$: colorClass = getColorClass(status);
</script>

{#if size === 'sm'}
	<span class={`inline-block rounded-lg px-2 py-1 text-xs capitalize ${colorClass}`}>
		{status}
	</span>
{:else}
	<div
		class={`flex h-20 w-20 flex-col items-center justify-center gap-y-2 rounded-lg p-3 text-center text-xs capitalize ${colorClass}`}
	>
		<svelte:component this={getIcon(status)} class="h-6 w-6" />
		{status.slice(0, 11)}
	</div>
{/if}
