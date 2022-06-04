let bd = []

const getBD = () => JSON.parse(localStorage.getItem('todoList')) ?? []; //JSON.parse> transformando em ARRAY //se tiver alguma coisa na variavel todolist pega, senão '??'> se o getBD estiver vazio, passa um array que vai ser passado
const setBD = bd => localStorage.setItem('todoList', JSON.stringify(bd));//JSON.stringfy transforma em string

const criarTafera = (tarefa, status, indice) => {
  const item = document.createElement('label'); //cria um label
  item.classList.add('todo__item');
  item.innerHTML = /* dentro do HTML*/ `
        <input type="checkbox" ${status} data-indice=${indice}> 
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    ` // data-indice serve para diferenciar os elementos tarefas permitindo que qual deles poderão ser deletados.
  //pega o elemento que contem o ID to_do_list e nesse elemento vou adicionar o item que acabou de ser criado.
  document.getElementById('todoList').appendChild(item)
}

const limparTarefas = () => {
  const todoList = document.getElementById('todoList')
  while (todoList.firstChild) {
    todoList.removeChild(todoList.lastChild);
  }
}

const atualizarTela = () => {
  limparTarefas();
  const bd = getBD();
  bd.forEach((item, indice) => criarTafera(item.tarefa, item.status, indice));
}

const inserirItem = evento => {
  const tecla = evento.key;
  const texto = evento.target.value;
  if (tecla === 'Enter') {
    const bd = getBD();//lendo o banco
    bd.push({ tarefa: texto, status: '' });//adicionando ao banco
    setBD(bd);//enviando banco
    atualizarTela();
    evento.target.value = '' ;//apaga a caixa
  }
}

const removerItem = indice => {
  const bd = getBD();
  bd.splice(indice, 1) //splice recorta/modifica um array
  setBD(bd);
  atualizarTela();
}

const atualizarItem = indice => {
  const bd = getBD();
  bd[indice].status = bd[indice].status === '' ? 'checked' : ''
  setBD(bd);
  atualizarTela();
}

const clickTarefa = evento => {
  const elemento = evento.target
  console.log(elemento.type);
  if (elemento.type === 'button') {
    const indice = elemento.dataset.indice
    removerItem(indice);
  } else if (elemento.type === 'checkbox') {
    const indice = elemento.dataset.indice
    atualizarItem(indice);
  } 
}

document.getElementById('newItem').addEventListener('keypress', inserirItem); // vou no id newItem e capturo o evento keypress// addEventListener manda pro callback 'inserirTarefa' o evento que aconteceu em inserirTarefa.
//document.getElementById('todoList').addEventListener('click', clickTarefa);
document.getElementById('todoList').addEventListener('click', clickTarefa);

atualizarTela();
