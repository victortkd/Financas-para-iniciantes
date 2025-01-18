document.getElementById('simuladorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const capital = parseFloat(document.getElementById('capital').value);
    const mensal = parseFloat(document.getElementById('mensal').value);
    const taxa = parseFloat(document.getElementById('taxa').value) / 100; // Convertendo para decimal
    const tempo = parseInt(document.getElementById('tempo').value);
    
    const taxaCDI = 0.10; // 10,84% ao ano

    let resultados = [];
    let saldo = capital;
    let resultadosCDI = [];
    let saldoCDI = capital;

    for (let ano = 1; ano <= tempo; ano++) {
        saldo += mensal * 12; // Adiciona o valor mensal ao saldo
        saldo *= (1 + taxa); // Aplica os juros compostos
        resultados.push(saldo.toFixed(2)); // Armazena o saldo formatado

        saldoCDI += mensal * 12; // Adiciona o valor mensal ao saldo do CDI
        saldoCDI *= (1 + taxaCDI); // Aplica os juros do CDI
        resultadosCDI.push(saldoCDI.toFixed(2)); // Armazena o saldo formatado do CDI
    }
//mostra a caixa
    document.getElementById('resultado').innerText = `Saldo após ${tempo} anos: R$ ${saldo.toFixed(2)}`;
    document.getElementById('resultadoContainer').style.display = 'block'; //mostra a caixa de resultado

    // Criação do gráfico
    const ctx = document.getElementById('graficoRendimentos').getContext('2d');
    const graficoRendimentos = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: tempo }, (_, i) => i + 1), // Anos
            datasets: [
                {
                    label: 'Rendimento ao longo dos anos',
                    data: resultados,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'Rendimento CDI ao longo dos anos',
                    data: resultadosCDI,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const footer = document.querySelector("footer");
    footer.style.opacity = "0"; // Ocultar o rodapé
    footer.addEventListener("mouseenter", function() {
        footer.style.opacity = "1"; // Mostrar o rodapé
    });
    footer.addEventListener("mouseleave", function() {
        footer.style.opacity = "0"; // Ocultar o rodapé
    });
});