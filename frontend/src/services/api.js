const api = async (endpoint, options = {}) => {
    const response = await fetch(
        `http://localhost:3000/api${endpoint}`,
        {
            ...options,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            }
        }
    );

    const texto = await response.text();

    let data = {};

    if (texto) {
        try {
            data = JSON.parse(texto);
        } catch {
            throw new Error(
                `O servidor retornou uma resposta inválida. Status: ${response.status}`
            );
        }
    }

    if (!response.ok) {
        throw new Error(
            data.message || `Erro na requisição (${response.status}).`
        );
    }

    return data;
};

export default api;
