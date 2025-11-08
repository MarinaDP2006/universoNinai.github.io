function renderHistorias(seccionId, historias) {
  const contenedor = document.getElementById(`lista-${seccionId}`);
  if (!contenedor) return;
  contenedor.innerHTML = "";
  historias.forEach(historia => {
    const div = document.createElement("div");
    div.className = "historia";
    div.innerHTML = `<h3>${historia.titulo}</h3><p>${historia.resumen}</p>`;
    contenedor.appendChild(div);
  });
}

// Conexión al archivo PHP que consulta MySQL
fetch("http://localhost/universo-ninai/historias.php")
  .then(response => response.json())
  .then(data => {
    renderHistorias("ultimas", data.ultimas);
    renderHistorias("top", data.top);
    renderHistorias("recomendadas", data.recomendadas);
  })
  .catch(error => console.error("Error al cargar historias:", error));

// Datos en caso de que la conexión falle
  const baseDeDatos = {
ultimas: [
  { titulo: "Infinite Game", resumen: "Tras la caída de Asgard y la derrota ante Thanos, dos personas deben sobrevivir, sanar y enfrentarse a nuevas amenazas." },
  { titulo: "El gorrión y la mujer del mar", resumen: "Melanie, hija de Will Turner y Elisabeth, se ve envuelta en una aventura de piratas, traiciones y amor junto a Jack Sparrow." },
  { titulo: "Dayan Denali", resumen: "Tras un accidente, Dayan despierta en la misteriosa familia Denali. Entre secretos, lobos y vampiros, descubre su verdadero origen." }
],

top: [
  { titulo: "La luz del Rey", resumen: "Mara, princesa de Arathorn, busca libertad y encuentra un hogar entre elfos, guerras y secretos en el Bosque Negro." },
  { titulo: "Dayan Denali", resumen: "Tras un accidente, Dayan despierta en la misteriosa familia Denali. Entre secretos, lobos y vampiros, descubre su verdadero origen." },
  { titulo: "Infinite Game", resumen: "Tras la caída de Asgard y la derrota ante Thanos, dos personas deben sobrevivir, sanar y enfrentarse a nuevas amenazas." },
  { titulo: "Entre páginas e historias", resumen: "Maxine Hartley nunca creyó en las coincidencias, hasta que dos hombres y una biblioteca cambiaron su vida en Londres." },
  { titulo: "El gorrión y la mujer del mar", resumen: "Melanie, hija de Will Turner y Elisabeth, se ve envuelta en una aventura de piratas, traiciones y amor junto a Jack Sparrow." }
],

recomendadas: [
  { titulo: "Entre páginas e historias", resumen: "Maxine Hartley nunca creyó en las coincidencias, hasta que dos hombres y una biblioteca cambiaron su vida en Londres." },
  { titulo: "El gorrión y la mujer del mar", resumen: "Melanie, hija de Will Turner y Elisabeth, se ve envuelta en una aventura de piratas, traiciones y amor junto a Jack Sparrow." }
]
};
// Intentar cargar datos desde el servidor
fetch("http://localhost/universo-ninai/archivosPHP/historias.php")
  .then(response => response.json())
  .then(data => {
    console.log("Datos recibidos:", data);
    renderHistorias("ultimas", data.ultimas);
    renderHistorias("top", data.top);
    renderHistorias("recomendadas", data.recomendadas);
  })
  .catch(error => {
    console.error("Error al cargar historias:", error);
    renderHistorias("ultimas", baseDeDatos.ultimas);
    renderHistorias("top", baseDeDatos.top);
    renderHistorias("recomendadas", baseDeDatos.recomendadas);
  });