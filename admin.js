// ===== USUÁRIOS =====
const usuarios = {
  admin: "1234",
  func: "1234"
};

// ===== CONTROLE DE SOM =====
let alertaIntervalo = null;

// ===== LOGIN =====
function login() {
  const user = document.getElementById("usuario").value.trim();
  const pass = document.getElementById("senha").value.trim();

  if (!user || !pass) {
    alert("Preencha usuário e senha");
    return;
  }

  if (usuarios[user] === pass) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("painel").style.display = "block";
    carregarPedidos();
  } else {
    alert("Usuário ou senha inválidos");
  }
}

// ===== ALERTA SONORO =====
function iniciarAlertaSonoro() {
  if (alertaIntervalo) return;

  const som = document.getElementById("alertaSom");

  alertaIntervalo = setInterval(() => {
    if (som) {
      som.currentTime = 0;
      som.play().catch(() => {});
    }
  }, 4000);
}

function pararAlertaSonoro() {
  if (alertaIntervalo) {
    clearInterval(alertaIntervalo);
    alertaIntervalo = null;
  }
}

// ===== CARREGAR PEDIDOS =====
function carregarPedidos() {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  const lista = document.getElementById("listaPedidos");
  const historico = document.getElementById("historicoPedidos");

  lista.innerHTML = "";
  historico.innerHTML = "";

  const existeAguardando = pedidos.some(p => p.status === "Aguardando");

  if (existeAguardando) {
    iniciarAlertaSonoro();
  } else {
    pararAlertaSonoro();
  }

  pedidos.forEach((p, index) => {
    const bloco = `
      <div class="pedido">
        <p><strong>Cliente:</strong> ${p.nome}</p>
        <p><strong>Itens:</strong><br>${p.itens.join("<br>")}</p>
        <p><strong>Total:</strong> R$ ${p.total.toFixed(2)}</p>
        <p><strong>Pagamento:</strong> ${p.pagamento}</p>

        <p class="status-${p.status.replace(" ", "").toLowerCase()}">
          <strong>Status:</strong> ${p.status}
        </p>

        ${
          p.status !== "Finalizado"
            ? `
              <button onclick="aceitarPedido(${index})">✅ Aceitar</button>
              <button onclick="finalizarPedido(${index})">🏁 Finalizar</button>
              <button onclick="imprimirPedido(${index})">🖨 Imprimir</button>
            `
            : `
              <button onclick="imprimirPedido(${index})">🖨 Reimprimir</button>
            `
        }
      </div>
      <hr>
    `;

    if (p.status === "Finalizado") {
      historico.innerHTML += bloco;
    } else {
      lista.innerHTML += bloco;
    }
  });

  gerarRelatorios();
}

// ===== AÇÕES =====
function aceitarPedido(i) {
  const pedidos = JSON.parse(localStorage.getItem("pedidos"));
  pedidos[i].status = "Em preparo";
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  pararAlertaSonoro();
  carregarPedidos();
}

function finalizarPedido(i) {
  const pedidos = JSON.parse(localStorage.getItem("pedidos"));
  pedidos[i].status = "Finalizado";
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  carregarPedidos();
}

// ===== RELATÓRIOS =====
function gerarRelatorios() {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  let total = 0, dinheiro = 0, cartao = 0, pix = 0, taxas = 0;

  pedidos.forEach(p => {
    total += p.total;

    if (p.pagamento === "dinheiro") dinheiro += p.total;
    if (p.pagamento === "cartao") cartao += p.total;
    if (p.pagamento === "pix") pix += p.total;
    if (p.tipoEntrega === "entrega") taxas += p.taxaEntrega || 0;
  });

  document.getElementById("totalPedidos").innerText = `🧾 Pedidos: ${pedidos.length}`;
  document.getElementById("totalVendas").innerText = `💰 Total: R$ ${total.toFixed(2)}`;
  document.getElementById("totalDinheiro").innerText = `💵 Dinheiro: R$ ${dinheiro.toFixed(2)}`;
  document.getElementById("totalCartao").innerText = `💳 Cartão: R$ ${cartao.toFixed(2)}`;
  document.getElementById("totalPix").innerText = `📲 Pix: R$ ${pix.toFixed(2)}`;
  document.getElementById("totalTaxas").innerText = `🛵 Taxas: R$ ${taxas.toFixed(2)}`;
}

// ===== IMPRESSÃO 58mm =====
function imprimirPedido(index) {
  const pedidos = JSON.parse(localStorage.getItem("pedidos"));
  const p = pedidos[index];

  let html = `
    <h3>KF Pizzaria & Tapiocaria</h3>
    <p>-------------------------</p>
    <p><strong>Cliente:</strong><br>${p.nome}</p>
    <p><strong>Pedido:</strong></p>
  `;

  p.itens.forEach(i => html += `<p>${i}</p>`);

  html += `
    <p>-------------------------</p>
    <p><strong>Total:</strong> R$ ${p.total.toFixed(2)}</p>
    <p><strong>Pagamento:</strong> ${p.pagamento}</p>
    <p>-------------------------</p>
    <p>Obrigado!</p>
  `;

  const w = window.open("", "", "width=300,height=600");
  w.document.write(`
    <html>
    <head>
      <style>
        body { font-family: monospace; width: 58mm; margin: 0; padding: 5px; }
        h3 { text-align: center; }
        p { font-size: 12px; margin: 2px 0; }
      </style>
    </head>
    <body onload="window.print(); window.close();">
      ${html}
    </body>
    </html>
  `);
}
