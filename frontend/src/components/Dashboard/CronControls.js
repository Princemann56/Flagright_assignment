import React from 'react';
import Button from '../Common/Button';
import './croncontrol.css';


const CronControls = ({ isRunning, onStart, onStop }) => (
    <div className="cron-controls mb-4 d-flex justify-content-between align-items-center">
        <Button onClick={onStart} className="btn btn-start" disabled={isRunning}>
            <i className="fa fa-play"></i> Start Cron Job
        </Button>
        <Button onClick={onStop} className="btn btn-stop" disabled={!isRunning}>
            <i className="fa fa-stop"></i> Stop Cron Job
        </Button>
    </div>
);

export default CronControls;
