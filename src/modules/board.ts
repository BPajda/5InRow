import Pole from "./pole"
import PathFinding from "./pathFinding"
import Kula from "./kula"
import { config } from "./config"

export interface boardface {
    /** zmienna na borda */
    el: HTMLElement
    /** zmienna na kule */
    pre: HTMLElement
    /** zmienna na wynik */
    wyn: HTMLElement
    /** zmienna na ekran koncowy */
    end: HTMLElement
    /** zmienna na tekst ekranu koncowego */
    endwynik: HTMLElement
    /** zmienna na przycisk resetu */
    reset: HTMLElement
    /** zmienna na tabele pól */
    fieldList: listaface
    /** zmienna na pole startowe */
    startField?: Pole
    /** zmienna na pole koncowe */
    endField?: Pole
    /** zmienna na pathfinda */
    pathFind: PathFinding
    /** zmienna na kolory */
    kolory: string[]
    /** zmienna na kolory kolejnych kul */
    prievKol: string[]
    /** zmienna na path */
    path: Pole[]
    /** zmienna na wynik */
    wynik: number
    /** zmienna czy mozna ruch wykonac */
    moveable: boolean
    boardCreate(): void
    playBalls(): void
    pathFinding(): void
    moveBall(): boolean
    checkDoAround(pole: Pole): boolean
    LookingALL(): boolean
    dodawaieDoBicia(lista: Pole[][]): Pole[]
}
export interface listaface extends Array<Pole> {
    [index: number]: Pole
}


@timer
export default class Board implements boardface {
    el: HTMLElement
    pre: HTMLElement
    wyn: HTMLElement
    end: HTMLElement
    endwynik: HTMLElement
    reset: HTMLElement
    fieldList: listaface
    startField?: Pole
    endField?: Pole
    pathFind: PathFinding
    kolory: string[]
    prievKol: string[]
    path: Pole[]
    wynik: number
    moveable: boolean
    czas?: number
    constructor() {
        this.el = document.getElementById("board")
        this.pre = document.getElementById("priev")
        this.wyn = document.getElementById("wynik")
        this.wyn.innerHTML = "0"
        this.end = document.getElementById("end")
        this.endwynik = document.getElementById("endwynik")
        this.reset = document.getElementById("reset")
        this.fieldList = []
        this.pathFind = new PathFinding()
        this.path = []
        this.moveable = true
        this.boardCreate()
        this.wynik = 0
        this.kolory = config.kolory
        this.prievKol = []
        this.prievNext()
    }
    /** metoda na tworzenie borda */
    boardCreate() {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {

                let pole = new Pole(x, y)
                this.fieldList.push(pole)
                pole.div.onclick = () => {
                    if (this.moveable == true) {


                        if (this.startField == undefined) {
                            if (pole.cool == false) {
                                let check = this.checkDoAround(pole)
                                if (check) {
                                    this.startField = pole
                                    this.startField.child.addClass("biggerKulka")

                                }

                            }


                        } else {
                            if (pole != this.startField) {

                                if (this.endField) {

                                    if (this.endField.cool == true) {


                                        let move = this.moveBall()
                                        if (move == true) {
                                            this.moveable = false
                                            let zbite = this.LookingALL()
                                            if (zbite == false) {
                                                this.prievNext()
                                                this.LookingALL()
                                                let luz = []

                                                for (let i = 0; i < this.fieldList.length; i++) {
                                                    if (this.fieldList[i].cool == true) {
                                                        luz.push(this.fieldList[i])
                                                    }

                                                }
                                                if (luz.length < 3) {
                                                    this.endGame()
                                                }
                                            }
                                            this.wyn.innerHTML = this.wynik.toString()


                                            this.startField = undefined
                                            this.endField = undefined
                                            setTimeout(() => {
                                                this.fieldList.forEach(el => {
                                                    el.clear()
                                                });
                                                this.moveable = true
                                            }, this.czas ? this.czas : 1000)

                                        }

                                    } else {
                                        let check = this.checkDoAround(this.endField)
                                        this.startField.child.removeClass("biggerKulka")
                                        if (check) {
                                            this.startField = this.endField
                                            this.startField.child.addClass("biggerKulka")

                                        }

                                        this.fieldList.forEach(el => {
                                            el.clear()
                                        });
                                    }
                                } else {
                                    if (pole.cool == false) {
                                        let check = this.checkDoAround(pole)
                                        this.startField.child.removeClass("biggerKulka")
                                        if (check) {
                                            this.startField = pole
                                            this.startField.child.addClass("biggerKulka")

                                        }
                                    } else {
                                        this.startField.child.removeClass("biggerKulka")
                                        this.startField = undefined
                                    }
                                    this.endField = undefined
                                    this.fieldList.forEach(el => {
                                        el.clear()
                                    });

                                }
                            } else {
                                this.startField.child.removeClass("biggerKulka")
                                this.startField = undefined
                                this.endField = undefined
                                this.fieldList.forEach(el => {
                                    el.clear()
                                });



                            }

                        }
                    }
                }
                pole.div.onmouseover = () => {
                    if (this.moveable == true) {

                        this.path = []
                        if (pole.cool == true) {
                            if (this.startField && pole != this.startField) {

                                this.endField = pole
                                this.fieldList.forEach(el => {
                                    el.clear()
                                });
                                this.pathFinding()
                            }

                        } else {
                            this.fieldList.forEach(el => {
                                el.clear()
                            });
                            this.endField = undefined
                        }
                    }
                }
                this.el.appendChild(pole.div)

            }
        }
    }
    /** metoda na tworzenie kul kolejnych */
    private priev() {

        this.pre.innerHTML = ""
        for (let i = 0; i < 3; i++) {
            let kula = new Kula(this.prievKol[i])
            this.pre.appendChild(kula.div)

        }

    }
    /** metoda na przenoszenie kul na borda */
    private prievNext() {
        if (this.prievKol.length == 0) {
            for (let i = 0; i < 3; i++) {
                let iterator = Math.floor(Math.random() * this.kolory.length)
                let kolor = this.kolory[iterator]
                this.prievKol.push(kolor)
            }

        }
        this.playBalls()
        this.prievKol = []
        for (let i = 0; i < 3; i++) {
            let iterator = Math.floor(Math.random() * this.kolory.length)
            let kolor = this.kolory[iterator]
            this.prievKol.push(kolor)
        }
        this.priev()
    }
    /** metoda na bawienie sie kulkami */
    playBalls() {
        let luz = []

        for (let i = 0; i < this.fieldList.length; i++) {
            if (this.fieldList[i].cool == true) {
                luz.push(this.fieldList[i])
            }

        }
        if (luz.length < 3) {
            this.endGame()
        }
        let chosens = []
        for (let i = 0; i < 3; i++) {
            let iterator = Math.floor(Math.random() * luz.length)
            chosens.push(luz[iterator])
            luz.splice(iterator, 1)
        }
        for (let i = 0; i < chosens.length; i++) {
            chosens[i].addBall(new Kula(this.prievKol[i]))

        }

    }
    @ending
    /** 
     * metoda konca gry 
     * @param bool zmienna true false
     */
    private endGame(bool: boolean = false) {
        if (bool == true) {
            this.end.style.backgroundColor = "pink"
        }
        this.end.style.display = 'flex'
        this.endwynik.innerHTML = "Twoj wynik to: " + this.wynik
        let button = document.createElement("button")
        button.onclick = () => {
            this.el.innerHTML = ""
            this.pre.innerHTML = ""
            this.wyn.innerHTML = "0"
            this.wynik = 0
            this.fieldList = []
            this.boardCreate()
            this.prievNext()
            this.end.style.display = 'none'
        }
        button.innerHTML = "reset"
        this.reset.innerHTML = ""
        this.reset.appendChild(button)

    }
    /** metoda na szukanie powolania zyciowego */
    pathFinding() {
        if (this.startField && this.endField) {
            this.path = this.pathFind.trasa(this.fieldList, this.startField, this.endField)
            if (this.path) {
                this.path.forEach(el => {
                    el.addClass("path")
                });

            }


        }
    }
    /** 
     * metoda na poruszanie swoimi kulami
     * @returns zwraca true false
     */
    moveBall(): boolean {
        if (this.startField && this.endField) {
            if (this.path && this.path.length != 0) {
                this.startField.child.removeClass("biggerKulka")
                let zez = this.startField.removeBall()
                this.endField.addBall(zez)


                return true
            }

        }


        return false
    }
    /** 
     * metoda na szukanie obcych kul w okolicy
     * @param pole przyjmuje pole do szukania
     * @returns zwraca true false
     */
    checkDoAround(pole: Pole): boolean {
        if (pole) {

            let index = pole.x * 9 + pole.y

            let somsiedzi = []

            if (index - 9 >= 0) { somsiedzi.push(this.fieldList[index - 9]) }
            if (index + 9 < 81) { somsiedzi.push(this.fieldList[index + 9]) }
            if ((index - 1) % 9 != 8 && index - 1 >= 0) { somsiedzi.push(this.fieldList[index - 1]) }
            if ((index + 1) % 9 != 0 && index + 1 < 81) { somsiedzi.push(this.fieldList[index + 1]) }

            let bullBenek: boolean = false
            somsiedzi.forEach(el => {
                if (el.cool == true) {
                    bullBenek = true
                }
            })
            return bullBenek
        } else {
            return false
        }
    }
    /** 
     * metoda szukajaca kolejnych kul w lini w ramach przygotowania do zbijania
     * @returns zwraca true false
     */
    LookingALL(): boolean {
        let udane: boolean
        let bicie = []
        let pion = []
        let poziom = []
        let skoslewo = []
        let skosprawo = []
        let len = 9
        for (let z = 0; z < 2 * len - 1; z++) {
            let x = Math.max(0, -(len - 1) + z)
            let y = Math.max(0, (len - 1) - z)
            skoslewo[z] = []
            while (y < len && x < len) {
                let index = y * len + x
                skoslewo[z].push(this.fieldList[index])
                x++
                y++
            }
        }
        for (let z = 0; z < 2 * len - 1; z++) {
            let x = len - 1 - Math.max(0, -(len - 1) + z)
            let y = Math.max(0, (len - 1) - z)
            skosprawo[z] = []
            while (y < len && x >= 0) {
                let index = y * len + x
                skosprawo[z].push(this.fieldList[index])
                x--
                y++
            }
        }
        for (let i = 0; i < 9; i++) {
            poziom[i] = []
            for (let z = 0; z < 9; z++) {
                let index = i * 9 + z
                poziom[i].push(this.fieldList[index])
            }

        }
        for (let i = 0; i < 9; i++) {
            pion[i] = []
            for (let z = 0; z < 9; z++) {
                let index = z * 9 + i
                pion[i].push(this.fieldList[index])
            }

        }
        let pionTab = this.dodawaieDoBicia(pion)
        bicie.push(...pionTab)
        let poziomTab = this.dodawaieDoBicia(poziom)
        bicie.push(...poziomTab)
        let skosLTab = this.dodawaieDoBicia(skoslewo)
        bicie.push(...skosLTab)
        let skosPTab = this.dodawaieDoBicia(skosprawo)
        bicie.push(...skosPTab)

        bicie = bicie.filter((thing, index, self) =>
            index === self.findIndex((t) => (
                t === thing
            ))
        )
        udane = false
        for (let i = 0; i < bicie.length; i++) {
            bicie[i].removeBall()
            udane = true

        }
        this.wynik += bicie.length
        return udane
    }
    /** 
     * metoda na ustawianie kul do odstrzału 
     * @param lista lista pól
     * @returns zwraca tablice pól
     */
    dodawaieDoBicia(lista: Pole[][]): Pole[] {
        let ilo = config.ile
        let dozbicia = []
        for (let j = 0; j < lista.length; j++) {
            let tab = []
            let kol = ""
            for (let k = 0; k < lista[j].length; k++) {
                let pole: Pole = lista[j][k]
                if (pole.cool == true) {
                    if (tab.length >= ilo) {
                        dozbicia.push(...tab)
                    }
                    tab = []
                    kol = ""

                } else {
                    if (pole.child.kolor != kol) {
                        if (tab.length >= ilo) {
                            dozbicia.push(...tab)
                            tab = []
                            kol = pole.child.kolor
                        } else {
                            tab = []
                            kol = pole.child.kolor
                        }
                        if (kol == "") {
                            kol = pole.child.kolor
                        }
                    }
                    if (pole.child.kolor == kol) {
                        tab.push(pole)
                    }
                }
                if (tab.length >= ilo) {
                    dozbicia.push(...tab)
                }

            }

        }
        dozbicia = dozbicia.filter((thing, index, self) =>
            index === self.findIndex((t) => (
                t === thing
            ))
        )
        return dozbicia

    }
}


function timer(target: Function) {
    const original = target;

    const construct = (constructor: Function, args: any[]) => {
        const c: any = function () {
            this.czas = 1000;
            return constructor.apply(this, args);
        }

        c.prototype = constructor.prototype;
        c.prototype.toString = function () {
        }

        return new c();
    }


    const newConstructor: any = function (...args: any[]) {
        return construct(original, args);
    }

    newConstructor.prototype = original.prototype;

    return newConstructor;
}
function ending(target: Object, key: String, descriptor: PropertyDescriptor): PropertyDescriptor {

    const originalValue = descriptor.value;

    descriptor.value = function (...args: any[]) {
        args[0] = true
        const result = originalValue.apply(this, args);
        return result;
    }

    return descriptor;
}