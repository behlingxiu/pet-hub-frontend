import { PUBLIC_BASE_URL } from '$env/static/public';

export async function load({ fetch, url }) {
    const id = url.searchParams.get('id')

    const resp = await fetch(PUBLIC_BASE_URL + `/order/success`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id})
    });
  
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