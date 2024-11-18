<script lang="ts">
	import AppSkeleton from './AppSkeleton.svelte';
	export let rCass: string = 'bg-gray-100';
</script>

<div class={`flex justify-between ${rCass} p-4`}>
	<AppSkeleton skClass="h-4 w-12 md:w-52 "></AppSkeleton>
	<AppSkeleton skClass="h-4  w-10 md:w-40 "></AppSkeleton>
	<AppSkeleton skClass="h-4  w-8  md:w-24 "></AppSkeleton>
	<AppSkeleton skClass="h-4  w-8 md:w-28 "></AppSkeleton>
	<AppSkeleton skClass="h-4  w-8 md:w-28 "></AppSkeleton>
	<AppSkeleton skClass="h-4 w-6 md:w-16 "></AppSkeleton>
	<AppSkeleton skClass="h-4 w-8 md:w-20 "></AppSkeleton>
</div>
