class ProductManager {
    constructor() {
        this.products = []
    }
    addProduct(title, description, price, thumbnail, code, stock){
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
        }
      }
    }
    
    getProducts(){
        return this.products
       
    }
    getProductById(x){ 
      const idBuscado = this.products.find(el => el.id == x);
      if (idBuscado) {
       return idBuscado
      } else{         
        console.error("Not Found")
        return
      }
     }
  
}
const producto = new ProductManager();

producto.addProduct('Empanadas', 'Comida', 500, 'https://...', 'Codigo001', 250);
producto.addProduct('Pizza', 'Comida', 3000, 'https://...', 'Codigo002', 100);
producto.addProduct('Gaseosa', 'Bebidas', 750, 'https://...', 'Codigo003', 200);

console.log(producto.getProducts());
console.log(producto.getProductById(2));