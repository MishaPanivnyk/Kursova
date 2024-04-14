class MultiMap {
    constructor() {
        this.map = new Map();
    }

    // Додати елемент з наданим ключем у словник
    include(key, value) {
        if (!this.map.has(key)) {
            this.map.set(key, []);
        }
        this.map.get(key).push(value);
    }

    // Вилучити всі елементи з наданим ключем із словника і повернути кількість вилучених елементів
    erase(key) {
        if (!this.map.has(key)) {
            return 0;
        }
        const count = this.map.get(key).length;
        this.map.delete(key);
        return count;
    }

    // Знайти наступне значення, яке відповідає наданому ключу
    find(key) {
        return this.map.get(key);
    }

    // Порівняння
    equals(otherMap) {
        if (this.map.size !== otherMap.map.size) {
            return false;
        }
        for (const [key, value] of this.map.entries()) {
            if (!otherMap.map.has(key) || !value.every((v, i) => v === otherMap.map.get(key)[i])) {
                return false;
            }
        }
        return true;
    }

    // Кількість елементів
    size() {
        let count = 0;
        for (const values of this.map.values()) {
            count += values.length;
        }
        return count;
    }

    // Повертає значення true, якщо словник порожній
    empty() {
        return this.map.size === 0;
    }

    // Обмін значеннями з іншим словником
    swap(otherMap) {
        const tempMap = new Map(this.map);
        this.map = new Map(otherMap.map);
        otherMap.map = tempMap;
    }

    // Змінювання елементів згідно з наданою процедурою
    for_each(callback) {
        for (const [key, values] of this.map.entries()) {
            this.map.set(key, values.map(callback));
        }
    }
}

// Приклад використання та тестування
const multiMap = new MultiMap();
multiMap.include('a', 1);
multiMap.include('b', 2);
multiMap.include('a', 3);
console.log(multiMap.find('a')); 
console.log(multiMap.size()); 
console.log(multiMap.empty()); 

const otherMap = new MultiMap();
otherMap.include('a', 1);
otherMap.include('b', 2);
otherMap.include('a', 3);
console.log(multiMap.equals(otherMap)); 

multiMap.erase('a');
console.log(multiMap.find('a')); 
console.log(multiMap.size()); 
