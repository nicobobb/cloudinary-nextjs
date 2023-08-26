"use client";
import { useState } from "react";
const Form = () => {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch("/api/image", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="grid w-96 text-center" onSubmit={(e) => handleSubmit(e)}>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button className="mt-6 relative inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500">
          Subir
        </button>
      </form>
    </div>
  );
};

export { Form };
