// Constantes para formularios
const form = document.querySelector("form");
const nombre = document.querySelector("#nombre");
const email = document.querySelector("#email");
const mensaje = document.querySelector("#mensaje");


// ------------------Formulario--------------------


// Función mensajes de error
const mostrarError = (input, mensaje) => {
    const error = document.createElement("p");
    error.textContent = mensaje;
    error.style.color = "red";
    error.style.fontSize = "1rem";
    input.parentElement.appendChild(error);
    input.style.border = "1px solid red";
  
    // Limpia mensajes previos al volver a validar
    setTimeout(() => {
      error.remove();
      input.style.border = "";
    }, 3000);
  };
  
  // Validación formulario
  form.addEventListener("submit", (e) => {
    let formularioValido = true;
  
    // Limpia errores previos
    const mensajesError = document.querySelectorAll("p");
    mensajesError.forEach((mensaje) => mensaje.remove());
  
    // Validar nombre
    if (nombre.value.trim() === "") {
      mostrarError(nombre, "El nombre es obligatorio");
      formularioValido = false;
    } else if (!isNaN(nombre.value)) {
      mostrarError(nombre, "El nombre no puede contener solo números");
      formularioValido = false;
    }
  
    // Validar correo electrónico
    if (email.value.trim() === "") {
      mostrarError(email, "El correo electrónico es obligatorio");
      formularioValido = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      mostrarError(email, "El correo electrónico no es válido");
      formularioValido = false;
    }
  
    // Validar mensaje
    if (mensaje.value.trim() === "") {
      mostrarError(mensaje, "El mensaje no puede estar vacío");
      formularioValido = false;
    }
  
    // Prevenir envío si hay errores
    if (!formularioValido) {
      e.preventDefault();
    }
  });
  
  
  
  