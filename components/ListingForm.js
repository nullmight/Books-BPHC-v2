import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Form = ({ formId, listingForm, forNewListing = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    
    bookname: listingForm.bookname,
    author: listingForm.author,
    course: listingForm.course,
    price: listingForm.price,
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      const { data } = await res.json()

      mutate(`/api/listings/${id}`, data, false) // Update the local data without a revalidation
      router.push('/home')
    } catch (error) {
      setMessage('Failed to update listing')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })
      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      router.push('/home')
    } catch (error) {
      console.log(error);
      setMessage('Failed to add listing')
    }
  }

  const handleChange = (e) => {
    const target = e.target
    const name = target.name
    const value = target.value

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNewListing ? postData(form) : putData(form)
    } else {
      setErrors({ errs })
    }
  }

  /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {}
    if (!form.bookname) err.bookname = 'Book name is required'
    if (!form.author) err.author = 'Author is required'
    if (!form.course) err.course = 'Course is required'
    if (!form.price) err.price = 'Price is required'
    return err
  }

    return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Box id={formId} component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              
                <TextField
                  autoComplete="book-name"
                  name="bookname"
                  value={form.bookname}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="bookname"
                  label="Book Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="author"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="author"
                  label="Author"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="course"
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="course"
                  label="Course Code"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="price"
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="price"
                  label="Price"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>

      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    
    </>
  );
}

export default Form
