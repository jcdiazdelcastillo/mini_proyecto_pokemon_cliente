const inputBuscar = document.getElementById("buscarPokemon");
const buttonBuscar = document.getElementById("botonBuscar");
const infoPokemon = document.getElementById("infoPokemon");

const buttonAgregar=document.getElementById('botonAgregar');


// ----------------------------FUNCIONES PARA BUSCAR EL POKEMON -----------------------------------
//buscar pokemon async await
function buscarPokemon(){

    buttonBuscar.addEventListener("click", async function(){
        const pokemonBuscar = inputBuscar.value.toLowerCase();
        try{

            const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon/'+pokemonBuscar);
            if(!respuesta.ok){
                alert("Pokemon no encontrado");
                console.log("Pokemon no encontrado");
            }else{
                const datos = await respuesta.json();
                console.log(datos);
                infoPokemon.innerHTML="<h3 id='nombrePokemonBuscado'>" + datos.species.name + "</h3>";
                infoPokemon.innerHTML+="<img src='" + datos.sprites.front_default + "' alt='" + datos.name + "' id='imagenPokemon'>";
            }
 
        }catch(error){
            console.log(error);
        }
    });
}

//BUSCAR POKEMON PROMESAS. THEN/CATCH
function buscarPokemonPromesas(){
    buttonBuscar.addEventListener("click", e=>{
        const pokemonBuscar = inputBuscar.value.toLowerCase();

        fetch('https://pokeapi.co/api/v2/pokemon/'+pokemonBuscar)
            .then(dato=>dato.json())
             .then(datos => {
                infoPokemon.innerHTML="<h3 id='nombrePokemonBuscado'>" + datos.species.name + "</h3>";
                infoPokemon.innerHTML+="<img src='" + datos.sprites.front_default + "' alt='" + datos.name + "' id='imagenPokemon'>";
            })
            .catch(error => {
                infoPokemon.innerHTML = "<p>ERROR: Pokémon no encontrado</p>";
            });
    });
}

function buscarPokemonAJAX(){

    buttonBuscar.addEventListener("click", function () {

        const pokemonBuscar = inputBuscar.value.toLowerCase();

        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/" + pokemonBuscar,
            type: "GET",

            success: function (datos) {
                console.log(datos);

                infoPokemon.innerHTML =
                    "<h3 id='nombrePokemonBuscado'>" + datos.species.name + "</h3>" +
                    "<img src='" + datos.sprites.front_default +
                    "' alt='" + datos.name + "' id='imagenPokemon'>";
            },

            error: function () {
                alert("Pokemon no encontrado");
                infoPokemon.innerHTML = "Pokemon no encontrado";
            }
        });

    });
}

//---------------------AGREGAR A LA COLECCIÓN -----------------
buttonAgregar.addEventListener("click", e=>{
    const nombre = document.getElementById('nombrePokemonBuscado').textContent; //pasa el nombre
    const imagen = document.getElementById('imagenPokemon').src;
    agregarColeccion(nombre, imagen);
});


function agregarColeccion(nombre, imagen){
    const coleccionPokemon = document.getElementById("coleccionPokemon");
    coleccionPokemon.innerHTML+="<h3>"+nombre+"</h3>";
    coleccionPokemon.innerHTML+="<img src="+imagen+" alt="+nombre+">";
}

//buscarPokemonPromesas();
//buscarPokemon();

buscarPokemonAJAX();
