<script lang="ts">
	import type { DataObjType } from '../../config/types';
	import LandpadsGridCards from '../shared/cards/LandpadsGridCards.svelte';
	export let data: DataObjType[] = [];
</script>

<scrip lang="ts"> </scrip>

<div class="grid w-full grid-cols-1 gap-y-6 md:grid-cols-3 md:gap-6">
	{#each data as pad}
		<LandpadsGridCards data={pad} />
	{/each}
</div>
