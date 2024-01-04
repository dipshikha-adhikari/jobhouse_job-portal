import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { FieldValues } from "react-hook-form";
dayjs.extend(localizedFormat);

export default function ResponsiveDayPicker({
  field,
  isEditorOpen,
}: {
  field: FieldValues;
  isEditorOpen: boolean;
}) {
  const handleChange = (date: Date | undefined) => {
    field.onChange(dayjs(date).format("L"));
  };

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
            onChange={(date) => handleChange(date?.toDate())}
            value={dayjs(field.value)}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
