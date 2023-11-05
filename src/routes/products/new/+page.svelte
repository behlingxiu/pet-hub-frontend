<script>
     import { goto } from '$app/navigation';
	import { PUBLIC_BASE_URL } from '$env/static/public';
    import { getTokenFromLocalStorage } from '../../../utils/auth'
    import { uploadMedia } from '../../../utils/s3-uploader'
    import Icon from 'svelte-icon/Icon.svelte';
    import trash from '../../../assets/trash.svg?raw'
	// import AuthModal from '../../components/AuthModal.svelte';
	// import Footer from '../../components/common/+footer.svelte';
	// import Header from '../../components/common/+header.svelte';
	// import Layout from '../+layout.svelte';

    export let data

    let input;
    let images = [];
    let evtImages = [];
    let totalImages = 0;
    let formErrors = {}
        function postProduct() {
            goto('/');
        }
    
        console.log(data)
        //go to my listing page

async function createProduct(evt) {
    evt.preventDefault()
    let imageUrl = []
    for (const evtImage of evtImages){
        const [fileName, fileUrl] = await uploadMedia(evtImage);
        imageUrl.push({url: fileUrl})
    }

    const data = {
        title: evt.target['productname'].value,
        category: evt.target['category'].value,
        condition: evt.target['condition'].value,
        price: evt.target['price'].value,
        stock: evt.target['stock'].value,
        description: evt.target['description'].value,
        url: imageUrl
    }

    const res = await fetch(PUBLIC_BASE_URL + '/products', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': getTokenFromLocalStorage(),
            'mode': 'cors'
            },
            body: JSON.stringify(data)
        })

        const resp = await res.json()

      if (res.status == 200){
        postProduct()
      } else {
        console.log(resp)
        formErrors = resp.error
      }

}

const onChange = () => {
    const files = input.files;

    if (files) {
        totalImages = images.length
        evtImages = [...evtImages, ...input.files]
      for (const file of files ){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", function () {
            images = [...images, {url: reader.result, name: file.name }]
      });
      }	
	    return;
    } 
    totalImages = 0
}

const remove = (image) => {
    const index = images.findIndex((item) => item.url === image.url)
    evtImages.splice(index, 1)
    const filtered = images.filter((item) => item.url !== image.url)
    images = filtered
    totalImages = images.length
}

</script>

<svelte:head>
  <script src="/aws-sdk-s3.min.js"></script>
</svelte:head>

<div class="container mt-3 lg:mt-10 mx-auto px-2 lg:px-20 mb-20">
    <h1 class="text-2xl mt-4 font-bold">
        Add Product
    </h1>
    <form on:submit={createProduct} class="w-full">

        <div class="flex py-1">
            <div class="w-2/3">
                <div class="form-control">
                <label class="label label-text text-base" for="productname">Product Name</label>
                <input
                    type="text"
                    name="productname"
                    placeholder=""
                    class="input input-bordered border-rose300 rounded-3xl"
                />
                {#if 'productname' in formErrors}
                    <label class="label" for="productname">
                        <span class="label-text-alt text-red-500">{formErrors['productname']}</span>
                    </label>
                {/if}
            </div>
    
            <div class="py-1">
                <div class="mt-2 py-2 px-1 text-base "></div>
                <input bind:this={input} name="file" type="file" id="select-image" class="hidden" multiple on:change={onChange}/>
                {#if images.length > 0}
                    <div id="images" class="flex justify-center">
                        {#each images as image}
                            <div class="mr-4 relative">
                                 <img class="h-20" src={image.url} alt="product" />
                                 <div class="transition ease-in-out duration-300 absolute left-0 top-0 right-0 bottom-0 opacity-0 bg-black100 h-full w-full  hover:opacity-100">
                                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <button on:click={() => remove(image)}>
                                            <Icon data={trash} fill="white" />
                                        </button>
                                       
                                    </div>
                                    
                                  </div>
                            </div>
                           
                        {/each}
                    </div>
                    {/if}
                <label class="btn btn-md bg-rose300 border-rose300 hover:bg-rose400 hover:border-rose400 rounded-3xl" for="select-image">
                    Choose Images
                </label>
                <p class="text-xs pl-5 pt-1"><span id="total-images">{totalImages}</span> File(s) Selected</p>
                {#if 'image' in formErrors}
                    <label class="label" for="image">
                        <span class="label-text-alt text-red-500">{formErrors['image']}</span>
                    </label>
                {/if}
            </div>
            </div>
        </div>

        

        

        

        <div class="grid grid-cols-2 w-full py-1">
            <div class="pr-6">
                <label class="label label-text text-base" for="category">Category</label>
                    <select name="category" class="select select-bordered border-rose300 rounded-3xl w-full max-w-lg">
                        <option value="" disabled selected>Pick your category</option>
                        <option value="Dogs">Dogs</option>
                        <option value="Cats">Cats</option>
                    </select> 
                    {#if 'category' in formErrors}
                        <label class="label" for="category">
                            <span class="label-text-alt text-red-500">{formErrors['category']}</span>
                        </label>
                    {/if}
            </div>
            
            <div class="pl-6">
                <label class="label label-text text-base" for="condition">Condition</label>
                    <select name="condition" class="select select-bordered border-rose300 rounded-3xl w-full max-w-xl">
                        <option value="" disabled selected>Pick your condition</option>
                        <option value="New">New</option>
                        <option value="Used">Used</option>
                    </select>
                    {#if 'condition' in formErrors}
                        <label class="label" for="condition">
                            <span class="label-text-alt text-red-500">{formErrors['condition']}</span>
                        </label>
                    {/if}              
            </div>
            
        </div> 

        <div class="grid grid-cols-2 w-full py-1">
            <div class="pr-6">
                <label class="label label-text text-base" for="price">Price</label>
                <label class="input-group rounded-3xl">
                    <span class='bg-rose300 rounded-3xl'>RM</span>
                    <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    name="price"
                    placeholder=""
                    class="input input-bordered border-rose300 rounded-3xl w-full max-w-xl"
                />
                </label>
                {#if 'price' in formErrors}
                    <label class="label" for="price">
                        <span class="label-text-alt text-red-500">{formErrors['price']}</span>
                    </label>
                {/if}
            </div>

            <div class="pl-6 ">
                <label class="label label-text text-base " for="stock">Stock</label>
                <label class="input-group">
                    <span class='bg-rose300 rounded-3xl'>Unit</span>
                    <input
                    type="number"
                    min="0"
                    name="stock"
                    placeholder=""
                    class="input input-bordered border-rose300 rounded-3xl w-full max-w-xl"
                />
                </label>
                {#if 'stock' in formErrors}
                    <label class="label" for="stock">
                        <span class="label-text-alt text-red-500">{formErrors['stock']}</span>
                    </label>
                {/if}
            </div>
        </div>
        

        <div class="form-control w-full py-1">
            <label class="label label-text text-base" for="description">Description</label>
            <textarea
                name="description"
                placeholder=""
                class="input input-bordered border-rose300 rounded-3xl h-60"
            />
            {#if 'description' in formErrors}
                <label class="label" for="description">
                    <span class="label-text-alt text-red-500">{formErrors['description']}</span>
                </label>
            {/if}
        </div>

        <div class="form-control w-full mt-6 ">
            <button class="btn btn-md bg-rose300 border-rose300 hover:bg-rose400 hover:border-rose400 rounded-3xl">Upload</button>
        </div>

    </form>
</div>





