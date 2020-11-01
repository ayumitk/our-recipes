import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import theme from '../styles/theme'

const useStyles = makeStyles(() => ({
  root: {
    fontSize: `0.875rem`,
    borderTop: `solid 1px #c3c3c3`,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}))

const Footer = () => {
  const classes = useStyles()
  return (
    <Typography align="center" className={classes.root}>
      Copyright © 2020 Our Recipes. All Rights Reserved.
    </Typography>
  )
}

export default Footer
