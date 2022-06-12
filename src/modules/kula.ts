import Pole from "./pole"

export default class Kula {
    div: HTMLDivElement
    kolor: string
    parent?: Pole
    constructor(kolor: string) {
        this.div = document.createElement("div")
        this.div.classList.add("kulka")
        this.kolor = kolor
        this.div.classList.add(this.kolor)

    }
    addClass(nazwa: string) {
        this.div.classList.add(nazwa)

    }
    removeClass(nazwa: string) {
        this.div.classList.remove(nazwa)

    }
}