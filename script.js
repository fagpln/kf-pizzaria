// ================= DADOS =================
const pizzas = [
  { nome: "Calabresa", preco: 39 },
  { nome: "Frango com Catupiry", preco: 45 },
  { nome: "Camarão", preco: 55 }
];

const tapiocaCategorias = {
  "🧀 Queijos":[{nome:"Queijo Coalho",preco:12},{nome:"Mussarela",preco:10},{nome:"Catupiry",preco:14}],
  "🥩 Carnes":[{nome:"Frango",preco:18},{nome:"Calabresa",preco:16},{nome:"Camarão",preco:25}],
  "🍫 Chocolates":[{nome:"Chocolate",preco:12},{nome:"Chocolate Branco",preco:14},{nome:"Nutella",preco:20}],
  "🍓 Frutas":[{nome:"Banana",preco:8},{nome:"Morango",preco:10},{nome:"Coco",preco:9}],
  "🥗 Acompanhamento":[{nome:"Leite Condensado",preco:0},{nome:"Orégano",preco:0},{nome:"Tomate",preco:0},{nome:"Cebola",preco:0},{nome:"Granulado",preco:0}]
};

const bebidas = [
  { nome: "Coca-Cola Lata", preco: 6 },
  { nome: "Guaraná Lata", preco: 5 },
  { nome: "Água", preco: 3 }
];

// ================= VARIÁVEIS =================
let carrinho = [], total = 0;
let saboresPizzaSelecionados = [], recheiosTapiocaSelecionados = [];

// ================= MENU =================
function mostrarMenu(id){
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("ativo"));
  document.getElementById(id).classList.add("ativo");
}

// ================= RENDER =================
function renderPizzas(){
  const div = document.getElementById("listaPizzas");
  if(!div) return;
  div.innerHTML="<p><strong>Escolha os sabores que quiser</strong></p>";
  pizzas.forEach((p,i)=>{
    div.innerHTML+=`<div class="produto"><strong>${p.nome}</strong><br>R$ ${p.preco.toFixed(2)}
      <button onclick="selecionarSaborPizza(${i})">Selecionar</button>
    </div>`;
  });
}

function renderTapiocas(){
  const div = document.getElementById("listaTapiocas");
  if(!div) return;
  div.innerHTML="<p><strong>Escolha até 2 recheios pagos + 1 Acompanhamento</strong></p>";
  Object.keys(tapiocaCategorias).forEach(categoria=>{
    div.innerHTML+=`<h3>${categoria}</h3>`;
    tapiocaCategorias[categoria].forEach((r,i)=>{
      const id = `${categoria}-${i}`.replace(/\s/g,"");
      div.innerHTML+=`<div class="produto" id="${id}"><span><strong>${r.nome}</strong> — R$ ${r.preco.toFixed(2)}</span>
        <button id="btn-${id}" onclick="selecionarRecheioTapioca('${categoria}',${i},'${id}')">Selecionar</button>
      </div>`;
    });
  });
}

// ================= PIZZA =================
function selecionarSaborPizza(i){
  const sabor = pizzas[i];
  const btns = document.querySelectorAll("#listaPizzas button");
  if(saboresPizzaSelecionados.includes(sabor)){
    saboresPizzaSelecionados = saboresPizzaSelecionados.filter(s => s !== sabor);
    btns[i].style.background="#00ff66";
  } else {
    saboresPizzaSelecionados.push(sabor);
    btns[i].style.background="#007bff";
  }
  btns[i].style.transition="background 0.3s ease";
}

function adicionarPizzaAoCarrinho(){
  if(saboresPizzaSelecionados.length===0){
    alert("Selecione pelo menos 1 sabor de pizza");
    return;
  }
  const maiorPreco = Math.max(...saboresPizzaSelecionados.map(s => s.preco));
  const nomes = saboresPizzaSelecionados.map(s => s.nome).join(" + ");
  adicionarAoCarrinho(`Pizza (${nomes})`, maiorPreco);
  saboresPizzaSelecionados = [];
  renderPizzas();
}

// ================= TAPIOCA =================
function selecionarRecheioTapioca(categoria,index,elementoId){
  const recheio = tapiocaCategorias[categoria][index];
  const btn = document.getElementById(`btn-${elementoId}`);

  // Limitar 2 recheios pagos
  if(recheio.preco > 0){
    const pagosSelecionados = recheiosTapiocaSelecionados.filter(r=>r.preco>0);
    if(!recheiosTapiocaSelecionados.includes(recheio) && pagosSelecionados.length>=2){
      alert("Você só pode escolher até 2 recheios pagos");
      return;
    }
  }

  // Limitar 1 acompanhamento
  if(recheio.preco === 0){
    const acompanSelected = recheiosTapiocaSelecionados.find(r=>r.preco===0);
    if(acompanSelected && !recheiosTapiocaSelecionados.includes(recheio)){
      alert("Você só pode escolher 1 Acompanhamento");
      return;
    }
  }

  if(recheiosTapiocaSelecionados.includes(recheio)){
    recheiosTapiocaSelecionados = recheiosTapiocaSelecionados.filter(r=>r!==recheio);
    btn.style.background="#00ff66";
  } else {
    recheiosTapiocaSelecionados.push(recheio);
    btn.style.background="#007bff";
  }
  btn.style.transition="background 0.3s ease";
}

function adicionarTapiocaAoCarrinho(){
  if(recheiosTapiocaSelecionados.length===0){
    alert("Selecione pelo menos 1 recheio de tapioca");
    return;
  }
  // Cobrar apenas o recheio pago mais caro
  const pagos = recheiosTapiocaSelecionados.filter(r=>r.preco>0);
  const maiorPreco = pagos.length>0 ? Math.max(...pagos.map(r=>r.preco)) : 0;
  const nomes = recheiosTapiocaSelecionados.map(r=>r.nome).join(" + ");
  adicionarAoCarrinho(`Tapioca (${nomes})`, maiorPreco);
  recheiosTapiocaSelecionados = [];
  renderTapiocas();
}

// ================= BEBIDAS =================
function adicionarBebida(i){
  adicionarAoCarrinho(bebidas[i].nome, bebidas[i].preco);
}

// ================= CARRINHO =================
function adicionarAoCarrinho(nome, preco){
  const existente = carrinho.find(item => item.nome === nome);
  if(existente){
    existente.quantidade += 1;
  } else {
    carrinho.push({nome, preco, quantidade:1});
  }
  atualizarCarrinho();
}

function removerItem(i){
  carrinho.splice(i,1);
  atualizarCarrinho();
}

function atualizarCarrinho(){
  const div = document.getElementById("itensCarrinho");
  const totalSpan = document.getElementById("totalCarrinho");
  if(!div || !totalSpan) return;
  div.innerHTML = ""; total = 0;
  carrinho.forEach((item,index)=>{
    total += item.preco * item.quantidade;
    div.innerHTML += `<div>${item.nome} x${item.quantidade} — R$ ${(item.preco*item.quantidade).toFixed(2)} <button onclick="removerItem(${index})">❌</button></div>`;
  });
  totalSpan.innerText = total.toFixed(2);
}

// ================= FINALIZAR =================
function finalizarPedido(){
  const nome = document.getElementById("nome").value.trim();
  const endereco = document.getElementById("endereco").value.trim();
  const pagamento = document.getElementById("pagamento").value;
  const observacao = document.getElementById("observacao").value.trim();

  if(!nome || !endereco || !pagamento || carrinho.length===0){
    alert("Preencha todos os dados e adicione itens");
    return;
  }

  const enderecoMapa = encodeURIComponent(`https://www.google.com/maps/search/?api=1&query=${endereco}`);
  const itensTexto = carrinho.map(i=>`${i.nome} x${i.quantidade}`).join(", ");
  const mensagem = `🍕 *NOVO PEDIDO - KF PIZZARIA*\n👤 ${encodeURIComponent(nome)}\n📍 ${encodeURIComponent(endereco)} (${enderecoMapa})\n💳 ${encodeURIComponent(pagamento)}\n🧾 ${encodeURIComponent(itensTexto)}\n💰 Total: R$ ${total.toFixed(2)}${observacao ? `\n📝 Observação: ${encodeURIComponent(observacao)}` : ""}`;

  const numeroWhatsApp = "5521997437285"; 
  window.open(`https://wa.me/${numeroWhatsApp}?text=${mensagem}`, "_blank");

  carrinho = [];
  atualizarCarrinho();
  alert("Pedido enviado com sucesso!");
}

// ================= INICIAR =================
document.addEventListener("DOMContentLoaded",()=>{
  renderPizzas();
  renderTapiocas();
  renderBebidas();
  atualizarCarrinho();
});
function toggleCarrinho(){
  const conteudo = document.getElementById("conteudoCarrinho");
  const seta = document.getElementById("setaCarrinho");

  conteudo.classList.toggle("fechado");
  seta.innerText = conteudo.classList.contains("fechado") ? "▲" : "▼";
}
function toggleCarrinho(){
  const conteudo = document.getElementById("conteudoCarrinho");
  const seta = document.getElementById("setaCarrinho");

  conteudo.classList.toggle("fechado");
  seta.innerText = conteudo.classList.contains("fechado") ? "▲" : "▼";
}
document.getElementById("ativarSom").addEventListener("click", () => {
    const som = document.getElementById("somPedido");
    som.play();
    alert("Som ativado! Ele tocará enquanto houver pedidos pendentes.");
});
