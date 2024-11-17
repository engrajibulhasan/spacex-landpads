<script lang="ts">
	import { Button, ButtonGroup, Radio } from 'flowbite-svelte';
	import {
		AdjustmentsVerticalOutline,
		ChevronDownOutline,
		GridOutline,
		ListOutline
	} from 'flowbite-svelte-icons';

	import DataTableList from '../components/landing-pad/DataTableList.svelte';

	import axios from 'axios';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	import _ from 'lodash';
	import { onMount } from 'svelte';
	import Chart from '../components/landing-pad/Chart.svelte';
	import MapView from '../components/landing-pad/MapView.svelte';
	import type { DataObjType, LandingPadObjType } from '../config/types';

	let isDropdownOpen = false;
	let filter = 'all';
	const STATUS = ['all', 'active', 'retired', 'under construction'];

	let landingPads: LandingPadObjType = {
		isLoading: false,
		isError: false,
		message: '',
		data: null
	};
	let filteredData: DataObjType[] | null = null;
	let errorMessage: string | null = null;

	// Fetch data from SpaceX API
	const fetchLandingPads = async () => {
		landingPads = {
			isLoading: true,
			isError: false,
			message: '',
			data: null
		};

		filteredData = null;
		try {
			const response = await axios.get('https://api.spacexdata.com/v3/landpads');
			const theData = response?.data ? response.data : null;
			landingPads = {
				...landingPads,
				isLoading: false,
				data: theData
			};
			filteredData = theData;
		} catch (error) {
			errorMessage = 'Failed to fetch landing pads data';
			console.error(error);
		}
	};

	// Function to filter data based on selected status
	const filterDataFunc = () => {
		const { data } = landingPads;
		console.log('filter', filter);

		if (data) {
			if (filter === 'all') {
				filteredData = _.cloneDeep(data); // Show all data if 'all' is selected
			} else {
				filteredData = _.cloneDeep(data.filter((item) => item.status === filter));
			}
		}
	};

	onMount(() => {
		fetchLandingPads();
	});
	console.log('isDropdownOpen', isDropdownOpen);
</script>

<section class="min-h-screen w-full">
	<header class="flex justify-center py-5 shadow-md">
		<img src="/images/spacex-logo.png" alt="SpaceX Logo" class="h-10 w-auto" />
	</header>

	<div class="mx-auto mt-[50px] flex w-full gap-x-10 p-4">
		{#if filteredData && filteredData.length > 0}
			<div class="min-h-4 w-[1158px]">
				<div class="filters mb-5 flex justify-between">
					<ButtonGroup>
						<Button
							outline
							class="rounded-none border-gray-200 bg-gray-200 first:rounded-l-lg last:rounded-r-lg"
							><ListOutline />
						</Button>
						<Button
							outline
							class="rounded-none border-l-0 border-gray-200 first:rounded-l-lg  last:rounded-r-lg"
							><GridOutline /></Button
						>
					</ButtonGroup>

					<div>
						<Button color="light" class={`${isDropdownOpen ? 'text-blue-500' : 'text-gray-700'}`}
							><AdjustmentsVerticalOutline class="mr-1" /> Filter By Status <ChevronDownOutline
								class="ms-1 "
							/></Button
						>
						<Dropdown bind:open={isDropdownOpen}>
							{#each STATUS as item}
								<DropdownItem class="capitalize"
									><Radio
										class="cursor-pointer p-1"
										bind:group={filter}
										value={item}
										on:change={filterDataFunc}>{item}</Radio
									></DropdownItem
								>
							{/each}
						</Dropdown>
					</div>
				</div>
				<DataTableList data={filteredData} />
			</div>
		{/if}
		{#if landingPads.data && landingPads.data.length > 0}
			<div class="flex w-[521px] flex-col gap-y-10">
				<MapView data={landingPads.data} />
				<Chart data={landingPads.data} />
			</div>
		{/if}
	</div>
</section>
