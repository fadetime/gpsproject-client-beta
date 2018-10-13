import CH from './CH'
import EN from './EN'

export default function (lang) {
	if (lang === 'ch') {
		return CH
	} else {
		return EN
	}
}
