'use strict'

const hiragana = [{
        jap: 'あ',
        eng: 'a'
    },
    {
        jap: 'か',
        eng: 'ka'
    },
    {
        jap: 'さ',
        eng: 'sa'
    },
    {
        jap: 'た',
        eng: 'ta'
    },
    {
        jap: 'な',
        eng: 'na'
    },
    {
        jap: 'は',
        eng: 'ha'
    },
    {
        jap: 'ま',
        eng: 'ma'
    },
    {
        jap: 'や',
        eng: 'ya'
    },
    {
        jap: 'ら',
        eng: 'ra'
    },
    {
        jap: 'わ',
        eng: 'wa'
    },
    {
        jap: 'が',
        eng: 'ga'
    },
    {
        jap: 'ざ',
        eng: 'za'
    },
    {
        jap: 'だ',
        eng: 'da'
    },
    {
        jap: 'ば',
        eng: 'ba'
    },
    {
        jap: 'ぱ',
        eng: 'pa'
    },
    {
        jap: 'い',
        eng: 'i'
    },
    {
        jap: 'き',
        eng: 'ki'
    },
    {
        jap: 'し',
        eng: 'shi'
    },
    {
        jap: 'ち',
        eng: 'chi'
    },
    {
        jap: 'に',
        eng: 'ni'
    },
    {
        jap: 'ひ',
        eng: 'hi'
    },
    {
        jap: 'み',
        eng: 'mi'
    },
    {
        jap: 'り',
        eng: 'ri'
    },
    {
        jap: 'ゐ',
        eng: 'wi'
    },
    {
        jap: 'ぎ',
        eng: 'gi'
    },
    {
        jap: 'じ',
        eng: 'ji'
    },
    {
        jap: 'ぢ',
        eng: 'ji, dji'
    },
    {
        jap: 'び',
        eng: 'bi'
    },
    {
        jap: 'ぴ',
        eng: 'pi'
    },
    {
        jap: 'う',
        eng: 'u'
    },
    {
        jap: 'く',
        eng: 'ku'
    },
    {
        jap: 'す',
        eng: 'su'
    },
    {
        jap: 'つ',
        eng: 'tsu'
    },
    {
        jap: 'ぬ',
        eng: 'nu'
    },
    {
        jap: 'ふ',
        eng: 'fu'
    },
    {
        jap: 'む',
        eng: 'mu'
    },
    {
        jap: 'ゆ',
        eng: 'yu'
    },
    {
        jap: 'る',
        eng: 'ru'
    },
    {
        jap: 'ん',
        eng: 'n'
    },
    {
        jap: 'ぐ',
        eng: 'gu'
    },
    {
        jap: 'ず',
        eng: 'zu'
    },
    {
        jap: 'づ',
        eng: 'dzu, zu'
    },
    {
        jap: 'ぶ',
        eng: 'bu'
    },
    {
        jap: 'ぷ',
        eng: 'pu'
    },
    {
        jap: 'え',
        eng: 'e'
    },
    {
        jap: 'け',
        eng: 'ke'
    },
    {
        jap: 'せ',
        eng: 'se'
    },
    {
        jap: 'て',
        eng: 'te'
    },
    {
        jap: 'ね',
        eng: 'ne'
    },
    {
        jap: 'へ',
        eng: 'he'
    },
    {
        jap: 'め',
        eng: 'me'
    },
    {
        jap: 'れ',
        eng: 're'
    },
    {
        jap: 'ゑ',
        eng: 'we'
    },
    {
        jap: 'げ',
        eng: 'ge'
    },
    {
        jap: 'ぜ',
        eng: 'ze'
    },
    {
        jap: 'で',
        eng: 'de'
    },
    {
        jap: 'べ',
        eng: 'be'
    },
    {
        jap: 'ぺ',
        eng: 'pe'
    },
    {
        jap: 'お',
        eng: 'o'
    },
    {
        jap: 'こ',
        eng: 'ko'
    },
    {
        jap: 'そ',
        eng: 'so'
    },
    {
        jap: 'と',
        eng: 'to'
    },
    {
        jap: 'の',
        eng: 'no'
    },
    {
        jap: 'ほ',
        eng: 'ho'
    },
    {
        jap: 'も',
        eng: 'mo'
    },
    {
        jap: 'よ',
        eng: 'yo'
    },
    {
        jap: 'ろ',
        eng: 'ro'
    },
    {
        jap: 'を',
        eng: 'wo'
    },
    {
        jap: 'ご',
        eng: 'go'
    },
    {
        jap: 'ぞ',
        eng: 'zo'
    },
    {
        jap: 'ど',
        eng: 'do'
    },
    {
        jap: 'ぼ',
        eng: 'bo'
    },
    {
        jap: 'ぽ',
        eng: 'po'
    },
    {
        jap: 'きゃ',
        eng: 'kya'
    },
    {
        jap: 'しゃ',
        eng: 'sha'
    },
    {
        jap: 'ちゃ',
        eng: 'cha'
    },
    {
        jap: 'にゃ',
        eng: 'nya'
    },
    {
        jap: 'ひゃ',
        eng: 'hya'
    },
    {
        jap: 'みゃ',
        eng: 'mya'
    },
    {
        jap: 'りゃ',
        eng: 'rya'
    },
    {
        jap: 'ぎゃ',
        eng: 'gya'
    },
    {
        jap: 'じゃ',
        eng: 'ja'
    },
    {
        jap: 'ぢゃ',
        eng: 'dja, ja'
    },
    {
        jap: 'びゃ',
        eng: 'bya'
    },
    {
        jap: 'ぴゃ',
        eng: 'pya'
    },
    {
        jap: 'きゅ',
        eng: 'kyu'
    },
    {
        jap: 'しゅ',
        eng: 'shu'
    },
    {
        jap: 'ちゅ',
        eng: 'chu'
    },
    {
        jap: 'にゅ',
        eng: 'nyu'
    },
    {
        jap: 'ひゅ',
        eng: 'hyu'
    },
    {
        jap: 'みゅ',
        eng: 'myu'
    },
    {
        jap: 'りゅ',
        eng: 'ryu'
    },
    {
        jap: 'ぎゅ',
        eng: 'gyu'
    },
    {
        jap: 'じゅ',
        eng: 'ju'
    },
    {
        jap: 'ぢゅ',
        eng: 'dja, ju'
    },
    {
        jap: 'びゅ',
        eng: 'byu'
    },
    {
        jap: 'ぴゅ',
        eng: 'pyu'
    },
    {
        jap: 'きょ',
        eng: 'kyo'
    },
    {
        jap: 'しょ',
        eng: 'sho'
    },
    {
        jap: 'ちょ',
        eng: 'cho'
    },
    {
        jap: 'にょ',
        eng: 'nyo'
    },
    {
        jap: 'ひょ',
        eng: 'hyo'
    },
    {
        jap: 'みょ',
        eng: 'myo'
    },
    {
        jap: 'りょ',
        eng: 'ryo'
    },
    {
        jap: 'ぎょ',
        eng: 'gyo'
    },
    {
        jap: 'じょ',
        eng: 'jo'
    },
    {
        jap: 'ぢょ',
        eng: 'djo, jo'
    },
    {
        jap: 'びょ',
        eng: 'byo'
    },
    {
        jap: 'ぴょ',
        eng: 'pyo'
    },
]

export default hiragana
