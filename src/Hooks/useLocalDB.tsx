import Localbase from 'localbase';
import { useEffect, useState } from 'react';

interface EventType {
    events: string[];
    date: Date;
}

interface CalendarEventsType {
    calendarEvents: EventType[]
}

const useLocalDB = () => {
    const calendarDB = new Localbase('calendarDB');
    const [calendarEvents, setCalendarEvents] = useState<EventType[]>();

    const getCalendarEvents = async () => {
        let events: EventType[] = await calendarDB.collection('calendarEvents')
            .get();
        events.forEach((ev) => {
            ev.date = new Date(ev.date);
        })
        return events;
    }

    const initializeCalendarDB = async () => {
        let events = await getCalendarEvents();

        if (events.length === 0) {
            const data: CalendarEventsType = await (await (fetch('http://localhost:4000/getCalendarEvents'))).json();
            data['calendarEvents'].forEach(async (event: EventType) => {
                await calendarDB.collection('calendarEvents').add(event);
            })
            data.calendarEvents.forEach((ev) => {
                ev.date = new Date(ev.date);
            });
            setCalendarEvents(data.calendarEvents);
            return;
        }
        events = await getCalendarEvents();
        setCalendarEvents(events);
    }

    const checkDateEquality = (d1: Date, d2: Date): boolean => {
        return d1.getFullYear() === d2.getFullYear() && d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth();
    }
    const getEventsByDate = (date: Date) => {
        const results: string[] = [];
        calendarEvents?.forEach((ev) => {
            if (checkDateEquality(ev.date, date))
                ev.events.forEach((e: string) => results.push(e));
        })
        return results;
    }

    useEffect(() => {
        initializeCalendarDB();
    }, [])

    return {
        calendarEvents, getEventsByDate
    }
}

export default useLocalDB;