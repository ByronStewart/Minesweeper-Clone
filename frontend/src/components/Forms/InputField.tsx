import { FieldHookConfig, useField } from "formik"
import { IconType } from "react-icons"

type InputFieldProps = FieldHookConfig<any> & { label: string; icon?: IconType }

export const InputField = ({
  placeholder,
  label,
  icon,
  type,
  ...props
}: InputFieldProps) => {
  const [field, meta] = useField(props)
  const showError = !!meta.error && meta.touched

  return (
    <div>
      <label className="block mt-4" htmlFor={field.name}>
        {label}
      </label>
      <div className="relative">
        {icon && <span className="absolute ml-3 top-[.9rem]">{icon}</span>}
        <input
          type={type}
          className={`border focus:border-slate-600 rounded-sm ${
            icon ? "px-8" : "px-3"
          } py-2 block w-full ${showError ? "border-red-500" : ""}`}
          {...field}
          placeholder={placeholder}
        />
      </div>
      {showError && (
        <div className=" text-red-500 ml-3 font-thin">{meta.error}</div>
      )}
    </div>
  )
}
