import jwt from "jsonwebtoken";

function autenticar(req, res, next) {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({
      message: "Você precisa estar autenticado."
    });
  }

  try {
    const dados = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.usuario = dados;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Sessão inválida ou expirada."
    });
  }
}

export default autenticar;
