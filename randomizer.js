function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  )
    .toISOString()
    .split("T")[0];
}

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomLatLon(city) {
  const cities = {
    Queretaro: { lat: [20.489, 20.724], lon: [-100.452, -100.105] },
    Acapulco: { lat: [16.79, 17.03], lon: [-99.936, -99.696] },
    Tampico: { lat: [22.185, 22.345], lon: [-97.936, -97.836] },
  };
  const { lat, lon } = cities[city];
  const randomLat = (Math.random() * (lat[1] - lat[0]) + lat[0]).toFixed(6);
  const randomLon = (Math.random() * (lon[1] - lon[0]) + lon[0]).toFixed(6);
  return { lat: randomLat, lon: randomLon };
}

function createPetsArray(numberOfPets) {
  const names = [
    "Bolillo",
    "Chispa",
    "Luna",
    "Pelusa",
    "Sol",
    "Milo",
    "Rex",
    "Nina",
    "Toby",
    "Simba",
    "Bella",
    "Rocky",
    "Maya",
    "Buddy",
    "Charlie",
    "Max",
    "Daisy",
    "Coco",
    "Zeus",
    "Bobby",
    "Lola",
    "Mimi",
    "Firulais",
    "Tito",
    "Bruno",
    "Fiona",
    "Rambo",
    "Nala",
    "Gizmo",
    "Rocco",
  ];
  const owners = ["ivan", "laura", "maria", "carlos", "sofia"];
  const species = ["dog", "cat"];
  const sexes = ["male", "female"];
  const sizes = ["small", "medium", "large", "xlarge"];
  const cities = ["Queretaro", "Acapulco", "Tampico"];

  const pets = [];

  for (let i = 0; i < numberOfPets; i++) {
    const city = getRandomItem(cities);
    const { lat, lon } = randomLatLon(city);

    pets.push({
      id: i + 1,
      name: names[i],
      image: "",
      birthdate: randomDate(new Date("2016-01-01"), new Date()),
      ownerId: getRandomItem(owners),
      species: getRandomItem(species),
      sex: getRandomItem(sexes),
      size: getRandomItem(sizes),
      lat,
      lon,
    });
  }

  return pets;
}

console.log(createPetsArray(30)); // Create an array of 5 pets
