/* =====================================================================
   BUILT-IN PIXEL SPRITES  (Cassiopeia · Mariner 9 Mission)
   ---------------------------------------------------------------------
   Each sprite = a palette (one character -> one colour) + rows of text.
   "." is a transparent pixel. script.js turns these into crisp SVGs.
   You never need to touch this file to use your own art: set an image
   path in config.js -> CONFIG.assets and that image is used instead.
   The "mariner9" sprite is traced 1:1 from the team's own pixel art.
   ===================================================================== */
window.SPRITES = {
 "mariner9": {
  "pal": {
   "K": "#0d0b1a",
   "G": "#fefefe",
   "B": "#22b04c",
   "L": "#4c6df2",
   "C": "#a7e61d",
   "S": "#99d8e9",
   "P": "#546b8d",
   "R": "#b4cee1",
   "D": "#ec1b24",
   "N": "#454545",
   "O": "#2d3698",
   "W": "#b3b4b3",
   "T": "#3d5472",
   "U": "#d9d9d9",
   "Z": "#86a743"
  },
  "rows": [
   "...........KKK................",
   "...........KNK................",
   "...........KWK.N..............",
   "....K....KKKKKKKKKK...........",
   "...KSK..KPPWWWWWWTTK..........",
   "..KSLSK.KPPPPPPPPTTK..........",
   ".KSLSLSK.KKKKKKKKKK...........",
   "KSLSLSK..KBCCCCCCBK...........",
   ".KSLSNK..KGBCCCCBRK...........",
   "..KSKKNKKGGGBBBBGRRK..........",
   "...K..KNKGBBGGGGBBRK..........",
   ".......KGBCCBBBBCCBRK.........",
   ".......KBCGKCCCCGKCBK.........",
   "......KGBCKKCCCZKKCBRK........",
   "......KDGBCCBBBBCCBGDK........",
   ".....KRDDGBBGGGGBBGDDRK.......",
   ".....KRGDDGGGUGUGGDDRRK.......",
   ".....KRGGDDGOOOOGDDGRRK.......",
   "......KRGGDOLLLLODGRRKNK..K...",
   "......KKRROLLLLLLORRKKKNKKSK..",
   ".......KKKLLLLLLLLKKK..KNSLSK.",
   ".......KPPKKKKKKKKPPK..KSLSLSK",
   "........KPPPPPPPPPPK..KSLSLSK.",
   ".........KKKKKKKKKK....KSLSK..",
   "........................KSK...",
   ".........................K...."
  ]
 },
 "cass": {
  "pal": {
   "k": "#170f24",
   "h": "#3a2216",
   "H": "#5c3a26",
   "s": "#f1c6a0",
   "S": "#d49c78",
   "e": "#d98c1c",
   "l": "#c4646e",
   "b": "#14121c",
   "c": "#2d2a3d",
   "v": "#3b2a6e",
   "V": "#5a46a6",
   "f": "#e3e3ea",
   "y": "#d8a640",
   "w": "#e6ebf3",
   "g": "#3ff0ff",
   "p": "#2b1a4c",
   "P": "#40296c",
   "m": "#ff7ad9",
   "o": "#d9a441",
   "t": "#4b4b55",
   "T": "#2c2c35"
  },
  "rows": [
   "......kkkk......",
   "....kkhhhhkk....",
   "...khhHHhhhhk...",
   "..khHHhhhhhhhk..",
   "..khhhhhhhhhhk..",
   ".khhhsssssshhhk.",
   ".khhsssssssshhk.",
   ".khhskesskeshhk.",
   ".khhsssssssshhk.",
   ".khhsssllssshhk.",
   ".khhhSssssShhhk.",
   ".khhhhkbbkhhhhk.",
   "khhhvfkbbkfvhhhk",
   "khhvvvbccbvvvhhk",
   "khsvVvbccbvVvshk",
   ".ksvVvbccbvVvsk.",
   ".ksvvybbbbyvvsk.",
   "..ss.kbbbbk.ss..",
   "..ss.kssssk.ss..",
   "...kwwwggwwwk...",
   "...kppppppppk...",
   "..kpoppppppopk..",
   "..kpPpppppPppk..",
   "..kpopppppppopk.",
   "..kpppkppkpppk..",
   "..kppPk..kpPpk..",
   "..kmmmk..kmmmk..",
   "..kppok..koppk..",
   "..kpppk..kpppk..",
   "..koook..koook..",
   "..kttttk.kttttk.",
   ".kTTTTTk.kTTTTTk"
  ]
 },
 "hoverbike": {
  "pal": {
   "k": "#120c22",
   "p": "#4b2f7c",
   "P": "#7453b8",
   "d": "#2b1a4e",
   "c": "#4fe3ff",
   "C": "#c4f8ff",
   "g": "#3a3a4c",
   "w": "#8fd8ff",
   "r": "#ff5a7a"
  },
  "rows": [
   "..........................kkk...........",
   "........................kkCCck..........",
   ".......................kCCcck...........",
   "..........kkkkkkkkkkkkkkcckkkkk.........",
   "......kkkkPPPPPPPPPPPPPPPPPPPPPkkk......",
   "...kkkpPPPpppppppppppppppppppppppPkk....",
   ".kkgpppppppppppppppppppppppppppppppPk...",
   "kggrpcccccccccccccccccccccccccccccpppk..",
   "kgppdccccddddddddddddddddddddddccccppk..",
   ".kkdcCkkCckkkkkkkkkkkkkkkkkkkkcCkkCckk..",
   "..kcCkk.kCc..................cCkkkkCc...",
   "...ck....kc..................ck....kc...",
   "...ck....kc..................ck....kc...",
   "...cCk..kCc..................cCk..kCc...",
   "....cCkkCc....................cCkkCc....",
   ".....cccc......................cccc.....",
   "........................................"
  ]
 },
 "viking": {
  "pal": {
   "k": "#141026",
   "w": "#eef1f6",
   "g": "#a3abbd",
   "G": "#5f6779",
   "a": "#ff9a3c",
   "y": "#e3b341",
   "d": "#2f3446"
  },
  "rows": [
   "..........kkkkkk........",
   "........kkwwwwwwkk......",
   ".......kwggggggggwk.....",
   "........kkkkkkkkkk......",
   "............kk..........",
   "............kk.....kk...",
   "......kkkkkkkkkkkk.kwk..",
   ".....kwwwwwwwwwwwwkkwk..",
   "....kwaawwwwwwwwaawkk...",
   "....kgggggggggggggggk...",
   "....kgGGgggggggggGGgk...",
   "....kkkkkkkkkkkkkkkkk...",
   "...kyyk..kdddk...kyyk...",
   "...kyyk..kdddk...kyyk...",
   "..kk..kk......kkk..kk...",
   ".kk.....kk..kk.....kk...",
   "kk.......kkkk.......kk..",
   "kGk.................kGk.",
   "kkk.................kkk."
  ]
 },
 "rover": {
  "pal": {
   "k": "#141026",
   "b": "#2f4fa8",
   "B": "#6f8fe8",
   "w": "#eef1f6",
   "g": "#a3abbd",
   "G": "#5f6779",
   "y": "#e3b341",
   "a": "#4fe3ff",
   "e": "#20263a"
  },
  "rows": [
   "...kkkkk......................",
   "...kwwek......................",
   "...kGGGk......................",
   "....kk........................",
   "....kk........................",
   "....kk........................",
   "kkkkkkkkkkkkkkkkkkkkkkkkkkkkk.",
   "kbbBbbBbbBbbBbbBbbBbbBbbBbbBk.",
   "kBBBBBBBBBBBBBBBBBBBBBBBBBBBk.",
   "kbbBbbBbbBbbBbbBbbBbbBbbBbbBk.",
   ".kkkkkkkkkkkkkkkkkkkkkkkkkkk..",
   ".....kwwwwwwwwwwwwwwwwwwk.....",
   ".....kgaagggggggggggggggk.....",
   ".....kkkkkkkkkkkkkkkkkkkk.....",
   "....kGk.....kGGk......kGk.....",
   "...kGk.....kk..kk......kGk....",
   "..kkkk....kkkk.kkkk...kkkk....",
   "..kGGk....kGGk.kGGk...kGGk....",
   "..kkkk....kkkk.kkkk...kkkk...."
  ]
 },
 "maven": {
  "pal": {
   "k": "#141026",
   "b": "#2f4fa8",
   "B": "#6f8fe8",
   "y": "#e3b341",
   "Y": "#f6d77a",
   "w": "#eef1f6",
   "g": "#a3abbd",
   "r": "#ff5a7a"
  },
  "rows": [
   "...............kkk..............",
   ".............kkwwwkk............",
   "............kwwgggwwk...........",
   ".............kkkkkkk............",
   "kk..............k.............kk",
   "kBkk............k...........kkBk",
   "kbBbkk.......kkkkkkk......kkbBbk",
   ".kbBbBkk....kYYYYYYYk...kkBbBbk.",
   "..kbBbBbkkkkkYyyyyyYkkkkbBbBbk..",
   "...kbBbBbBbbkYyyyyyYkbbBbBbBk...",
   "....kkbBbBbbkYyyyyyYkbbBbBkk....",
   "......kkkbBbkYYYYYYYkbBkkk......",
   ".........kkkkkkkkkkkkkk.........",
   "...............krk..............",
   "..............krrrk.............",
   "...............kkk.............."
  ]
 },
 "sojourner": {
  "pal": {
   "k": "#141026",
   "b": "#2f4fa8",
   "B": "#6f8fe8",
   "w": "#eef1f6",
   "g": "#a3abbd",
   "G": "#5f6779",
   "y": "#e3b341"
  },
  "rows": [
   "..kkkkkkkkkkkkkkkk..",
   "..kbBbBbBbBbBbBbBk..",
   "..kBbBbBbBbBbBbBbk..",
   "..kkkkkkkkkkkkkkkk..",
   "...kwwwwwwwwwwwwk...",
   "...kgggyygggggggk...",
   "...kkkkkkkkkkkkkk...",
   "..kk...kk..kk...kk..",
   ".kGGk.kGGk.kGGk.kGGk",
   ".kkkk.kkkk.kkkk.kkkk"
  ]
 },
 "satellite": {
  "pal": {
   "k": "#141026",
   "b": "#2f4fa8",
   "B": "#6f8fe8",
   "g": "#a3abbd",
   "w": "#eef1f6",
   "a": "#4fe3ff"
  },
  "rows": [
   "kkkkk...k...kkkkk",
   "kbBbk..kak..kbBbk",
   "kBbBkkkwwwkkkBbBk",
   "kbBbk.kgwgk.kbBbk",
   "kBbBk.kkkkk.kBbBk",
   "kkkkk.......kkkkk"
  ]
 },
 "avatar": {
  "pal": {
   "k": "#141026",
   "w": "#eef1f6",
   "g": "#a3abbd",
   "v": "#4fe3ff",
   "V": "#c4f8ff",
   "d": "#1d2a4a",
   "o": "#ff9a3c"
  },
  "rows": [
   ".....kkkkkk.....",
   "...kkwwwwwwkk...",
   "..kwwwwwwwwwwk..",
   ".kwwkkkkkkkkwwk.",
   ".kwkvvvvvvvvkwk.",
   "kwwkvVVvvvvvkwwk",
   "kwwkvVvvvvvvkwwk",
   "kwwkvvvvvvvdkwwk",
   "kgwkvvvvvvddkwgk",
   ".kgwkkkkkkkkwgk.",
   "..kgwwwwwwwwgk..",
   "...kkkggggkkk...",
   "..kwwwkookwwwk..",
   ".kwwwwkookwwwwk.",
   ".kwgwwwwwwwwgwk.",
   ".kkkkkkkkkkkkkk."
  ]
 }
};
