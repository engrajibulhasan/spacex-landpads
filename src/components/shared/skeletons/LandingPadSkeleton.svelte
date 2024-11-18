<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import AppSkeleton from './AppSkeleton.svelte';
	import LandingPadTr from './LandingPadTr.svelte';
</script>

<div
	class="mx-auto mt-[50px] grid h-5 grid-cols-1 gap-y-10 p-6 md:grid-cols-12 md:gap-x-6 md:gap-y-0"
>
	<div class="col-span-6 min-h-4 md:col-span-7 lg:col-span-9">
		<div class="filters mb-5 flex justify-between">
			<AppSkeleton skClass="h-8 w-20 md:w-28 " />
			<AppSkeleton skClass="h-8 w-20 md:w-48 " />
		</div>
		<div class="mt-5 w-full">
			<LandingPadTr />
			<LandingPadTr rCass="bg-white border-b border-gray-200 " />
			<LandingPadTr rCass="bg-white border-b border-gray-200 " />
			<LandingPadTr rCass="bg-white border-b border-gray-200 " />
		</div>
	</div>
	<div class="col-span-6 hidden space-y-6 md:col-span-5 md:block lg:col-span-3">
		<Card class=" min-w-full p-4">
			<AppSkeleton skClass="h-6 w-28 " />
			<AppSkeleton skClass="h-[300px] w-full mt-4 " />
		</Card>
		<Card class=" min-w-full p-4">
			<AppSkeleton skClass="h-6 w-28 " />
			<AppSkeleton skClass="h-[250px] w-full mt-4 " />
		</Card>
	</div>
</div>
