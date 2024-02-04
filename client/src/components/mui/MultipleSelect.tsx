import { Box, Chip, InputLabel, ListItemText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";

type Values = {
  industry_id?: string;
  industry_name?: string;
  category_name?: string;
  category_id?: string;
};

type Props = {
  values: Values[] | undefined;
  type: string;
  value: string[];
  onChange: (params: string[]) => void;
  isEditorOpen: boolean;
};

export default function MultipleSelectChip({
  values,
  type,
  value,
  onChange,
  isEditorOpen,
}: Props) {
  const [personName, setPersonName] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (value !== undefined) {
      const val = String(value).split(",");
      setPersonName(val);
    }
  }, [value]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    const newVal = typeof value === "string" ? value.split(",") : value;
    const filteredVal = newVal.filter((val) => {
      return val !== "";
    });
    onChange(filteredVal);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel>Select</InputLabel>
        <Select
        className=" w-full"
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          MenuProps={{
            disableScrollLock: true,
          }}
          disabled={!isEditorOpen}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}

          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {values?.map((val: Values | undefined) => (
            <MenuItem
              key={
                type === "category" ? val?.category_name : val?.industry_name
              }
              value={
                type === "category" ? val?.category_name : val?.industry_name
              }
            >
             
              <ListItemText
                primary={
                  type === "category" ? val?.category_name : val?.industry_name
                }
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
