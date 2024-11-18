<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import Feature from 'ol/Feature';
	import Map from 'ol/Map';
	import View from 'ol/View';
	import Point from 'ol/geom/Point';
	import TileLayer from 'ol/layer/Tile';
	import VectorLayer from 'ol/layer/Vector';
	import 'ol/ol.css';
	import { fromLonLat } from 'ol/proj';
	import OSM from 'ol/source/OSM';
	import VectorSource from 'ol/source/Vector';
	import Icon from 'ol/style/Icon';
	import Style from 'ol/style/Style';
	import { onDestroy, onMount } from 'svelte';
	import type { DataObjType } from '../../config/types';

	export let data: DataObjType[] = [];
	let map: Map;
	let vectorSource: VectorSource;

	onMount(() => {
		vectorSource = new VectorSource();
		const vectorLayer = new VectorLayer({
			source: vectorSource
		});

		map = new Map({
			target: 'map',
			layers: [
				new TileLayer({
					source: new OSM()
				}),
				vectorLayer
			],
			view: new View({
				center: fromLonLat([data[0].location.longitude, data[0].location.latitude]),
				zoom: 2
			})
		});

		updateMapFeatures();
	});

	$: if (data && vectorSource) {
		updateMapFeatures();
	}

	function updateMapFeatures() {
		// Clearing existing features
		vectorSource.clear();
		const features = data.map((zone) => {
			const feature = new Feature({
				geometry: new Point(fromLonLat([zone.location.longitude, zone.location.latitude])),
				name: zone.location.name,
				type: zone.landing_type,
				status: zone.status
			});

			feature.setStyle(
				new Style({
					image: new Icon({
						src:
							zone.status === 'retired'
								? '/images/retired-map-marker.png'
								: zone.status === 'under construction'
									? '/images/under-construction-map-marker.png'
									: '/images/success-map-marker.png',
						scale: 0.7
					})
				})
			);

			return feature;
		});

		vectorSource.addFeatures(features);
	}

	onDestroy(() => {
		if (map) {
			map.setTarget(undefined);
		}
	});
</script>

<Card class="w-full max-w-full p-0">
	<h3 class="m-0 p-4 text-[16px] font-semibold text-black">Map View</h3>
	<div id="map" class=" h-[355px] w-full rounded bg-slate-400"></div>
</Card>
