<!-- firebase-pedidos.js -->
<script type="module">
  // 🔥 Firebase SDK (VERSÃO MODERNA)
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

  // ✅ SUA CONFIGURAÇÃO (já conferida)
  const firebaseConfig = {
    apiKey: "AIzaSyCwlMy0RdhlCkjWwq2InuojeKtJimGUR9I",
    authDomain: "kf-pizzaria.firebaseapp.com",
    projectId: "kf-pizzaria",
    storageBucket: "kf-pizzaria.firebasestorage.app",
    messagingSenderId: "679614383644",
    appId: "1:679614383644:web:c53a7230008c9e4ae1c1d9"
  };

  // 🚀 Inicializa Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // 🌐 Função GLOBAL (o index vai enxergar)
  window.salvarPedidoFirebase = async function (pedido) {
    try {
      await addDoc(collection(db, "pedidos"), {
        ...pedido,
        criadoEm: serverTimestamp(),
        status: "Pendente"
      });
      console.log("✅ Pedido salvo no Firebase");
    } catch (e) {
      console.error("❌ Erro ao salvar no Firebase:", e);
    }
  };
</script>
