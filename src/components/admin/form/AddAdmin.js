import React, {useState, useEffect} from "react";
import Input from "./Input";
import { toast } from "react-toastify";
import { useCreateAdminMutation } from "../../../services/adminsApi";
import ClipLoader from "react-spinners/ClipLoader";

function AddAdmin() {
  const [createAdmin, {isLoading}] = useCreateAdminMutation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const notify = (msg) => toast(msg);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);

  };

  const handleCreateAdmin = (e) => {
    e.preventDefault();

    let payload = {
      username: username.replace(/\s+/g, '_'),
      email: email,
      mobile: mobile,
      password: password,
      is_staff: "true",
      is_superuser: "false",
      is_active: "true",
    }

    createAdmin(payload).then((res) => {
      console.log(res);
      if (res.error) {
        for (const [field, messages] of Object.entries(res.error.data)) {
          if (Array.isArray(messages)) {
              // Handle array of error messages
              messages.forEach(message => {
                  notify(`${field}: ${message}`);
              });
          } else if (typeof messages === 'string') {
              // Handle single error message string
              notify(`${field}: ${messages}`);
          }
      }


      } else {
        notify("Admin Created Successfully");
        window.location.href = "/admin/admins";
      }
    });
  };


  return (
    <div className="px-[35px]">
      <form enctype="multipart/form-data">
        <div>
          <Input 
            className={"mt-[23px]"}
            name={username}
            placeholder={"Enter Name"}
            topText={"Name"}
            type={"text"}
            onChange={handleUsernameChange}
            value={username}
          />
          <Input
            className={"mt-[23px]"}
            name="email"
            placeholder={"Enter email address"}
            topText={"Email Address"}
            type={"email"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            />
          <Input
            className={"mt-[23px]"}
            name="mobile"
            placeholder={"Enter Phone Number"}
            topText={"Phone Number"}
            type={"tel"}
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
          />
          <Input
            className={"mt-[23px]"}
            name="password"
            placeholder={"Enter Password"}
            topText={"Password"}
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />

          <div className="mt-[23px]">
            <button
              onClick={handleCreateAdmin}
              disabled={isLoading}
              className="outline-0 border-[1px] bg-[#242424] w-[100%] h-[56px] rounded-[8px] px-[16px] mt-[16px]"
            >
              <p className="font-[500] text-[#ffffff]">
                {isLoading ? <ClipLoader
                              size={20}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                              color="#ffffff"
                            />: "Invite Admin"}</p>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddAdmin;
