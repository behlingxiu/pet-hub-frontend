<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer>

    // let isModalOpen = false
    let listingTab = false
    let orderTab = false
    let accountTab = true


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
            <div class="w-full md:w-9/12 mx-2 h-64">
                
                
                <!-- Profile tab -->


            <div class="tabs font-shantell-sans">
                <button on:click={() => handleTab('listing')} class={"tab tab-lifted w-1/3 h-16 text-lg" + (listingTab ? " tab-active" : " bg-rose100")}>Listing</button> 
                <button on:click={() => handleTab('order')} class={"tab tab-lifted w-1/3 h-16 text-lg" + (orderTab ? " tab-active" : " bg-rose100")}>My Order</button> 
                <button on:click={() => handleTab('account')} class={"tab tab-lifted w-1/3 h-16 text-lg" + (accountTab ? " tab-active" : " bg-rose100")}>My Account</button> 

            </div>
                {#if listingTab}
                <div class="container lg:mt-10 px-2 lg:px-0 mx-auto">
                
                    This is a listing Tab
                </div>
                {/if}
        
                {#if orderTab}
                <div class="container mt-20 md: px-2 lg:px-0 mx-auto">
                
                    This is a order tab
                </div>
                {/if}

                {#if accountTab}
                
                <div class="bg-white p-3 shadow-sm rounded-sm">
                    <div class="relative flex items-center space-x-4 pb-6 pt-6 font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                            <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <span class="tracking-wide">General Information</span>
                        <div class="absolute top-5 right-0">
                                <!-- <span class="bg-rose300 rounded text-white">EDIT</span> -->
                                <button type="button" class="text-white bg-rose300 hover:bg-rose100 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">EDIT</button>
                        </div>
                    </div>
                    
                    <div class="text-gray-700">
                        <!-- <div>
                            <div class="px-4 py-2 pb-1 font-semibold">Profile Picture</div>
                            <img class="object-scale-down h-48 w-45 px-4 py-2 pt-0"
                            src="https://images.unsplash.com/photo-1587402092301-725e37c70fd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHw%3D&w=1000&q=80"
                            alt="dog">                        
                        </div> -->
                        <div class="grid md:grid-cols-2 text-sm">
                            <div class="pb-6">
                                <div class="px-4 py-2 pb-1 font-semibold">Name</div>
                                <div class="px-4 py-2 pt-0">John Dog</div>
                            </div>
                            <div class="pb-6">
                                <div class="px-4 py-2 pb-1 font-semibold">Email</div>
                                <div class="px-4 py-2 pt-0">
                                    <a class="text-blue-800" href="mailto:jane@example.com">jane@example.com</a>
                                </div>
                            </div>
                            <div class="pb-6">
                                <div class="px-4 py-2 pb-1 font-semibold">Password</div>
                                <div class="px-4 py-2 pt-0">********</div>
                            </div>
                            <div class="pb-6">
                                <div class="px-4 py-2 pb-1 font-semibold">Birthday</div>
                                <div class="px-4 py-2 pt-0">Feb 06, 1998</div>
                            </div>
                            <div class="pb-6">
                                <div class="px-4 py-2 pb-1 font-semibold">Gender</div>
                                <div class="px-4 py-2 pt-0">Female</div>
                            </div>
                            <div class="pb-6">
                                <div class="px-4 py-2 pb-1 font-semibold">Contact No.</div>
                                <div class="px-4 py-2 pt-0">+60123456789</div>
                            </div>
                            <div class="pb-6">
                                <div class="px-4 py-2 pb-1 font-semibold">Description</div>
                                <div class="px-4 py-2 pt-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique quas nulla repellendus assumenda vitae dolor neque quia id quidem hic facere illo accusamus tempore consequuntur esse, repellat aut reiciendis omnis.</div>
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
    