//importei o módulo de pesquisa 
//wikipedia do site https://algorithmia.com/algorithms/web/WikipediaParser
const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey
const sentenceBoundaryDetection = require('sbd')
async function robot(content) {
//ca  console.log(`Recebi com sucesso a palavra de pesquisa: ${content.searchTerm}`)
  await fetchContentFromWikipedia(content) 
  sanitizeContent(content)
 breakContentIntoSentences(content)
 //ca console.log('logando se a função fetchContentFromWikipedia retorna uma promisse')
 //ca console.log(fetchContentFromWikipedia())

 
  async function fetchContentFromWikipedia(content) {
  //retorna uma instância autenticada do algoritmo
  //ca return 'RESULTADO DA PROMISSE'
   const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
   const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
   const wikipediaResponde = await wikipediaAlgorithm.pipe(content.searchTerm)
  //ca console.log('Fazendo log do objeto "wikipediaResponde"')
  //ca console.log(wikipediaResponde)
   const wikipediaContent = wikipediaResponde.get()
  //ca console.log(wikipediaContent)
   content.sourceContentOriginal = wikipediaContent.content
   }  
  function sanitizeContent(content) {
  // remover linhas em branco e quebra de linha
   const withouBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(content.sourceContentOriginal)
   const withouDatesInParentheses = removeDatesInParentheses(withouBlankLinesAndMarkdown)
   //console.log(withouDatesInParentheses)
   //remover mardown do texto do wikipedia
   //const withouMarkdown = removeMarkdown(withouBlankLines)
   //ca console.log(withouBlankLines)
   //console.log(withouBlankLinesAndMarkdown)
   content.sourceContentSanitized = withouDatesInParentheses

    function removeBlankLinesAndMarkdown(text) {
       const allLines = text.split('\n')

       const withouBlankLinesAndMarkdown = allLines.filter((line) => {
       	 if (line.trim().length === 0 || line.trim().startsWith('=')) {
       	 	return false
       	 }

       	 return true
       })

      return withouBlankLinesAndMarkdown.join(' ')
      //return withouBlankLines
     //  console.log(allLines)
    }
  }
  
  function removeDatesInParentheses(text){
  	return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')

  }
 function breakContentIntoSentences(content){
 	content.sentences = []
 	
 	const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized)
sentences.forEach((sentence) => {
	content.sentences.push({
     text: sentence,
     keywords: [],
     images: []
	})
 })
}

}
module.exports = robot
