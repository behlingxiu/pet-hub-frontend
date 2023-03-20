<style>

   #mylisting img{
    width: 25%;
    border-radius: 5px;
    margin-right: 30px;
   }
    
   #purchaseHistory img{
    width: 25%;
    border-radius: 5px;
    margin-right: 30px;
   }

   #myorder img{
    
    border-radius: 5px;
    margin-right: 30px;
   }

</style>

<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer>
    import { page } from '$app/stores'
    import { afterNavigate, invalidate } from '$app/navigation'
    import { PUBLIC_BASE_URL } from '$env/static/public';
    import { getTokenFromLocalStorage } from '../../utils/auth'
    
    



    // import { goto } from '$app/navigation';

    export let data
    
    //delete product function
    async function deleteProduct(id) {
        const res = await fetch(PUBLIC_BASE_URL + `/products/mylisting/${id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        },
      })    
      console.log(res)
      if (res.status == 200){
        await invalidate(PUBLIC_BASE_URL + '/users')
      } else {
        const resp = await res.json()
      }
    }
    

    let listingTab = false
    let orderTab = true
    let accountTab = false
    let purchaseHistoryTab = false
    afterNavigate(() => { 
        accountTab = $page.url.searchParams.has('account')
        listingTab = $page.url.searchParams.has('listings')
        orderTab = $page.url.searchParams.has('orders')
        purchaseHistoryTab = $page.url.searchParams.has('purchase')

        if (accountTab === false && listingTab === false && orderTab === false && purchaseHistoryTab === false){
            listingTab = true
        }
    })

    console.log(data)

const handleTab = (action) => {
            if (action === 'listing'){
                listingTab = true;
                purchaseHistoryTab = false
                accountTab = false
                orderTab = false
            } else if (action === 'purchaseHistory'){
                purchaseHistoryTab = true;
                listingTab = false
                accountTab = false
                orderTab = false
            } else if (action === 'account'){
                accountTab = true;
                listingTab = false
                purchaseHistoryTab = false
                orderTab = false
            } else if (action === 'order'){
                accountTab = false;
                listingTab = false
                purchaseHistoryTab = false
                orderTab = true
            }
             
}

//get sign-up-date
const d = new Date(data.data.createdAt)
let signUpDate = (d.toLocaleDateString('pt-PT'))


</script>
<svelte:head>
  <script src="/aws-sdk-s3.min.js"></script>
</svelte:head>




    <!-- End of Navbar -->

    <div class="container font-shantell-sans mx-auto my-5 p-5">
        <div class="md:flex no-wrap md:-mx-2 ">
            <!-- Left Side -->
            <div class="w-full md:w-3/12 md:mx-2">
                <!-- Profile Card -->
                <div class="bg-white">
                    <div class="image overflow-hidden">
                        <img class="h-auto w-full mx-auto rounded-lg"
                            src="https://images.unsplash.com/photo-1587402092301-725e37c70fd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHw%3D&w=1000&q=80"
                            alt="dog">
                    </div>
                    <h1 class="text-gray-900 font-shantell-sans font-bold text-3xl leading-8 text-center my-5">Hello {data.data.name}</h1>
                    <!-- <h3 class="text-gray-600 font-lg text-semibold leading-6">Rating: 4.5/5</h3> -->
                    <!-- <p class="text-sm text-gray-500 font-rokkitt hover:text-gray-600 leading-6">(DESCRIPTION)Lorem ipsum dolor sit amet
                        consectetur adipisicing elit.
                        Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt</p> -->
                    <ul
                        class="bg-rose100 border-white font-shantell-sans text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        <li class="flex items-center py-3">
                            <span>Member since</span>
                            <span class="ml-auto">{signUpDate}</span>
                        </li>
                        <li class="flex items-center py-3">
                            <span class="flex">Posted <div class="flex justify-center text-bold bg-rose200 mx-2 px-2">5</div> products</span>
                        </li>
                    </ul>
                </div>
                <!-- End of profile card -->
                <div class="my-4"></div>
                
              
            </div>
            <!-- Right Side -->
            <div class="w-full md:w-9/12 mx-2">
                
                
                <!-- Profile tab -->


            <div class="tabs font-shantell-sans">
                <button on:click={() => handleTab('listing')} class={"tab tab-lifted w-1/4 h-16 text-lg" + (listingTab ? " tab-active" : " bg-rose100")}>My Listing</button> 
                <button on:click={() => handleTab('purchaseHistory')} class={"tab tab-lifted w-1/4 h-16 text-lg" + (purchaseHistoryTab ? " tab-active" : " bg-rose100")}>Purchased History</button> 
                <button on:click={() => handleTab('order')} class={"tab tab-lifted w-1/4 h-16 text-lg" + (orderTab ? " tab-active" : " bg-rose100")}>My Orders</button> 
                <button on:click={() => handleTab('account')} class={"tab tab-lifted w-1/4 h-16 text-lg" + (accountTab ? " tab-active" : " bg-rose100")}>My Account</button> 


            </div>
                {#if listingTab}

                <div class="flex heading">
                    <h1 class="w-full flex item-center justify-center text-3xl py-8">My Listing</h1>
                    <a href="/products/new" class="btn flex item-center justify-center mt-6 mx-8 bg-rose300 hover:bg-rose400 hover:border-gray100 text-3xl border-gray100">+</a>
                </div>
                
                <div id="mylisting" class="font-roboto relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500">
                        <thead class="text-sm  text-gray-700 uppercase bg-rose100">
                            <tr>
                                <th scope="col" class="w-1/2 px-6 py-5">
                                    Product Info
                                </th>
                                <th scope="col" class="text-center px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" class="text-center px-6 py-3">
                                    Stock
                                </th>
                                <th scope="col" class="text-center px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" class="text-center px-6 py-3">
                                    <span class="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        {#each data.data.products as listing}
                        <tbody>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="flex truncate items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <img src={listing?.images[0]?.url} class="w-full object-contain h-60" alt="listing photo">
                                    {listing.title}
                                </th>
                                <td class=" text-center px-6 py-4">
                                    {listing.category}
                                </td>
                                <td class="text-center px-6 py-4">
                                    {listing.stock}
                                </td>
                                <td class="text-center px-6 py-4">
                                    {listing.price}
                                </td>
                                <td class="text-center px-6 py-4 text-left">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline px-2">Edit</a>
                                    <!-- <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline px-2">Delete</a> -->
                                    <button on:click={() => deleteProduct(listing.id)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline px-2">Delete</button>

                                </td>
                            </tr>
                            <!-- <tbody>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="flex truncate items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <img src="http://www.storyofakitchen.com/images/kitty-cookies4.jpg" alt="">
                                        Cat cookie 123
                                    </th>
                                    <td class=" text-center px-6 py-4">
                                        cat
                                    </td>
                                    <td class="text-center px-6 py-4">
                                        12
                                    </td>
                                    <td class="text-center px-6 py-4">
                                        RM10
                                    </td>
                                    <td class="text-center px-6 py-4 text-left">
                                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline px-2">Edit</a>
                                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline px-2">Delete</a>
    
                                    </td>
                                </tr> -->
                            
                                </tbody>
                                {/each}
                            </table>
                        </div>
                  
                  
                
                {/if}
        
                {#if purchaseHistoryTab}
    

                <div class="heading">
                    <h1 class="w-full flex item-center justify-center text-3xl py-8">Purchase History</h1>
                </div>
                
                <div id="purchaseHistory" class="font-roboto relative overflow-x-auto shadow-md sm:rounded-lg my-">
                    <table class="w-full text-sm text-left text-gray-500">
                        <thead class="text-sm text-gray-700 uppercase bg-rose100">
                            <tr class="">
                                <th scope="col" class="text-center px-6 py-5 w-1/3">
                                    <div class="text-base font-semibold ">Order number</div>
                                    <div> ABC1234</div>
                                </th>
                                <th scope="col" class="text-center px-6 py-5 w-1/3">
                                    <div class="text-base font-semibold ">Dated placed</div>
                                    <div> 15 March, 2023</div>
                                </th>
                                <th scope="col" class="text-center px-6 py-5 w-1/3">
                                    <div class="text-base font-semibold ">Total amount</div>
                                    <div> RM20.00</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900">
                                    <img src="http://www.storyofakitchen.com/images/kitty-cookies4.jpg" alt="">
                                    Cat cookie 123
                                </th>
                                <td class="px-6 py-4 w-1/3 text-center">
                                    Quantity : 1
                                </td>
                                <td class="px-6 py-4 w-1/3 text-center">
                                    RM20.00
                                </td>
                            </tr>
                            <tbody>
                        </tbody>
                    </table>
                </div>
                <div id="purchaseHistory" class="font-roboto relative overflow-x-auto shadow-md sm:rounded-lg my-3">
                    <table class="w-full text-sm text-left text-gray-500">
                        <thead class="text-sm text-gray-700 uppercase bg-rose100">
                            <tr class="">
                                <th scope="col" class="text-center px-6 py-5 w-1/3">
                                    <div class="text-base font-semibold ">Order number</div>
                                    <div> ABC1234</div>
                                </th>
                                <th scope="col" class="text-center px-6 py-5 w-1/3">
                                    <div class="text-base font-semibold ">Dated placed</div>
                                    <div> 15 March, 2023</div>
                                </th>
                                <th scope="col" class="text-center px-6 py-5 w-1/3">
                                    <div class="text-base font-semibold ">Total amount</div>
                                    <div> RM20.00</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900">
                                    <img src="http://www.storyofakitchen.com/images/kitty-cookies4.jpg" alt="">
                                    Cat cookie 123
                                </th>
                                <td class="px-6 py-4 w-1/3 text-center">
                                    Quantity : 1
                                </td>
                                <td class="px-6 py-4 w-1/3 text-center">
                                    RM20.00
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900">
                                    <img src="http://www.storyofakitchen.com/images/kitty-cookies4.jpg" alt="">
                                    Cat cookie 123
                                </th>
                                <td class="px-6 py-4 w-1/3 text-center">
                                    Quantity : 1
                                </td>
                                <td class="px-6 py-4 w-1/3 text-center">
                                    RM20.00
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900">
                                    <img src="http://www.storyofakitchen.com/images/kitty-cookies4.jpg" alt="">
                                    Cat cookie 123
                                </th>
                                <td class="px-6 py-4 w-1/3 text-center">
                                    Quantity : 1
                                </td>
                                <td class="px-6 py-4 w-1/3 text-center">
                                    RM20.00
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                        
                  
                {/if}

                {#if orderTab}
                
                <div class="heading">
                    <h1 class="w-full flex item-center justify-center text-3xl py-8">My Orders</h1>
                </div>
                
                <div id="myorder" class="font-roboto relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-center text-gray-500">
                        <thead class="text-sm  text-gray-700 uppercase bg-rose100">
                            <tr>
                                <th scope="col" class="w-1/6 px-6 py-5">
                                    Product 
                                </th>
                                <th scope="col" class="w-1/6 px-6 py-3">
                                    Order number
                                </th>
                                <th scope="col" class="w-1/6 px-6 py-3">
                                    Quantity
                                </th>
                                <th scope="col" class="w-1/6 px-6 py-3">
                                    Total price
                                </th>
                                <th scope="col" class="w-2/6 px-6 py-3">
                                    Buyer's information
                                </th>
                                <!-- <th scope="col-2" class="w-2/5 px-6 py-3">
                                    <span class="sr-only">Buyer's address</span>
                                </th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                    <div class="text-center text-base text-bold truncate pb-2">Cat cookies</div>
                                    <img src="http://www.storyofakitchen.com/images/kitty-cookies4.jpg" alt="">
                                </th>
                                <td class="px-6 py-4">
                                    ABC1234
                                </td>
                                <td class="px-6 py-4">
                                    2
                                </td>
                                <td class="px-6 py-4">
                                    RM30
                                </td>
                                <td class="px-6 py-4">
                                    <div>Amy</div>
                                    <div>+60112345678</div>
                                    <div>Skyville 8 @ Benteng, 439, Jln Klang Lama, 58000 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur</div>
                                </td>
                                <!-- <td class="px-6 py-4 text-left">
                                </td> -->
                            </tr>
                            
                                </tbody>
                            </table>
                        </div>                  
                
                {/if}

                {#if accountTab}
                
                <div class="bg-white p-3 shadow-sm rounded-sm ">
                    <div class="heading">
                        <h1 class="w-full flex item-center justify-center text-3xl py-8">My Account</h1>
                    </div>
                    
                    <div class="text-gray-700 border pt-10">
                        <!-- <div>
                            <div class="px-4 py-2 pb-1 font-semibold">Profile Picture</div>
                            <img class="object-scale-down h-48 w-45 px-4 py-2 pt-0"
                            src="https://images.unsplash.com/photo-1587402092301-725e37c70fd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHw%3D&w=1000&q=80"
                            alt="dog">                        
                        </div> -->
                        <div class="grid md:grid-cols-2 text-sm">
                            <div class="pb-6">
                                <div class="px-4 py-2 pb-1 pl-10 font-semibold">Name</div>
                                <div class="px-4 py-2 pt-0 pl-10">{data.data.name}</div>
                            </div>
                            <div class="pb-6">
                                <div class="px-4 py-2 pb-1 font-semibold">Email</div>
                                <div class="px-4 py-2 pt-0">
                                    <a class="text-blue-800" href="mailto:jane@example.com">{data.data.email}</a>
                                </div>
                            </div>
                            <!-- <div class="pb-6">
                                <div class="px-4 py-2 pb-1 font-semibold pl-10">Password</div>
                                <div class="px-4 py-2 pt-0 pl-10">********</div>
                            </div> -->
                            <!-- <div class="pb-6">
                                <div class="px-4 py-2 pb-1 font-semibold">Birthday</div>
                                <div class="px-4 py-2 pt-0">Feb 06, 1998</div>
                            </div> -->
                            <div class="pb-6">
                                <div class="px-4 py-2 pb-1 font-semibold pl-10">Gender</div>
                                <div class="px-4 py-2 pt-0 pl-10">Female</div>
                            </div>
                            <div class="pb-6">
                                <div class="px-4 py-2 pb-1 font-semibold">Contact No.</div>
                                <div class="px-4 py-2 pt-0">+60123456789</div>
                            </div>
                            <!-- <div class="pb-6">
                                <div class="px-4 py-2 pb-1 font-semibold pl-10">Description</div>
                                <div class="px-4 py-2 pt-0 pl-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique quas nulla repellendus assumenda vitae dolor neque quia id quidem hic facere illo accusamus tempore consequuntur esse, repellat aut reiciendis omnis.</div>
                            </div> -->
                        </div>
                    </div>
                </div>
                <!-- End of about section -->
                {/if}

                <div class="my-4"></div>

                <!-- Experience and education -->
                
                </div>
                <!-- End of profile tab -->
            </div>
        </div>
    