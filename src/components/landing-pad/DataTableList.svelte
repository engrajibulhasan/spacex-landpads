<script lang="ts">
	import {
		Button,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { LinkOutline } from 'flowbite-svelte-icons';
	import type { DataObjType } from '../../config/types';
	import { makeNum } from '../../utils/numberFuncs';
	import DetailModal from '../shared/modals/DetailModal.svelte';
	import Status from './Status.svelte';
	import SuccessRate from './SuccessRate.svelte';

	export let data: DataObjType[] = [];

	let isModalOpen = false;
	let modalData: DataObjType | null = null;
	const openModal = (clickedData: DataObjType) => {
		console.log('clicked on ', clickedData);

		isModalOpen = true;
		modalData = clickedData;
	};
</script>

<div class="w-full">
	<Table>
		<TableHead>
			<TableHeadCell class="whitespace-nowrap px-[21px]">FULL NAME</TableHeadCell>
			<TableHeadCell class="whitespace-nowrap">Location Name</TableHeadCell>
			<TableHeadCell class=" px-[21px]">Region</TableHeadCell>
			<TableHeadCell class=" px-[21px]">Details</TableHeadCell>
			<TableHeadCell class="whitespace-nowrap  px-[21px] ">Success Rate</TableHeadCell>
			<TableHeadCell class="whitespace-nowrap  px-[21px]">WikiPedia Link</TableHeadCell>
			<TableHeadCell class=" px-[21px]">Status</TableHeadCell>
		</TableHead>
		<TableBody tableBodyClass="divide-y">
			{#each data as pad}
				<TableBodyRow id={pad.id}>
					<!-- Full Name -->
					<TableBodyCell class="px-[21px]">
						{pad.full_name}
					</TableBodyCell>

					<!-- Location Name -->
					<TableBodyCell class="px-[21px]">
						{pad.locality}
					</TableBodyCell>

					<!-- Location Region -->
					<TableBodyCell class="px-[21px]">
						{pad.region}
					</TableBodyCell>

					<!-- View Details Badge -->
					<TableBodyCell class="px-[21px]">
						<Button class="bg-gray-100 text-xs text-gray-900 " on:click={() => openModal(pad)}>
							View Details
						</Button>
					</TableBodyCell>

					<!-- Success Rate -->
					<TableBodyCell class="px-[21px]">
						<SuccessRate progress={makeNum((pad.landing_successes / pad.landing_attempts) * 100)} />
					</TableBodyCell>

					<!-- Wikipedia Link -->
					<TableBodyCell class="px-[21px]">
						<a class="text-blue-600" href={pad.wikipedia} target="_blank" rel="noopener noreferrer">
							<LinkOutline />
						</a>
					</TableBodyCell>

					<!-- Status -->
					<TableBodyCell class="px-[21px]">
						<Status status={pad.status} />
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>

	{#if modalData}
		<DetailModal bind:open={isModalOpen} data={modalData} autoclose outsideclose />
	{/if}
</div>
