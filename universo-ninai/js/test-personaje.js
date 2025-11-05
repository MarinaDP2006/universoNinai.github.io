document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('personajeTest');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const counts = {
      dayan: 0, melanie: 0, jack_sparrow: 0, mara: 0, thranduil: 0,
      max: 0, josh: 0, marie: 0, tom: 0, jack_hanson: 0
    };
    for (let value of formData.values()) {
      if (counts[value] !== undefined) counts[value]++;
    }
    let personaje = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    mostrarResultado(personaje);
    form.reset();
  });

  function mostrarResultado(personaje) {
    const resultados = {
      dayan: {
        nombre: "Dayan Denali",
        historia: "Eres leal, valiente y protectora. Como Dayan, tu fuerza interior y tu amor por los tuyos te hacen capaz de enfrentarte a cualquier tormenta, aunque el mundo sea un misterio helado."
      },
      melanie: {
        nombre: "Melanie Swan",
        historia: "Aventurera y libre, tu espíritu no conoce límites. Como Melanie, buscas el horizonte y no temes lanzarte a lo desconocido, siempre guiada por tu corazón y tu deseo de descubrir."
      },
      jack_sparrow: {
        nombre: "Jack Sparrow",
        historia: "Astuto, divertido y siempre con un plan, eres el alma de la fiesta y el primero en lanzarse a la aventura. Como Jack, tu ingenio y tu humor te sacan de cualquier apuro."
      },
      mara: {
        nombre: "Mara de Arathorn",
        historia: "Sabia, noble y justa, eres el pilar de tu gente. Como Mara, tu sentido del deber y tu capacidad de sacrificio inspiran a quienes te rodean."
      },
      thranduil: {
        nombre: "Thranduil",
        historia: "Líder nato, elegante y sabio. Como Thranduil, tu visión y tu serenidad te convierten en un referente, aunque a veces tu distancia te haga parecer inaccesible."
      },
      max: {
        nombre: "Maxine Hartley",
        historia: "Creativa, intensa y auténtica. Como Max, vives la vida con pasión y no temes mostrar tus emociones, aunque a veces el mundo parezca demasiado frío. Tu fuerza está en tu autenticidad."
      },
      josh: {
        nombre: "Josh Ridley",
        historia: "Reservado, profundo y protector. Como Josh, has superado mucho y tu capacidad de amar y cuidar a los demás es tu mayor fortaleza. Cuando decides abrirte, eres capaz de grandes gestos."
      },
      marie: {
        nombre: "Marie Lake",
        historia: "Leal, directa y sensible. Como Marie, siempre estás ahí para tus amigos, incluso cuando eso significa decir verdades incómodas. Tu empatía te convierte en el pilar del grupo."
      },
      tom: {
        nombre: "Tom Shades",
        historia: "Intelectual, elegante y seguro. Como Tom, te mueves con soltura en ambientes exigentes y sabes escuchar y aconsejar. Inspiras confianza y serenidad."
      },
      jack_hanson: {
        nombre: "Jack Hanson",
        historia: "Divertido, práctico y protector. Como Jack, sabes cómo animar cualquier situación y siempre buscas el lado positivo. Eres el amigo que todos quieren tener cerca."
      }
    };
    const res = resultados[personaje];
    document.getElementById('resultadoModalLabel').textContent = `¡Eres ${res.nombre}!`;
    document.getElementById('resultadoTexto').innerHTML = `<p>${res.historia}</p>`;
    const modal = new bootstrap.Modal(document.getElementById('resultadoModal'));
    modal.show();
  }
});