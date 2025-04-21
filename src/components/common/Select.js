import { useController } from "react-hook-form";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as React from "react";
import { PiCaretDown } from "react-icons/pi";
import { cn } from "../../libs/utils";

export const Select = ({
  children,
  label,
  labelClassName,
  name,
  control,
  placeholder,
  className,
  wrapperClassName,
  ...rest
}) => {
  const {
    field: { value, onChange, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <label className={cn("flex flex-col gap-1.5 font-body", wrapperClassName)}>
      <p className={cn("text-sm text-neutral-400", labelClassName)}>{label}</p>

      <SelectPrimitive.Root value={value} onValueChange={onChange}>
        <SelectPrimitive.Trigger
          ref={ref}
          data-invalid={error ? "true" : "false"}
          className={cn(
            "flex w-full items-center justify-between rounded-md border-none ring-1 appearance-none bg-white ring-crystal-clear-400 px-4 py-3 capitalize transition-all focus:ring-rebel-ruby-100 focus:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[invalid=true]:border-red-600 data-[invalid=true]:bg-error/5 data-[placeholder=true]:normal-case data-[placeholder]:text-neutral-300 [&>span]:line-clamp-1",
            className
          )}
          {...rest}
        >
          <SelectPrimitive.Value
            placeholder={placeholder ?? "Select a value"}
            // className="placeholder:normal-case placeholder:text-neutral-300"
          />
          <SelectPrimitive.Icon asChild>
            <PiCaretDown className="text-neutral-400" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className="relative z-50 max-h-96 overflow-hidden rounded-lg border border-neutral-200 bg-white text-neutral-900 shadow-[0px_4px_52.4px_rgba(0,0,0,0.1)] data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
            position="popper"
          >
            <SelectPrimitive.Viewport className="h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]">
              {children}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {/* {error ? <ErrorMessage message={error.message} /> : null} */}
    </label>
  );
};

export const SelectItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "group relative flex w-full bg-white cursor-pointer select-none items-center px-5 py-3 font-body text-sm capitalize text-neutral-700 data-[highlighted]:bg-neutral-200 outline-none transition-all last-of-type:border-b-0 data-[disabled]:pointer-events-none",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>

      <span className="absolute right-4 ml-auto flex size-5 items-center justify-center rounded-full border-2 border-neutral-300 transition-all group-hover:border-primary-300 group-focus-visible:border-primary-300 group-data-[highlighted]:border-rebel-ruby-100 group-data-[state=checked]:border-rebel-ruby-100">
        <SelectPrimitive.ItemIndicator className="size-2.5 rounded-full bg-rebel-ruby-100" />
      </span>
    </SelectPrimitive.Item>
  )
);
SelectItem.displayName = SelectPrimitive.Item.displayName;
