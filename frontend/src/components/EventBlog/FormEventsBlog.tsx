import { useRef, useState } from "react";
import Input from "../UI/Input";
import { z } from "zod";
import { useSubmit } from "react-router-dom";
import { TEvents } from "../../types/events";

type TFormEvents = {
  method: "post" | "patch";
  action: string;
  events?: TEvents;
};

const BlogInputForm = z.object({
  title: z.string().min(5),
  image: z.string().url(),
  description: z.string().min(5),
});

export default function FormEventsBlog({ method, action, events }: TFormEvents) {
  const submit = useSubmit();
  const [message, setMessage] = useState({
    title: "",
    image: "",
    description: "",
  });

  const inputTitleRef = useRef<HTMLInputElement>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valueInputTitle = inputTitleRef.current?.value;
    const valueInputImage = inputImageRef.current?.value;
    const valueInputDescription = textareaRef.current?.value;

    const validData = BlogInputForm.safeParse({
      title: valueInputTitle,
      image: valueInputImage,
      description: valueInputDescription,
    });

    if (!validData.success) {
      const format = validData.error.format();
      const errorTitle = format.title?._errors;
      const errorImage = format.image?._errors;
      const errorDescription = format.description?._errors;

      setMessage({
        title: errorTitle ? errorTitle[0] : "",
        image: errorImage ? errorImage[0] : "",
        description: errorDescription ? errorDescription[0] : "",
      });
    } else {
      /* if events is not null then update the data else create new */
      const valid_data = events ? { ...validData.data, _id: events._id } : validData.data;
      submit(valid_data, { method, action });
    }

    const target = event.target as HTMLFormElement;
    target.reset();
  };

  return (
    <div className="w-1/2 mb-3">
      <form onSubmit={handleSubmit}>
        <Input
          text="Title Blogs"
          label={{ htmlFor: "title", "aria-label": "title" }}
          input={{
            type: "text",
            id: "title",
            name: "title",
            defaultValue: `${events ? events.title : ""}`,
            placeholder: "Please Input Title Blogs",
            "aria-label": "title",
            required: true,
          }}
          ref={inputTitleRef}
          option="input"
        />
        {message.title && <p className="text-red-500 my-3">{message.title}</p>}
        <Input
          text="Image Blogs"
          label={{ htmlFor: "image", "aria-label": "url-image" }}
          input={{
            type: "url",
            id: "image",
            name: "image",
            defaultValue: `${events ? events.image : ""}`,
            placeholder: "Please Input your url Images Blogs",
            "aria-label": "image",
            required: true,
          }}
          ref={inputImageRef}
          option="input"
        />
        {message.image && <p className="text-red-500 my-3">{message.image}</p>}
        <Input
          label={{ htmlFor: "description", "aria-label": "description" }}
          text="Description Blogs"
          textarea={{
            id: "description",
            name: "description",
            defaultValue: `${events ? events.description : ""}`,
            rows: 10,
            cols: 30,
            placeholder: "Please Input Description Blogs",
            "aria-label": "description",
            required: true,
          }}
          ref={textareaRef}
          option="textarea"
        />
        {message.description && <p className="text-red-500 my-3">{message.description}</p>}
        <button className="transition duration-150 bg-slate-500 text-slate-100 py-1 px-3 rounded-md hover:bg-slate-600">
          {method === "post" ? "Save" : "Edit"} Blog
        </button>
      </form>
    </div>
  );
}
