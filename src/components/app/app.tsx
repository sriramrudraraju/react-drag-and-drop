import React, { useState, useCallback  } from 'react';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, makeStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Sorting } from '../sorting/sorting.component';

import './app.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Acordion = ({title}: {title: string}) => {
  const classes = useStyles();
  return (
    <div>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}

const LIST = [
  {
    id: 1,
    children: <Acordion title="Expansion Panel 1" />
  },
  {
    id: 2,
    children: <Acordion title="Expansion Panel 2" />,
  },
  {
    id: 3,
    children: <Acordion title="Expansion Panel 3" />,
  },
  {
    id: 4,
    children: <Acordion title="Expansion Panel 4" />,
  },
  {
    id: 5,
    children: <Acordion title="Expansion Panel 5" />,
  },
  {
    id: 6,
    children: <Acordion title="Expansion Panel 6" />,
  },
  {
    id: 7,
    children: <Acordion title="Expansion Panel 7" />,
  }
];

export const App = () => {

  const [list, setList] = useState(LIST);
  const onListChange = useCallback(
    (eleList) => {
      setList(eleList);
    },
    [setList]
  )

  return (
    <div className="app-root">
      <Sorting 
        list={list}
        onListChange={onListChange}
        columns={3}
      />
    </div>
  );
}

export default App;
