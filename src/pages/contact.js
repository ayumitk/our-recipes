import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, navigate } from 'gatsby-plugin-intl'
import { Container, Button, Typography, TextField, withStyles } from '@material-ui/core'
import compose from 'recompose/compose'
import Layout from '../components/layout'
import SEO from '../components/SEO'

const styles = () => ({
  root: {},
})

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
}

class ContactPage extends Component {
  state = {
    isValidated: false,
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }

  render() {
    const { classes, location, pageContext } = this.props
    const lang = pageContext.intl.language

    const page = {
      title: lang === 'en' ? 'Contact' : 'お問い合わせ',
      description: lang === 'en' ? '' : '',
      image: '',
      slug: 'contact',
    }

    return (
      <Layout location={location} customSEO>
        <SEO page={page} />
        <Container maxWidth="sm" style={{ paddingTop: '2.5rem' }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            {lang === 'en' ? 'Contact' : 'お問い合わせ'}
          </Typography>
          <form
            name="contact"
            method="post"
            action="/contact-thanks/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={this.handleSubmit}
          >
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <input type="hidden" name="form-name" value="contact" />
            <div hidden>
              <label htmlFor="bot-field">
                Don’t fill this out:
                <input name="bot-field" id="bot-field" onChange={this.handleChange} />
              </label>
            </div>

            <TextField
              label={lang === 'en' ? 'Your Name' : 'お名前'}
              style={{ margin: '0 0 2rem 0' }}
              fullWidth
              margin="normal"
              type="text"
              name="name"
              onChange={this.handleChange}
              id="name"
              required
            />

            <TextField
              label={lang === 'en' ? 'Email' : 'メールアドレス'}
              style={{ margin: '0 0 2rem 0' }}
              fullWidth
              margin="normal"
              type="email"
              name="email"
              onChange={this.handleChange}
              id="email"
              required
            />

            <TextField
              label={lang === 'en' ? 'Message' : 'メッセージ'}
              style={{ margin: '0 0 2rem 0' }}
              multiline
              fullWidth
              rowsMax="5"
              onChange={this.handleChange}
              name="message"
              id="message"
              required
            />

            <div style={{ textAlign: 'center' }}>
              <Button type="submit" variant="contained" color="primary" size="large">
                {lang === 'en' ? 'Send' : '送信'}
              </Button>
            </div>
          </form>
        </Container>
      </Layout>
    )
  }
}

ContactPage.propTypes = {
  classes: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default compose(injectIntl, withStyles(styles))(ContactPage)
