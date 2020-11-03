import React from 'react'
import { IntlContextConsumer, changeLocale } from 'gatsby-plugin-intl'
import LanguageIcon from '@material-ui/icons/Language'
import { Button, makeStyles } from '@material-ui/core'

const languageName = {
  en: 'EN',
  ja: 'JP',
}

const useStyles = makeStyles(() => ({
  root: {},
  languageBtn: {
    '& .MuiButton-startIcon': {
      marginRight: `4px`,
    },
  },
}))

const Language = () => {
  const classes = useStyles()
  return (
    <IntlContextConsumer>
      {({ languages, language: currentLocale }) =>
        languages.map((language) =>
          currentLocale !== language ? (
            <Button
              key={language}
              onClick={() => changeLocale(language)}
              startIcon={<LanguageIcon />}
              className={classes.languageBtn}
            >
              {languageName[language]}
            </Button>
          ) : (
            ''
          )
        )
      }
    </IntlContextConsumer>
  )
}

export default Language
