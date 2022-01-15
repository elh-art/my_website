const boxesContainer = document.getElementById('boxes')
const btnSG = document.querySelector('.magic')
const btnNP = document.querySelector('.newPic')
// const descriptionEl = document.querySelector('.description')
// const closeEl = document.querySelector('.close')

// closeEl.addEventListener('click', () => {
//   descriptionEl.classList.add('hide')
// })

const unsplashURL = 'https://source.unsplash.com/random/'

btnNP.addEventListener('click', () => {
  // window.location.hash = 'reload'
  window.location.reload(false)
})

// if (window.location.hash == '#reload') {
//   onReload()
// }

// function onReload() {
//   closeEl.click()
// }

function createBoxes() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const box = document.createElement('div')
      box.classList.add('box', 'noDrag')
      box.style.backgroundPosition = `${-j * 125}px ${-i * 125}px`
      box.style.backgroundImage = `url(${unsplashURL}500x500)`
      box.setAttribute('ondragstart', 'drag(event)')
      box.setAttribute('ondragend', 'leave(event)')
      boxesContainer.appendChild(box)
    }
  }
}

createBoxes()

const tiles = document.querySelectorAll('.box')

btnSG.addEventListener('click', () => {
  // onReload()
  removeEmpty()

  boxesContainer.classList.add('big')
  boxesContainer.lastChild.classList.add('empty')

  // SHUFFLE DECK
  const deck = Array.from(tiles)

  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i)
    let temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp
  }

  deck.forEach((elm) => {
    boxesContainer.appendChild(elm)
  })

  gLogic()
})

function removeEmpty() {
  if (tiles) {
    tiles.forEach((elm) => {
      elm.classList.remove('empty')
    })
  }
}

// ONDRAGOVER
function allowDrop(ev) {
  ev.preventDefault()
}

// ONDRAGSTART
function drag(ev) {
  ev.dataTransfer.setData('text', ev.target.style.backgroundPosition)

  ev.currentTarget.classList.toggle('empty')
}

// ONDROP
function drop(ev) {
  ev.preventDefault()

  const src = ev.dataTransfer.getData('text')

  ev.currentTarget.setAttribute(
    'style',
    `background-position: ${src}; background-image: url("https://source.unsplash.com/random/500x500");`
  )

  ev.currentTarget.classList.toggle('empty')

  cleanUp()
  gLogic()
}

// ONDRAGEND
function leave(ev) {
  const emp = ev.target.classList.contains('empty')
  const drg = ev.target.getAttribute('draggable')

  // IF CONTAINS 'EMPTY' & DRAGGABLE TRUE REMOVE EMPTY
  if (emp.toString() == drg) {
    ev.currentTarget.classList.remove('empty')
  }
}

function cleanUp() {
  tiles.forEach((elm) => {
    elm.classList.add('noDrag')
    elm.removeAttribute('ondragover')
    elm.removeAttribute('ondrop')
    elm.removeAttribute('draggable')
  })
}

// GAME-LOGIC
function gLogic() {
  const tileList = document.querySelectorAll('.box')
  const decks = Array.from(tileList)

  if (decks[0].classList.contains('empty')) {
    decks[0].setAttribute('ondragover', 'allowDrop(event)')
    decks[0].setAttribute('ondrop', 'drop(event)')
    decks[1].classList.remove('noDrag')
    decks[4].classList.remove('noDrag')
    decks[1].setAttribute('draggable', 'true')
    decks[4].setAttribute('draggable', 'true')
  }

  if (decks[1].classList.contains('empty')) {
    decks[1].setAttribute('ondragover', 'allowDrop(event)')
    decks[1].setAttribute('ondrop', 'drop(event)')
    decks[0].classList.remove('noDrag')
    decks[2].classList.remove('noDrag')
    decks[5].classList.remove('noDrag')
    decks[0].setAttribute('draggable', 'true')
    decks[2].setAttribute('draggable', 'true')
    decks[5].setAttribute('draggable', 'true')
  }

  if (decks[2].classList.contains('empty')) {
    decks[2].setAttribute('ondragover', 'allowDrop(event)')
    decks[2].setAttribute('ondrop', 'drop(event)')
    decks[1].classList.remove('noDrag')
    decks[3].classList.remove('noDrag')
    decks[6].classList.remove('noDrag')
    decks[1].setAttribute('draggable', 'true')
    decks[3].setAttribute('draggable', 'true')
    decks[6].setAttribute('draggable', 'true')
  }

  if (decks[3].classList.contains('empty')) {
    decks[3].setAttribute('ondragover', 'allowDrop(event)')
    decks[3].setAttribute('ondrop', 'drop(event)')
    decks[2].classList.remove('noDrag')
    decks[7].classList.remove('noDrag')
    decks[2].setAttribute('draggable', 'true')
    decks[7].setAttribute('draggable', 'true')
  }

  if (decks[4].classList.contains('empty')) {
    decks[4].setAttribute('ondragover', 'allowDrop(event)')
    decks[4].setAttribute('ondrop', 'drop(event)')
    decks[0].classList.remove('noDrag')
    decks[5].classList.remove('noDrag')
    decks[8].classList.remove('noDrag')
    decks[0].setAttribute('draggable', 'true')
    decks[5].setAttribute('draggable', 'true')
    decks[8].setAttribute('draggable', 'true')
  }

  if (decks[5].classList.contains('empty')) {
    decks[5].setAttribute('ondragover', 'allowDrop(event)')
    decks[5].setAttribute('ondrop', 'drop(event)')
    decks[1].classList.remove('noDrag')
    decks[4].classList.remove('noDrag')
    decks[6].classList.remove('noDrag')
    decks[9].classList.remove('noDrag')
    decks[1].setAttribute('draggable', 'true')
    decks[4].setAttribute('draggable', 'true')
    decks[6].setAttribute('draggable', 'true')
    decks[9].setAttribute('draggable', 'true')
  }

  if (decks[6].classList.contains('empty')) {
    decks[6].setAttribute('ondragover', 'allowDrop(event)')
    decks[6].setAttribute('ondrop', 'drop(event)')
    decks[2].classList.remove('noDrag')
    decks[5].classList.remove('noDrag')
    decks[7].classList.remove('noDrag')
    decks[10].classList.remove('noDrag')
    decks[2].setAttribute('draggable', 'true')
    decks[5].setAttribute('draggable', 'true')
    decks[7].setAttribute('draggable', 'true')
    decks[10].setAttribute('draggable', 'true')
  }

  if (decks[7].classList.contains('empty')) {
    decks[7].setAttribute('ondragover', 'allowDrop(event)')
    decks[7].setAttribute('ondrop', 'drop(event)')
    decks[3].classList.remove('noDrag')
    decks[6].classList.remove('noDrag')
    decks[11].classList.remove('noDrag')
    decks[3].setAttribute('draggable', 'true')
    decks[6].setAttribute('draggable', 'true')
    decks[11].setAttribute('draggable', 'true')
  }

  if (decks[8].classList.contains('empty')) {
    decks[8].setAttribute('ondragover', 'allowDrop(event)')
    decks[8].setAttribute('ondrop', 'drop(event)')
    decks[4].classList.remove('noDrag')
    decks[9].classList.remove('noDrag')
    decks[12].classList.remove('noDrag')
    decks[4].setAttribute('draggable', 'true')
    decks[9].setAttribute('draggable', 'true')
    decks[12].setAttribute('draggable', 'true')
  }

  if (decks[9].classList.contains('empty')) {
    decks[9].setAttribute('ondragover', 'allowDrop(event)')
    decks[9].setAttribute('ondrop', 'drop(event)')
    decks[5].classList.remove('noDrag')
    decks[8].classList.remove('noDrag')
    decks[10].classList.remove('noDrag')
    decks[13].classList.remove('noDrag')
    decks[5].setAttribute('draggable', 'true')
    decks[8].setAttribute('draggable', 'true')
    decks[10].setAttribute('draggable', 'true')
    decks[13].setAttribute('draggable', 'true')
  }

  if (decks[10].classList.contains('empty')) {
    decks[10].setAttribute('ondragover', 'allowDrop(event)')
    decks[10].setAttribute('ondrop', 'drop(event)')
    decks[6].classList.remove('noDrag')
    decks[9].classList.remove('noDrag')
    decks[11].classList.remove('noDrag')
    decks[14].classList.remove('noDrag')
    decks[6].setAttribute('draggable', 'true')
    decks[9].setAttribute('draggable', 'true')
    decks[11].setAttribute('draggable', 'true')
    decks[14].setAttribute('draggable', 'true')
  }

  if (decks[11].classList.contains('empty')) {
    decks[11].setAttribute('ondragover', 'allowDrop(event)')
    decks[11].setAttribute('ondrop', 'drop(event)')
    decks[7].classList.remove('noDrag')
    decks[10].classList.remove('noDrag')
    decks[15].classList.remove('noDrag')
    decks[7].setAttribute('draggable', 'true')
    decks[10].setAttribute('draggable', 'true')
    decks[15].setAttribute('draggable', 'true')
  }

  if (decks[12].classList.contains('empty')) {
    decks[12].setAttribute('ondragover', 'allowDrop(event)')
    decks[12].setAttribute('ondrop', 'drop(event)')
    decks[8].classList.remove('noDrag')
    decks[13].classList.remove('noDrag')
    decks[8].setAttribute('draggable', 'true')
    decks[13].setAttribute('draggable', 'true')
  }

  if (decks[13].classList.contains('empty')) {
    decks[13].setAttribute('ondragover', 'allowDrop(event)')
    decks[13].setAttribute('ondrop', 'drop(event)')
    decks[9].classList.remove('noDrag')
    decks[12].classList.remove('noDrag')
    decks[14].classList.remove('noDrag')
    decks[9].setAttribute('draggable', 'true')
    decks[12].setAttribute('draggable', 'true')
    decks[14].setAttribute('draggable', 'true')
  }

  if (decks[14].classList.contains('empty')) {
    decks[14].setAttribute('ondragover', 'allowDrop(event)')
    decks[14].setAttribute('ondrop', 'drop(event)')
    decks[10].classList.remove('noDrag')
    decks[13].classList.remove('noDrag')
    decks[15].classList.remove('noDrag')
    decks[10].setAttribute('draggable', 'true')
    decks[13].setAttribute('draggable', 'true')
    decks[15].setAttribute('draggable', 'true')
  }

  if (decks[15].classList.contains('empty')) {
    decks[15].setAttribute('ondragover', 'allowDrop(event)')
    decks[15].setAttribute('ondrop', 'drop(event)')
    decks[11].classList.remove('noDrag')
    decks[14].classList.remove('noDrag')
    decks[11].setAttribute('draggable', 'true')
    decks[14].setAttribute('draggable', 'true')
  }
}

// WIN CONDITION LOGIC
