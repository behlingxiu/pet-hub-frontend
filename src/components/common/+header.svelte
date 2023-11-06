<script>
    import AuthModal from "../AuthModal.svelte";
    import {getUser, loggedIn, logOut} from '../../utils/auth'
	import {goto} from '$app/navigation'
	import { afterUpdate } from "svelte";
    import User from "../../assets/user.svelte";
	
	const signOut = () => {
		logOut()
		goto('/')
	}
    let user = '';

    afterUpdate(() => {
		if ($loggedIn) {
            user = getUser()
        }
	});

</script>

<AuthModal/>
 <nav class="bg-rose200 font-shantell-sans font-mono border-gray-200 dark:bg-rose200">
    <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
        <a href="/" class="flex items-center">
            <img src="https://cdn-icons-png.flaticon.com/512/1581/1581594.png" class="h-6 mr-3 sm:h-9" alt="Logo" />
            <span class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">PAWS</span>
        </a>
        <form class="flex items-center">   
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required>
            </div>
            <!-- <button type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span class="sr-only">Search</span>
            </button> -->
        </form>
        <div class="flex items-center">
            {#if $loggedIn}
            <div class="dropdown dropdown-hover dropdown-end">
                <button class=" text-gray-500 dark:text-white hover:bg-rose300 btn btn-ghost right-btn text-zinc-300 text-sm"><img class="h-6" src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"/></button>
                <ul class="dropdown-content menu shadow bg-base-100 rounded-box w-52">
                    <li class="text-transform: uppercase bg-rose400 px-4 py-3 text-white font-semibold">{user.name}</li>
                    <!-- <li><a href="/profile?orders"><img class="h-4" style="filter: invert(89%) sepia(69%) saturate(2655%) hue-rotate(283deg) brightness(99%) contrast(87%);" src="https://cdn-icons-png.flaticon.com/512/747/747376.png">Go to my profile</a></li> -->
                    <li><a href="/profile?orders"><img class="h-4" style="filter: invert(89%) sepia(69%) saturate(2655%) hue-rotate(283deg) brightness(99%) contrast(87%);" src="https://cdn-icons-png.flaticon.com/512/2630/2630085.png">My orders</a></li>
                    <li><a href="/profile?listings"><img class="h-4" style="filter: invert(89%) sepia(69%) saturate(2655%) hue-rotate(283deg) brightness(99%) contrast(87%);" src="https://cdn-icons-png.flaticon.com/512/7387/7387315.png">My listings</a></li>
                    <li><a href="/profile?purchase"><img class="h-4" style="filter: invert(89%) sepia(69%) saturate(2655%) hue-rotate(283deg) brightness(99%) contrast(87%);" src="https://cdn-icons-png.flaticon.com/512/7387/7387315.png">Purchased history</a></li>
                    <li class="border-y-2"><button on:click={signOut}><img class="h-4" style="filter: invert(21%) sepia(91%) saturate(6843%) hue-rotate(358deg) brightness(98%) contrast(98%);" src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png">Log out</button></li>
                </ul>
            </div>
            {:else}
            <div class="tooltip tooltip-bottom" data-tip="Login / Create Account">
                <label for="my-modal-4" class=" text-gray-500 dark:text-white hover:bg-rose300 btn btn-ghost right-btn text-zinc-300 text-sm"><img class="h-6" src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"/></label>
            </div>
            {/if}
            <a href="/cart" class=" text-gray-500 dark:text-white hover:bg-rose300 btn btn-ghost right-btn mr-2 text-zinc-300 text-sm"><img class="h-6" src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png" />
            </a>
        </div>
    </div>
</nav>
<nav class="bg-rose100 dark:bg-rose200">
    <div class="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
        <div class="flex justify-center items-center">
            <ul class="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
                <!-- <li>
                    <a href="#" class="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</a>
                </li> -->
                <li>
                    <a href="/category/dogs" class="text-gray-900 dark:text-white hover:underline">
                        <img src="https://cdn-icons-png.flaticon.com/128/181/181867.png" class="h-6 mr-3 sm:h-9" alt="dog logo" />
                    </a>
                </li>
                <li>
                    <a href="/category/cats" class="text-gray-900 dark:text-white hover:underline">
                        <img src="https://uxwing.com/wp-content/themes/uxwing/download/animals-and-birds/cat-animal-icon.png" class="h-6 mr-3 sm:h-9" alt="cat logo">
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
