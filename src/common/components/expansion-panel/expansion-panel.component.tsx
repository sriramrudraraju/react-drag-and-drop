import React, { FC, useCallback } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      height: '100%'
    },
    heading: {
      fontSize: 14
    },
  }),
);

interface SimpleExpansionPanelProps {
  id: number;
  isExpanded?: boolean;
  style?: object;
  handleExpand: (flag: boolean) => void;
}

export const SimpleExpansionPanel: FC<SimpleExpansionPanelProps> = ({id, isExpanded = false, style, handleExpand }) => {
  const classes = useStyles();

  const onChange = useCallback(
    (event: React.ChangeEvent<{}>, flag: boolean) => {
      handleExpand(flag);
    },
    [handleExpand]
  );

  return (
    <ExpansionPanel expanded={isExpanded} onChange={onChange} TransitionProps={{timeout: 0}}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>Panel {id}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={style}>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
