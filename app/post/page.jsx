import ButtonComponet from "./buttonComponet";

async function getData() {
  const API = "https://rickandmortyapi.com/api/character";
  const response = await fetch(API);
  const data = await response.json();
  return data.results;
}

export default async function Post() {
  const characters = await getData();
  console.log(characters);
  return (
    <div>
      <h1 className="text-center m-5 text-3xl font-bold">Post</h1>
      <section className="grid grid-cols-2 gap-5 items-center justify-center w-screen">
        {characters.map(({ id, name, species, image }) => (
          <div
            key={id}
            className="w-96 h-96 bg-red-400 flex flex-col items-center justify-center rounded-md shadow-xl"
          >
            <p>{name}</p>
            <p>{species}</p>
            <img src={image} alt={name} />
            <ButtonComponet id={id} />
          </div>
        ))}
      </section>
    </div>
  );
}
