

import { Checkbox, InputLabel, ListItemText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';


type Props = {
  values: [],
  type: string,
  field:{
    value:string 
    onChange:(props:string[]) => void
  } ,
  isEditorOpen: boolean
}
type Category = {
  category_name:string
  category_id:string
}

type Industry = {
  industry_name:string
  industry_id:string
}

export default function MultipleSelectChip({ values, type, field, isEditorOpen }: Props) {
  const [personName, setPersonName] = React.useState<string[]>([]);

  React.useEffect(() => {
    if(field.value !== undefined){
      const val = String(field.value).split(',');
      setPersonName(val);
    }
  }, [field]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const { target: { value } } = event;
    const newVal = typeof value === 'string' ? value.split(',') : value
    const filteredVal = newVal.filter(val => { return val !== ''})
field.onChange(filteredVal)
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel>Select</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          MenuProps={{
            disableScrollLock:true
          }}
          disabled={!isEditorOpen}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => selected.join(', ')}
        >
            {type === 'category' ? values?.map((val:Category) => (
            <MenuItem
              key={ val.category_name}
              value={ val.category_name}
            >
            <Checkbox checked={personName.indexOf(val.category_name) > -1} />
              <ListItemText primary={val.category_name} />
            </MenuItem>
          )) :  values?.map((val:Industry) => (
            <MenuItem
              key={val.industry_name }
              value={val.industry_name }
            >
              <Checkbox checked={personName.indexOf(val.industry_name) > -1} />
              <ListItemText primary={val.industry_name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
