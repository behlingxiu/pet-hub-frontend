<script>
    
</script>


<div class="container mt-3 lg:mt-10 px-2 lg:px-0 mx-auto">
    <h1 class = "text-center text-xl">Sign Up</h1>

    <div class= "flex flex-col justify-center items-center mt-2">
        <form class="w-1/3"></form>
            <div class="form-control w-1/3">
                <label class= "label label-text" for="name">Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    class="input input-bordered"
                />
                <!-- {#if 'name' in formErrors}
                    <label class="label" for="name">
                        <span class="label-text-alt text-red-500">{formErrors['name']}</span>
                    </label>
                {/if} -->
            </div>

            <div class="form-control w-1/3">
                <label class= "label label-text" for="email">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    class="input input-bordered"
                />
                <!-- {#if 'email' in formErrors}
                    <label class="label" for="email">
                        <span class="label-text-alt text-red-500">{formErrors['email']}</span>
                    </label>
                {/if} -->
            </div>

            <div class="form-control w-1/3">
                <label class= "label label-text" for="password">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder=""
                    class="input input-bordered"
                />
            </div>

            <div class="form-control w-1/3">
                <label class= "label label-text" for="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder=""
                    class="input input-bordered"
                />
            </div>

            <div class="form-control mt-4 w-1/3">
                <button class="btn border-pink300 bg-pink300 hover:bg-pink400 hover:border-pink400">CREATE AN ACCOUNT</button>
            </div>

            <div class="text-center">
                <a class="link-hover italic text-xs" href="/sign-in"
                    >Already signed up? Click here to sign-in instead.</a
                >
            </div>
    </div>
</div>