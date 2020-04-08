import React, { FC, useCallback, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: 14
    },
  }),
);

interface SimpleExpansionPanelProps {
  id: number;
  isExpanded?: boolean;
}

export const SimpleExpansionPanel: FC<SimpleExpansionPanelProps> = ({id, isExpanded = false }) => {
  const classes = useStyles();

  const [isExpand , handleExpand] = useState(isExpanded);// its dangerous.. i know

  const onChange = useCallback(
    (event: React.ChangeEvent<{}>, flag: boolean) => {
      handleExpand(flag);
    },
    []
  );

  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={isExpand} onChange={onChange}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Panel {id}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
