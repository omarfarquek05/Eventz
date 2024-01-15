import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { auth } from '@clerk/nextjs'
import Collection from '@/components/EventCollection/Collection'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { getOrdersByUser } from '@/lib/actions/order.actions'


const ProfilePage = async({ searchParams }) => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId

    const ordersPage = Number(searchParams?.ordersPage) || 1;
    const eventsPage = Number(searchParams?.eventsPage) || 1;
  
    const orders = await getOrdersByUser({ userId, page: ordersPage})
  
    const orderedEvents = orders?.data.map((order) => order.event) || [];
    const organizedEvents = await getEventsByUser({ userId, page: eventsPage })

  return (
    <>
      {/* My Tickets */}
      <section className=" py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex dark:text-white" >
            <Link href="/#events">
              Explore More Events
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">      
      {/* Collection */}
    
      <Collection 
        data={orderedEvents}
        emptyTitle="No event tickets purchased yet"
        emptyStateSubtext="No worries - plenty of exciting events to explore!"
        collectionType="My_Tickets"
        limit={3}
        page={ordersPage}
        urlParamName="ordersPage"
        totalPages={orders?.totalPages}
      /> 
    </section>

      {/* Events Organized */}
      <section className=" py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Events Organized</h3>
          <Button asChild size="lg" className="button hidden sm:flex dark:text-white">
            <Link href="/events/create">
              Create New Event
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
      <Collection 
        data={organizedEvents?.data}
        emptyTitle="No events have been created yet"
        emptyStateSubtext="Go create some now"
        collectionType="Events_Organized"
        limit={3}
        page={eventsPage}
        urlParamName="eventsPage"
        totalPages={organizedEvents?.totalPages}
      />
    </section>

    </> 
  )
}

export default  ProfilePage