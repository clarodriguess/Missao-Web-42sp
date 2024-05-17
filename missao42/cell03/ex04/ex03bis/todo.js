
$(document).ready(function () {
    // Carrega as tarefas ao carregar a página
    carregarTarefas();

    // Função para criar uma nova tarefa
    $("#adicionarTarefaBtn").click(function () {
        var nomeTarefa = prompt("Digite o nome da nova tarefa:");
        if (nomeTarefa) {
            var novaTarefa = $("<div></div>").text(nomeTarefa).addClass("tarefa");

            novaTarefa.on("click", function () {
                var confirmarRemocao = confirm("Tem certeza que deseja remover esta tarefa?");
                if (confirmarRemocao) {
                    $(this).remove(); // Remove a tarefa do DOM
                    salvarTarefas(); // Salva as tarefas atualizadas no cookie
                }
            });

            $("#ft_list").prepend(novaTarefa); // Adiciona a nova tarefa no topo da lista
            salvarTarefas(); // Salva as tarefas atualizadas no cookie
        }
    });

    // Função para salvar as tarefas no cookie
    function salvarTarefas() {
        var tarefas = [];
        $(".tarefa").each(function () {
            tarefas.push($(this).text());
        });
        document.cookie = 'tarefas=' + JSON.stringify(tarefas);
    }

    // Função para carregar as tarefas do cookie
    function carregarTarefas() {
        var cookies = document.cookie.split(';');
        var tarefas = '';
        cookies.forEach(function (cookie) {
            if (cookie.trim().startsWith('tarefas=')) {
                tarefas = cookie.trim().substring('tarefas='.length);
            }
        });
        if (tarefas) {
            tarefas = JSON.parse(tarefas);
            tarefas.forEach(function (tarefa) {
                var novaTarefa = $("<div></div>").text(tarefa).addClass("tarefa");
                novaTarefa.on("click", function () {
                    var confirmarRemocao = confirm("Tem certeza que deseja remover esta tarefa?");
                    if (confirmarRemocao) {
                        $(this).remove();
                        salvarTarefas();
                    }
                });
                $("#ft_list").prepend(novaTarefa);
            });
        }
    }
});
