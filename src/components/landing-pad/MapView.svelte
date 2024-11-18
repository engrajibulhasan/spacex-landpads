<script lang="ts">
	import 'ol/ol.css';
	import type { DataObjType } from '../../config/types';
	// Import OpenLayers CSS
	import { Card } from 'flowbite-svelte';
	import Feature from 'ol/Feature';
	import Map from 'ol/Map';
	import View from 'ol/View';
	import Point from 'ol/geom/Point';
	import TileLayer from 'ol/layer/Tile';
	import VectorLayer from 'ol/layer/Vector';
	import { fromLonLat } from 'ol/proj';
	import OSM from 'ol/source/OSM';
	import VectorSource from 'ol/source/Vector';
	import Icon from 'ol/style/Icon';
	import Style from 'ol/style/Style';
	import { onDestroy, onMount } from 'svelte';

	export let data: DataObjType[] = [];
	const centerLat = data[0].location.latitude;
	const centerLon = data[0].location.longitude;
	let map: Map;

	onMount(() => {
		// Create a VectorSource to hold the points
		const vectorSource = new VectorSource({
			features: data.map((zone) => {
				const feature = new Feature({
					geometry: new Point(fromLonLat([zone.location.longitude, zone.location.latitude])),
					name: zone.location.name,
					type: zone.landing_type,
					status: zone.status
				});

				// Style for the features
				feature.setStyle(
					new Style({
						image: new Icon({
							src:
								zone.status === 'retired'
									? '/images/retired-map-marker.png'
									: zone.status === 'under construction'
										? '/images/under-construction-map-marker.png'
										: '/images/success-map-marker.png',
							scale: 0.7 // Adjust size as needed
						})
					})
				);

				return feature;
			})
		});

		// Vector layer for landing zones
		const vectorLayer = new VectorLayer({
			source: vectorSource
		});

		// Create the map
		map = new Map({
			target: 'map', // The HTML element id where the map will be rendered
			layers: [
				// Base map layer
				new TileLayer({
					source: new OSM()
				}),
				// Landing zones layer
				vectorLayer
			],
			view: new View({
				center: fromLonLat([centerLon, centerLat]), // Centered on the first landing zone
				zoom: 2
			})
		});
	});

	// Clean up the map on unmount
	onDestroy(() => {
		if (map) {
			map.setTarget(undefined);
		}
	});
</script>

<Card class="w-full max-w-full p-0">
	<h3 class="m-0 p-4 text-[16px] text-black">Map View</h3>
	<div id="map" class=" h-[355px] w-full rounded bg-slate-400"></div>
</Card>
