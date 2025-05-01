import { Dialog, DialogContent } from "../common/Dialog";
import { useNavigate } from "react-router-dom";
import { PiInstagramLogoFill, PiTiktokLogoFill } from "react-icons/pi";
import { Textarea } from "../common/Textarea";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import { ArrowRight } from "../../assets/icons/ArrowRight";
import { TextInput } from "../common/TextInput";

const url =
  "https://s3-alpha-sig.figma.com/img/f9aa/a961/903295f445e255c3a087f2f37be64b6d?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=T4Ol3l5fmvzu8PAecdiXbE8fnr0yw59codM09JFtrqAqh02ZBh1n9FXIWqj9S6JxsRP9ZLHErYEIRa9djQrgl3Cp8y8ZKIR1MHiDNihVESaVVRPGesIkMqTIhtGCZ8StjZ4xux6APUGbZ9FFW9~iZVe3wiNzWORxf3ECZ8T4Q2arQb8YGJMdxHZ7qaoUMSu~QzwqLw22zCl1mso-lKNGxcnoCGtMBQtwxJM~llPQthT~nv1dlIKaWVCyKgQW4SWQ8mquoek3dDM3~lnBBCmdAfl4kJLqUBKqKxSk4SChGbThwoluLzbAIdqE1bMasPPGlC182T7rqiu9c~9W5Vg-Ow__";

export const BecomeExclusiveDialog = ({ open, setOpen }) => {
  const { control, handleSubmit } = useForm({});
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="lg:grid lg:grid-cols-2 p-0 max-w-4xl">
        <img
          src={url}
          alt="Our Story"
          className="w-full object-cover object-top h-72 lg:h-[600px]"
        />

        <div className="px-4 py-8 flex flex-col">
          <div className="flex flex-col gap-2 w-60 md:w-[350px]">
            <p>First Timer</p>
            <h2 className="md:text-5xl text-3xl">Become an Exclusive Member</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="my-auto">
            <TextInput
              control={control}
              type="email"
              name="email"
              label="Join now and get 10% off your first order as a member of our community."
              placeholder="Your email"
              required
            />

            <Button disabled type="submit" className="mt-5 bg-black">
              <span>Submit</span>
              <ArrowRight className="text-xl" />
            </Button>
          </form>

          <div className="flex flex-col gap-1 mt-auto">
            <p>Follow AMARAÉ Socials to stay connected</p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://www.tiktok.com/@amarae.io?_t=ZN-8v0LgegdrK2&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="size-8 rounded-full text-white hover:bg-rebel-ruby-100 transition-all hover:scale-110 grid place-items-center bg-black"
              >
                <PiTiktokLogoFill />
              </a>
              <a
                href="https://www.instagram.com/amaraebrand?igsh=YmxhdGZkNTJ3MXZ5&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="size-8 text-white hover:bg-rebel-ruby-100 transition-all hover:scale-110 rounded-full grid place-items-center bg-black"
              >
                <PiInstagramLogoFill />
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
