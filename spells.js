apiROOT = `https://www.dnd5eapi.co`

class Spell {
    constructor(data) {
        this.title = data.name
        this.url = data.url
        fetch(`${apiROOT}${this.url}`)
        .then(response => response.json())
        .then(data => {
            this.desc = data.desc.join('\n')
        })
    }
    updateView() {
        console.log(this.desc)
        return `<h3>${this.title}</h3><p>${this.desc}</p>`
    }
}

class PlayerClass {
    constructor(data) {
        this.name = data.name
        this.url = data.url
        //fetch the url and get equipment, proficiencies and more!
    }
}

let classes = []
let spells = []
const $ = document.querySelector.bind(document)
$('#submit').addEventListener('click',getSpells)

//get list of classes
fetch(`${apiROOT}/api/classes`)
.then(response => response.json())
.then(data => {
    if (data) {
        data.results.forEach(playerClass => {
            classes.push(new PlayerClass(playerClass))
        })
    }
    classes.forEach(pc => {
        $('#class-select').innerHTML += `<option value=${pc.name}>${pc.name}</option>`
    })
})


function getSpells() {

    let search = $('#class-select').value.toLowerCase()

    fetch(`${apiROOT}/api/classes/${search}/spells`)
    .then(response => response.json())
    .then(data => {
        if(data) {
            data.results.forEach(spellData => {
                spells.push(new Spell(spellData))
            })
        }
    })
    let spellList = ''
        if (spells) {
        spells.forEach(spell => {
            spellList += spell.updateView()
        })
        $('#spells').innerHTML = spellList
    }
}

