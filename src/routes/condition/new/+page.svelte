<style>
    #listing1 {
        text-align: center;
    }

    #listing1 .pro {
        width: 20%;
        min-width: 250px;
        padding: 10px 12px;
        border: 1px solid #ebe0e7;
        border-radius: 25px;
        cursor: pointer;
        box-shadow: 20px 20px 30px rgba(0, 0, 0, 0.02);
        margin: 15px 0;
        transition: 0.2s ease;
    }

    #listing1 .pro:hover{
        box-shadow: 20px 20px 30px rgba(0, 0, 0, 0.06);
    }

    #listing1 .pro img{
        width: 100%;
        border-radius: 20px;
    }

    #listing1 .pro .des{
        text-align: start;
        padding: 10px 0;
    }

    #listing1 .pro .des span{
        column-rule-color: #606063;
        font-size: 12px;
    }

    #listing1 .pro .des h5{
        color: black;
        max-height: max-content;
    }

    #listing1 .pro .des h4{
        font-weight: 700;
        color: #dc7da8; 
    }
</style>

<script>
    import { PUBLIC_BASE_URL } from '$env/static/public';
    export let data;
    console.log(data)

</script>

<svelte:head>
  <script src="/aws-sdk-s3.min.js"></script>
</svelte:head>

<div class="container mt-3 lg:mt-10 mx-auto px-2 lg:px-0 mb-20">
    <section id="listing1" class="ml-10 font-roboto" >
        <div class="flex justify-between">
            <h2 class="font-roboto text-4xl py-4 font-shantell-sans font-semibold">New</h2>
            <div>
                <div class="dropdown">
                    <label tabindex="0" class="btn w-40 rounded-full hover:bg-rose200 hover:border-rose200 border-rose400 bg-white text-black m-1">Filter by</label>
                    <ul tabindex="0" class="dropdown-content bg-white menu shadow border-rose400 rounded-lg w-52">
                      <li><a class="hover:bg-rose200 hover:border-rose200" href="/condition/used">Used</a></li>
                      <li><a class="hover:bg-rose200 hover:border-rose200" href="/condition/new">New</a></li>
                    </ul>
                  </div>
            </div>
        </div>
        
                    <div class="grid grid-row-1 lg:grid-cols-5 gap-6 mt-10">
                        {#each data.data as product}
                            <a href={`/products/${product.id}`}>
                                <div class="card bg-base-100 shadow-xl">
                                    <figure class="h-60">
                                        <img src={product?.images[0]?.url} class="w-full object-contain h-60" alt="pic"/> 
                                    </figure>
                                    <div class="card-body p-4">
                                        <div class="flex justify-end text-xs font-shantell-sans justify-self-end">
                                            <div class="px-2 border-r border-rose400">{product.category}</div>
                                            <div class="px-2">{product.condition}</div>
                                        </div>
                                        <!-- <div class="flex justify-end text-xs font-shantell-sans justify-self-end">
                                            <div class="mr-2">{product.category}</div>
                                            <div class="border rounded border-rose300 bg-rose300">{product.category}</div>
                                        </div> -->
                                        <div class="truncate card-title capitalize text-lg">
                                            {product.title}
                                        </div>
                                        <div class="text-xl text-rose400 text-start font-bold">RM{product.price}</div>
                                        <!-- <div class="des relative">
                                            <span class="absolute right-1 font-shantell-sans">{product.category}</span>
                                            <h5 class="truncate pt-5 pb-2 text-xl font-semibold capitalize">{product.title}</h5>
                                            <div class="">
                                                <div class="flex justify-between">
                                                    <h4 class="text-2xl font-bold pt-2">RM{product.price}</h4>
                                                </div>
                                            </div>
                                        </div> -->
                                    </div> 
                                </div>
                            </a>
                        {/each}
                    </div>
    </section>
</div>

