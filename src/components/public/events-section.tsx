"use client";

import { useState } from "react";
import { EventCard } from "./event-card";
import { EventModal } from "./event-modal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getEventStatus } from "@/lib/actions/event";

interface EventsSectionProps {
    events: any[];
}

export function EventsSection({ events }: EventsSectionProps) {
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [selectedEventStatus, setSelectedEventStatus] = useState<string>("");

    if (events.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-slate-400">No upcoming events. Check back soon!</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.slice(0, 6).map((event) => {
                    const status = getEventStatus(event);
                    return (
                        <EventCard
                            key={event.id}
                            event={event}
                            status={status}
                            onClick={(id) => {
                                const fullEvent = events.find(e => e.id === id);
                                if (fullEvent) {
                                    setSelectedEvent(fullEvent);
                                    setSelectedEventStatus(getEventStatus(fullEvent));
                                }
                            }}
                        />
                    );
                })}
            </div>

            {events.length > 6 && (
                <div className="text-center mt-8">
                    <Link href="/login">
                        <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                            View All Events
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            )}

            <EventModal
                event={selectedEvent}
                status={selectedEventStatus}
                onClose={() => {
                    setSelectedEvent(null);
                    setSelectedEventStatus("");
                }}
            />
        </>
    );
}
