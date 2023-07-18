import Empty from '@components/Empty/index.vue'
import SecondWrap from '@components/SecondWrap/index.vue'
import Skeleton from '@components/Skeleton/index.vue'
import FormWrap from '@components/FormWrap/index.vue'

const Components = {
	Empty,
	SecondWrap,
	Skeleton,
	FormWrap,
}

const globalComponents = (app) => {
	Object.keys(Components).forEach((comp) => {
		app.component(comp, Components[comp])
	})
}

export default globalComponents
