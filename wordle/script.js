row = 0;
col = 0;
const ans = ['B', 'R', 'E', 'A', 'K']

stop = 0;
function cVal(x)
{
    l=x.charCodeAt(0);
    return l-65;
}
function writeText(y, i) {
    x = "";
    x = '<p style="transform: translate(0px,-30px)">';
    x += y;
    x += '<\/p>';
    textId = "t" + row + col;
    document.getElementById(textId).innerHTML = x;
}

function generatePlayground() {
    i = 0, j = 0;
    text = ""
    x = ""
    y = 0
    for (i = 0; i < 12; ++i) {
        temp = -120;
        for (j = 0; j < 5; ++j) {
            text += '<div id= "b' + i + j + '" class="box" , style="position:absolute;top:' + (20 + i * 8) + '%;left:50%; transform: translate(' + temp + 'px,' + 0 + '%);"><p id="t' + i + j + '"></p></div>'
            temp += 60
        }
        x = x + text;
        text = ''
    }
    document.getElementById("playGround").innerHTML = x;
}
function won() {
    stop = 1;
}
function check(word) {
    i = 0;
    points = 0;
    const cnt = [];
    for(i=0;i<30;++i)
        cnt[i]=0;
    const x = [];
    for (i = 0; i < 5; ++i) {
        cnt[cVal(ans[i])] += 1;
    }
    for (i = 0; i < 5; ++i) {
        if (word[i].toUpperCase() === ans[i]) {
            x[i] = "green";
            points = points + 1;
            cnt[cVal(word[i].toUpperCase())] -= 1;
            console.log(cnt)
        }
    }
    for (i = 0; i < 5; ++i) {
        if (x[i] !== "green") {
            if (cnt[cVal(word[i].toUpperCase())] > 0) {
                x[i] = "rgb(230, 110, 70)";
                cnt[cVal(word[i].toUpperCase())] -= 1;
            }
            else
                x[i] = "grey"
        }
        document.getElementById('b' + row + i).style.backgroundColor = x[i];
    }


    if (points < 5) {
        row = row + 1;
        col = 0;
    }
    else
        won();
}
function readKey() {
    const word = [];
    document.addEventListener('keydown', (event) => {
        document.addEventListener('keydown', (event))
        key = event.key;
        code = event.keyCode
        if (col < 5) {
            if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
                word[col] = key;
                writeText(key.toUpperCase(), col)
                ++col;
            }
        }
        if (key === "Backspace") {
            if (col > 0) {
                --col;
                writeText(' ', col)
            }
        }
        if (col === 5 && key === "Enter")
            check(word)
    }, stop === 1);
}

