<script lang="ts">
	import type { ApexOptions } from 'apexcharts';
	import { Card, Chart } from 'flowbite-svelte';
	import type { DataObjType } from '../../config/types';
	export let data: DataObjType[] = [];

	let attempt = data.reduce((total, pad) => total + pad.attempted_landings, 0);
	let success = data.reduce((total, pad) => total + pad.successful_landings, 0);
	let failed = attempt - success;
	console.log('Success total', success);
	console.log('failed total', failed);

	const options: ApexOptions = {
		series: [attempt, success, failed],
		colors: ['#3b82f6', '#4ade80', '#ec4899'],
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
							fontFamily: 'Inter, sans-serif',
							offsetY: 20
						},
						total: {
							showAlways: true,
							show: true,
							label: 'Landing Pads',
							fontFamily: 'Inter, sans-serif',
							formatter: function (w) {
								return `${data.length}`;
							}
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
		labels: ['Attempt', 'Success', 'Failed'],
		dataLabels: {
			enabled: false
		},
		legend: {
			position: 'bottom',
			fontFamily: 'Inter, sans-serif'
		},

		xaxis: {
			labels: {
				formatter: function (value: string) {
					return value;
				}
			}
		}
	};
</script>

<Card class="w-full max-w-[521px] p-0">
	<h3 class="m-0 p-4 text-[16px] text-black">Success Rate Chart</h3>
	<Chart {options} class="py-6" />
</Card>
