<script lang="ts">
    export let title: string;
    export let image: string;
    export let price: number;
</script>

<section class="flex p-2 bg-black text-[#0CC0DF] flex-col border border-[#8C52FF] rounded-lg">
    <p class="text-center">{title}</p>
    <img src={image} alt={title} />
    <section class="flex flex-row w-full justify-between">
        <span>
            Size
        </span>
        <select class="rounded-lg p-1 bg-black border border-[#26E6A1]">
            <option value="" selected>Select</option>
            <option value="A4">A4</option>
            <option value="A3">A3</option>
        </select>
    </section>
    <section class="flex items-center pt-2 mt-2 flex-row justify-between border-t border-[#26E6A1]">
        <p class="text-xl font-bold">Rs. {price}</p>
        <button class="bg-[#8C52FF] text-[#C1FF72] p-1 rounded-lg">Add to Cart</button>
    </section>
</section>