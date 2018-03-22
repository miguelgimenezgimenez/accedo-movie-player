// I created this component since this is a pattern that is very common in react,
// here I am not reusing it, but would be very usefull in bigger projects (I thought of this myself) //
import map from 'lodash.map'

const Iterator = (props) => {
  const list = map(props.collection, (element, index) => props.component(element, index))
  return list
}

export default Iterator
