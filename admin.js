<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin - KF Pizzaria</title>

<style>
body{
  font-family:Arial,sans-serif;
  background:#0e0e0e;
  color:#fff;
  margin:0;
  padding:20px;
}
h1{
  text-align:center;
  color:#00ff66;
}
.pedido{
  background:#1c1c1c;
  padding:15px;
  border-radius:10px;
  margin-bottom:15px;
  box-shadow:0 0 8px #000;
}
.pedido h3{
  margin:0 0 5px 0;
  color:#00ff66;
}
.itens{
  margin-left:10px;
}
.total{
  font-weight:bold;
  margin-top:8px;
  color:#ffcc00;
}
small{
  color:#aaa;
}
.vazio{
  text-align:center;
  color:#999;
  margin-top:50px;
}
</style>
</head>

<body>

<h1>📋 Pedidos Recebidos</h1>

<div id="listaPedidos" class="vazio">
Carregando pedidos...
</div>

<!-- Firebase -->
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>

<script src="admin.js"></script>

</body>
</html>
