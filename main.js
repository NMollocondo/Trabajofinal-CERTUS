// Elementos
const filaCatalogoProd = document.querySelector('#row');

document.body.onload = inicioPagina;

function inicioPagina() {
    mostrarModal();
    agregarCatalogo();
}

// Función para agregar el catalogo a la web
function agregarCatalogo() {
    productos.map(({ imagen, marca, nombre, precio, descuento }) => agregarProducto(imagen, marca, nombre, precio, descuento));
}

// Función para agregar el producto
function agregarProducto(imagePath, brand, name, price, discount) {

    // Contenedor del producto
    const contenedorProducto = document.createElement("div");
    contenedorProducto.classList.add('producto', 'col-12', 'col-sm-6', 'col-md-4', 'col-lg-3');

    // Imagen
    const imagen = document.createElement("img");
    imagen.setAttribute('src', imagePath);
    imagen.setAttribute('alt', name);

    // Contenedor de la descripcion
    const contenedorDescripcion = document.createElement("div");
    contenedorDescripcion.classList.add('descripcion', 'd-flex', 'flex-column', 'align-items-center');

    // Marca
    const marca = document.createElement("h2");
    // contenido
    const contenidoMarca = document.createTextNode(brand);
    // añadir el contenido
    marca.appendChild(contenidoMarca);

    // Nombre de producto
    const producto = document.createElement("p");
    // contenido
    const contenidoProducto = document.createTextNode(name);
    // añadir el contenido
    producto.appendChild(contenidoProducto);

    // Descuento
    const contenedorDescuento = document.createElement("p");
    const precio = document.createElement("span");
    const descuento = document.createElement("span");
    // contenido
    const contenidoPrecio = document.createTextNode(`S/. ${price}`);
    const contenidoDescuento = document.createTextNode(` - ${discount * 100}%`);
    // añadir el contenido
    precio.appendChild(contenidoPrecio);
    descuento.appendChild(contenidoDescuento);
    contenedorDescuento.append(precio, descuento);

    // Precio actual
    const contenedorPrecioActual = document.createElement("p");
    const etiquetaPrecio = document.createElement("span");
    const PrecioActual = document.createElement("span");
    // contenido
    const contenidoEtiquetaPrecio = document.createTextNode("Precio");
    const contenidoPrecioActual = document.createTextNode(` S/. ${Math.round((1 - discount) * price)}`);
    // añadir el contenido
    etiquetaPrecio.appendChild(contenidoEtiquetaPrecio);
    PrecioActual.appendChild(contenidoPrecioActual);
    contenedorPrecioActual.append(etiquetaPrecio, PrecioActual);

    // Agregar a carrito
    const contenedorAgregarCarrito = document.createElement("p");

    const enlaceCarrito = document.createElement("a");
    enlaceCarrito.classList.add('btn', 'btn-light');
    enlaceCarrito.setAttribute('href', '#');
    enlaceCarrito.setAttribute('onclick', `addCart(this, '${name}', ${price}, ${discount})`);

    const iconoCarrito = document.createElement("i");
    iconoCarrito.classList.add('bi', 'bi-cart');

    // contenido
    const contenidoEnlaceCarrito = document.createTextNode("Agregar a carrito");

    // añadir el contenido
    enlaceCarrito.appendChild(contenidoEnlaceCarrito);
    enlaceCarrito.append(iconoCarrito);
    contenedorAgregarCarrito.append(enlaceCarrito);

    // Añadir elementos a body
    contenedorDescripcion.append(marca, producto, contenedorDescuento, contenedorPrecioActual, contenedorAgregarCarrito)
    contenedorProducto.append(imagen, contenedorDescripcion);
    filaCatalogoProd.append(contenedorProducto);
}

// Función para el modal de promoción
function mostrarModal() {
    const modalEntrada = new bootstrap.Modal("#modalEntrada");
    modalEntrada.show();
}

// Array de objetos seleccionados
var ObjetosSeleccionados = [];

// Función para los botones añadir carrito
function addCart(objeto, nombre, precio, descuento) {
    // Obtener el elemento donde se encuetra
    const contenedor = objeto.parentElement.parentElement;
    // Crear objeto
    var producto = {
        nombre,
        precio,
        descuento,
        precioActual: Math.round((1 - descuento) * precio)
    }
    // Añadir al array de objetos
    ObjetosSeleccionados.push(producto);

    // Mostrar notificación sobre el carrito de compras
    const contenedorNotificacion = document.createElement('div');
    contenedorNotificacion.classList.add('alert', 'alert-success');
    contenedorNotificacion.setAttribute('role', 'alert');
    const mensaje = document.createTextNode('Se agregó al carrito de compras ❤');
    contenedorNotificacion.appendChild(mensaje);
    contenedor.append(contenedorNotificacion);

    function eliminarNotificacion() {
        contenedorNotificacion.remove();
    }
    window.setTimeout(eliminarNotificacion, 2000);
}

// Función actualizar lista
function actualizarLista() {
    const lista = document.getElementById("listaCarrito");
    console.log(lista);
    // Crear el HTML
    let texto = "";
    ObjetosSeleccionados.forEach(element => {
        texto = texto + "<div class='productoLista'>";
        texto = texto + "<p>" + element.nombre + "</p>";
        texto = texto + "<p> Precio: S/. " + element.precio + "</p>";
        texto = texto + "<p> Descuento: " + (element.descuento * 100) + "% </p>";
        texto = texto + "<p> Precio Actual: S/. " + element.precioActual + "</p>";
        texto = texto + "</div>";
    });
    if (ObjetosSeleccionados.length) {
        lista.innerHTML = texto;
    }
}

