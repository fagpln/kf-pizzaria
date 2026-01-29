function login() {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;
  const erro = document.getElementById("erro");

  // USUÁRIOS DO SISTEMA
  if (usuario === "admin" && senha === "1234") {
    localStorage.setItem("perfil", "admin");
    window.location.href = "admin.html";
  } 
  else if (usuario === "funcionario" && senha === "1234") {
    localStorage.setItem("perfil", "funcionario");
    window.location.href = "admin.html";
  } 
  else {
    erro.innerText = "Usuário ou senha inválidos";
  }
}
