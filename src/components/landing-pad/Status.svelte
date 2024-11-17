<script lang="ts">
	export let status: string = '';

	const getColorClass = (status: string) => {
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

	$: colorClass = getColorClass(status);
</script>

<span class={`inline-block rounded-lg px-2 py-1 text-xs capitalize ${colorClass}`}> {status} </span>
