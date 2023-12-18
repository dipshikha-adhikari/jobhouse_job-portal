

import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent} from '@mui/material/Select';
import { Checkbox, InputLabel, ListItemText } from '@mui/material';


type Props = {
  values: any,
  type: string,
  field: any,
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
    let val = String(field.value).split(',');
    setPersonName(val);
  }, [field]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const { target: { value } } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
    field.onChange(value);
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
