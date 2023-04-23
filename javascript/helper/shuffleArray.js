export const shuffleArray = arr => {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
        const randomNumber = Math.floor(Math.random() * (i + 1));
        [array[randomNumber], array[i]] = [array[i], array[randomNumber]]
    }
    return array;
}