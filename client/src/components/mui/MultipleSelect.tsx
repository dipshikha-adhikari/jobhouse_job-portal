

import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent} from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { InputLabel } from '@mui/material';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



type Props = {
  values : any,
  onChange:any,
  value:any,
  setState:(props:any) => void
  isEditorOpen:boolean
}



function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({values, onChange, value, setState, isEditorOpen}:Props) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    onChange(value)
  setState(value)
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel>Select</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          sx={{
            color: "white",
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#d1d5db',
            },
           
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#9ca3af',
            },
            '& .MuiOutlinedInput-root.Mui-disabled': {
              "& > fieldset": {
                borderColor: "red"
            }
            },
            '.MuiSvgIcon-root ': {
              fill: "green",
            }
          }}
          multiple
          value={value }
          onChange={handleChange}
          disabled={!isEditorOpen}
          input={<OutlinedInput  id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box  sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, borderColor:'#059669' }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {values.map((val:any) => (
            <MenuItem
              key={val}
              value={val}
              style={getStyles(val, personName, theme)}
            >
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
