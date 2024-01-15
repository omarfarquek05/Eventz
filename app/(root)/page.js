import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import {getAllEvents} from "@/lib/actions/event.actions"
import Collection from "@/components/EventCollection/Collection"
import Search from '@/components/Search/Search'
import CategoryFilter from "@/components/CategoryFilter/CategoryFilter"

export default async function Home({ searchParams }) {

  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query ) || '';
  const category = (searchParams?.category ) || '';

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6
  })


  return (
    <>
    <section className=" py-5 md:py-10">
    <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
      <div className="flex flex-col justify-center gap-8">
        <h1 className="h1-bold  text-transparent 
        bg-clip-text bg-gradient-to-r from-blue-500 via-yellow-400 to-gray-100">Host, Connect, Celebrate: Your Events, Our Platform!</h1>
        <p className="p-regular-20 md:p-regular-24">Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.</p>
        <Button size="lg" asChild className="button w-full sm:w-fit">
          <Link href="#events">
            Explore Now
          </Link>
        </Button>
      </div>

      <Image 
        src="/assets/images/event.jpg"
        alt="hero"
        width={1000}
        height={1000}
        className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh] rounded-full"
      />
    </div>
  </section> 

  <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
    <h2 className="h2-bold text-transparent 
    bg-clip-text bg-gradient-to-r from-blue-500 via-yellow-400 to-gray-100">Trust by <br /> Thousands of Events</h2>

    <div className="flex w-full flex-col gap-5 md:flex-row">
     {/* <Search />*/}
      <Search />
    {/* <CategoryFilter />*/}
    <CategoryFilter/>
    </div>

    {/* Collection */}
    <Collection 
    data={events?.data}
    emptyTitle="No Events Found"
    emptyStateSubtext="Come back later"
    collectionType="All_Events"
    limit={6}
    page={page}
    totalPages={events?.totalPages}
  />

    </section> 
    </>
  )
}
