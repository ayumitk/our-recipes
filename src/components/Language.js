import React from 'react'
import { IntlContextConsumer, changeLocale } from 'gatsby-plugin-intl'
import LanguageIcon from '@material-ui/icons/Language'
import Button from '@material-ui/core/Button'

const languageName = {
  en: 'English',
  ja: '日本語',
}

const Language = () => (
  <IntlContextConsumer>
    {({ languages, language: currentLocale }) =>
      languages.map((language) =>
        currentLocale !== language ? (
          <Button key={language} onClick={() => changeLocale(language)} startIcon={<LanguageIcon />}>
            {languageName[language]}
          </Button>
        ) : (
          ''
        )
      )
    }
  </IntlContextConsumer>
)

export default Language
