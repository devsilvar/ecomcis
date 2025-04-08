import { Dialog, DialogContent } from "../common/Dialog";
import { useNavigate } from "react-router-dom";
import { PiInstagramLogoFill, PiTiktokLogoFill } from "react-icons/pi";

const url =
  "https://s3-alpha-sig.figma.com/img/f9aa/a961/903295f445e255c3a087f2f37be64b6d?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=T4Ol3l5fmvzu8PAecdiXbE8fnr0yw59codM09JFtrqAqh02ZBh1n9FXIWqj9S6JxsRP9ZLHErYEIRa9djQrgl3Cp8y8ZKIR1MHiDNihVESaVVRPGesIkMqTIhtGCZ8StjZ4xux6APUGbZ9FFW9~iZVe3wiNzWORxf3ECZ8T4Q2arQb8YGJMdxHZ7qaoUMSu~QzwqLw22zCl1mso-lKNGxcnoCGtMBQtwxJM~llPQthT~nv1dlIKaWVCyKgQW4SWQ8mquoek3dDM3~lnBBCmdAfl4kJLqUBKqKxSk4SChGbThwoluLzbAIdqE1bMasPPGlC182T7rqiu9c~9W5Vg-Ow__";

export const ThankYouForShoppingDialog = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        navigate("/shop");
        setOpen(false);
      }}
    >
      <DialogContent className="grid grid-cols-2 p-0 max-w-4xl">
        <img
          src={url}
          alt="Our Story"
          className="w-full object-cover object-top h-[600px]"
        />

        <div className="px-4 py-8 flex flex-col">
          <h2 className="text-5xl w-72">Thank You For Shopping With Us</h2>
          <p className="pt-1">
            We have sent an order confirmation to your mail
          </p>

          <div className="flex flex-col gap-1 mt-auto">
            <p>Follow Amarae Socials to stay connected</p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://www.facebook.com"
                className="size-8 rounded-full text-white hover:bg-rebel-ruby-100 transition-all hover:scale-110 grid place-items-center bg-black"
              >
                <PiTiktokLogoFill />
              </a>
              <a
                href="https://www.instagram.com"
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
