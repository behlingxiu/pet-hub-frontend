import { PUBLIC_BASE_URL } from '$env/static/public';
import { getTokenFromLocalStorage } from '../../utils/auth'

// export async function load({ fetch, params }) {
//     const resp = await fetch(PUBLIC_BASE_URL + `/products/${params.slug}`);
  
//     const res = await resp.json();
//     if (resp.status == 200) {
//       return {
//         data: res
//       }
//     } else {
//       return {
//         data: []
//       }
//     }
//   }

//get user data for profile - my account
  export async function load({fetch}){
    const response = await fetch(PUBLIC_BASE_URL + '/users', {
        headers: {
            'Authorization': getTokenFromLocalStorage()
        }
    });

    const res = await response.json();
    if (response.status == 200) {
      return {
        data: res
      }
    } else {
      return {
        data: []
      }
    }
    }

    