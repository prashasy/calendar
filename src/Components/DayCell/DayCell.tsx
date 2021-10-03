import './DayCell.css';

interface DayCellProps {
    events: string[];
    date: Date;
}

const DayCell: React.FC<DayCellProps> = ({ events, date }) => {
    return (
        <div className="day-cell-container">

            <div className="day-display">{date.getDate()}</div>
            <div className="events-container">
                {events.map((event) =>
                    <div key={event} className="event-display">
                        {event}
                    </div>
                )}

            </div>
        </div>
    )
}

export default DayCell;