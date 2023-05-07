const body = document.getElementById('body')
const iniciar = document.getElementById('inicio')
const reiniciar = document.getElementById('stop')
let fila = 35
let columna = 70
let juego = {}
let actividad = false


document.addEventListener('DOMContentLoaded',e => {
    tabla()
})

iniciar.addEventListener('click', e => {
    update()
})

reiniciar.addEventListener('click', e => {
    actividad = false
    for (let i = 0; i < fila; i++) {
        for (let j = 0; j < columna; j++) {
            let celda = document.getElementById(`${i+'-'+j}`)
            celda.style.background = ''
        }
        
    }
})


    
    setInterval(() =>{
        if(actividad){
            update()
        }
    },200)
    

const tabla = () => {
    let html = ''
    for (let i = 0; i < fila; i++) {
        html += '<tr>'
        for (let j = 0; j < columna; j++) {    
            html += `<td class='border' id=${i+'-'+j} onmouseup='estado(${i},${j})'>`
            html += '</td>'
        }
        html += '</tr>'
    }
    body.innerHTML = html
    
}

const estado = (x,y) => {
    let celda = document.getElementById(`${x+'-'+y}`)
        if(celda.style.background != 'white'){
            celda.style.background = 'white'
        }else{
            celda.style.background = ''
        }
}

const copia = () => {
    juego = {}
    for (let i = 0; i < fila; i++) {    
        let a = {}
        juego[i] = a
        for (let j = 0; j < columna; j++) {
            let celda = document.getElementById(`${i+'-'+j}`)
            juego[i][j] = celda.style.background == 'white'
        }
    }
    console.log(juego)
}

const vivas = (x, y) => {
    let viva = 0
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            
            if(i == 0 && j == 0)
                continue
            try {
                
                if(juego[x + i][y + j])
                viva++
                
            } catch (error) {}
            if(viva > 3){
                return viva
            }
        }
    }
    return viva
}


const update = () => {
    copia()
    actividad = false
    for (let i = 0; i < fila; i++) {
        for (let j = 0; j < columna; j++) {
            let viva = vivas(i,j)
            let celda = document.getElementById(`${i+'-'+j}`)
               if(juego[i][j]){
                if(viva < 1 || viva > 3)
                celda.style.background = ''
                actividad = true
               }else{
                if(viva == 3)
                celda.style.background = 'white'
                actividad = true
               }
        }
    }
    
}

