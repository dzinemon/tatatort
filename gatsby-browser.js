import { config } from '@fortawesome/fontawesome-svg-core'
import '@fontsource/poiret-one';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import '@fortawesome/fontawesome-svg-core/styles.css'
import './src/styles/global.css'

// Prevent fontawesome from adding its CSS since we did it manually above
config.autoAddCss = false;