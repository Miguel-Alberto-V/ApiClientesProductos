const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let productos = [
    { id: 1, nombre: 'Snaks', precio: 2.5, image: 'https://blog.natruly.com/wp-content/uploads/2021/04/003-min.jpeg' },
    { id: 2, nombre: 'Integral 500g', precio: 10.2, image: 'https://www.comedera.com/wp-content/uploads/2022/02/pan-de-salvado_shutterstock_49768897.jpg' },
    { id: 3, nombre: 'CocaCola', precio: 7.6, image:'https://www.coca-cola.com/content/dam/onexp/cl/es/brands/coca-cola/General-Card-Coca-Cola-Original.jpg' },
    { id: 4, nombre: 'Leche', precio: 6.5, image:'https://plazavea.vteximg.com.br/arquivos/ids/24844118-450-450/358217.jpg?v=638090212746770000' },
    { id: 5, nombre: 'Pepsi', precio: 3.5, image: 'https://s3.amazonaws.com/bsalemarket/75518/product/1314032103181-1.jpg'},
    { id: 6, nombre: 'Doritos', precio: 6.3, image: 'https://holafelix.pe/wp-content/uploads/2022/03/Doritos-23gr-Tira-X12und.jpg'}
];

let clientes = [
    { id: 1, nombre: 'Perez', producto: [productos[1], productos[3] ]},
    { id: 2, nombre: 'Carlos', producto: [productos[0], productos[2] ]},
    { id: 3, nombre: 'Miguelon', producto: productos }
];

app.get('/', (req, res) => {
    res.json({
        saludo: "Bienvenido a la ruta principal"
    });
});
// Obtener todos los productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// Obtener un producto por su ID
app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find(producto => producto.id === id);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// Crear un nuevo producto
app.post('/productos', (req, res) => {
    const nuevoProducto = req.body;
    nuevoProducto.id = productos.length + 1;
    productos.push(nuevoProducto);
    res.status(201).send('Producto creado exitosamente');
});

// Actualizar un producto existente
app.put('/productos/actualizar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productoIndex = productos.findIndex(producto => producto.id === id);
    if (productoIndex !== -1) {
        productos[productoIndex] = req.body;
        res.send('Producto actualizado exitosamente');
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// Eliminar un producto
app.delete('/productos/eliminar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    productos = productos.filter(producto => producto.id !== id);
    res.send('Producto eliminado exitosamente');
});

/**===================CLIENTES==================== */

// Obtener todos los clientes
app.get('/clientes', (req, res) => {
    res.json(clientes);
});

// Obtener un cliente por su ID
app.get('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = clientes.find(cliente => cliente.id === id);
    if (cliente) {
        res.json(cliente);
    } else {
        res.status(404).send('Cliente no encontrado');
    }
});

// Crear un nuevo cliente
app.post('/clientes', (req, res) => {
    const nuevoCliente = req.body;
    nuevoCliente.id = clientes.length + 1;
    clientes.push(nuevoCliente);
    res.status(201).send('Cliente creado exitosamente');
});

// Actualizar un cliente existente
app.put('/clientes/actualizar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const clienteIndex = clientes.findIndex(cliente => cliente.id === id);
    if (clienteIndex !== -1) {
        clientes[clienteIndex] = req.body;
        res.send('Cliente actualizado exitosamente');
    } else {
        res.status(404).send('Cliente no encontrado');
    }
});

// Eliminar un cliente
app.delete('/clientes/eliminar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    clientes = clientes.filter(cliente => cliente.id !== id);
    res.send('Cliente eliminado exitosamente');
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
