import { useController } from "react-hook-form";
import { cn } from "../../libs/utils";

export const Textarea = ({
  label,
  control,
  name,
  className,
  wrapperClassName,
  ...props
}) => {
  const {
    fieldState: { error },
    field,
  } = useController({
    name,
    control,
  });

  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      {label ? (
        <label htmlFor={name} className="text-neutral-700 text-sm">
          {label}
        </label>
      ) : null}
      <textarea
        id={name}
        aria-invalid={error ? "true" : "false"}
        data-invalid={error ? "true" : "false"}
        className={cn(
          "text-base flex resize-none w-full rounded border-none ring-1 appearance-none bg-white ring-crystal-clear-400 px-4 py-3 transition-all placeholder:text-neutral-300 focus:ring-rebel-ruby-100 focus:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[invalid=true]:border-error data-[invalid=true]:bg-error/5",
          className
        )}
        {...field}
        {...props}
      />
    </div>
  );
};
