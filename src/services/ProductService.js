// Import statements...

const KEYS = {
    Products: 'Products',
    ProductId: 'ProductId'
  };
  
  const getSupplierCollection = () => ([
    { id: '1', title: 'Fornecedor A' },
    { id: '2', title: 'Fornecedor B' },
    { id: '3', title: 'Fornecedor C' },
    { id: '4', title: 'Fornecedor D' },
  ]);
  
  const generateProductId = () => {
    if (localStorage.getItem(KEYS.ProductId) === null) {
      localStorage.setItem(KEYS.ProductId, '0');
    }
    const id = parseInt(localStorage.getItem(KEYS.ProductId));
    localStorage.setItem(KEYS.ProductId, (id + 1).toString());
    return id + 1;
  };
  
  const insertProduct = (data) => {
    const Products = getAllProducts();
    data.id = generateProductId();
    Products.push(data);
    localStorage.setItem(KEYS.Products, JSON.stringify(Products));
  };
  
  const updateProduct = (data) => {
    const Products = getAllProducts();
    const recordIndex = Products.findIndex((x) => x.id === data.id);
    Products[recordIndex] = { ...data };
    localStorage.setItem(KEYS.Products, JSON.stringify(Products));
  };
  
  const deleteProduct = (productId) => {
    const Products = getAllProducts().filter((product) => product.id !== productId);
    localStorage.setItem(KEYS.Products, JSON.stringify(Products));
  };
  
  const getAllProducts = () => {
    if (localStorage.getItem(KEYS.Products) === null) {
      localStorage.setItem(KEYS.Products, JSON.stringify([]));
    }
    const Products = JSON.parse(localStorage.getItem(KEYS.Products));
    // Map SupplierID to Supplier title
    const Suppliers = getSupplierCollection();
    console.log('Suppliers:', Suppliers);
    return Products;
  };
  
  export { getSupplierCollection, insertProduct, updateProduct, deleteProduct, getAllProducts };
  