import React from "react";
import { IEvent } from "@/lib/mongodb/database/models/event.model";
import Link from "next/link";
import Image from "next/image";
import { formatDateTime } from "@/lib/utils";

type CardProps = {
  event: IEvent;
  hasOrderLink: boolean;
  hidePrice: boolean;
};

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  return (
    <div className="group relative flex flex-col min-h-[380px] w-full max-w-[400px] overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-gray-500"
      />
      {/* IS EVENT CREATOR */}
      <Link
        href={`/events/${event._id}`}
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
      >
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
              {event.isFree ? "FREE" : `$${event.price}`}
            </span>
            <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500">
              {event.category.name}
            </p>
          </div>
        )}
        <p className="p-medium-16 md:p-medium-18 text-grey-500">
          {formatDateTime(event.startDateTime).dateTime}
        </p>
        <p className="p-meduim-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
          {event.title}
        </p>
        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-500">
            {event.organizer.firstName} {event.organizer.lastName}
          </p>
          {hasOrderLink && (
            <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
              <p className="text-primary-500">OrderDetails</p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="search"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </Link>
    </div>
  );
};
export default Card;
