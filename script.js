

async function buscarCep() {
    const uf = document.getElementById('uf').value;
    const cidade = document.getElementById('cidade').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const containerResultados = document.getElementById('lista-resultados');

    // Validação básica
    if (cidade.length < 3 || rua.length < 3) {
        alert("Magnata, informe ao menos 3 letras da cidade e da rua para uma busca precisa.");
        return;
    }

    containerResultados.innerHTML = "<p style='color:#003366; font-weight:700;'>Processando consulta...</p>";

    try {
        const url = `https://viacep.com.br/ws/${uf}/${encodeURIComponent(cidade)}/${encodeURIComponent(rua)}/json/`;
        const response = await fetch(url);
        const data = await response.json();

        containerResultados.innerHTML = ""; // Limpa o carregamento

        if (data.length === 0) {
            containerResultados.innerHTML = "<p>Nenhum resultado encontrado para este endereço.</p>";
            return;
        }

        // Criando cards para cada CEP encontrado
        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'result-card';
            card.innerHTML = `
                <h3>${item.cep}</h3>
                <p>${item.logradouro}</p>
                <p>${item.bairro} - ${item.localidade}/${item.uf}</p>
            `;
            containerResultados.appendChild(card);
        });

    } catch (error) {
        console.error("Erro na busca:", error);
        alert("Erro técnico ao conectar com o servidor.");
    }
}