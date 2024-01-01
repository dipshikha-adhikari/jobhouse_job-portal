import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

interface IMuiSelect {
  values: Types[] | undefined;
  isEditorOpen?: boolean;
  type: string;
  field: {
    value: string | number;
    onChange: () => void;
  };
}

type Types = {
  industry_id?: string;
  industry_name?: string;
  category_id?: string;
  category_name?: string;
};

export default function SelectCategory({
  field,
  values,
  isEditorOpen,
  type,
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
          disabled={isEditorOpen !== undefined && !isEditorOpen}
        >
          {values?.map((val) => {
            if (type === "categories") {
              return (
                <MenuItem value={val.category_id} key={val.category_id}>
                  {val.category_name}
                </MenuItem>
              );
            } else {
              return (
                <MenuItem value={val.industry_id} key={val.industry_name}>
                  {val.industry_name}
                </MenuItem>
              );
            }
          })}
        </Select>
      </FormControl>
    </div>
  );
}
