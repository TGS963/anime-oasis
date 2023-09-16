<script lang="ts">
	export let title: string;
	export let images: string[];
	let type: 'card' | 'poster' = 'poster';
	$: type;
	$: price = type === 'card' ? 49 : 99;
</script>

<section class="flex p-2 bg-black text-[#0CC0DF] flex-col border border-[#8C52FF] rounded-lg">
	<p class="text-center">{title}</p>
	<div class="w-32 overflow-clip">
		<section
			class="flex flex-row justify-start w-fit touch-pan-right:-translate-x-full transition-all"
		>
			{#each images as image}
				<img src={image} class="w-32 h-32" alt="Poster/Card Mockup" />
			{/each}
		</section>
	</div>
	<section class="flex flex-row w-full justify-between">
		<span> Size </span>
		<select bind:value={type} class="rounded-lg p-1 bg-black border border-[#26E6A1]">
			<option value="card">Card</option>
			<option value="poster">Poster</option>
		</select>
	</section>
	<section class="flex items-center pt-2 mt-2 flex-row justify-between border-t border-[#26E6A1]">
		<p class="text-xl font-bold">Rs. {price}</p>
		<button class="bg-[#8C52FF] text-[#C1FF72] p-1 rounded-lg">Add to Cart</button>
	</section>
</section>
