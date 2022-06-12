import Kula from "./kula"



export default class Pole {
    div: HTMLDivElement
    readonly x: number
    readonly y: number
    f_cost: number   //suma
    g_cost: number   //od pola do poczatku (ile juz pokonano drogi)
    h_cost: number   //od danego pola do konca 
    parent?: Pole
    child?: Kula
    cool: boolean
    constructor(x: number, y: number) {

        this.div = document.createElement("div")
        this.div.classList.add("divek")
        this.x = x
        this.y = y
        this.f_cost = 0
        this.g_cost = 0
        this.h_cost = 0
        this.cool = true

    }
    setCost(g_cost: number, h_cost: number) {
        this.g_cost = g_cost
        this.h_cost = h_cost
        this.f_cost = g_cost + h_cost
    }
    fieldToField(pole: Pole): number {
        let distance = Math.abs(pole.x - this.x) + Math.abs(pole.y - this.y)
        return distance
    }
    clear() {
        this.f_cost = 0
        this.g_cost = 0
        this.h_cost = 0
        this.parent = undefined
        this.removeClass("path")

    }
    addClass(nazwa: string) {
        this.div.classList.add(nazwa)

    }
    removeClass(nazwa: string) {
        this.div.classList.remove(nazwa)

    }
    addBall(kula: Kula) {
        this.div.appendChild(kula.div)
        this.child = kula
        this.cool = false
        kula.parent = this
    }
    removeBall() {
        this.div.removeChild(this.child.div)
        let lostChild = this.child
        this.child.parent = undefined
        this.child = undefined
        this.cool = true
        return lostChild
    }
}

