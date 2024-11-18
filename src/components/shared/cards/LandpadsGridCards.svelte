<script lang="ts">
	import { Button, Card } from 'flowbite-svelte';
	import { EyeOutline, LinkOutline } from 'flowbite-svelte-icons';
	import type { DataObjType } from '../../../config/types';
	import { makeNum } from '../../../utils/numberFuncs';
	import Status from '../../landing-pad/Status.svelte';
	import SuccessRate from '../../landing-pad/SuccessRate.svelte';
	import DetailModal from '../modals/DetailModal.svelte';
	export let data: DataObjType;

	let isModalOpen = false;
	let modalData: DataObjType | null = null;

	const openModal = (clickedData: DataObjType) => {
		isModalOpen = true;
		modalData = clickedData;
	};
</script>

<div>
	<Card>
		<h5 class=" flex items-center justify-between text-lg font-bold tracking-tight text-gray-900">
			{data.full_name}
			<Status status={data.status} />
		</h5>
		<h6 class="text-xs font-bold text-gray-700">{data.location.name}, {data.location.region}</h6>
		<div class="mb-8 mt-2 leading-7">
			<SuccessRate
				progress={makeNum((data.successful_landings / data.attempted_landings) * 100)}
				text="Success Rate"
			/>
		</div>

		<p class="mb-3 text-sm font-normal leading-tight text-gray-500">
			{data.details.slice(0, 100)}....
		</p>
		<div class="flex justify-start gap-x-2">
			<Button
				class="bg-gray-200 p-1 text-xs text-gray-900 transition-all  hover:bg-gray-900 hover:text-white "
				on:click={() => openModal(data)}><EyeOutline class="mr-1" /> Details</Button
			>
			<a
				class="flex items-center justify-center rounded-md bg-gray-200 p-1 px-3 text-xs text-gray-900 transition-all hover:bg-gray-900 hover:text-white"
				href={data.wikipedia}
				target="_blank"
				rel="noopener noreferrer"
			>
				<LinkOutline class="mr-1" /> Wiki
			</a>
		</div>
	</Card>
	{#if modalData}
		<DetailModal bind:open={isModalOpen} data={modalData} autoclose outsideclose />
	{/if}
</div>
