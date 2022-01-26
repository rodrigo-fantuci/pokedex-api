const pokeContainer = document.getElementById('poke-container')
const pokemonCount = 150
const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

const mainTypes = Object.keys(colors)

// Função que chama a função getPokemon em uma quantidade de vezes especificada pela variável pokemonCount
const fetchPokemons = async () => {
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i)
  }
}

// Função que faz o request na api e armazena os dados na variável data
const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const res = await fetch(url)
  const data = await res.json()

  createPokemonCard(data)
}

// Função que criar o card no DOM para cada pokemon
function createPokemonCard(data) {
  const cardEl = document.createElement('div')
  cardEl.classList.add('pokemon')

  // const name é criada para colocar a primeira letra do nome em maiúscula
  const name = data.name[0].toUpperCase() + data.name.slice(1)

  // const id é usada para colocar o id com 3 casas de números
  const id = data.id.toString().padStart(3, '0')

  // const poketypes modifica os types de cada pokemon para seu tipo principal
  const pokeTypes = data.types.map(type => type.type.name)


  const type = mainTypes.find(t => pokeTypes.indexOf(t) > -1)
  const color = colors[type]

  cardEl.style.backgroundColor = color

  cardEl.innerHTML = `
    <div class="img-container">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png" alt="">
  </div>

  <div class="info">
    <span class="number">#${id}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Type: <span>${type}</span></small>
  </div>
  `

  pokeContainer.appendChild(cardEl)
}

fetchPokemons()