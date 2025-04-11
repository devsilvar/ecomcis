import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import Button from "../common/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../common/Dialog";

export const LogoutDialog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-white underline md:underline md:text-black"
        >
          Log out
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <div>
          <h3 className="text-3xl font-abril font-bold">Are you sure?</h3>
          <p className="text-neutral-500">
            Are you sure you want to log out of your account?
          </p>
        </div>

        <div className="flex flex-col mt-5 justify-end md:flex-row md:items-center gap-2 md:gap-4">
          <DialogClose asChild>
            <Button className="bg-neutral-200 w-full text-neutral-500">
              No, Cancel
            </Button>
          </DialogClose>

          <Button
            className="w-full"
            onClick={() => {
              dispatch(logout());
              toast.success("Logged out successfully!");
              navigate("/");
            }}
          >
            Yes, Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
