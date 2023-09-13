const fs = require('fs')

class ProductManager {
    constructor() {
      this.products = []
      this.path = 'Products.json'
    }
    async getProducts(){
      try {
        if(fs.existsSync(this.path)){ 
          const productsFile = await fs.promises.readFile(this.path, 'utf-8')
          return JSON.parse(productsFile)
      } else {
          return []
    }
    } catch (error) {
        return error
    }}
    
    async addProduct(title, description, price, thumbnail, code, stock){
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error('Por favor ingresar todos los campos del producto')
        return
    } else {
        const codigoExistente = this.products.find (el => el.code == code)
      if (!codigoExistente){
        const producto = {
          id: !this.products.length
          ? 1
          : this.products[this.products.length-1].id+1,
          title,
          description,
          price,
          thumbnail,
          code,
          stock
    }
      return this.products.push(producto)
    } else {
        console.error(`El código del producto ${code} ya existe`)
        return 
    }}}
       
    async createProducts(){
      try {
        await fs.promises.writeFile(this.path, JSON.stringify(this.products))
    } 
      catch(error) {
        return error
    }}
    
    async getProductById(id){ 
      try {
        const products = await this.getProducts();
        const product = products.find(u=>u.id === id)
      if(!product){
        return 'no product'
    } else {
        return product
    }
    } catch (error){
        return error
    }}
    
    async deleteProduct(id){
      try {
        const products = await this.getProducts()
        const newProducts = products.filter(u=>u.id !== id)
        await fs.promises.writeFile(this.path, JSON.stringify(newProducts))
    } catch (error) {
        return error
    }}

    async updateProduct({id, ...producto}){
    try {
      const products = await this.getProducts()
      if(products.find(e=> e.id === id)) {
        await this.deleteProduct(id);
        const newProducts1= await this.getProducts();
        const newProducts2 = [{id, ...producto}, ...newProducts1];
        await fs.promises.writeFile(this.path, JSON.stringify(newProducts2))  
    } else {
      console.log(`el ID ${id} que deseas actualizar no existe`)
      return
    }
    } catch (error) {
        return error
    }}}

const producto = new ProductManager();

producto.addProduct('Empanadas', 'Comida', 500, 'https://...', 'Codigo001', 250);
producto.addProduct('Pizza', 'Comida', 3000, 'https://...', 'Codigo002', 100);
producto.addProduct('Gaseosa', 'Bebidas', 750, 'https://...', 'Codigo003', 200);

console.log(producto.createProducts());

console.log(producto.updateProduct({
    title:'fideos',
    description: 'comida',
    price: 400,
    thumbnail: 'http://...',
    code: 'Codigo002',
    stock: 200,
    id: 1
}))

console.log(producto.deleteProduct(2));