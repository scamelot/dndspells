apiROOT = `https://www.dnd5eapi.co`
localStorage.clear()

class Spell {
    constructor(data) {
        this.title = data.name
        this.id = data.name.split(' ').join('')
        this.url = data.url
        this.level = data.level
        this.range = data.range
        this.school = data.school
        this.desc = ''
    }
    updateView() {
        if (!localStorage[`${this.title}`]) {
        fetch(`${apiROOT}${this.url}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            this.desc = data.desc.join('\n')
            localStorage.setItem(`${this.title}`, JSON.stringify(data))
            $('#spells').innerHTML += `<h3 class="spell my-5">${this.title}</h3><p id="${this.id}">${this.desc}</p>`
            console.log(this.desc)
        })
    }
    }
}

class PlayerClass {
    constructor(data) {
        this.name = data.name
        this.url = data.url
        this.spells = []
        //fetch the url and get equipment, proficiencies and more!
    }

}

let classes = []
let spells = []
// UI control
const $ = document.querySelector.bind(document)
$('#class-select').addEventListener('change',getSpells)

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

//when changed
function getSpells() {
    spells = []
    let search = $('#class-select').value.toLowerCase()
    $('#spells').innerHTML = '<p></p>'

    fetch(`${apiROOT}/api/classes/${search}/spells`)
    .then(response => response.json())
    .then(data => {
        if(data) {
            data.results.forEach(spellData => {
                spells.push(new Spell(spellData))
            })
        }


        //build list
            if (spells) {
            spells.forEach(spell => {
                spell.updateView()
                console.log(spell.desc)
            })
            classes[`${search}`].spells = spells
        }
        })
    //reset
    
}

