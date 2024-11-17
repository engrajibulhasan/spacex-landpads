<script lang="ts">
	import type { ApexOptions } from 'apexcharts';
	import { Card, Chart } from 'flowbite-svelte';
	import type { DataObjType } from '../../config/types';

	export let data: DataObjType[] = [];
	const attempt = data.reduce((total, pad) => total + pad.attempted_landings, 0);
	const success = data.reduce((total, pad) => total + pad.successful_landings, 0);
	const failed = attempt - success;
	const fontFamily = 'Inter, sans-serif';

	const options: ApexOptions = {
		series: [attempt, success, failed],
		colors: ['#3b82f6', '#4ade80', '#ec4899'],
		labels: ['Attempt', 'Success', 'Failed'],
		chart: {
			height: 320,
			width: '100%',
			type: 'donut'
		},
		stroke: {
			colors: ['transparent'],
			lineCap: undefined
		},
		plotOptions: {
			pie: {
				donut: {
					labels: {
						show: true,
						name: {
							show: true,
							fontFamily,
							offsetY: 20
						},
						total: {
							showAlways: true,
							show: true,
							label: 'Landing Pads',
							fontFamily,
							formatter: () => `${data.length}`
						},
						value: {
							show: true,
							fontFamily: 'Inter, sans-serif',
							offsetY: -20
						}
					},
					size: '80%'
				}
			}
		},
		grid: {
			padding: {
				top: -2
			}
		},

		dataLabels: {
			enabled: false
		},
		legend: {
			position: 'bottom',
			fontFamily
		},
		xaxis: {
			labels: {
				formatter: (value: string) => value
			}
		}
	};
</script>

<Card class="w-full max-w-full p-0">
	<h3 class="m-0 p-4 text-[16px] text-black">Success Rate Chart</h3>
	<Chart {options} class="py-6" />
</Card>
