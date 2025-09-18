import * as React from "react";
import { useFormContext } from "react-hook-form";
import { DayPicker } from "react-day-picker";
import { Popover } from "../Popover";
import { Calendar } from "../Calendar";
import { Button } from "../Button";
import { FaCalendar } from "react-icons/fa6";
import { format } from "date-fns";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

type InputDatePickerProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputDatePicker = React.forwardRef<HTMLInputElement, InputDatePickerProps>(
  ({ className, name, ...props }: InputDatePickerProps, ref) => {
    const formContext = useFormContext();

    if (!name) return null;

    const value = formContext.watch(name);

    return (
      <>
        <Popover.Root>
          <Popover.Trigger asChild>
            <Button.Root size="lg" className="rounded-none border border-zinc-700 bg-transparent">
              <Button.Content className="flex flex-1 justify-start">
                {value ? format(formContext.watch(name), "dd/MM/yyyy") : "Selecione uma data..."}
              </Button.Content>
              <Button.Icon>
                <FaCalendar />
              </Button.Icon>
            </Button.Root>
          </Popover.Trigger>
          <Popover.Content className="bg-zinc-900">
            <Calendar
              mode="single"
              initialFocus
              selected={formContext.getValues(name)}
              onSelect={(val) => formContext.setValue(name, val)}
            />
          </Popover.Content>
        </Popover.Root>

        {name && (
          <div className="text-red-400">
            {formContext.formState?.errors?.[name]?.message?.toString()}
          </div>
        )}
      </>
    );
  },
);

InputDatePicker.displayName = "DatePicker";

export { InputDatePicker };
