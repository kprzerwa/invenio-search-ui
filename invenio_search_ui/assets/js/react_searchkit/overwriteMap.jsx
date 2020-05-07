
import {default as searchConfig} from './configRSK'
import {default as ItemTemplate} from './ResultsItemTemplate'

function overwriteMap () {

    return {
        config: searchConfig(),
        templates:{
            resultsItem: ItemTemplate
        }
        }
}
export default overwriteMap;
