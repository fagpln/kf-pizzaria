// 🔥 CONFIGURAÇÃO FIREBASE (A MESMA DO INDEX)
const firebaseConfig = {
  apiKey: "AIzaSyCwlMy0RdhlCkjWwq2InuojeKtJimGUR9I",
  authDomain: "kf-pizzaria.firebaseapp.com",
  projectId: "kf-pizzaria",
  storageBucket: "kf-pizzaria.firebasestorage.app",
  messagingSenderId: "679614383644",
  appId: "1:679614383644:web:c53a7230008c9e4ae1c1d9"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const lista = document.getElementById("listaPedidos");

// 🔄 ESCUTA PEDIDOS EM TEMPO REAL
db.collection("pedidos")
  .orderBy("data", "desc")
  .onSnapshot(snapshot => {

    if (snapshot.empty) {
      lista.innerHTML = "<p class='vazio'>Nenhum pedido ainda</p>";
      return;
    }

    lista.innerHTML = "";

    snapshot.forEach(doc => {
      const p = doc.data();

      let itensHtml = "";
      p.itens.forEach(i => {
        itensHtml += `<div>- ${i.nome} x${i.quantidade}</div>`;
      });

      const data = p.data?.toDate
        ? p.data.toDate().toLocaleString("pt-BR")
        : "";

      lista.innerHTML += `
        <div class="pedido">
          <h3>${p.nome}</h3>
          <small>${data}</small>
          <p><strong>Endereço:</strong> ${p.endereco}</p>
          <div class="itens">${itensHtml}</div>
          <p><strong>Pagamento:</strong> ${p.pagamento}</p>
          ${p.troco ? `<p><strong>Troco:</strong> ${p.troco}</p>` : ""}
          ${p.observacao ? `<p><strong>Obs:</strong> ${p.observacao}</p>` : ""}
          <div class="total">💰 Total: R$ ${p.total.toFixed(2)}</div>
        </div>
      `;
    });
  }, error => {
    lista.innerHTML = "<p class='vazio'>Erro ao carregar pedidos</p>";
    console.error(error);
  });
