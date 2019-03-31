// index.js - Orquestrador -
// vai guardar tudo que pesquisar no wikipedia, no google imagens( url´s).



const readline = require('readline-sync')
//+  "homepage": "https://github.com/MARCIORAINER/video-maker#readme",
//+  "dependencies": {
//+    "readline-sync": "^1.4.9"  ela pega input do usuário.
//+  }
function start () {
   const content = {}
// termo de busca
content.searchTerm = askAndReturnSearchTerm()
content.prefix = askAndReturnPrefix()

function askAndReturnSearchTerm() {
  return readline.question('Digite um termo de pesquisa no site Wikipedia: ')
}
function askAndReturnPrefix(){
const prefixes = ['Who is', 'What is', 'The history of']
//indice do array que foi selecionado
const selectedPrefixIndex = readline.keyInSelect(prefixes)
const selectedPrefixText = prefixes[selectedPrefixIndex]

return selectedPrefixText

console.log(selectedPrefixIndex)
}





console.log(content)

  
}

start()