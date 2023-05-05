const frm = document.querySelector("form")
const answerList = document.querySelector("p")
const answerHorse = document.querySelector("#outHorse")

// Horses Names
const arrHorses = ["Marujo", "Jabuti", "Belga", "Spirit", "Veiga", "Abel"]

// Storage Bets

const arrBets = []


frm.addEventListener("submit", (e) => {
  e.preventDefault()

  const horse = Number(frm.inputHorse.value)
  const value = Number(frm.inputBet.value)


  arrBets.push({ horse, value })

  let lista =
    `Apostas Realizadas
  ${"-".repeat(25)}
  `

  for (const bet of arrBets) {
    lista += `Nº ${bet.horse}. ${getHorse(bet.horse)}`
    lista += ` - R$: ${bet.value.toFixed(2)}\n`
  }

  answerList.innerText = lista

  frm.reset()
  frm.inputHorse.focus()
})

const getHorse = (num) => {
  const horsePosition = num - 1
  return arrHorses[horsePosition]
}

frm.inputHorse.addEventListener("blur", () => {
  if (frm.inputHorse == "") {
    answerHorse.innerText = ""
    return
  }

  const horseNum = Number(frm.inputHorse.value)
  if (!validateHorse(horseNum)) {
    frm.inputHorse.value = ""
    return
  }

  const name = getHorse(horseNum)
  const countNum = countBets(horseNum)
  const total = totalBets(horseNum)

  answerHorse.innerText = `${name} (Apostas: ${countNum} - R$: ${total.toFixed(2)})`
})

const validateHorse = (num) => {
  return num >= 1 && num <= arrHorses.length
}

const countBets = (num) => {
  let counter = 0
  for (const bet of arrBets) {
    if (bet.horse == num) {
      counter++
    }
  }
  return counter
}

const totalBets = (num) => {
  let total = 0
  for (const bet of arrBets) {
    if (bet.horse == num) {
      total += bet.value
    }
  }
  return total
}

frm.btResumo.addEventListener("click", () => {
  const sumBets = [0, 0, 0, 0, 0, 0]

  for (bet of arrBets) {
    sumBets[bet.horse - 1] += bet.value
  }

  let answer = `Nº Cavalo  -  R$ Apostado\n${"-".repeat(35)}\n`
  arrHorses.forEach((horse, i) => {
    answer += `${i + 1}. ${horse.padEnd(20, ".")}`
    answer += `${sumBets[i].toFixed(2).padStart(20, ".")}\n`
  })

  answerList.innerText = answer
})

frm.btGanhador.addEventListener("click", () => {
  const winnerNum = Math.floor(Math.random() * (arrHorses.length) + 1)
  const winner = arrHorses[winnerNum - 1]

  const total = arrBets.reduce((acc, bet) => acc + bet.value, 0)

  let summary = `Resultado Final do Páreo\n ${"-".repeat(30)}\n`

  summary += `Nº Total de Apostas: ${arrBets.length}\n`
  summary += `Total Geral R$: ${total.toFixed(2)}\n`
  summary += `Ganhador Nº ${winnerNum} - ${winner}\n`
  summary += `Nº de Apostas: ${countBets(winnerNum)}\n`
  summary += `Total Apostado R$: ${totalBets(winnerNum).toFixed(2)}`

  answerList.innerText = summary

  frm.btApostar.disabled = true
  frm.btGanhador.disabled = true
  frm.btNovo.focus()
})

frm.btNovo.addEventListener("click", () => {
  window.location.reload()
})