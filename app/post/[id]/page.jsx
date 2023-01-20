async function getData(id) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`
  )
  const data = await response.json()
  return data
}

export default async function PostId({ params }) {
  const { id } = params
  const character = await getData(id)
  return (
    <div>
      <h1>Post: {id}</h1>
      <p>{character.name}</p>
      <p>{character.species}</p>
      <img src={character.image} alt={character.name} />
      <p>{character.status}</p>
    </div>
  )
}