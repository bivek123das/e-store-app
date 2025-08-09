const getCategories = async () => {
    const response = await fetch("https://fakestoreapiserver.reactbd.org/api/categories");
    const data = await response.json();

    return data.data;
}

const getProducts = async (product_id = null) => {

    let API 
    try {
      const [productsRes, walmartRes] = await Promise.all([
        fetch("https://fakestoreapiserver.reactbd.org/api/products").then(res => res.json()),
        fetch("https://fakestoreapiserver.reactbd.org/api/walmartproducts").then(res => res.json())
      ]);
  
     
      const allProducts = [  ...productsRes.data,
        ...walmartRes.data,];

        // If product_id is provided, return only that product
    if (product_id) {
      const product = allProducts.find(
        (p) => String(p._id) === String(product_id) || String(p.id) === String(product_id)
      );
        return product || null;
      }
  
      return allProducts; 
      
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  export {getCategories , getProducts};