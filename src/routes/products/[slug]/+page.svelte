<script>
    import { PUBLIC_BASE_URL } from '$env/static/public';
    import {cart} from '../../../utils/context'
    import { goto } from '$app/navigation';
    export let data;
    let count = 1;
    const add = () => {
        count = count + 1
    }

    const subtract = () => {
        if (count > 1){
            count = count - 1
        }
    }
    const addToCart = () => {
        if ($cart.length > 0 && $cart.some((item) => item.data.id === data.data.id )){
            const index = $cart.findIndex((item) => item.data.id === data.data.id)
            $cart[index] = {...$cart[index], quantity: $cart[index].quantity + count}
        } else {
           cart.update(n => [...n, {...data, quantity: count}]) 
        }
        
        console.log($cart)
    }
    
</script>

<div class="container mt-3 lg:mt-10 mx-auto px-2 lg:px-0">
    <div class="flex flex-row w-full">
        <div class="basis-1/2">
            <div class="carousel h-80 w-9/12">
                {#each data.data.images as image, i}
                <div id={`slide${i+1}`} class="carousel-item relative w-full">
                  <img src={image.url} class="w-full object-contain" />
                  <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href={`#slide${i === 0 ? data.data.images.length : i}`} class="btn btn-circle btn-ghost">❮</a> 
                    <a href={`#slide${i === data.data.images.length - 1 ? 1 : i+2}`} class="btn btn-circle btn-ghost">❯</a>
                  </div>
                </div> 
                {/each}
              </div>
        </div>
    
        <div class="basis-1/2">
            <h1 class="text-3xl font-extrabold text-gray-700 capitalize">{data.data.title}</h1>
            <h1 class="mt-6 text-2xl font-bold text-red-600">RM{(data.data.price).toFixed(2)}</h1>
            <div class="flex flex-row w-full mt-8">
                <div class="basis-1/4">
                    <h2 class="text-gray-500">Condition</h2>
                </div>
                <div>
                    <p class="capitalize">{data.data.condition}</p>
                </div>
            </div>
            
            <div class="flex flex-row w-full mt-8">
                <div class="basis-1/4">
                    <h2 class="text-gray-500">Category</h2>
                </div>
                <div>
                    <p class="capitalize">{data.data.category}</p>
                </div>
            </div>

            <div>
                <form>
                    <div class="flex flex-row w-full items-center mt-8">
                        <div class="basis-1/4">
                            <h2 class="text-gray-500">Quantity</h2>
                        </div>
    
                        <div class="flex flex-row items-center" style="border-width: 1px; border-color: inherit">
                            <!-- <label class="label label-text" for="stock"></label>
                                <input
                                type="number"
                                min="1"
                                name="stock"
                                placeholder="1"
                                class="input input-bordered border-rose300 w-20"
                                /> -->
                            <button on:click={subtract} class="w-8 text-2xl font-light" style="border-right-width: 1px; border-color: inherit">-</button>
                            <div class="px-6 pt-1">{ count }</div>
                            <button on:click={add} class="w-8 text-2xl font-ligh p-0" style="border-left-width: 1px; border-color: inherit">+</button>
                        </div>

                        <div class="pl-2 text-gray-500 text-xs">
                            <h3>{data.data.stock} units available</h3>
                            {#if count > data.data.stock}
                            <div class="text-red-700">sorry, we don't have enough stocks.</div>
                            <div class="text-red-700">you can only order {data.data.stock} unit(s).</div>
                            {/if}
                        </div>
                        
                    </div>

                    <div>
                        <button on:click={addToCart} class="btn btd-md mt-10 w-9/12 bg-rose400 border-rose400">Add to Cart</button>
                    </div>
                    
                </form>
            </div>
        </div>
    </div>

    <div class="divider"></div>

    <!-- <div class="flex flex-col w-full border-opacity-50">
        <div class="grid h-20 card bg-base-300 rounded-box place-items-center">content</div>
        <div class="divider"></div>
        <div class="grid h-20 card bg-base-300 rounded-box place-items-center">content</div>
      </div> -->

    <div class="mt-8 mb-20">
        <h2 class="text-2xl font-bold text-rose400">Product Description</h2>
        <p class="text-base text-gray-500 mt-8">{data.data.description}</p>
    </div>
    
</div>