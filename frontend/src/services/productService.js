async function request(url,options={}){const response=await fetch(url,{...options,headers:{'Content-Type':'application/json',...options.headers}});if(!response.ok){const error=await response.json().catch(()=>({}));throw new Error(error.message||'Request failed')}return response.status===204?null:response.json()}
export const getProducts=()=>request('/api/products')
export const createProduct=product=>request('/api/products',{method:'POST',body:JSON.stringify(product)})
export const updateProduct=(id,product)=>request(`/api/products/${id}`,{method:'PUT',body:JSON.stringify(product)})
export const deleteProduct=id=>request(`/api/products/${id}`,{method:'DELETE'})
export const adjustStock=(id,type,quantity)=>request(`/api/products/${id}/stock/${type}`,{method:'PATCH',body:JSON.stringify({quantity})})
