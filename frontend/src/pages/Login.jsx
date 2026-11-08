
import "../styles/Login.css";

function Login() {
    return (
      <main className="login-container">
          <h1>Login</h1>
          <form>
              <div className="form-group">
                  <label htmlFor="email">Seu email:</label>
                  <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="contato@gmail.com"
                      required
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="password">Sua senha:</label>
                  <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Sua senha"
                      required
                  />
              </div>
              <button type="submit">
                  Login
              </button>
              <p>
                  Não tem uma conta?
                  <a href="/register"> Cadastre-se</a>
              </p>
          </form>
      </main>
    );
}
export default Login;
