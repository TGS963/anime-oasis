<script lang="ts">
	export let title: string;
	export let images: string[];
	export let newPoster: boolean = false;
	let type: 'card' | 'poster' = 'poster';
	$: type;
	$: price = type === 'card' ? 49 : 99;
	let startX: number;

	let startY: number;
	let endX: number;
	let endY: number;

	function handleTouchStart(event: TouchEvent) {
		startX = event.touches[0].clientX;
		startY = event.touches[0].clientY;
	}

	function handleTouchMove(event: TouchEvent) {
		endX = event.touches[0].clientX;
		endY = event.touches[0].clientY;
	}

	function handleTouchEnd() {
		const distX = endX - startX;
		const distY = endY - startY;

		if (Math.abs(distX) >= 100 && Math.abs(distY) <= 100) {
			if (type === 'poster') type = 'card';
			else type = 'poster';
		}
	}
</script>

<section
	class={`flex p-2 bg-black text-[#0CC0DF] flex-col border items-center border-[#8C52FF] rounded-lg ${
		newPoster && 'animate-shadow-pulse'
	}`}
	on:touchstart={handleTouchStart}
	on:touchmove={handleTouchMove}
	on:touchend={handleTouchEnd}
>
	<p class="text-center">{title}</p>
	<div class="w-full h-full overflow-clip group">
		<section
			class={`flex flex-row justify-start w-64 ${
				type === 'poster' && '-translate-x-full'
			} transition-all`}
		>
			{#each images as image}
				<img src={image} class="w-64" loading="lazy" alt="Poster/Card Mockup" />
			{/each}
		</section>
	</div>
	<section class="flex flex-row w-full justify-center">
		<button
			on:click={() => (type = 'card')}
			class={`${type === 'card' && 'bg-blue-400 text-black'}`}>Card</button
		>
		<button
			on:click={() => (type = 'poster')}
			class={`${type === 'poster' && 'bg-blue-400 text-black'}`}>Poster</button
		>
	</section>
	<section class="flex items-center pt-2 mt-2 flex-row justify-between border-t border-[#26E6A1]">
		<p class="text-xl font-bold">Rs. {price}</p>
		<button class="bg-[#8C52FF] text-[#C1FF72] p-1 rounded-lg">Add to Cart</button>
	</section>
</section>
