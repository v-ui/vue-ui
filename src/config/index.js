// system configs
import icon from './icon'
import regex from './regex'
import status from './status'
import operate from './operate'
import placeholder from './placeholder'

// 格式化 local 数据
function formatLocak(str) {
  if (!str || str.length === 0) return null
  if (!str.includes('-')) return str
  let local = str
  let arr = local.split('-')
  return arr[0] + '-' + arr[1].toUpperCase()
}

export default {
    lang: {
        defaultLocale: formatLocak(navigator.language || navigator.userLanguage) || 'en-US',// default Locale
        fallbackLocale: 'en-US',// fallback Locale
        langsList: [
            { code: 'en-US', name: 'English' },
            { code: 'zh-CN', name: '简体中文' },
            // ar-EG
            // bg-BG
            // cs-CZ
            // de-DE
            // en-US
            // es-ES
            // fi-FI
            // fr-FR
            // hu-HU
            // it-IT
            // ja-JP
            // nb-NO
            // nl-NL
            // pt-BR
            // ro-RO
            // ru-RU
            // sv-SE
            // tr-TR
            // zh-CN
        ],
    }, // Locale config
    ui: {
        forms: {
            // b-form-valid type: 'feedback'、'tooltip'
            validInfoType: 'feedback',
            placeholder: placeholder, // placeholder
        }, // forms
        table: {
            operate,
        },// table
        icon: icon, // icons
        status: status, // status
    }, // UI config

    regex: regex, //regex
    // routes: routes, // routes config
}
