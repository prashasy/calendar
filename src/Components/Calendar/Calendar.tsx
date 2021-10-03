import { useEffect, useState } from 'react';
import { WeekView } from '../WeekView';
import './Calendar.css';

const weekDays = [1, 2, 3, 4, 5, 6, 0];

const Calendar = () => {
    const today = new Date();
    const [weekStartDate, setWeekStartDate] = useState<Date>(today);

    useEffect(() => {
        let startDate = new Date();
        startDate.setDate(today.getDate() - (weekDays.indexOf(today.getDay())));
        setWeekStartDate(startDate);
    }, []);

    const handleNextClick = () => {
        let startDate = new Date((weekStartDate.getTime() + 86400000 * 7));
        setWeekStartDate(startDate);
    }
    const handlePrevClick = () => {
        let startDate = new Date((weekStartDate.getTime() - 86400000 * 7));
        setWeekStartDate(startDate);
    }
    return (
        <div className="calendar-container">
            <div className="button-section">
                <button onClick={handlePrevClick}>Prev</button>
                <button onClick={handleNextClick}>Next</button>
            </div>
            <div className="week-view-section">
                <WeekView weekStartDate={weekStartDate} />
            </div>
        </div>
    );
};

export default Calendar;