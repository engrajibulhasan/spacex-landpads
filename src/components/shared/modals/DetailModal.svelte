<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	import type { DataObjType } from '../../../config/types';
	export let open: boolean = false;
	export let data: DataObjType;
	export let autoclose: boolean = false;
	export let outsideclose: boolean = true;
</script>

<Modal
	bind:open
	{autoclose}
	{outsideclose}
	backdropClass="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80  "
	bodyClass="p-0"
>
	<h3
		class="border-b border-gray-300 px-6 pb-6 pt-4 text-lg font-medium text-gray-900 dark:text-white"
	>
		{data.full_name}
	</h3>
	<div class=" min-h-[302px] p-6">
		<slot name="content">
			<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
				{data.details}
			</p>
		</slot>
	</div>
</Modal>
