import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes'
import connection from "./DB/conn";

const app = express();
const port = 3000;

app.use(express.json())

// Routes
app.use('/usuarios', usuarioRoutes)

connection.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server rodando na porta ${port}`)
    })
}).catch((error) => {console.log(error)})