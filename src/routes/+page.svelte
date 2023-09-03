<script>
	import ItemCard from "$lib/components/ItemCard.svelte";

	let data = {
		title: "ABC-1",
		image: "https://c.tenor.com/On7kvXhzml4AAAAi/loading-gif.gif",
		price: 99,
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>Anime Oasis Placeholder</h1>
	<div class="w-1/5">
		<ItemCard {...data} />
	</div>
</section>