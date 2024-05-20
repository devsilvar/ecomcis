import axios from "axios";
import React, { useState } from "react";

function AddVariation() {
  const [forms, setForms] = useState([{ name: "", title: "", size: "" }]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newForms = [...forms];
    newForms[index][name] = value;
    setForms(newForms);
  };

  const addForm = () => {
    setForms([...forms, { name: "", title: "", size: "" }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(forms);
    try {
      await axios.post("your-endpoint-url", { forms });
      alert("Forms submitted successfully");
    } catch (error) {
      console.error("Error submitting forms:", error);
      alert("Error submitting forms");
    }
  };

  return (
    <div className="p-[35px]">
      <p>Add Variations</p>
      <div className="bg-[#F8F8F8] w-[100%]  rounded-[8px]">
        <form onSubmit={handleSubmit}>
          {forms.map((form, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={(e) => handleChange(index, e)}
                placeholder="Name"
                required
              />
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={(e) => handleChange(index, e)}
                placeholder="Title"
                required
              />
              <input
                type="text"
                name="size"
                value={form.size}
                onChange={(e) => handleChange(index, e)}
                placeholder="Size"
                required
              />
            </div>
          ))}
          <button type="button" onClick={addForm}>
            Add Another Form
          </button>
          <button type="submit">Submit All Forms</button>
        </form>
      </div>
    </div>
  );
}

export default AddVariation;
