import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface IMuiSelect {
  onChange: (props: string) => void;
  values: string[];
  value: string;
  setLevel?: (props: string) => void;
  setType?: (props: string) => void;
}

export default function SelectJob({
  onChange,
  values,
  value,
  setLevel,
  setType,
}: IMuiSelect) {
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
            disableScrollLock: true,
          }}
        >
          {values.map((val) => {
            return (
              <MenuItem value={val} key={val}>
                {val}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
