import Board from './board'
import Pole from "./pole"

export default class PathFinding {
    sprawdzone: Pole[]
    doSprawdzenia: Pole[]
    constructor() {

        this.doSprawdzenia = []
        this.sprawdzone = []

    }
    trasa(list: Pole[], start: Pole, end: Pole) {
        let wszystkie = list

        this.doSprawdzenia = [start]
        this.sprawdzone = []
        while (this.doSprawdzenia.length > 0) {

            let sortedOne = this.doSprawdzenia.sort((a, b) => {
                return a.f_cost - b.f_cost
            })
            let filtered = sortedOne.filter((el, i, a) => {
                if (el.f_cost == a[0].f_cost) {
                    return el
                }
            })
            let sortedTwo = filtered.sort((a, b) => {
                return a.h_cost - b.h_cost
            })
            let current = sortedTwo[0]
            this.doSprawdzenia.splice(this.doSprawdzenia.indexOf(current), 1)
            this.sprawdzone.push(current)
            if (current == end) {
                return this.znalezione(current)
            } else {
                let index = current.x * 9 + current.y

                let somsiedzi = []

                if (index - 9 >= 0) { somsiedzi.push(wszystkie[index - 9]) }
                if (index + 9 < 81) { somsiedzi.push(wszystkie[index + 9]) }
                if ((index - 1) % 9 != 8 && index - 1 >= 0) { somsiedzi.push(wszystkie[index - 1]) }
                if ((index + 1) % 9 != 0 && index + 1 < 81) { somsiedzi.push(wszystkie[index + 1]) }

                somsiedzi.forEach(el => {
                    if (el.cool == true && this.sprawdzone.indexOf(el) == -1) {
                        let n_cost = el.fieldToField(end) + current.g_cost + 1
                        if (n_cost < el.f_cost || el.f_cost == 0 || this.doSprawdzenia.indexOf(el) == -1) {
                            el.setCost(current.g_cost + 1, el.fieldToField(end))
                            el.parent = current
                            if (this.doSprawdzenia.indexOf(el) == -1) {
                                this.doSprawdzenia.push(el)
                            }
                        }
                    }
                });
            }
        }
    }
    znalezione(pole: Pole): Pole[] {
        let tab: Pole[] = []
        while (pole.parent) {
            tab.push(pole)
            pole = pole.parent
        }
        tab.push(pole)
        return tab
    }
}