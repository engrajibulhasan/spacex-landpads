<script>
	import { Card } from 'flowbite-svelte';
</script>

<scrip lang="ts"> </scrip>

<div class="grid w-full grid-cols-3 gap-6">
	<Card class="min-h-80 max-w-full border">
		<!-- Header -->
		<div class="bg-blue-500 py-4 text-center text-white">
			<h2 class="text-lg font-semibold">Landing Zone 1</h2>
			<p class="text-sm">Cape Canaveral, Florida</p>
		</div>
		<!-- Content -->
		<div class="p-4">
			<!-- Status -->
			<div class="mb-2 flex items-center justify-between">
				<span class="font-medium text-gray-700">Status:</span>
				<span class="font-bold text-green-600">Active</span>
			</div>
			<!-- Landing Type -->
			<div class="mb-2 flex items-center justify-between">
				<span class="font-medium text-gray-700">Landing Type:</span>
				<span class="text-gray-800">RTLS</span>
			</div>
			<!-- Landings -->
			<div class="mb-2 flex items-center justify-between">
				<span class="font-medium text-gray-700">Attempted Landings:</span>
				<span class="text-gray-800">16</span>
			</div>
			<div class="mb-4 flex items-center justify-between">
				<span class="font-medium text-gray-700">Successful Landings:</span>
				<span class="text-gray-800">15</span>
			</div>
			<!-- Success Rate -->
			<div class="mb-4 rounded-lg bg-gray-100 p-2 text-center">
				<span class="font-medium text-gray-700">Success Rate:</span>
				<span class="font-bold text-blue-600"> 18% </span>
			</div>
			<!-- Details Button -->
			<div class="text-center">
				<a
					href="https://en.wikipedia.org/wiki/Landing_Zones_1_and_2"
					class="inline-block rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
				>
					View Details
				</a>
			</div>
		</div>
	</Card>
	<Card class="min-h-80 max-w-full  border"></Card>
	<Card class="min-h-80 max-w-full  border"></Card>
	<Card class="min-h-80 max-w-full  border"></Card>
	<Card class="min-h-80 max-w-full  border"></Card>
</div>
