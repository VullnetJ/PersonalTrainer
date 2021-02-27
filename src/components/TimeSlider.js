import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Slider } from '@material-ui/core';

const styling = makeStyles(theme => ({
  root: {
    width: 320,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

function timeText(timeInMins) {
  return `${timeInMins}m`;
}

export default function TimeSlider(props) {
  const classes = styling();
  const [timeInMins, setTimeInMins] = React.useState(60);

  const slide = (event, newValue) => {
    setTimeInMins(newValue);
    props.setNewTraining({ ...props.newTraining, duration: Number(newValue) })
  }
  const marks = [
    {
      value: 30,
      label: '30m',
    },
    {
      value: 40,
      label: '40m',
    },
    {
      value: 50,
      label: '50m',
    },
    {
      value: 60,
      label: '60m',
    },
    {
      value: 70,
      label: '70m',
    },
    {
      value: 80,
      label: '80m',
    },
    {
      value: 90,
      label: '90m',
    },
  ];


  return (
    <div className={classes.root}>
      <div className={classes.margin} />
      <Typography id="discrete-slider-custom" gutterBottom variant="h6" >
        Length of training in Minutes <br></br>
        (Note: The default time is 60 mins)
      </Typography>
      <Slider
        timeInMins={typeof timeInMins === 'number' ? timeInMins : 0}
        id="sliderId"
        defaultValue={60}
        name="duration"
        onChange={slide}

        getAriaValueText={timeText}
        aria-labelledby="discrete-slider-custom"
        marks={marks}
        step={10}
        min={30}
        max={90}
        valueLabelDisplay="auto"
      />
    </div>
  );
}