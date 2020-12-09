window.addEventListener('DOMContentLoaded', (event) => {

    // replace print button with toggle notes button
    let printButton = document.getElementById('control-print')
    let noteButton = printButton.cloneNode(true)
    printButton.parentNode.replaceChild(noteButton, printButton)
    console.log('test')
    noteButton.addEventListener('click', (e) => {

        const measureGroups = document.querySelectorAll('svg.n')
        const measures = document.querySelectorAll('.m')
        const intervals = document.querySelectorAll('.v')

        intervals.forEach(e => {
            let interval = e.textContent
            // get tab as int and y pos
            // checking for scratch notes
            if (interval != 'X') {
                let noteInterval = parseInt(interval)
                let notePos = e.attributes.y.nodeValue
                // const openNote = 'E'
                e.textContent = convertToNote(noteInterval, notePos)
            }
        })
    })

    function convertToNote(interval, y) {
        const keySignature = document.querySelectorAll('.C8nsu') //not really the correct term
        const tuningSystem = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
        const tuningSystemLength = tuningSystem.length
        let keySignatureVal = []
        keySignature.forEach(e => {
            // add open string note and y val to array
            keySignatureVal.push([e.textContent.toUpperCase(), e.attributes.y.nodeValue])
        })
        // find y val associated with open note
        const openNote = keySignatureVal.find(e => e.includes(y))[0]
        const tone = tuningSystem.indexOf(openNote)
        const startTone = tone + interval
        //console.log('note val ' + noteVal + ' tone '+ tone +' start Tone '+ startTone)
        if (!(startTone >= tuningSystemLength)) {
            return tuningSystem[startTone]
            //console.log('in bounds' + tuningSystem[startTone])
            //if(tuningSystem[startTone] == undefined) console.log('in bounds undefined')
        } else {
            const differenceTone = (startTone - tuningSystemLength) >= tuningSystemLength ? (startTone - tuningSystemLength * 2) : startTone - tuningSystemLength
            return tuningSystem[differenceTone]
            // console.log('difference tone ' + differenceTone)
            //if(differenceTone == undefined) console.log('difference tone undefined')
            // console.log('out of bounds ' + tuningSystem[differenceTone])
            //if(tuningSystem[differenceTone] == undefined) console.log('out of bounds undefined')
        }

        //convertToNote(noteInterval, notePos)
    }
})