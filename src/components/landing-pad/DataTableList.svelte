<script lang="ts">
	import {
		Badge,
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
	import Status from '../shared/Status.svelte';
	import SuccessRate from '../shared/SuccessRate.svelte';
	export let data: DataObjType[] = [];
	// You can dynamically map the color to a Tailwind class
	const getColorByStatus = (status: string) => {
		console.log('status', status);

		// Define the color classes manually
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

	const getColorByProgress = (progress: number) => {
		// Define the color classes manually
		if (progress > 70) {
			return 'bg-green-400';
		} else if (progress > 40) {
			return 'bg-yellow-400';
		} else {
			return 'bg-red-400';
		}
	};
</script>

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
					{pad.location.name}
				</TableBodyCell>

				<!-- Location Region -->
				<TableBodyCell class="px-[21px]">
					{pad.location.region}
				</TableBodyCell>

				<!-- View Details Badge -->
				<TableBodyCell class="px-[21px]">
					<Badge color="dark" class="text-xs">View Details</Badge>
				</TableBodyCell>

				<!-- Success Rate -->
				<TableBodyCell class="px-[21px]">
					<SuccessRate
						progress={makeNum((pad.successful_landings / pad.attempted_landings) * 100)}
					/>
					<!-- {#if makeNum((pad.successful_landings / pad.attempted_landings) * 100) > 0}
						<div class="h-2 w-full rounded-full bg-gray-200">
							<div
								class={`h-full ${getColorByProgress(makeNum((pad.successful_landings / pad.attempted_landings) * 100))} rounded-full`}
								style="width: {makeNum((pad.successful_landings / pad.attempted_landings) * 100)}%"
							></div>
							<span class="text-xs text-gray-500">
								{makeNum((pad.successful_landings / pad.attempted_landings) * 100)}%
							</span>
						</div>
					{:else}
						<span class="text-xs text-gray-500">N/A</span>
					{/if} -->
				</TableBodyCell>

				<!-- Wikipedia Link -->
				<TableBodyCell class="px-[21px]">
					<a class="text-blue-600" href={pad.wikipedia} target="_blank" rel="noopener noreferrer">
						<LinkOutline />
					</a>
				</TableBodyCell>

				<!-- Status -->
				<TableBodyCell class="px-[21px]">
					<!-- <span
						class={`inline-block rounded-lg px-2 py-1 text-xs capitalize ${getColorByStatus(pad.status)}`}
					>
						{pad.status}
					</span> -->
					<Status status={pad.status} />
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
