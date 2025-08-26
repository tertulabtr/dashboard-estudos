// Dias da semana
const dias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

// Recupera do LocalStorage ou inicia com zeros
let horasEstudo = JSON.parse(localStorage.getItem("horasEstudo")) || [0,0,0,0,0,0,0];

// Configuração do gráfico
const ctx = document.getElementById("graficoEstudos").getContext("2d");
let grafico = new Chart(ctx, {
  type: "bar",
  data: {
    labels: dias,
    datasets: [{
      label: "Horas de Estudo",
      data: horasEstudo,
      backgroundColor: "#00bcd4"
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true, max: 12 }
    }
  }
});

// Função para adicionar horas
document.getElementById("adicionar").addEventListener("click", () => {
  let horas = parseInt(document.getElementById("horas").value);
  if (!isNaN(horas) && horas >= 0) {
    let dia = new Date().getDay(); // 0 = Domingo
    let index = dia === 0 ? 6 : dia - 1; // Ajusta pra começar em segunda
    horasEstudo[index] += horas;

    // Atualiza gráfico
    grafico.data.datasets[0].data = horasEstudo;
    grafico.update();

    // Salva no LocalStorage
    localStorage.setItem("horasEstudo", JSON.stringify(horasEstudo));

    document.getElementById("horas").value = "";
  }
});

// Resetar semana
document.getElementById("resetar").addEventListener("click", () => {
  horasEstudo = [0,0,0,0,0,0,0];
  grafico.data.datasets[0].data = horasEstudo;
  grafico.update();
  localStorage.setItem("horasEstudo", JSON.stringify(horasEstudo));
});
