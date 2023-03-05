/* 
To see how looks a response from the api:
https://dictionaryapi.dev/
*/

//words to create some definitions on the home page
const listOfWords = ['aircraft', 'boat', 'hello', 'goodbye', 'card', 'keyboard', 'mouse', 'insect', 'truck',
'car', 'horse', 'cat', 'dog', 'bed']

async function getDictionary(word){
    try{ 
        const responseDictionary = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        const dictionaryArray = await responseDictionary.json()

        if(responseDictionary.ok){
            return dictionaryArray
        } 
        else{
            throw new Error()
        }

    }catch (err){
        return err
    }

}

//API data is named with "API" at the end
async function createSection(userInput){
    const dictionarySection = document.querySelector('.dictionary')
    try{        
        const dictionaryRes = await getDictionary(userInput)

        if(dictionaryRes[0] === undefined){
            throw new Error('Something went wrong, try again later or word does not exist on dictionary data')
        }

        const getWordAPI = capitalizeWord(dictionaryRes[0].word)
        const getMeaningsAPI = dictionaryRes[0].meanings

        const wordSection = document.createElement('div')
        wordSection.classList.add('word-section')
        dictionarySection.append(wordSection)

        const wordTitle = document.createElement('h2')
        wordTitle.classList.add('word')
        wordTitle.innerText = `${getWordAPI}:`
        wordSection.append(wordTitle)

        const meaningsDiv = document.createElement('div')
        meaningsDiv.classList.add('meanings')
        wordSection.append(meaningsDiv)

        for(let i = 0; i < getMeaningsAPI.length; i++){
            let getPartOfSpeechAPI = capitalizeWord(getMeaningsAPI[i].partOfSpeech)
            let getDefinitionsAPI = getMeaningsAPI[i].definitions
            
            const partOfSpeechTitle = document.createElement('h3')
            partOfSpeechTitle.innerText = getPartOfSpeechAPI
            partOfSpeechTitle.classList.add('part-speech')
            meaningsDiv.append(partOfSpeechTitle)
            
            const partOfSpeechOl = document.createElement('ol')
            partOfSpeechOl.classList.add('part-speech__definitions')
            meaningsDiv.append(partOfSpeechOl)

            for(let j = 0; j <= 3; j++){
                //if in the definitions property array doesn't have 3 items
                if(getDefinitionsAPI[j] === undefined){
                    break;
                }

                let getDefiniAPI = getDefinitionsAPI[j].definition
                let getExampleAPI = getDefinitionsAPI[j].example

                const definitionsLi = document.createElement('li')
                definitionsLi.classList.add('definitions-li')
                partOfSpeechOl.append(definitionsLi)

                const definitionsLiDefinition = document.createElement('h4')
                definitionsLiDefinition.classList.add('definitions-li__h4')
                definitionsLiDefinition.innerText = `Definition ${j+1}: ${getDefiniAPI}`
                definitionsLi.append(definitionsLiDefinition)

                if(getExampleAPI !== undefined){
                    const definitionLiExample = document.createElement('p')
                    definitionLiExample.classList.add('definitions-li__example')
                    definitionLiExample.innerText = `"${getExampleAPI}"`
                    definitionsLi.append(definitionLiExample)
                }else{

                }

            }
        }
        
        
    }
    catch(err){
        const errorMessage = document.createElement('h2')
        errorMessage.classList.add('word')
        errorMessage.innerText = err
        dictionarySection.append(errorMessage)
    }
}

//If user is on index.html
if(location.href.split(location.host)[1] === "/index.html") {
    
    for(let i = 0; i <=3; i++){
        let listWords = listOfWords
        console.log(listWords)
        let randomNumber = randomNumberInt(0, listWords.length-1)
        let randomWord = listWords[randomNumber]

        listWords.splice(randomNumber, 1)

        createSection(randomWord)
    }
}

function capitalizeWord(wordToCap){
    return wordToCap.charAt(0).toUpperCase() + wordToCap.slice(1)
}

function randomNumberInt(min, max){
    return Math.floor(Math.random() * (max - min) ) + min;
}


//search word from user input
let stringUrl = document.URL
let url = new URL(stringUrl)
let wordInput = url.searchParams.get("the-word");

//when on index.html wordInput will always be null
if(wordInput !== null){
    createSection(wordInput)
}