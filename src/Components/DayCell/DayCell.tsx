import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


import './DayCell.css';

interface DayCellProps {
    events: string[];
    date: Date;
}

const DayCell: React.FC<DayCellProps> = ({ events, date }) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return (

        <Card sx={{ minWidth: 150 }}>
            <CardContent>
                <div className="day-display">{`${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`}</div>
                <div className="events-container">
                    {events.map((event) =>
                        <div key={event} className="event-display">
                            {event}
                        </div>
                    )}

                </div>
            </CardContent>
        </Card>


        // <div className="day-cell-container">

        //     <div className="day-display">{date.getDate()}</div>
        //     <div className="events-container">
        //         {events.map((event) =>
        //             <div key={event} className="event-display">
        //                 {event}
        //             </div>
        //         )}

        //     </div>
        // </div>
    )
}

export default DayCell;