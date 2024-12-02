function drawChristmasTree(height) {
    for (let i = 0; i < height; i++) {
        let spaces = " ".repeat(height - i - 1);
        let stars = "*".repeat(2 * i + 1);
        console.log(spaces + stars);
    }
    let trunkWidth = 2;
    let trunkHeight = 3;
    let trunkSpaces = " ".repeat(height - trunkWidth);

    for (let i = 0; i < trunkHeight; i++) {
        console.log(trunkSpaces + "*".repeat(trunkWidth));
    }
}

let n = 10;
drawChristmasTree(n);
