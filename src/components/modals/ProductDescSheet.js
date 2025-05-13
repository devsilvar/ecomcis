import { capitalize } from "../../libs/utils";
import { Sheet, SheetContent, SheetTrigger } from "../common/Sheet";
import '../../pages/admin/descriptionEditor/editor.css'

export const ProductDescSheet = ({ desc }) => {
  return (
    <Sheet>
      <SheetTrigger className="text-sm underline">
        <p>More Description</p>
      </SheetTrigger>

      <SheetContent className="flex flex-col py-5 gap-6">
        <article className="px-6 py-10 md:px-10">
        <div className="editor-content" dangerouslySetInnerHTML={{ __html: desc }} />
          {/* <p>{capitalize(desc)}</p> */}
        </article>
      </SheetContent>
    </Sheet>
  );
};
