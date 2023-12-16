import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { makeStyles } from "@mui/styles";

interface IMuiSelect {
  onChange: (props: any) => void;
  values: string[];
  value: string;
  setLevel?: (props: any) => void;
  setType?: (props: any) => void;
}

const useStyles:any = makeStyles({
  select: {
      '&:before': {
          borderColor: 'white',
      },
      '&:after': {
          borderColor: 'white',
      },
      '&:not(.Mui-disabled):hover::before': {
          borderColor: 'white',
      },
  },
  icon: {
      fill: 'white',
  },
  root: {
      color: 'white',
  },
})

export default function SelectJob({
  onChange,
  values,
  value,
  setLevel,
  setType,
}: IMuiSelect) {
  const classes:any = useStyles()
  function handleChange(e: SelectChangeEvent) {
    const val = e.target.value as string;
    onChange(val);
    if (setLevel && setLevel !== setType) {
      setLevel(val);
    }
    if (setType) {
      setType(val);
    }
  }
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          onChange={handleChange}
          value={value}
          MenuProps={{
            disableScrollLock:true
          }}
          className={classes.select}
          inputProps={{
            classes: {
                icon: classes.icon,
                root: classes.root,
            },
        }}
        >
          {values.map((val) => {
            return (
              <MenuItem value={val} key={val} >
                {val}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
