import jwt from "jsonwebtoken"
import { serialize } from "cookie"


export default function loginHandler(req, res) {

    const { email, password } = req.body;

    // Check if email and password are valid
    // If email exists check if password is correct
    // If password correct => "algo"

    // Este es ejemplo sencillo, así que sólo se enviará respuesta.

    if (email === "admin@local.local" && password === "admin") {
        // El segundo parámetro es un string a elección y se recomienda ingresarlo desde variable de entorno.
        const token = jwt.sign({
            // Expiración del token (en este caso 30 días)
            exp: Math.floor(Date.now()) + (60 * 60 * 24 * 30) / 1000,
            // Estos se obtendrían de una base de datos
            email: "admin@local.local",
            username: "fazt"
        }, "secret");

        // serialize lleva como parámetro el nombre de la cookie, su valor y un objeto de configuración
        const serialized = serialize("myTokenName", token, {
            // No se ve en consola de navegador
            httpOnly: true,
            // Activa SSL en modo producción, porque en modo desarrollo no se tiene servidor https
            secure: process.env.NODE_ENV === "production",
            // En next el backend viene del mismo domino, si la api está en otro elegir "none"
            sameSite: "strict",
            // Expiración
            maxAge: 1000 * 60 * 60 * 24 * 30,
            // Ruta donde va a ser entregado
            path: "/"
        })

        // Se recomienda enviar la información en la cabecera, porque sino el front end tiene que almacenarlo
        res.setHeader("Set-Cookie", serialized)

        return res.json("login route")
    }

    return res.status(401).json({ error: "invalid email or password" })


}

