// Função para criar uma nova tarefa
function adicionarTarefa() {
    // Pede ao usuário para inserir o nome da nova tarefa
    var nomeTarefa = prompt("Digite o nome da nova tarefa:");
    if (nomeTarefa) { // Se o usuário inserir um nome
        // Cria um novo elemento div para a tarefa
        var novaTarefa = document.createElement('div');
        novaTarefa.textContent = nomeTarefa;
        novaTarefa.classList.add('tarefa');

        // Adiciona um event listener para remover a tarefa quando clicada
        novaTarefa.addEventListener('click', function() {
            var confirmarRemocao = confirm("Tem certeza que deseja remover esta tarefa?");
            if (confirmarRemocao) {
                this.remove(); // Remove a tarefa do DOM
                salvarTarefas(); // Salva as tarefas atualizadas no cookie
            }
        });

        // Adiciona a nova tarefa no topo da lista
        var listaTarefas = document.getElementById('ft_list');
        listaTarefas.prepend(novaTarefa);

        // Salva as tarefas atualizadas no cookie
        salvarTarefas();
    }
}

// Função para salvar as tarefas no cookie
function salvarTarefas() {
    var tarefas = [];
    var tarefasDivs = document.querySelectorAll('.tarefa');
    tarefasDivs.forEach(function(tarefaDiv) {
        tarefas.push(tarefaDiv.textContent);
    });
    document.cookie = 'tarefas=' + JSON.stringify(tarefas);
}

// Função para carregar as tarefas do cookie
function carregarTarefas() {
    var cookies = document.cookie.split(';');
    var tarefas = '';
    cookies.forEach(function(cookie) {
        if (cookie.trim().startsWith('tarefas=')) {
            tarefas = cookie.trim().substring('tarefas='.length);
        }
    });
    if (tarefas) {
        tarefas = JSON.parse(tarefas);
        var listaTarefas = document.getElementById('ft_list');
        tarefas.forEach(function(tarefa) {
            var novaTarefa = document.createElement('div');
            novaTarefa.textContent = tarefa;
            novaTarefa.classList.add('tarefa');
            novaTarefa.addEventListener('click', function() {
                var confirmarRemocao = confirm("Tem certeza que deseja remover esta tarefa?");
                if (confirmarRemocao) {
                    this.remove();
                    salvarTarefas();
                }
            });
            listaTarefas.prepend(novaTarefa);
        });
    }
}

// Carrega as tarefas ao carregar a página
carregarTarefas();