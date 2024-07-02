class Product {

    public nombre: string;
    public categoria: string;
    public precio: number;
    public cantidad: number;

    constructor(nombre: string, categoria: string, precio: number, cantidad: number) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

export default Product;