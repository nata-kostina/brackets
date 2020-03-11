module.exports = function check(str, bracketsConfig) {
    if (str.length % 2 != 0)            // если длина строки не кратна двум
        return false;
    let open = [];                      // массив с открывающими скобками
    let close = [];                      // массив с закрывающими скобками
    let equal = [];                      // массив для одинаковых открыв. и закрыв. скобок
    for (i = 0; i < bracketsConfig.length; i++) {
        if (bracketsConfig[i][0] == bracketsConfig[i][1])
            equal.push(bracketsConfig[i][0]);
        else {
            open.push(bracketsConfig[i][0]);
            close.push(bracketsConfig[i][1]);
        }
    }
    let stack = [];
    let arr = str.split("");    // преобразовать строку в массив

    for (bracket of arr) {
        if (open.includes(bracket))         // поместить открыв. скобку в стек
            stack.push(bracket);
        else
            if (close.includes(bracket)) {
                if (stack.length == 0)      // если закрыв. скобка предшествует открыв.
                    return false;
                else
                    if (isPair(stack[stack.length - 1], bracket, bracketsConfig))   // если закрыв. скобка не является парой к открыв.
                        stack.pop();
                    else
                        return false;
            }
            else
                if (equal.includes(bracket)) {
                    if (bracket == stack[stack.length - 1]) // извлечь повторяющуюся скобку из стека
                        stack.pop();
                    else
                        stack.push(bracket);
                }
    }

    return (stack.length == 0) ? true : false;
}

// функция определяет, являются ли две скобки парой
function isPair(el1, el2, config) {
    for (i = 0; i < config.length; i++) {
        if (config[i][1] == el2 && config[i][0] == el1)
            return true;
    }
    return false;
}
