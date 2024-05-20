import React from "react";
import Input from "./Input";
import { useCreateAdminMutation } from "../../../services/adminsApi";

const CREATEADMIFIELDS = [
  {
    name: "name",
    placeholder: "Enter Name",
    text: "Name",
  },
  {
    name: "email",
    placeholder: "Enter email address",
    text: "Email Address",
  },
  {
    name: "Mobile",
    placeholder: "Enter Phone Number",
    text: "mobile",
    type: "tel",
  },
  {
    name: "Password",
    placeholder: "Enter Password",
    text: "Password",
    type: "password",
  },
];

function AddAdmin() {
  const [createAdmin] = useCreateAdminMutation();
  const handleCreateAdmin = (e) => {
    e.preventDefault();

    createAdmin({
      name: e.target.name.value,
      email: e.target.email.value,
      mobile: e.target.Mobile.value,
      password: e.target.Password.value,
      is_staff: "true",
      is_superuser: "false",
      is_active: "true",
    });
  };
  return (
    <div className="px-[35px]">
      <form enctype="multipart/form-data" onSubmit={handleCreateAdmin}>
        <div>
          {CREATEADMIFIELDS.map((fields) => (
            <Input
              className="mt-[23px]"
              key={fields.name}
              name={fields.name}
              placeholder={fields.placeholder}
              topText={fields.text}
              type={fields.type}
            />
          ))}

          <div className="mt-[23px]">
            <button
              className="outline-0 border-[1px] bg-[#242424] w-[100%] h-[56px] rounded-[8px] px-[16px] mt-[16px]"
              placeholder="e.g. Username"
            >
              <p className="font-[500] text-[#ffffff]">invite Admin</p>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddAdmin;
