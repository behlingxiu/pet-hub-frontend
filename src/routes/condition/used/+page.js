import { PUBLIC_BASE_URL } from '$env/static/public';

export async function load({ fetch }) {
    const resp = await fetch(PUBLIC_BASE_URL + '/products/condition/Used');
  
    const res = await resp.json();
    console.log(res)

    if (resp.status == 200) {
      return {
        data: res
      }
    } else {
      return {
        data: []
      }
    }
}