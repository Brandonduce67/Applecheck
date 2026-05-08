// Capturamos el ID de la URL (ej: ?id=iphone-15-pro-max)
const urlParams = new URLSearchParams(window.location.search);
const idProducto = urlParams.get('id');

fetch('productos.json')
    .then(response => response.json())
    .then(productos => {
        // Buscamos el objeto que coincida con el ID
        const producto = productos.find(p => p.id === idProducto);

        if (producto) {
            // Llenamos la página con la info del JSON
            document.getElementById('nombre-producto').innerText = producto.nombre;
            document.getElementById('precio-producto').innerText = `$${producto.precio}`;
            document.getElementById('foto-producto').src = producto.imagen;
            document.getElementById('bateria').innerText = producto.salud_bateria;
            document.getElementById('capacidad').innerText = producto.capacidad;
            document.getElementById('estado').innerText = producto.estado;
            document.getElementById('detalles-tecnicos').innerText = producto.detalles;

            // Configuramos WhatsApp con el mensaje personalizado
            const nroTelefono = "54911XXXXXXXX"; // El número de tu amigo (sin el +)
            const mensaje = `Hola! Me interesa el ${producto.nombre} de color ${producto.color} que vi en Applecheck.`;
            document.getElementById('btn-whatsapp').href = `https://wa.me/${nroTelefono}?text=${encodeURIComponent(mensaje)}`;
        } else {
            document.body.innerHTML = "<h1>Producto no encontrado</h1>";
        }
    })
    .catch(error => console.error('Error cargando el JSON:', error));