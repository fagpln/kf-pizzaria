<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>

<script>
  const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_AUTH_DOMAIN",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_STORAGE_BUCKET",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID",
    appId: "SEU_APP_ID"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
</script>
// ================== SALVAR NO FIREBASE ==================
db.collection("pedidos").add({
  nome,
  endereco,
  pagamento,
  troco: troco || "",
  observacao,
  itens: [...carrinho],
  total,
  status: "Pendente",
  criadoEm: new Date()
});
