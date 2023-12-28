import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { FieldValues } from "react-hook-form";
import dayjs from "dayjs";

export default function ResponsiveDatePicker({
  field,
  isEditorOpen,
}: {
  field: FieldValues;
  isEditorOpen: boolean;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          "DatePicker",
          "MobileDatePicker",
          "DesktopDatePicker",
          "StaticDatePicker",
        ]}
      >
        <DemoItem>
          <DatePicker
            disabled={!isEditorOpen}
            onChange={(date) => field.onChange(date)}
            value={dayjs(field.value)}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
