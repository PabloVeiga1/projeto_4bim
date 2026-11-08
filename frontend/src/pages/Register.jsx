import { Link } from "react-router-dom";
import "../styles/Register.css";

function Register() {
    return (
    <main className="register-container">
        <header className="register-header">
            <h1>Criar conta</h1>
            <p>Preencha seus dados para acessar o sistema.</p>
        </header>

        <form className="register-form">
            <div className="register-group">
                <label htmlFor="name">Nome completo:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Digite seu nome completo"
                    autoComplete="name"
                    required
                />
            </div>

            <div className="register-group">
                <label htmlFor="email">E-mail:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="contato@gmail.com"
                    autoComplete="email"
                    required
                />
            </div>

            <div className="register-group">
                <label htmlFor="password">Senha:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Crie uma senha"
                    autoComplete="new-password"
                    required
                />
            </div>

            <div className="register-group">
                <label htmlFor="confirmPassword">
                    Confirmar senha:
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Digite sua senha novamente"
                    autoComplete="new-password"
                    required
                />
            </div>

            <button type="submit">
                Criar conta
            </button>

            <p className="register-footer">
                Já possui uma conta?
                <Link to="/"> Fazer login</Link>
            </p>
        </form>
    </main>
    );
}

export default Register;


