<style>

   
    
    #order img{
        width: 15%;
        border-radius: 20px;
        padding: 20px 20px;
    }

</style>

<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer>

    // let isModalOpen = false
    let listingTab = false
    let orderTab = true
    let accountTab = false


const handleTab = (action) => {
            if (action === 'listing'){
                listingTab = true;
                orderTab = false
                accountTab = false
            } else if (action === 'order'){
                orderTab = true;
                listingTab = false
                accountTab = false
            } else if (action === 'account'){
                accountTab = true;
                listingTab = false
                orderTab = false
            }
             
}

</script>





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
                    <h1 class="text-gray-900 font-shantell-sans font-bold text-xl leading-8 my-1">HELLO John Dog</h1>
                    <!-- <h3 class="text-gray-600 font-lg text-semibold leading-6">Rating: 4.5/5</h3> -->
                    <p class="text-sm text-gray-500 font-rokkitt hover:text-gray-600 leading-6">(DESCRIPTION)Lorem ipsum dolor sit amet
                        consectetur adipisicing elit.
                        Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt</p>
                    <ul
                        class="bg-rose100 border-white font-shantell-sans text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        <li class="flex items-center py-3">
                            <span>Rating</span>
                            <span class="ml-auto"><span
                                    class="bg-rose300 py-1 px-2 rounded text-white text-sm">4.5 / 5</span></span>
                        </li>
                        <li class="flex items-center py-3">
                            <span>Member since</span>
                            <span class="ml-auto">Nov 07, 2016</span>
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
                <button on:click={() => handleTab('listing')} class={"tab tab-lifted w-1/3 h-16 text-lg" + (listingTab ? " tab-active" : " bg-rose100")}>Listing</button> 
                <button on:click={() => handleTab('order')} class={"tab tab-lifted w-1/3 h-16 text-lg" + (orderTab ? " tab-active" : " bg-rose100")}>My Order</button> 
                <button on:click={() => handleTab('account')} class={"tab tab-lifted w-1/3 h-16 text-lg" + (accountTab ? " tab-active" : " bg-rose100")}>My Account</button> 

            </div>
                {#if listingTab}
                
                  <div>This is a listing tab</div>
                  
                  
                
                {/if}
        
                {#if orderTab}
                <div id="order">
                    <div class="heading">
                        <h1 class="w-full flex item-center justify-center text-3xl py-8">Order History</h1>
                    </div>
                    <div class="order-container font-roboto">
                        <div class="order-table">
                            <div class="table-head w-full bg-rose100 border border-gray-200 rounded-lg grid md:grid-cols-3">
                                <div class="flex flex-col items-center justify-center py-4">
                                    <span class="text-xl font-bold">Order number</span>
                                    <span class="font-light text-gray-500">ABC1234</span>
                                </div>
                                <div class="flex flex-col items-center justify-center py-4">
                                    <span class="text-xl font-bold">Date placed</span>
                                    <span class="font-light text-gray-500">15 March, 2023</span>
                                </div>
                                <div class="flex flex-col items-center justify-center py-4">
                                    <span class="text-xl font-bold">Total amount</span>
                                    <span class="font-light text-gray-500">RM50.90</span>
                                </div>
                            </div>
                            <div class="orders flex items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w">
                                <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="https://www.tasteofhome.com/wp-content/uploads/2018/12/Peanut-Butter-Dog-Treats.-Coconut-Oil-Dog-Treats.-Live-Laugh-Rowe.jpg" alt="">
                                <div class="w-full flex justify-between">
                                    <div>
                                        <div class="px-5 font-bold text-l">Paws shape cookies</div>
                                        <div class="px-5 font-light text-gray-500">seller's name</div>
                                    </div>
                                    <div>Quantity : 1</div>
                                    <div class="px-10">RM20.90</div>
                                </div>
                            </div>
                            <div class="orders flex items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w">
                                <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="https://i.pinimg.com/originals/f4/e3/17/f4e31741fb9dcb50372a942665c407a4.jpg" alt="">
                                <div class="w-full flex justify-between">
                                    <div>
                                        <div class="px-5 font-bold text-l">dog shape cookies</div>
                                        <div class="px-5 font-light text-gray-500">seller's name</div>
                                    </div>
                                    <div>Quantity : 1</div>
                                    <div class="px-10">RM15.00</div>
                                </div>
                            </div>
                            <div class="orders flex items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w">
                                <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="https://i.pinimg.com/originals/e2/49/0d/e2490d950b13f90a747c7e4ff6212c8a.jpg" alt="">
                                <div class="w-full flex justify-between">
                                    <div>
                                        <div class="px-5 font-bold text-l">cat shape cookies</div>
                                        <div class="px-5 font-light text-gray-500">seller's name</div>
                                    </div>
                                    <div>Quantity : 1</div>
                                    <div class="px-10">RM15.00</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="order-container font-roboto pt-10">
                        <div class="order-table">
                            <div class="table-head w-full bg-rose100 border border-gray-200 rounded-lg grid md:grid-cols-3">
                                <div class="flex flex-col items-center justify-center py-4">
                                    <span class="text-xl font-bold">Order number</span>
                                    <span class="font-light text-gray-500">ABC1232</span>
                                </div>
                                <div class="flex flex-col items-center justify-center py-4">
                                    <span class="text-xl font-bold">Date placed</span>
                                    <span class="font-light text-gray-500">10 March, 2023</span>
                                </div>
                                <div class="flex flex-col items-center justify-center py-4">
                                    <span class="text-xl font-bold">Total amount</span>
                                    <span class="font-light text-gray-500">RM60.00</span>
                                </div>
                            </div>
                            <div class="orders flex items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w">
                                <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="https://www.cake2therescue.com.au/wp-content/uploads/2020/05/caviler-king-charles-dog-birthday-cake-kit-cake-2-the-rescue.jpg" alt="">
                                <div class="w-full flex justify-between">
                                    <div>
                                        <div class="px-5 font-bold text-l">Dog birthday cake</div>
                                        <div class="px-5 font-light text-gray-500">seller's name</div>
                                    </div>
                                    <div>Quantity : 1</div>
                                    <div class="px-10">RM30.00</div>
                                </div>
                            </div>
                            <div class="orders flex items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w">
                                <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="https://boulderlocavore.com/wp-content/uploads/2015/03/How-to-Make-a-Grumpy-Cat-Cake-BoulderLocavore.com-986.jpg" alt="">
                                <div class="w-full flex justify-between">
                                    <div>
                                        <div class="px-5 font-bold text-l">Cat birthday cake</div>
                                        <div class="px-5 font-light text-gray-500">seller's name</div>
                                    </div>
                                    <div>Quantity : 1</div>
                                    <div class="px-10">RM30.00</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/if}

                {#if accountTab}
                
                <div class="bg-white p-3 shadow-sm rounded-sm ">
                    <div class="w-full flex justify-around items-center space-x-4 pb-6 pt-6 font-semibold text-gray-900 leading-8">
                        
                        <span class="flex tracking-wide text-2xl">
                            General Information
                        </span>
                        <div class="">
                                <!-- <span class="bg-rose300 rounded text-white">EDIT</span> -->
                                <button type="button" class="text-white bg-rose300 hover:bg-rose100 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">EDIT</button>
                        </div>
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
                                <div class="px-4 py-2 pt-0 pl-10">John Dog</div>
                            </div>
                            <div class="pb-6">
                                <div class="px-4 py-2 pb-1 font-semibold">Email</div>
                                <div class="px-4 py-2 pt-0">
                                    <a class="text-blue-800" href="mailto:jane@example.com">jane@example.com</a>
                                </div>
                            </div>
                            <div class="pb-6">
                                <div class="px-4 py-2 pb-1 font-semibold pl-10">Password</div>
                                <div class="px-4 py-2 pt-0 pl-10">********</div>
                            </div>
                            <div class="pb-6">
                                <div class="px-4 py-2 pb-1 font-semibold">Birthday</div>
                                <div class="px-4 py-2 pt-0">Feb 06, 1998</div>
                            </div>
                            <div class="pb-6">
                                <div class="px-4 py-2 pb-1 font-semibold pl-10">Gender</div>
                                <div class="px-4 py-2 pt-0 pl-10">Female</div>
                            </div>
                            <div class="pb-6">
                                <div class="px-4 py-2 pb-1 font-semibold">Contact No.</div>
                                <div class="px-4 py-2 pt-0">+60123456789</div>
                            </div>
                            <div class="pb-6">
                                <div class="px-4 py-2 pb-1 font-semibold pl-10">Description</div>
                                <div class="px-4 py-2 pt-0 pl-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique quas nulla repellendus assumenda vitae dolor neque quia id quidem hic facere illo accusamus tempore consequuntur esse, repellat aut reiciendis omnis.</div>
                            </div>
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
    