const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send(`
        <html>
        <head>
            <title>API Deportiva</title>

            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f2f2f2;
                    text-align: center;
                    padding: 50px;
                }

                .contenedor {
                    background-color: white;
                    max-width: 500px;
                    margin: auto;
                    padding: 30px;
                    border-radius: 10px;
                }

                h1 {
                    color: #333;
                }

                p {
                    color: #666;
                }

                a {
                    display: block;
                    background-color: #333;
                    color: white;
                    text-decoration: none;
                    padding: 12px;
                    margin: 10px;
                    border-radius: 5px;
                }

                a:hover {
                    background-color: #555;
                }
            </style>
        </head>

        <body>

            <div class="contenedor">

                <h1>🏀 API Deportiva</h1>

                <p>Selecciona una opción para consultar la API</p>

                <a href="/deportes">
                    Ver todos los deportes
                </a>

                <a href="/deportes/Baloncesto">
                    🏀 Ver Baloncesto
                </a>

                <a href="/deportes/Voleibol">
                    🏐 Ver Voleibol
                </a>

            </div>

        </body>
        </html>
    `);
});

const deportes = [
    {
        nombre: "Fútbol",
        escenario: "Estadio",
        dimensiones: "105 x 68 metros",
        numero_de_elementos: 22,
        equipo: {
            short: true,
            playera: true,
            tacos: true,
            medias: true
        },
        pais: "México"
    },

    {
        nombre: "Baloncesto",
        escenario: "Cancha",
        dimensiones: "28 x 15 metros",
        numero_de_elementos: 10,
        equipo: {
            short: true,
            playera: true,
            tacos: false,
            medias: true
        },
        pais: "Estados Unidos"
    },

    {
        nombre: "Voleibol",
        escenario: "Cancha",
        dimensiones: "18 x 9 metros",
        numero_de_elementos: 12,
        equipo: {
            short: true,
            playera: true,
            tacos: false,
            medias: true
        },
        pais: "Brasil"
    }
];

app.get("/deportes", (req, res) => {
    res.json(deportes);
});

app.get("/deportes/:nombre", (req, res) => {

    const deporte = deportes.find(
        d => d.nombre.toLowerCase() === req.params.nombre.toLowerCase()
    );

    if (!deporte) {
        return res.status(404).json({
            mensaje: "Deporte no encontrado"
        });
    }

    res.json(deporte);
});

app.post("/deportes", (req, res) => {
    const nuevoDeporte = req.body;

    deportes.push(nuevoDeporte);

    res.status(201).json({
        mensaje: "Deporte agregado correctamente",
        deporte: nuevoDeporte
    });
});

app.put("/deportes/:nombre", (req, res) => {

    const deporte = deportes.find(
        d => d.nombre.toLowerCase() === req.params.nombre.toLowerCase()
    );

    if (!deporte) {
        return res.status(404).json({
            mensaje: "Deporte no encontrado"
        });
    }

    Object.assign(deporte, req.body);

    res.json({
        mensaje: "Deporte actualizado correctamente",
        deporte: deporte
    });
});

app.delete("/deportes/:nombre", (req, res) => {

    const indice = deportes.findIndex(
        d => d.nombre.toLowerCase() === req.params.nombre.toLowerCase()
    );

    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Deporte no encontrado"
        });
    }

    const deporteEliminado = deportes.splice(indice, 1);

    res.json({
        mensaje: "Deporte eliminado correctamente",
        deporte: deporteEliminado[0]
    });
});

app.listen(3000, () => {
    console.log("API funcionando en http://localhost:3000");
});