import React from 'react'
import { FormControl, InputLabel, Select, MenuItem, ListItemSecondaryAction } from '@material-ui/core'

interface SelectItem {
  value:string
  label:string
}

interface changeEvent {
  (event: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
  }>, child: React.ReactNode): void
}

const OrderComponent = ({
  label, value, minWidth, selectItems, onChange
}:{
  label:string, value:string, minWidth:number, selectItems:SelectItem[], onChange:changeEvent
}) => {

  return (
    <FormControl variant="outlined" style={{ minWidth }}>
      <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={value}
        onChange={onChange}
        label={label}
      >
        {selectItems.map((item) => <MenuItem value={item.value}>{item.label}</MenuItem>)}
      </Select>
    </FormControl>
  )
}

export default OrderComponent
