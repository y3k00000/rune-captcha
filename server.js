const express = require("express");
const fs = require("fs");

const staticFolder = `${__dirname}/statics`;
const serverPort = 8080;

const fontPath = `${__dirname}/fonts/FreeMono.otf`;
const TextToSVG = require("text-to-svg");
const textToSVG = TextToSVG.loadSync(fontPath);
const svg = text => textToSVG.getSVG(text, {
    x: 0,
    y: 0,
    fontSize: 72,
    anchor: 'top',
    attributes: {
        fill: 'black',
        stroke: 'black'
    }
});

const runes = [
    "ᚠ", //5792 16A0 RUNIC LETTER FEHU FEOH FE F
    "ᚡ", //5793 16A1 RUNIC LETTER V
    "ᚢ", //5794 16A2 RUNIC LETTER URUZ UR U
    "ᚣ", //5795 16A3 RUNIC LETTER YR
    "ᚤ", //5796 16A4 RUNIC LETTER Y
    "ᚥ", //5797 16A5 RUNIC LETTER W
    "ᚦ", //5798 16A6 RUNIC LETTER THURISAZ THURS THORN
    "ᚧ", //5799 16A7 RUNIC LETTER ETH
    "ᚨ", //5800 16A8 RUNIC LETTER ANSUZ A
    "ᚩ", //5801 16A9 RUNIC LETTER OS O
    "ᚪ", //5802 16AA RUNIC LETTER AC A
    "ᚫ", //5803 16AB RUNIC LETTER AESC
    "ᚬ", //5804 16AC RUNIC LETTER LONG-BRANCH-OSS O
    "ᚭ", //5805 16AD RUNIC LETTER SHORT-TWIG-OSS O
    "ᚮ", //5806 16AE RUNIC LETTER O
    "ᚯ", //5807 16AF RUNIC LETTER OE
    "ᚰ", //5808 16B0 RUNIC LETTER ON
    "ᚱ", //5809 16B1 RUNIC LETTER RAIDO RAD REID R
    "ᚲ", //5810 16B2 RUNIC LETTER KAUNA
    "ᚳ", //5811 16B3 RUNIC LETTER CEN
    "ᚴ", //5812 16B4 RUNIC LETTER KAUN K
    "ᚵ", //5813 16B5 RUNIC LETTER G
    "ᚶ", //5814 16B6 RUNIC LETTER ENG
    "ᚷ", //5815 16B7 RUNIC LETTER GEBO GYFU G
    "ᚸ", //5816 16B8 RUNIC LETTER GAR
    "ᚹ", //5817 16B9 RUNIC LETTER WUNJO WYNN W
    "ᚺ", //5818 16BA RUNIC LETTER HAGLAZ H
    "ᚻ", //5819 16BB RUNIC LETTER HAEGL H
    "ᚼ", //5820 16BC RUNIC LETTER LONG-BRANCH-HAGALL H
    "ᚽ", //5821 16BD RUNIC LETTER SHORT-TWIG-HAGALL H
    "ᚾ", //5822 16BE RUNIC LETTER NAUDIZ NYD NAUD N
    "ᚿ", //5823 16BF RUNIC LETTER SHORT-TWIG-NAUD N
    "ᛀ", //5824 16C0 RUNIC LETTER DOTTED-N
    "ᛁ", //5825 16C1 RUNIC LETTER ISAZ IS ISS I
    "ᛂ", //5826 16C2 RUNIC LETTER E
    "ᛃ", //5827 16C3 RUNIC LETTER JERAN J
    "ᛄ", //5828 16C4 RUNIC LETTER GER
    "ᛅ", //5829 16C5 RUNIC LETTER LONG-BRANCH-AR AE
    "ᛆ", //5830 16C6 RUNIC LETTER SHORT-TWIG-AR A
    "ᛇ", //5831 16C7 RUNIC LETTER IWAZ EOH
    "ᛈ", //5832 16C8 RUNIC LETTER PERTHO PEORTH P
    "ᛉ", //5833 16C9 RUNIC LETTER ALGIZ EOLHX
    "ᛊ", //5834 16CA RUNIC LETTER SOWILO S
    "ᛋ", //5835 16CB RUNIC LETTER SIGEL LONG-BRANCH-SOL S
    "ᛌ", //5836 16CC RUNIC LETTER SHORT-TWIG-SOL S
    "ᛍ", //5837 16CD RUNIC LETTER C
    "ᛎ", //5838 16CE RUNIC LETTER Z
    "ᛏ", //5839 16CF RUNIC LETTER TIWAZ TIR TYR T
    "ᛐ", //5840 16D0 RUNIC LETTER SHORT-TWIG-TYR T
    "ᛑ", //5841 16D1 RUNIC LETTER D
    "ᛒ", //5842 16D2 RUNIC LETTER BERKANAN BEORC BJARKAN B
    "ᛓ", //5843 16D3 RUNIC LETTER SHORT-TWIG-BJARKAN B
    "ᛔ", //5844 16D4 RUNIC LETTER DOTTED-P
    "ᛕ", //5845 16D5 RUNIC LETTER OPEN-P
    "ᛖ", //5846 16D6 RUNIC LETTER EHWAZ EH E
    "ᛗ", //5847 16D7 RUNIC LETTER MANNAZ MAN M
    "ᛘ", //5848 16D8 RUNIC LETTER LONG-BRANCH-MADR M
    "ᛙ", //5849 16D9 RUNIC LETTER SHORT-TWIG-MADR M
    "ᛚ", //5850 16DA RUNIC LETTER LAUKAZ LAGU LOGR L
    "ᛛ", //5851 16DB RUNIC LETTER DOTTED-L
    "ᛜ", //5852 16DC RUNIC LETTER INGWAZ
    "ᛝ", //5853 16DD RUNIC LETTER ING
    "ᛞ", //5854 16DE RUNIC LETTER DAGAZ DAEG D
    "ᛟ", //5855 16DF RUNIC LETTER OTHALAN ETHEL O
    "ᛠ", //5856 16E0 RUNIC LETTER EAR
    "ᛡ", //5857 16E1 RUNIC LETTER IOR
    "ᛢ", //5858 16E2 RUNIC LETTER CWEORTH
    "ᛣ", //5859 16E3 RUNIC LETTER CALC
    "ᛤ", //5860 16E4 RUNIC LETTER CEALC
    "ᛥ", //5861 16E5 RUNIC LETTER STAN
    "ᛦ", //5862 16E6 RUNIC LETTER LONG-BRANCH-YR
    "ᛧ", //5863 16E7 RUNIC LETTER SHORT-TWIG-YR
    "ᛨ", //5864 16E8 RUNIC LETTER ICELANDIC-YR
    "ᛩ", //5865 16E9 RUNIC LETTER Q
    "ᛪ", //5866 16EA RUNIC LETTER X
    "᛫", //5867 16EB RUNIC SINGLE PUNCTUATION
    "᛬", //5868 16EC RUNIC MULTIPLE PUNCTUATION
    "᛭", //5869 16ED RUNIC CROSS PUNCTUATION
    "ᛮ", //5870 16EE RUNIC ARLAUG SYMBOL
    "ᛯ", //5871 16EF RUNIC TVIMADUR SYMBOL
    "ᛰ", //5872 16F0 RUNIC BELGTHOR SYMBOL
];

try {
    try {
        fs.readFileSync(staticFolder);
        console.error(`${staticFolder} file exists, end program!!`);
        process.exit(-1);
    } catch (e) {
        // file conflicts with folder not exists, continue.
    }
    fs.readdirSync(staticFolder);
} catch (e) {
    console.log(`creating static folder ${staticFolder}...`);
    fs.mkdirSync(staticFolder);
}

var server = express();

server.use(express.static(staticFolder));

server.get("/", (req, res) => {
    res.status(200).send("He110!!")
});

server.get("/request", (req, res) => {
    // send a js file
});

server.get("/rune/:runeId", (req, res) => {
    let { runeId } = req.params;
    if (!runeId) {
        res.status(404).send("");
    } else {
        // test
        console.log(runeId);
        var svgData = svg(runeId);
        res.status(200).send(svgData);
    }
});

server.listen(serverPort, () => {
    console.log(`Captcha Server listen on ${serverPort}`);
});