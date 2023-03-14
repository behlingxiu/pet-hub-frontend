<script>

import { PUBLIC_BASE_URL } from '$env/static/public';
import {authenticateUser, loggedIn} from '../utils/auth'
    
    let formErrors = {}
    let errorMsg = ''
    let isModalOpen = false
    let loginTab = false
    let isLoading = false
    let signUpTab = true
        const handleTab = (action) => {
            if (action === 'signUp'){
                signUpTab = true;
                loginTab = false
                formErrors = {}
                errorMsg = ''
            } else {
                loginTab = true;
                signUpTab = false
                formErrors = {}
                errorMsg = ''
            }
        }
    
        async function create(evt) {
            isLoading=true
            evt.preventDefault()
            if (evt.target['password'].value != evt.target['confirmPassword'].value){
                formErrors['password'] = 'Password confirmation does not match'
                isLoading = false
                return;
            }
    
            const userData= {
                name: evt.target ['name'].value,
                email: evt.target['email'].value,
                password: evt.target['password'].value,
            };
    
            const resp = await fetch (PUBLIC_BASE_URL + '/users', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            isLoading=false
            if (resp.status == 200) {
                const res = await resp.json();
                isModalOpen = false
                localStorage.setItem("auth", JSON.stringify({
                    "token": res.accessToken,
                    "user": res.user,
                }));
                loggedIn.set(true)
            } else {
                const res = await resp.json();
                formErrors = res.error
            }
            
        } 
    
        async function onSubmit(evt) {
            isLoading=true
            evt.preventDefault()
            const userData= {
                email: evt.target['email'].value,
                password: evt.target['password'].value
            };
            const resp = await authenticateUser(userData.email, userData.password)
            isLoading=false
            if (resp.success === true) {
                evt.target.reset()
                isModalOpen = false
            } else {
                if (resp.status === 400){
                    formErrors = resp.res.error
                } else {
                    errorMsg = resp.res.error
                }
                
            }
            
        } 

</script>
    <input type="checkbox" id="my-modal-4" class="modal-toggle" bind:checked={isModalOpen} />
    <label for="my-modal-4" class="modal cursor-pointer">
      <label class="modal-box relative pt-0 pl-0 pr-0 font-shantell-sans" style="height: 600px" for="">
        <div class="tabs">
            <button on:click={() => handleTab('signUp')} class={"tab tab-lifted w-1/2 h-16 text-lg" + (signUpTab ? " tab-active" : " bg-gray-100")}>Sign Up</button> 
            <button on:click={() => handleTab('login')} class={"tab tab-lifted w-1/2 h-16 text-lg" + (loginTab ? " tab-active" : " bg-gray-100")}>Log In</button> 
        </div>
            {#if signUpTab}
            <div class="container lg:mt-10 px-2 lg:px-0 mx-auto">
            
                <div class= "flex flex-col justify-center items-center">
                    <form on:submit={create} class="w-2/3">
                        <div class="form-control w-full">
                            <label class= "label label-text text-rose400 tracking-wider text-xs" for="name">NAME</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                class="input input-bordered bg-gray100 border-gray100 rounded-3xl"
                            />
                            {#if 'name' in formErrors}
                                <label class="label" for="name">
                                    <span class="label-text-alt text-red-500">{formErrors['name']}</span>
                                </label>
                            {/if}
                            
                        </div>
            
                        <div class="form-control w-full mt-4">
                            <label class= "label label-text text-rose400 tracking-wider text-xs" for="email">E-MAIL</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="john@example.com"
                                class="input input-bordered bg-gray100 border-gray100 rounded-3xl"
                            />
                            {#if 'email' in formErrors}
                                <label class="label" for="email">
                                    <span class="label-text-alt text-red-500">{formErrors['email']}</span>
                                </label>
                            {/if}
                        </div>
            
                        <div class="form-control w-full mt-4">
                            <label class= "label label-text text-rose400 tracking-wider text-xs" for="password">PASSWORD</label>
                            <input
                                type="password"
                                name="password"
                                placeholder=""
                                class="input input-bordered bg-gray100 border-gray100 rounded-3xl"
                            />
                            {#if 'password' in formErrors}
                                <label class="label" for="password">
                                    <span class="label-text-alt text-red-500">{formErrors['password']}</span>
                                </label>
                            {/if}
                        </div>
            
                        <div class="form-control w-full mt-4">
                            <label class= "label label-text text-rose400 tracking-wider text-xs" for="confirmPassword">CONFIRM PASSWORD</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder=""
                                class="input input-bordered bg-gray100 border-gray100 rounded-3xl"
                            />
                            {#if 'confirmPassword' in formErrors}
                                <label class="label" for="confirmPassword">
                                    <span class="label-text-alt text-red-500">{formErrors['confirmPassword']}</span>
                                </label>
                            {/if}
                        </div>
            
                        <div class="form-control mt-4 w-full">
                            <button class="btn border-rose300 bg-rose300 hover:bg-rose400 hover:border-rose400 rounded-3xl mt-4 tracking-wider">
                                {#if isLoading}
                                <div role="status">
                                  <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                  </svg>
                                  <span class="sr-only">Loading...</span>
                              </div>
                                {/if}
                                <span class="">CREATE AN ACCOUNT</span>
                            </button>
                        </div>
            
                    </form>
                </div>
            </div>
            {/if}
    
            {#if loginTab}
            <div class="container mt-20 md: px-2 lg:px-0 mx-auto">
            
                <div class= "flex flex-col justify-center items-center">
                    {#if errorMsg}
                    <label class="label" for="email">
                        <span class="label-text-alt text-red-500">{errorMsg}</span>
                    </label>
                    {/if}
                    <form on:submit={onSubmit} class="w-2/3">
                        <div class="form-control w-full">
                            <label class= "label label-text text-rose400 tracking-wider text-xs" for="email">E-MAIL</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="john@example.com"
                                class="input input-bordered bg-gray100 border-gray100 rounded-3xl"
                            />
                            {#if 'email' in formErrors}
                                <label class="label" for="email">
                                    <span class="label-text-alt text-red-500">{formErrors['email']}</span>
                                </label>
                            {/if}
                            
                        </div>
            
                        <div class="form-control w-full mt-4">
                            <label class= "label label-text text-rose400 tracking-wider text-xs" for="password">PASSWORD</label>
                            <input
                                type="password"
                                name="password"
                                placeholder=""
                                class="input input-bordered bg-gray100 border-gray100 rounded-3xl"
                            />
                            {#if 'password' in formErrors}
                                <label class="label" for="password">
                                    <span class="label-text-alt text-red-500">{formErrors['password']}</span>
                                </label>
                            {/if}
                
                        </div>
            
                        <div class="form-control mt-4 w-full">
                            <button class="btn border-rose300 bg-rose300 hover:bg-rose400 hover:border-rose400 rounded-3xl mt-4 tracking-wider">
                                {#if isLoading}
                                <div role="status">
                                  <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                  </svg>
                                  <span class="sr-only">Loading...</span>
                              </div>
                                {/if}
                                <span class="">SIGN IN</span>
                            </button>
                        </div>
            
                    </form>
                </div>
            </div>
            {/if}
      </label>
    </label>
