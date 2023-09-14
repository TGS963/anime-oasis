<script lang="ts">
	import ItemCard from '$lib/components/ItemCard.svelte';
	import type { dbType } from '$lib/types';
	import { onMount } from 'svelte';
	let dbData: dbType[] = [];
	onMount(async () => {
		const res = await fetch('/db-get');
		dbData = await res.json();
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>Anime Oasis Placeholder</h1>
	{#each dbData as dbDoc}
		<div class="w-1/5">
			<ItemCard image={dbDoc?.url} type={dbDoc?.type} title={dbDoc?.filename} />
		</div>
	{/each}
</section>
