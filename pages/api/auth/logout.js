import { verify } from "jsonwebtoken";
import { serialize } from "cookie"



export default function logoutHandler(req, res) {
    const { myTokenName } = req.cookies;
    if (!myTokenName) {
        return res.status(401).json({ error: "No token" })
    }

    try {
        // Verifica primero si la cookie es correcta
        verify(myTokenName, "secret");

        const serialized = serialize("myTokenName", null, {
            // No se ve en consola de navegador
            httpOnly: true,
            // Activa SSL en modo producción, porque en modo desarrollo no se tiene servidor https
            secure: process.env.NODE_ENV === "production",
            // En next el backend viene del mismo domino, si la api está en otro elegir "none"
            sameSite: "strict",
            // Expiración, se pone en 0 para logout
            maxAge: 0,
            // Ruta donde va a ser entregado
            path: "/"
        })
        res.setHeader("Set-Cookie", serialized);
        res.status(200).json("logout successfully")

    } catch (error) {
        return res.status(401).json({ error: "invalid token" })
    }
}