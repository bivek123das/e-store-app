

const getCategories = async () => {
    const response = await fetch('https://dummyjson.com/products/category-list');
    const data = await response.json();
    console.log(data)
    return data;
}

  export {getCategories};