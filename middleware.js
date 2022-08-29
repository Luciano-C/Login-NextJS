// Ver: https://nextjs.org/docs/advanced-features/middleware

import { NextResponse } from "next/server";

// jsonwebtoken todavía no está a red edge (ver tutorial 52:00), para esta parte se usa módulo "jose"
import { jwtVerify } from "jose";


export async function middleware(request) {

    const jwt = request.cookies.get("myTokenName");
    console.log(jwt)

    if (jwt === undefined) {
        return NextResponse.redirect(new URL("login", request.url))
    }

    try {
        // No basta con sólo validar la existencia del token, ésta debe tener un valor válido
        // jwtVerify se comporta similar a verify de jsonwebtoken pero necesita como segundo parámetro newTextEncoder().encode(SIGNATURE)
        const { payload } = await jwtVerify(jwt, new TextEncoder().encode("secret"))
        return NextResponse.next();
    } catch (error) {
        console.log(error)
        return NextResponse.redirect(new URL("/login", request.url))
    }

}

// Esto indica que rutas proteger. Para proteger subrutas => /ruta/:path* (está en documentación)
export const config = {
    matcher: ["/dashboard"]
}