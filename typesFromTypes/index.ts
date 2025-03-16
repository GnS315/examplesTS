// Создание типов из типов

// 1. Generics
// обобщенные типы, позволяющие создавать повторно используемые компоненты,
// которые могут работать с разными типами данных. Например, функция, которая проверяет есть ли элемент в массиве:

const isIncludes = <T>(arr: T[], val: T): boolean => arr.includes(val);

isIncludes<number>([1,2,3,4,5], 10)
isIncludes<string>(['a', 'b', 'c', 'd'], 'a')

// В данном случае мы можем проверить любой массив на наличие в нем элемента не теряя при этом типизацию,
// как в случае использования any

// *********************************************

// 2. keyof
// оператор, который позволяет получить типы всех ключей объекта

type Person = {
  name: string;
  age: number;
  birthday: string;
}

type PersonKeys = keyof Person; // 'name' | 'age' | 'birthday'

// Пример функции, которая получает значение объекта по ключу

const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key]
}

const person: Person = {name: 'name', age: 18, birthday: '1234-12-12'}

getProperty(person, 'qwe') // ошибка
getProperty(person, 'name') // всё ок

//***************************************

// 3. typeof
// оператор, использующийся для получения типа значения переменной или выражения

const a = 123
typeof a // Получим 'number'

const b = 'Hello'
typeof b // Получим 'string

// typeof можно применять, например для получения типа функции

const sum = (first: number, second: number): number => {
  return first + second
}

typeof sum // вернет (first: number, second: number) => number

// Также мы можем получить тип объекта, класса, конструктора класса

//****************************************

// 4. Indexed Access Types
// Позволяет получить тип значения по ключу из объектного типа

type Name = Person['name'] // 'string'
type Age = Person['age'] // 'number'

// Также работает с массивом

type ArrayOfStrings = string[]
type StringType = ArrayOfStrings[0] // 'string'

//*******************************

// 5. Conditional Types
// позволяют определять типы в зависимости от других типов

type isString<T> = T extends string ? true : false
type res1 = isString<number> // false
type res2 = isString<string> // true

// Пример с условным типом для обертки
type Nullable<T> = T | null;
type NullableNumber = Nullable<number>; // number | null
type NullableString = Nullable<string>; // string | null

// 6. Mapped Types
// позволяет создавать типы, основываясь на существующих типах
// общий синтаксис такой

// type MappedType = {
//   [P in Keys]: ValueType<P>
// }

// Пример создания типа, где к каждому ключу прибавляется префикс is

type PersonWithIsPrefix = {
  [P in keyof Person as `is${Capitalize<string & P>}`]: Person[P];
};

// Результат:
// {
//   isName: string;
//   isAge: number;
//   isLocation?: string;
// }