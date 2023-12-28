import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

interface IMuiSelect {
  values: IndustriesTypes[] | undefined;
  isEditorOpen?: boolean;
  field: {
    value: string | number;
    onChange: () => void;
  };
}

type IndustriesTypes = {
  industry_id: string;
  industry_name: string;
};

export default function SelectIndustry({
  field,
  values,
  isEditorOpen,
}: IMuiSelect) {
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          onChange={field.onChange}
          MenuProps={{
            disableScrollLock: true,
          }}
          value={field.value || ""}
          disabled={!isEditorOpen}
        >
          {values?.map((val) => {
            return (
              <MenuItem value={val.industry_id} key={val.industry_name}>
                {val.industry_name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
