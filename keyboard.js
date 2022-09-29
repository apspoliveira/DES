const keyboard_line1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const keyboard_line2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const keyboard_line3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
var color_line1 = ['\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ',
    '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ',
    '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ',
    '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m '];
var color_line2 = ['\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ',
    '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ',
    '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ',
    '\x1b[37m%s\x1b[0m '];
var color_line3 = ['\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ',
    '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ',
    '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m '];

function update_keyboard(word, color) {
    for (var i = 0; i < keyboard_line1.length; i++) {
        if (keyboard_line1[i] == word)
            color_line1[i] = color;
    }
    for (var i = 0; i < keyboard_line2.length; i++) {
        if (keyboard_line2[i] == word)
            color_line2[i] = color;
    }
    for (var i = 0; i < keyboard_line3.length; i++) {
        if (keyboard_line3[i] == word)
            color_line3[i] = color;
    }
}

function colorize_keyboard(colors, characters) {
    //console.log(characters);
    // log word hints
    for (var i = 0; i < 6; i++) {
        console.log(colors[i], characters[i][0], characters[i][1],
            characters[i][2], characters[i][3], characters[i][4]);
    }
    // log keyboard hints
    // line 1
    console.log(color_line1[0] + color_line1[1] + color_line1[2] +
        color_line1[3] + color_line1[4] + color_line1[5] +
        color_line1[6] + color_line1[7] + color_line1[8] +
        color_line1[9], keyboard_line1[0], keyboard_line1[1],
        keyboard_line1[2], keyboard_line1[3], keyboard_line1[4],
        keyboard_line1[5], keyboard_line1[6], keyboard_line1[7],
        keyboard_line1[8], keyboard_line1[9]);
    // line 2
    console.log(color_line2[0] + color_line2[1] + color_line2[2] +
        color_line2[3] + color_line2[4] + color_line2[5] +
        color_line2[6] + color_line2[7] + color_line2[8],
        keyboard_line2[0], keyboard_line2[1], keyboard_line2[2],
        keyboard_line2[3], keyboard_line2[4], keyboard_line2[5],
        keyboard_line2[6], keyboard_line2[7], keyboard_line2[8]);
    // line 3
    console.log(color_line3[0] + color_line3[1] + color_line3[2] +
        color_line3[3] + color_line3[4] + color_line3[5] +
        color_line3[6], keyboard_line3[0], keyboard_line3[1],
        keyboard_line3[2], keyboard_line3[3], keyboard_line3[4],
        keyboard_line3[5], keyboard_line3[6]);

}

function reset_keyboard() {
    color_line1 = ['\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ',
    '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ',
    '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ',
    '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m '];
    color_line2 = ['\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ',
    '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ',
    '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ',
    '\x1b[37m%s\x1b[0m '];
    color_line3 = ['\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ',
    '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ',
    '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m '];
}

module.exports = { colorize_keyboard, update_keyboard, reset_keyboard };