<script>

import { PUBLIC_BASE_URL } from '$env/static/public';
import {authenticateUser} from '../../utils/auth'

let formModal = true;
let formErrors = {}
let loginTab = false;
let signUpTab = true
    const handleTab = (action) => {
        if (action === 'signUp'){
            signUpTab = true;
            loginTab = false
        } else {
            loginTab = true;
            signUpTab = false
        }
    }

    async function create(evt) {
        evt.preventDefault()
        if (evt.target['password'].value != evt.target['confirmPassword'].value){
            formErrors['password'] = {message: 'Password confirmation does not match'};
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

        if (resp.status == 200) {
            postSignUp();
        } else {
            const res = await resp.json();
            console.log(res)
            formErrors = res.error
            console.log(formErrors)
        }
        
    } 

    async function onSubmit(evt) {
        evt.preventDefault()
        
        const userData= {
            email: evt.target['email'].value,
            password: evt.target['password'].value
        };

        const resp = await authenticateUser(userData.email, userData.password)

        if (resp.success === true) {
            signIn();
        } else {
            formErrors = resp.res.error
        }
        
    } 
    
</script>

<label for="my-modal-4" class="btn">open modal</label>
<input type="checkbox" id="my-modal-4" class="modal-toggle" />
<label for="my-modal-4" class="modal cursor-pointer">
  <label class="modal-box relative pt-0 pl-0 pr-0" style="height: 600px" for="">
    <div class="tabs">
        <button on:click={() => handleTab('signUp')} class={"tab tab-lifted w-1/2 h-16 text-lg" + (signUpTab ? " tab-active" : " bg-gray-100")}>Sign Up</button> 
        <button on:click={() => handleTab('login')} class={"tab tab-lifted w-1/2 h-16 text-lg" + (loginTab ? " tab-active" : " bg-gray-100")}>Log In</button> 
    </div>
        {#if signUpTab}
        <div class="container lg:mt-10 px-2 lg:px-0 mx-auto">
        
            <div class= "flex flex-col justify-center items-center">
                <form class="w-2/3">
                    <div class="form-control w-full">
                        <label class= "label label-text text-rose400 tracking-wider text-xs" for="name">NAME</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            class="input input-bordered bg-gray100 border-gray100 rounded-3xl"
                        />
                        
                    </div>
        
                    <div class="form-control w-full mt-4">
                        <label class= "label label-text text-rose400 tracking-wider text-xs" for="email">E-MAIL</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            class="input input-bordered bg-gray100 border-gray100 rounded-3xl"
                        />
                        
                    </div>
        
                    <div class="form-control w-full mt-4">
                        <label class= "label label-text text-rose400 tracking-wider text-xs" for="password">PASSWORD</label>
                        <input
                            type="password"
                            name="password"
                            placeholder=""
                            class="input input-bordered bg-gray100 border-gray100 rounded-3xl"
                        />
                    </div>
        
                    <div class="form-control w-full mt-4">
                        <label class= "label label-text text-rose400 tracking-wider text-xs" for="confirmPassword">CONFIRM PASSWORD</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder=""
                            class="input input-bordered bg-gray100 border-gray100 rounded-3xl"
                        />
                    </div>
        
                    <div class="form-control mt-4 w-full">
                        <label for="my-modal-4" class="btn border-rose300 bg-rose300 hover:bg-rose400 hover:border-rose400 rounded-3xl mt-4 tracking-wider">CREATE AN ACCOUNT</label>
                    </div>
        
                </form>
            </div>
        </div>
        {/if}

        {#if loginTab}
        <div class="container mt-20 md: px-2 lg:px-0 mx-auto">
        
            <div class= "flex flex-col justify-center items-center">
                <form class="w-2/3">
                    <div class="form-control w-full">
                        <label class= "label label-text text-rose400 tracking-wider text-xs" for="email">E-MAIL</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            class="input input-bordered bg-gray100 border-gray100 rounded-3xl"
                        />
                        
                    </div>
        
                    <div class="form-control w-full mt-4">
                        <label class= "label label-text text-rose400 tracking-wider text-xs" for="password">PASSWORD</label>
                        <input
                            type="password"
                            name="password"
                            placeholder=""
                            class="input input-bordered bg-gray100 border-gray100 rounded-3xl"
                        />
                        
                    </div>
        
                    <div class="form-control mt-4 w-full">
                        <label for="my-modal-4" class="btn border-rose300 bg-rose300 hover:bg-rose400 hover:border-rose400 rounded-3xl mt-4 tracking-wider">SIGN IN</label>
                    </div>
        
                </form>
            </div>
        </div>
        {/if}
  </label>
</label>


