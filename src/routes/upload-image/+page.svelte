<script lang="ts">
	let loading = false;
	let selectedFile: File | null = null;
	let uploadedImageURL: string = '';
	let fileName: string = '';
	let animeName: string = '';
	let tags: string[] = [];
	let tagInput: string = '';

	$: uploadedImageURL;
	$: fileName;
	$: animeName;
	$: tags;
	$: tagInput;

	function handleFileChange(
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) {
		const inputElement = event.target as HTMLInputElement;
		if (inputElement.files && inputElement.files[0]) {
			selectedFile = inputElement.files[0];
			fileName = selectedFile?.name ?? 'No file chosen';
		}
	}

	function handleFileNameChange(e: Event) {
		fileName = (e.target as HTMLInputElement).value;
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
		const promise = new Promise(async (resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = async () => {
				console.log(reader.result);
				try {
					const response = await fetch('/upload', {
						method: 'POST',
						body: reader.result
					});
					const link = await response.json();
					uploadedImageURL = link.fileId;
					const body = JSON.stringify({ name: fileName, fileId: uploadedImageURL });
					await fetch('/rename', {
						method: 'POST',
						body
					});
					await fetch('/db-upload', {
						method: 'POST',
						body: JSON.stringify({
							filename: fileName,
							tags: tags,
							anime: animeName,
							url: `https://drive.google.com/uc?export=view&id=${uploadedImageURL}`
						})
					});
					resolve(link);
				} catch (err) {
					reject(err);
				}
			};
			reader.onerror = (error) => reject(error);
			reader.readAsDataURL(selectedFile!);
		});

		try {
			await Promise.all([promise]);
		} catch (err) {
			console.log('err', err);
		} finally {
			loading = false;
		}
	};
	console.log(tags);
</script>

<div>
	<input type="file" accept="image/*" on:change={handleFileChange} />
	<input bind:value={fileName} class="border" on:change={handleFileNameChange} />
	<input class="border" on:change={handleAnimeNameChange} />
	<input class="border" bind:value={tagInput} on:keydown={handleTagKeydown} />
	{#each tags as tag}
		<button
			on:click={() => {
				tags = tags.filter((t) => t !== tag);
			}}
			class="border border-blue-300"
		>
			{tag}
		</button>
	{/each}

	<button class="border border-blue-300" disabled={fileName === ''} on:click={handleSubmit}
		>Upload Image</button
	>
</div>

<div>
	<h2>Uploaded Image:</h2>
	<img src={`https://drive.google.com/uc?export=view&id=${uploadedImageURL}`} alt="Uploaded" />
</div>
