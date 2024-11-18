<script lang="ts">
	import { Button, ButtonGroup, Radio } from 'flowbite-svelte';
	import {
		AdjustmentsVerticalOutline,
		ChevronDownOutline,
		GridOutline,
		ListOutline
	} from 'flowbite-svelte-icons';

	import DataTableList from '../components/landing-pad/DataTableList.svelte';

	import axios, { isAxiosError, type AxiosResponse } from 'axios';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	import _ from 'lodash';
	import { onMount } from 'svelte';
	import Chart from '../components/landing-pad/Chart.svelte';
	import DataGrid from '../components/landing-pad/DataGrid.svelte';
	import MapView from '../components/landing-pad/MapView.svelte';
	import ErrorMessage from '../components/shared/ErrorMessage.svelte';
	import LandingPadSkeleton from '../components/shared/skeletons/LandingPadSkeleton.svelte';
	import type { DataObjType, LandingPadObjType } from '../config/types';
	let isList = true;
	let isDropdownOpen = false;
	let filter = 'all';
	const STATUS = ['all', 'active', 'retired', 'under construction'];

	let landingPads: LandingPadObjType = {
		isLoading: true,
		isError: false,
		message: '',
		data: null
	};

	let filteredData: DataObjType[] | null = null;

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
			const response: AxiosResponse = await axios.get('https://api.spacexdata.com/v3/landpads');
			const theData = response?.data ? response.data : null;
			landingPads = {
				...landingPads,
				isLoading: false,
				data: theData
			};
			filteredData = theData;
		} catch (error: unknown) {
			let message = '';
			if (isAxiosError(error)) {
				message = error.response?.data || error.message;
			} else {
				message = 'Unknown Error';
			}
			landingPads = {
				...landingPads,
				isLoading: false,
				isError: false,
				message
			};
		}
	};

	// Function to filter data based on selected status
	const filterDataFunc = () => {
		const { data } = landingPads;
		if (data) {
			if (filter === 'all') {
				filteredData = _.cloneDeep(data);
			} else {
				filteredData = _.cloneDeep(data.filter((item) => item.status === filter));
			}
		}
	};

	onMount(() => {
		fetchLandingPads();
	});
</script>

<section class="min-h-screen w-full">
	<header class="flex w-full justify-center py-5 shadow-md">
		<img src="/images/spacex-logo.png" alt="SpaceX Logo" class="h-10 w-auto" />
	</header>

	<!-- If Loading -->
	{#if landingPads.isLoading}
		<LandingPadSkeleton />

		<!-- If Error -->
	{:else if !landingPads.isLoading && landingPads.isError}
		<ErrorMessage message={landingPads.message} />

		<!-- If !Loading and Data -->
	{:else if !landingPads.isLoading && !landingPads.isError && filteredData}
		<div
			class="mx-auto mt-[50px] grid grid-cols-1 gap-y-10 p-6 md:grid-cols-12 md:gap-x-6 md:gap-y-0"
		>
			<div class="col-span-6 min-h-4 md:col-span-7 lg:col-span-9">
				<div class="filters mb-5 flex justify-between">
					<ButtonGroup>
						<Button
							outline
							class={`rounded-none border-gray-200 first:rounded-l-lg last:rounded-r-lg ${isList ? 'bg-gray-200 text-blue-600' : 'text-black'} hover:bg-gray-200 hover:text-blue-600`}
							on:click={() => (isList = true)}
							><ListOutline />
						</Button>
						<Button
							outline
							class={`rounded-none border-gray-200 first:rounded-l-lg last:rounded-r-lg ${isList ? 'text-black' : 'bg-gray-200 text-blue-600'} hover:bg-gray-200 hover:text-blue-600`}
							on:click={() => (isList = false)}
							><GridOutline />
						</Button>
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
				{#if filteredData.length > 0}
					{#if isList}
						<DataTableList data={filteredData} />
					{:else}
						<DataGrid data={filteredData} />
					{/if}
				{:else}
					<ErrorMessage message={`No ${filter != 'all' && filter} Data Found!`} />
				{/if}
			</div>

			{#if landingPads.data && landingPads.data.length > 0}
				<div class="col-span-6 space-y-6 md:col-span-5 lg:col-span-3">
					{#if filteredData && filteredData.length > 0}
						<MapView data={filteredData} />
					{/if}
					<Chart data={landingPads.data} />
				</div>
			{/if}
		</div>
	{/if}
</section>
