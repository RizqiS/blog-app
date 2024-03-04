import { forwardRef } from "react";

type TInputProps = {
  label: React.LabelHTMLAttributes<HTMLLabelElement> | undefined;
  input?: React.InputHTMLAttributes<HTMLInputElement> | undefined;
  textarea?: React.TextareaHTMLAttributes<HTMLTextAreaElement> | undefined;
  text: string;
  option: "input" | "textarea";
};

type Ref = HTMLInputElement | HTMLTextAreaElement | undefined;

const Input = forwardRef<Ref, TInputProps>((props, ref) => {
  const inputRef = ref as React.RefObject<HTMLInputElement>;
  const textareaRef = ref as React.RefObject<HTMLTextAreaElement>;
  const classInput =
    "w-full px-3 py-1.5 rounded-md outline-none ring ring-slate-400 focus:ring-slate-500 active:ring-slate-600 placeholder:text-sm placeholder:text-slate-300 focus:text-slate-800";
  return (
    <div className="mb-3">
      <label {...props.label} className="block mb-3 text-xl text-slate-700 tracking-wider font-serif">
        {props.text}
      </label>
      {props.option === "input" && <input ref={inputRef} className={classInput} {...props.input} />}
      {props.option === "textarea" && <textarea ref={textareaRef} className={classInput} {...props.textarea} />}
    </div>
  );
});

export default Input;
