import { useEffect, useState } from 'react';
import { WeekView } from '../WeekView';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

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
            <Grid container spacing={2} alignItems="center" justifyContent='center'>
                <Grid item sm={8}>
                    <Button variant="contained" onClick={handlePrevClick}>Prev</Button>
                </Grid>
                <Grid item sm={1}>
                    <Button variant="contained" onClick={handleNextClick}>Next</Button>
                </Grid>
                <Grid item lg={12}>
                    <Divider variant="middle" style={{
                        width: '100%',
                        margin: '20px'
                    }} />
                </Grid>
            </Grid>


            <Grid container spacing={2} alignItems="center" justifyContent='center'>
                <Grid item>
                    <WeekView weekStartDate={weekStartDate} />
                </Grid>
            </Grid>
        </div>
    );
};

export default Calendar;