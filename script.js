document.addEventListener('DOMContentLoaded', function () {

    const URL_API = `https://pokeapi.co/api/v2/pokemon/`;

    let score = 0;

    const answerInput = document.getElementById('inputRespuesta');
    const playButton = document.getElementById('btnPlay');
    const quizDiv = document.getElementById('quizdiv');
    const answerText = document.getElementById('answer');
    const scoreE = document.getElementById('scoreH');


    function getRandomNumber(min, max) {
        // Genera un número aleatorio entre min (incluido) y max (excluido)
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // Función para cargar una imagen aleatoria de un Pokémon
    function loadRandomPokemon() {
        const randomNumber = getRandomNumber(1, 1011);
        const URL_Random = `${URL_API}${randomNumber}`;

        // Realizar un fetch y mostrar el Pokémon
        fetch(URL_Random)
            .then((response) => response.json())
            .then((data) => {
                displayPokemon(data);
            })
            .catch((error) => {
                console.error("Error en la solicitud:", error);
            });
    }

    // Función para mostrar el resultado del Pokémon
    function displayPokemon(pokemon) {
        const card = document.createElement('div');
        card.classList.add('imgQuiz');
        card.innerHTML = `
          <img src="${pokemon.sprites.front_default}" alt="pokémon">
        `;
        quizDiv.innerHTML = ''; // Limpiar resultados anteriores
        quizDiv.appendChild(card); // Agregar la tarjeta del Pokémon al contenedor de resultados

        // Obtener el nombre del Pokémon actual desde los datos de la API
    const currentPokemonName = pokemon.name.toLowerCase();
    
    // Guardar el nombre del Pokémon actual en una variable global para su posterior comparación
    currentPokemonNameGlobal = currentPokemonName;

        // Mostrar el campo de entrada después de cargar la imagen
        answerText.classList.remove('hidden');
        answerInput.classList.remove('hidden');
    }

   // Escuchar el clic de búsqueda
    playButton.addEventListener('click', function () {
    // Restablecer el marcador a 0
    score = 0;
    scoreE.textContent = score;

    // Generar un nuevo número aleatorio
    const randomNumber = getRandomNumber(1, 1011);
    const URL_Random = `${URL_API}${randomNumber}`;

    // Realizar un fetch y mostrar el Pokémon al hacer clic en el botón
    fetch(URL_Random)
        .then((response) => response.json())
        .then((data) => {
            displayPokemon(data);
        })
        .catch((error) => {
            console.error("Error en la solicitud:", error);
        });
});

    // Escuchar la tecla Enter para buscar
    answerInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        // Obtener la respuesta del usuario
        const userAnswer = answerInput.value.toLowerCase().trim();

        // Obtener el nombre del Pokémon actual desde la variable global
        const currentPokemonName = currentPokemonNameGlobal;

        // Comparar la respuesta del usuario con el nombre del Pokémon actual
        if (userAnswer === currentPokemonName) {
            // Respuesta correcta, cargar otro Pokémon
            loadRandomPokemon();

            // Aumentar el marcador
            score++;
            
            // Actualizar el elemento del marcador en la página
            scoreE.textContent = score;

            // Vaciar el input
            answerInput.value = "";

        } else {

            // Vaciar el input
            answerInput.value = "";
            
            // Respuesta incorrecta, realizar una acción (por ejemplo, mostrar un mensaje de error)
            console.log("Respuesta incorrecta");
        }
    }

});

});
