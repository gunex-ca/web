import { ImageCarousel } from "../../../../(search)/listings/[listing]/_components/ImageCarousel";
import { SellerSection } from "../../../../(search)/listings/[listing]/_components/SellersSection";

export const Preview = () => {
  const images = [
    {
      id: "1",
      url: "https://picsum.photos/id/1011/1200/900",
      alt: "Rifle on table",
      sortOrder: 0,
    },
    {
      id: "2",
      url: "https://picsum.photos/id/1015/600/900",
      alt: "Scope close-up (portrait)",
      sortOrder: 1,
    },
    {
      id: "3",
      url: "https://picsum.photos/id/1025/900/600",
      alt: "Stock detail (landscape)",
      sortOrder: 2,
    },
    {
      id: "4",
      url: "https://picsum.photos/id/1035/400/1200",
      alt: "Vertical image",
      sortOrder: 3,
    },
    {
      id: "5",
      url: "https://picsum.photos/id/1045/1600/400",
      alt: "Wide panoramic image",
      sortOrder: 4,
    },
  ];
  return (
    <div className="rounded-md border">
      <ImageCarousel
        className="roduned-t-md h-[calc(50vh-60px)] min-h-[200px] w-full rounded-b-none"
        images={images}
      />
      <div className=" h-[calc(50vh-60px)] shrink-0 flex-col overflow-scroll">
        <div className="flex-grow space-y-4 overflow-y-scroll p-4 md:p-6">
          <SellerSection
            seller={{
              username: "johndoe",
              rating: 4.5,
              reviews: 100,
              createdAt: new Date(),
            }}
          />
        </div>
      </div>
    </div>
  );
};
