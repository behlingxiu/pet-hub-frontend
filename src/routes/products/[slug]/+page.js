import { PUBLIC_BASE_URL } from '$env/static/public';

export async function load({ fetch, params }) {
    const resp = await fetch(PUBLIC_BASE_URL + `/products/${params.slug}`);
  
    const res = await resp.json();
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