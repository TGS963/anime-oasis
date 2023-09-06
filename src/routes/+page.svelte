<script>
	import ItemCard from '$lib/components/ItemCard.svelte';

	let data = {
		title: 'ABC-1',
		image:
			'https://lh3.googleusercontent.com/lr/AJUiC1yY8cisgNCEe2AXlZ5BeO48RbvqzTfYtZQVvsBJgNF_c9tyfMm9NCA4dB2jiDT8mkLnVgGBK7XEUEgRTZMqY71I437KLzj4CH2_q1lM4JqGJ6eEik_u06sbtV4RBTsZ5JgwayZ309zmJPBXqs3dlDRQX79feE75ghNs9g9OLkWSxw0Dcu9IBYed0TZoL1bBbBa95s6L2yCG-9q1pZ_iiCOuapegs4gpTJipvc_gEIia5JYAQcg3UT_Q3Hi0802epap3IziqLmzuCk1-j-ygEuAT0txGYCCAn4xSBuFm9ptnsJ0OIJmPOMcbgKOY-DtcqzWIm-wyRdglV_r7-Tz-4BVmQ9pOoNG4cQAkwkOs0VOTu_0XI3OLTuPdNe1WGmzVIey5w-Yjvg_SzH2GULGx8BtFUx3zEW50_AgGOS8yXEXKcqTTFyzDe-R2SgvwwrCUm8XkInAXf_jqxO-7_oiWCzX__ScZwA55lk35vuysukVU7K3ltYYgUbxeNhABgFRJhky6TUh6UvOz9rsq1NwY9PeiXTg-vvsMutCKChKqGb8bcJIzS9xosimX-DXRE7Yoy7dtDyueIDBKT9992qmrwhmb1JjlGSj3tMzxq_P3u9xUaG__U5tJfDYiW4Eq1rLsBNqW_QLaFZ51Lyna8oU-Q7snLRjBd4T9jxSiTx8GkmpDW3UZ9Q3EqKxzERBntoWsZsBKJtjmKobIIh2cmBmXZJq4m3ZwLoBwrXBf9OQR_reDvXMZU_DmwxYmqf-pkWKfHDNxqSFZn9fcQUjA-oXWZ8o97vyge4A9ceHpQAwuouioZ5kwLfGguAdlbZ3WkLLA8eW1B5ZRvaNRzJZQV9RiY7NCljPoDuBAc8MwYH9Er4QGTPN0S53Tqm7gZapmqZB2Dp7ha8nzBhtJv5_49iajSH5P9mnkTsRyeNNohc3nW8JDWOCnXSW8lujtdbfbJV6KHb1xMKC6FUnULXFbsv2EgucaEK1UM0bZxq4Py6zcI3bHniXp_ExcpLVYpHwRFNnR73FphYcw3JutYi-T7j_gdpcp10Dw-FfS-4W5kJh6Mp2j',
		price: 99
	};
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
