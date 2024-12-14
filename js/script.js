const slider = document.querySelector("#carrito-slider");
const botonAbrir = document.querySelector("#abrir-carrito");
const botonCerrar = document.querySelector("#cerrar-carrito");
const carritoContenido = document.querySelector("#carrito-contenido");
const totalCarrito = document.querySelector("#total");
const listadoProductos = document.querySelector("#listado-productos");

let carritoItems = [];
let total = 0;

// Función para actualizar el carrito
const actualizarCarrito = () => {
  carritoContenido.innerHTML = ""; // Limpia el carrito

  if (carritoItems.length === 0) {
    carritoContenido.innerHTML = "<p>El carrito está vacío</p>";
  } else {
    carritoItems.forEach((item) => {
      carritoContenido.innerHTML += `
        <div class="item-carrito">
          <p><strong>Delicia:</strong> ${item.title}</p>
          <p><strong>Precio:</strong> $${item.price}</p>
          <p><strong>Cantidad:</strong> ${item.cantidad || 1}</p> <!-- Mostramos la cantidad si se ha agregado más de un producto -->
          <button class="eliminar-item" data-id="${item.id}">Eliminar</button>
        </div>
      `;
    });
  }

  totalCarrito.textContent = `Total: $${total}`; // Actualiza el total
};

// Función para mostrar el slider
const mostrarSlider = () => {
  slider.classList.add("mostrar"); // Muestra el carrito
  botonAbrir.classList.add("oculto"); // Oculta el botón de abrir
  botonCerrar.classList.remove("oculto"); // Muestra el botón de cerrar
};

// Función para ocultar el slider
const ocultarSlider = () => {
  slider.classList.remove("mostrar"); // Oculta el carrito
  botonAbrir.classList.remove("oculto"); // Muestra el botón de abrir
  botonCerrar.classList.add("oculto"); // Oculta el botón de cerrar
};


// Evento para abrir el carrito manualmente
botonAbrir.addEventListener("click", mostrarSlider);

// Evento para cerrar el carrito
botonCerrar.addEventListener("click", ocultarSlider);






// Evento para agregar productos al carrito
listadoProductos.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.parentElement.getAttribute("data-id");
    const title = e.target.parentElement.querySelector("h3").textContent;
    const price = parseInt(e.target.parentElement.querySelector("p:nth-of-type(2)").textContent.replace("$", ""));

    // Agregar producto al carrito
    carritoItems.push({ id, title, price });
    total += price;

    actualizarCarrito(); // Actualiza el carrito
    mostrarSlider(); // Muestra el slider automáticamente
  }
});

// Evento para eliminar productos del carrito
carritoContenido.addEventListener("click", (e) => {
  if (e.target.classList.contains("eliminar-item")) {
    const id = e.target.getAttribute("data-id");
    const index = carritoItems.findIndex((item) => item.id === id);

    if (index !== -1) {
      total -= carritoItems[index].price; // Resta el precio del total
      carritoItems.splice(index, 1); // Elimina el producto
    }

    actualizarCarrito(); // Actualiza el carrito
  }
});

// Cargar productos desde el archivo JSON
fetch("../productos.json")
  .then(response => response.json()) // Parseamos el JSON
  .then(productos => {
    productos.forEach((producto) => {
      const itemHTML = `
        <article class="article" data-id="${producto.id}">
          <h3>${producto.title}</h3>
          <p>${producto.description}</p>
          <p>$${producto.price}</p>
          <img class="producto-imagen" src="${producto.image}" alt="${producto.title}"/>
          </br>           
          <button type="button" class="button-agregar">Agregar</button>
        </article>
      `;
      listadoProductos.innerHTML += itemHTML;
    });
  })
  .catch(error => {
    console.error("Error al cargar los productos:", error);
    listadoProductos.innerHTML = "<p>No se pudieron cargar los productos.</p>";
  });
