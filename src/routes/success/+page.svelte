<script>
    export let data;
</script>

<div class="w-full text-center">
    {#if data?.message}
    <h1>{data.message}</h1>
    <a href="/" class="btn btn-md rounded-md border border-transparent bg-rose400 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-500">Back To HomePage</a>
    {:else}
    <h1>Thanks for your order!</h1>
    <p>
        We appreciate your business!
        If you have any questions, please email
        <a href="mailto:orders@example.com">orders@example.com</a>.
    </p>
    {/if}
</div>