import { capitalize } from "../../libs/utils";
import { Sheet, SheetContent, SheetTrigger } from "../common/Sheet";

export const ProductDescSheet = ({ desc }) => {
  return (
    <Sheet>
      <SheetTrigger className="text-sm underline">
        <p>Details</p>
      </SheetTrigger>

      <SheetContent className="flex flex-col py-10 gap-6">
        <article className="px-6 py-10 md:px-10">
          <p>{capitalize(desc)}</p>
        </article>
      </SheetContent>
    </Sheet>
  );
};
