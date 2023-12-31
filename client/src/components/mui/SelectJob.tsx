import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

interface IMuiSelect {
  field: {
    value: string | number;
    onChange: () => void;
  };
  values: string[];
}

export default function SelectJob({ field, values }: IMuiSelect) {
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          onChange={field.onChange}
          value={field.value || ""}
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
