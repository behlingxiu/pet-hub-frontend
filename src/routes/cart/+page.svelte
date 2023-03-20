<script>
	import { onMount } from 'svelte';
    import {goto} from '$app/navigation'
    import { PUBLIC_BASE_URL } from '$env/static/public';
    import { cart } from '../../utils/context'
	import { getTokenFromLocalStorage } from '../../utils/auth';

    let sum = 0.00;
    let name = '';
    let phoneNumber = '';
    let address = '';
    let formError = {}

    onMount(() => {
        if ($cart.length > 0){
            for( var i of $cart){
                sum = (((sum * 100) + ((i.quantity * i.data.price)* 100))/100).toFixed(2)
            }
        }
        
    })
    
const add = (item) => {
    const index = $cart.findIndex((element) => element.data.id === item.data.id)
    $cart[index] = {...$cart[index], quantity: $cart[index].quantity + 1}
    sum = (((sum * 100) + ($cart[index].data.price * 100))/100).toFixed(2)
}

const subtract = (item) => {
    const index = $cart.findIndex((element) => element.data.id === item.data.id)
    if ($cart[index].quantity > 1){
        $cart[index] = {...$cart[index], quantity: $cart[index].quantity - 1}
        sum = (((sum * 100) - ($cart[index].data.price * 100))/100).toFixed(2)
    }
}

const remove = (item) => {
    const filtered = $cart.filter((element) => element.data.id !== item.data.id)
    $cart = filtered
    sum = 0.00
    for( var i of filtered){
        sum = (((sum * 100) + ((i.quantity * i.data.price)* 100))/100).toFixed(2)
    }
}

const createOrder = async () => {

    const data = {
        receiver: name,
        contact_number: phoneNumber,
        address: address,
        amount: (((sum*100) + (10.00 * 100))/100).toFixed(2),
        cart: $cart
    }

    const resp = await fetch(PUBLIC_BASE_URL + '/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getTokenFromLocalStorage()
        },
        body: JSON.stringify(data)
    })
    const res = await resp.json() 
    console.log(res)
    if (resp.status === 200){
       payment(res.resp.order_detail[0].id)
    } else {
       formError = res.error
    }
}

const payment = async (id) => {

    const data = {
        sum: (((sum*100) + (10.00 * 100))/100).toFixed(2),
        id: id
    }

    const resp = await fetch(PUBLIC_BASE_URL + '/order/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    
    if (resp.status === 200){
        const res = await resp.json()
        goto(res.url);
    }
}
</script>

<div class="container mt-3 lg:mt-10 mx-auto px-2 mb-10 lg:px-14">

    <div class="grid grid-cols-1 divide-y divide-gray-200 text-4xl font-bold mt-10 mb-16 ">
        <h1>Shopping Cart</h1>
    </div>
    {#if $cart.length > 0}
    <div class="flex flex-row border-x-2 border-y-2 rounded-lg border-rose100 mr-10">
        <div class="basis-1/2 p-6">

            <div class="p-6">
               <form>
                <h1 class="text-lg font-medium mt-4 mb-6">
                    Shipping Information
                </h1>

                <div class="form-control w-full">
                    <label class="label label-text" for="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder=""
                        class="input input-bordered border-rose100 rounded-xl"
                        on:change={(e) => name = e.target.value}
                    />
                </div>

                <div class="form-control w-full">
                    <label class="label label-text" for="phone">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        placeholder=""
                        class="input input-bordered border-rose100 rounded-xl"
                        on:change={(e) => phoneNumber = e.target.value}
                    />
                </div>

                <div class="form-control w-full">
                    <label class="label label-text" for="address">Addresss</label>
                    <input
                        type="text"
                        name="address"
                        placeholder=""
                        class="input input-bordered border-rose100 rounded-xl"
                        on:change={(e) => address = e.target.value}
                    />
                </div>

               </form>
             
            </div>

        </div>
        <div class="basis-1/2 p-6">
            <ul role="listcart" class="-my-6 divide-y divide-rose200 pb-10">
                {#each $cart as cart}
                <li class="flex py-6 mt-10">
                    <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img src={cart.data.images[0].url} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." class="h-full w-full object-cover object-center">
                    </div>
                    
                    <div class="flex justify-between px-10 w-full">
                        <h2 class="w-1/3">
                            {cart.data.title}
                            <p class="mt-1 text-sm text-gray-500">RM{cart.data.price}</p>
                        </h2>
                        <div class="w-1/3 grid justify-items-stretch">
                            <div class="justify-self-center">
                                <div class="flex flex-row items-center" style="border-width: 1px; border-color: inherit">
                                    <button on:click={() => subtract(cart)} class="w-8 text-2xl font-light" style="border-right-width: 1px; border-color: inherit">-</button>
                                    <div class="px-6 pt-1">{ cart.quantity }</div>
                                    <button on:click={() => add(cart)} class="w-8 text-2xl font-ligh p-0" style="border-left-width: 1px; border-color: inherit">+</button>
                                </div>
                            </div>
                        </div>
                        <div class="w-1/3 grid justify-items-stretch">
                            <h2 class="justify-self-end">
                                <button on:click={() => remove(cart)} type="button" class="-m-2 p-2 text-gray-400 hover:text-gray-500">
                                    <span class="sr-only">Close panel</span>
                                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                            </h2>
                        </div>
                    </div>
                </li>
                {/each}
            </ul>

            <div class="p-6">
                <h1 class="text-lg font-medium mt-4 mb-6">
                    Order summary
                </h1>
                <div class="flow-root">
                    <ul role="list" class="-my-4 divide-y divide-rose200 text-sm">
                        <div class="flex justify-between py-4">
                            <h2 class="text-gray-500">
                                Subtotal
                            </h2>
                            <h2 class="text-gray-900 font-medium">
                                RM{sum}
                            </h2>
                        </div>
                        <div class="flex justify-between py-4">
                            <h2 class="text-gray-500">
                                Shipping
                            </h2>
                            <h2 class="text-gray-900 font-medium">
                                RM10.00
                            </h2>
                        </div>
                        <div class="flex justify-between py-4">
                            <h2 class="font-medium text-base">
                                Order total
                            </h2>
                            <h2 class="font-medium text-base">
                                RM{(((sum*100) + (10.00 * 100))/100).toFixed(2)}
                            </h2>
                        </div>
                    </ul>
                    <form class="mt-6" on:submit={createOrder}>
                        <button class="flex items-center justify-center rounded-md border border-transparent bg-rose400 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-500 w-full" type="submit">Checkout</button>
                    </form>
                </div>
            </div>

        </div>
    </div>
    {:else}
    <div class="text-center">
        <p>There is no items in this cart</p>
    </div>
    {/if}
</div>
 