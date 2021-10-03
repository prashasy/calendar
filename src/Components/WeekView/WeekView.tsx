import { DayCell } from "../DayCell";
import './WeekView.css';

interface DayCellType {
    events: string[];
    date: Date;
}

interface WeekViewProps {
    weekStartDate: Date;
}


const WeekView: React.FC<WeekViewProps> = ({ weekStartDate }) => {
    const weekCells: DayCellType[] = [];
    let currDate = new Date();
    for (let day = 0; day < 7; day++) {
        currDate = new Date((weekStartDate.getTime() + 86400000 * day));
        console.log(currDate);
        weekCells.push({ 'events': ['hello'], 'date': new Date(currDate.getTime()) });
    }
    console.log(weekStartDate);
    console.log(weekCells);
    return (
        <div className="week-view-container">
            {weekCells.map(({ events, date }) =>
                <DayCell key={date.getDate()} events={events} date={date} />
            )}
        </div>
    )
}

export default WeekView;