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

let spells = []
const $ = document.querySelector.bind(document)
$('#submit').addEventListener('click',getSpells)

function getSpells() {

    let search = $('#search').value.toLowerCase()

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

