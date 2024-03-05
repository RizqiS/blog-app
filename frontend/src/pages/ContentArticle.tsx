import { TEvents } from "../types/events";
import ContentLeftArticleHome from "../components/homes/ContentLeftArticleHome";
import ContentRigthArticleHome from "../components/homes/ContentRigthArticleHome";

type TContentArticleProps = {
  events: TEvents[];
};

export default function ContentArticle({ events }: TContentArticleProps) {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-y-6 md:flex-row md:gap-y-0 m-2">
        <div className="w-full md:w-1/2 md:m-6 ">
          <div className="flex flex-col gap-y-6">
            <ContentLeftArticleHome events={events[0]} />
            <ContentLeftArticleHome events={events[1]} />
          </div>
        </div>
        <div className="w-full h-[300px] border md:m-6 md:w-1/2 md:h-[622px]">
          <ContentRigthArticleHome events={events[2]} />
        </div>
      </div>
    </div>
  );
}
