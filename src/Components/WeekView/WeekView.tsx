import { useEffect, useState } from "react";
import useLocalDB from "../../Hooks/useLocalDB";
import { DayCell } from "../DayCell";
import { Loader } from "../Loader";
import './WeekView.css';

interface DayCellType {
    events: string[];
    date: Date;
}

interface WeekViewProps {
    weekStartDate: Date;
}

interface CalendarEventsType {
    calendarEvents: DayCellType[];
}


const WeekView: React.FC<WeekViewProps> = ({ weekStartDate }) => {
    const [weekCells, setWeekCells] = useState<DayCellType[]>([]);


    const {
        calendarEvents,
    } = useLocalDB();


    // useEffect(() => {
    //     let currDate = new Date();
    //     let cells = []
    //     for (let day = 0; day < 7; day++) {
    //         currDate = new Date((weekStartDate.getTime() + 86400000 * day));
    //         cells.push({ 'events': getEventsByDate(currDate), 'date': new Date(currDate.getTime()) })
    //     }
    //     setWeekCells(cells);
    // }, [calendarEvents]);

    // const isLoading = calendarEvents === undefined;


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
        let currDate = new Date();
        let cells: DayCellType[] = []
        if (calendarEvents) {
            for (let day = 0; day < 7; day++) {
                currDate = new Date((weekStartDate.getTime() + 86400000 * day));
                cells.push({ 'events': getEventsByDate(currDate), 'date': new Date(currDate.getTime()) })
            }
            setWeekCells(cells);
        }
    }, [calendarEvents, weekStartDate])
    return (
        <div className="week-view-container">
            {!calendarEvents
                ? <Loader />
                : weekCells.map(({ events, date }) =>
                    <DayCell key={date.getDate()} events={events} date={date} />
                )}
        </div>
    )
}

export default WeekView;