// Type Guard в ts позволяет нам избежать ошибок, в случаях когда типа переменной неизвестен и помогает нам
// 'сузить' значение до чего-то конкретного

// Пример функции, которая добавляет отступ слева и возвращает строку. Отступ может быть строкой или объектом
function padLeft(padding: number | string, input: string): string {
  if (typeof padding === 'number') {
    return ' '.repeat(padding) + input;
  }
  return padding + input;
}

// Без проверки typeof padding, ts вернул бы нам ошибку, т.к. repeat может принимать только number, а padding может быть и строкой
// В данном случае typeof является частным случаем Type Guard
// Несколько примеров, которые продемонстрируют как мы можем сужать типы

// 1. Использовать typeof, пример есть выше

// ***********

// 2. Использовать 'instanceof' - проверяем, что проверяемый аргумент это экземпляр класса

class QWE {
  a = 'QWE'
}

class ASD {
  b = 'ASD'
}

const getVal = (someClass: QWE | ASD): string => {
  if (someClass instanceof QWE) {
    return someClass.a
  } else {
    return someClass.b
  }
}

getVal(new QWE) // 'QWE'
getVal(new ASD) // 'ASD'

// 3. Используем 'in' - проверяем наличие свойства в объекте

type Car = {
  beep: 'BEEEEEP'
}

type Dog = {
  bark: 'WOF'
}

const getVoice = (obj: Car | Dog): string => {
    if ('beep' in obj) {
      return obj.beep
    }
  return obj.bark
}

// 4. is - указывает какой тип присвоить переменной, если функция вернет true

type FirstName = {
  firstName: string
}

const isFirstName = (obj: any): obj is FirstName => {
  return obj && typeof obj.firstName === "string"
}

// В общем, Type Guard не позволяет нам совершить ошибку при создании функции и помогает правильно
// обрабатывать возможные типы данных.
// Для защиты можно использовать любые проверки, которые помогут нам сузить типы возможных данных.