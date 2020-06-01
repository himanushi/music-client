import * as React from 'react'
import { Masonry, RenderComponentProps } from 'masonic'
import { Grid } from '@material-ui/core'

const MasonryComponent = ({
  items, renderComponent
}:{
  items: any[], renderComponent: React.ComponentType<RenderComponentProps>
}) => (
  <Masonry
    style={{ width: 1200 }} items={items} render={renderComponent}
  />
)

export default MasonryComponent
