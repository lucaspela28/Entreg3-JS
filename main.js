const pizzas = [
    {
        id:1,
        Nombre: 'muzzarella',
        Ingredientes: ['Salsa de tomate', 'Aceitunas', 'Muzzarella'],
        Precio: 400,
    },
    {    
        id:2,
        Nombre: 'fugazzetta',
        Ingredientes: ['Cebolla', 'Aceitunas', 'Muzzarella'],
        Precio: 550,
    },
    { 
        id:3,
        Nombre:'calabresa',
        Ingredientes: ['Salsa de tomate', 'Longaniza calabresa', 'Muzzarella'],
        Precio: 650,
    }, 
    {    
        id:4,
        Nombre: 'tropical',
        Ingredientes: ['Salsa de tomate', 'Ananá', ' Muzzarella'],
        Precio: 650
    }, 
    {    
        id:5,
        Nombre:'especial',
        Ingredientes: ['Salsa de tomate', 'Jamon cocido', 'Morrones', 'Muzzarella'],
        Precio: 580,
    }, 
    {    
        id:6,
        Nombre: 'serrana',
        Ingredientes: ['Salsa de tomate', 'Jamón crudo', 'Rúcula', 'Parmesano', 'Muzzarella'],
        Precio: 800
    }];

   
   const form = document.getElementById("form");
   const input = document.getElementById("input");
   const divImg= document.getElementById("div-img");
   
let lastPizza = JSON.parse(localStorage.getItem("pizza")) || [];
const saveLastPizza = (item) => {
    return localStorage.setItem("pizza", JSON.stringify(item))
};



const validacion = () =>{
    let validado = false;
    const guardarValor = input.value.trim();
    if (vacio(guardarValor)){
        error(input, 'No ingresaste ningun valor')
    }else if (!sinStock(guardarValor)){
        error (input, 'No tenemos esa pizza en stock')
    }else {
        exito (input)
        validado= true;
    }
    return validado;
}


const vacio = (id) => id === "";
const sinStock = (id) => {
    const noHay = pizzas.some(pizza => pizza.id === Number(id))
    return noHay;
}

const error = (input, mensaje)=>{
   const campoDeForm = input.parentElement;
   const errorDeCampo = campoDeForm.querySelector("small");
   errorDeCampo.classList.remove("exito");
   errorDeCampo.classList.add("error");
   errorDeCampo.textContent = mensaje;
}


const exito = (input, mensaje)=>{
   const campoDeForm = input.parentElement;
   const errorDeCampo = campoDeForm.querySelector("small");
   errorDeCampo.classList.remove("error");
   errorDeCampo.classList.add("exito");
   errorDeCampo.textContent = "";
}


form.addEventListener("submit", (e)=>{
    e.preventDefault();
    let validado = validacion();
    const guardarValor = input.value.trim();
    const pizza = pizzas.find((e) => e.id == guardarValor) || [];
    if (validado){
        saveLastPizza(pizza);
        cambiarNombrePizza(pizza, form);
        cambiarPrecio(pizza, form) ; 
        cambiarIngredientes(pizza, form);
        renderImagen(pizza);
    }else {
        saveLastPizza(pizza);
        borrarPizzaNombre(form);
        borrarPizzaPrecio(form);
        borrarPizzaIng(form);
        borrarImagen();
    }
})

const cambiarNombrePizza = (pizza, form) =>{
    const campoDeForm = form.parentElement;
    const nombre = campoDeForm.querySelector("h2");
    nombre.textContent = pizza.Nombre;
}
const cambiarPrecio = (pizza, form) =>{
    const campoDeForm = form.parentElement;
    const nombre = campoDeForm.querySelector("h4");
    nombre.textContent = "$"+ pizza.Precio;
}
const cambiarIngredientes = (pizza, form) =>{
    const campoDeForm = form.parentElement;
    const nombre = campoDeForm.querySelector("p");
    nombre.textContent =pizza.Ingredientes.join(", ");
}




const borrarPizzaNombre = () => {
    const campoDeForm = form.parentElement;
    const nombre = campoDeForm.querySelector("h2");
    nombre.textContent = "";
}

const borrarPizzaPrecio = () =>{
    const campoDeForm = form.parentElement;
    const nombre = campoDeForm.querySelector("h4");
    nombre.textContent = "";
}
const borrarPizzaIng = () =>{
    const campoDeForm = form.parentElement;
    const nombre = campoDeForm.querySelector("p");
    nombre.textContent = "";
}

document.addEventListener("DOMContentLoaded", ()=>{
    if(!Array.isArray(lastPizza)){
        cambiarNombrePizza(lastPizza, form);
        cambiarPrecio(lastPizza, form) ; 
        cambiarIngredientes(lastPizza, form);
        renderImagen(lastPizza);
    } 
})


const renderPizzaImg = (pizza) => {
const imagenNombre = pizza.Nombre;
return `
            <div class="pizza-img" id="img-pizza">
                <img src="./image/${imagenNombre}.jpg" alt="imagen de pizza" class="pizza-image">
            </div>
`
}

const renderImagen = (input) =>{
    divImg.innerHTML=renderPizzaImg(input);
}

const borrarImagen = () =>{
    divImg.innerHTML= borrarImagenDePizza();
}

const borrarImagenDePizza = ()=> {
    return `
            <div class="pizza-img" id="img-pizza">
                
            </div>
`

}
 
