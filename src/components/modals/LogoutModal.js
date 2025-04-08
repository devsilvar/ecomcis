import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button">Log out</button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <div>
          <h3 className="text-3xl font-abril font-bold">Are you sure?</h3>
          <p className="text-neutral-500">
            Are you sure you want to log out of your account?
          </p>
        </div>

        <div className="flex items-center gap-4">
          <DialogClose>
            <Button className="bg-neutral-200 text-neutral-500">
              No, Cancel
            </Button>
          </DialogClose>

          <Button
            className="flex-1"
            onClick={() => {
              dispatch(logout());
              toast.success("Logged out successfully!");
            }}
          >
            Yes, Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
