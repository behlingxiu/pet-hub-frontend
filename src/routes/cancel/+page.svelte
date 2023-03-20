<script>
    export let data;
</script>
<div class="w-full text-center mt-auto">
    {#if data?.message}
    <h1 class="mb-6">{data.message}</h1>
    <a href="/" class="btn btn-md rounded-md border border-transparent bg-rose400 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-500">Back to Homepage</a>
    {:else}
    <h1 class="mb-6">Order Cancelled!</h1>
    <a href="/" class="btn btn-md rounded-md border border-transparent bg-rose400 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-500">Continue Shopping</a>
    {/if}
</div>
