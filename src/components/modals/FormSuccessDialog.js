import { Dialog, DialogContent, DialogTitle } from "../common/Dialog";
import LogoIcon from "../../assets/icons/icon-2.svg";

export const FormSuccessDialog = ({ open, setOpen, text }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm text-lg flex flex-col gap-2 rounded py-20">
        <img
          src={LogoIcon}
          alt="Success"
          className="size-[70px] mx-auto mb-4"
        />
        <p className="leading-relaxed text-center">{text}</p>
      </DialogContent>
    </Dialog>
  );
};
