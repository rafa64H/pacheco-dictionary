const listOfWords = ['aircraft', 'boat', 'hello', 'bye', 'card', 'keyboard', 'mouse', 'insect', 'truck',
'car', 'horse', 'cat', 'dog', 'bed']

async function getDictionary(word){
    try{ 
        const responseDictionary = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        const dictionaryArray = await responseDictionary.json()

        if(responseDictionary.ok){
            return dictionaryArray
        } 
        else{
            throw new Error('Something went wrong')
        }

    }catch (err){
        console.log(err)
    }

}

async function createSection(userInput){
    try{        
        const dictionaryRes = await getDictionary(userInput)
        const getWordAPI = capitalizeWord(dictionaryRes[0].word)
        const getMeaningsAPI = dictionaryRes[0].meanings
        const dictionarySection = document.querySelector('.dictionary')

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

            for(let j = 0; j < getDefinitionsAPI.length; j++){
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
    catch(e){
        console.log(e)
    }
    finally{
        
    }
}

createSection('Do')

function capitalizeWord(wordToCap){
    return wordToCap.charAt(0).toUpperCase() + wordToCap.slice(1)
}

function randomNumberInt(min, max){
    return Math.floor(Math.random() * (max - min) ) + min;
}