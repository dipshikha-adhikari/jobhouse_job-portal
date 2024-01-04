import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

interface IMuiSelect {
  field: {
    value: string | number;
    onChange: () => void;
  };
  type: string;
  values: SelectProps[] | undefined;
  isEditorOpen?: boolean;
}
type SelectProps = {
  level_name?: string;
  level_id?: string;
  type_id?: string;
  type_name?: string;
};

export default function SelectJob({
  field,
  values,
  type,
  isEditorOpen,
}: IMuiSelect) {
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
          disabled={isEditorOpen !== undefined && !isEditorOpen}
        >
          {values?.map((val) => {
            return type === "level" ? (
              <MenuItem value={val.level_id} key={val.level_id}>
                {val.level_name}
              </MenuItem>
            ) : (
              <MenuItem value={val.type_id} key={val.type_id}>
                {val.type_name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
