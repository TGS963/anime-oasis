<script lang="ts">
	import type { dbType } from '$lib/types';

	let loading = false;
	let cardFile: File | null = null;
	let posterFile: File | null = null;
	let cardName: string = '';
	let posterName: string = '';
	let animeName: string = '';
	let tags: string[] = [];
	let tagInput: string = '';

	$: uploadedCardURL = '';
	$: uploadedPosterURL = '';
	$: cardFile;
	$: posterFile;
	$: cardName;
	$: posterName;
	$: animeName;
	$: tags;
	$: tagInput;

	function handleCardFileChange(
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) {
		const inputElement = event.target as HTMLInputElement;
		if (inputElement.files && inputElement.files[0]) {
			cardFile = inputElement.files[0];
			cardName = cardFile?.name ?? 'No file chosen';
		}
	}

	function handlePosterFileChange(
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) {
		const inputElement = event.target as HTMLInputElement;
		if (inputElement.files && inputElement.files[0]) {
			posterFile = inputElement.files[0];
			posterName = posterFile?.name ?? 'No file chosen';
		}
	}

	function handleCardFileNameChange(e: Event) {
		cardName = (e.target as HTMLInputElement).value;
	}

	function handlePosterFileNameChange(e: Event) {
		posterName = (e.target as HTMLInputElement).value;
	}

	function handleAnimeNameChange(e: Event) {
		animeName = (e.target as HTMLInputElement).value;
	}

	function handleTagKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			tags = [...tags, (e.target as HTMLInputElement).value];
			tagInput = '';
		}
	}

	const handleSubmit = async () => {
		loading = true;
		const promises = [
			{
				file: cardFile,
				name: cardName,
				type: 'card'
			},
			{
				file: posterFile,
				name: posterName,
				type: 'poster'
			}
		].map(async ({ file, name, type }) => {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onloadend = async () => {
					console.log(reader.result);
					try {
						const response = await fetch('/upload', {
							method: 'POST',
							body: reader.result
						});
						const link = await response.json();
						if (type === 'card') {
							uploadedCardURL = link.fileId;
						} else {
							uploadedPosterURL = link.fileId;
						}
						const body = JSON.stringify({ name, fileId: link.fileId });
						await fetch('/rename', {
							method: 'POST',
							body
						});

						resolve(link);
					} catch (err) {
						reject(err);
					}
				};
				reader.onerror = (error) => reject(error);
				reader.readAsDataURL(file!);
			});
		});

		try {
			await Promise.all(promises);
		} catch (err) {
			console.log('err', err);
		} finally {
			const newProduct: dbType = {
				card: {
					name: cardName,
					url: `https://drive.google.com/uc?export=view&id=${uploadedCardURL}`
				},
				poster: {
					name: posterName,
					url: `https://drive.google.com/uc?export=view&id=${uploadedPosterURL}`
				},
				tags: tags,
				anime: animeName
			};
			await fetch('/db-upload', {
				method: 'POST',
				body: JSON.stringify(newProduct)
			});
			loading = false;
		}
	};
	console.log(tags);
</script>

<div class="flex flex-col gap-4 items-center justify-center bg-black rounded-xl p-5 w-fit">
	<h1 class="text-3xl text-cyan-400">Upload New Mocks</h1>
	<section class="flex flex-col gap-4">
		<section class="flex flex-row">
			<section class="flex flex-col">
				<label for="card-file-input">Card Image</label>
				<input id="card-file-input" type="file" accept="image/*" on:change={handleCardFileChange} />
			</section>
			<section class="flex flex-col">
				<label for="poster-file-input">Poster Image</label>
				<input
					id="poster-file-input"
					type="file"
					accept="image/*"
					on:change={handlePosterFileChange}
				/>
			</section>
		</section>

		<label for="card-name-input">Card Inferred Name</label>
		<input
			id="card-name-input"
			bind:value={cardName}
			class="border"
			on:change={handleCardFileNameChange}
		/>

		<label for="poster-name-input">Poster Inferred Name</label>
		<input
			id="poster-name-input"
			bind:value={posterName}
			class="border"
			on:change={handlePosterFileNameChange}
		/>

		<label for="anime-name-input">Anime Name</label>
		<input id="anime-name-input" class="border" on:change={handleAnimeNameChange} />

		<label for="tag-input">Tags</label>
		<input id="tag-input" class="border" bind:value={tagInput} on:keydown={handleTagKeydown} />
		<section class="flex flex-row gap-2">
			{#each tags as tag}
				<button
					on:click={() => {
						tags = tags.filter((t) => t !== tag);
					}}
					class="border border-slate-300 bg-slate-600 rounded-md px-2 py-1 hover:bg-red-500 hover:text-white"
				>
					{tag}
				</button>
			{/each}
		</section>

		<button
			class="border border-gray-300 rounded-md enabled:hover:bg-slate-500 disabled:text-gray-500 disabled:bg-gray-800"
			disabled={cardName === '' || posterName === ''}
			on:click={handleSubmit}>Upload Image</button
		>
	</section>

	<section
		class={`${
			uploadedCardURL !== '' && uploadedPosterURL !== '' ? 'block' : 'hidden'
		} flex flex-row`}
	>
		<h2>Uploaded Card Image:</h2>
		<img
			width="200"
			height="200"
			src={`https://drive.google.com/uc?export=view&id=${uploadedCardURL}`}
			alt="Uploaded Card"
		/>
		<h2>Uploaded Poster Image:</h2>
		<img
			width="200"
			height="200"
			src={`https://drive.google.com/uc?export=view&id=${uploadedPosterURL}`}
			alt="Uploaded Poster"
		/>
	</section>
</div>
