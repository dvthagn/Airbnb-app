import { NextResponse } from "next/server";
import getCurrentUser from "@/app/acctions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }

    const body = await req.json();
    const {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      userId,
      price,
    } = body;

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        userId: currentUser.id,
        price: parseInt(price, 10),
      },
    });
    return NextResponse.json(listing, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
