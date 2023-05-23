import React, { useState } from 'react'
import axios from 'axios'

function Register({ onToggleForm }) {
  const [formData, setFormData] = useState({
    age: '',
    fullName: '',
    email: '',
    location: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    const parsedValue = name === 'age' ? parseInt(value) : value
    setFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const { age, password } = formData

    parseInt(age)

    // Perform client-side validation
    if (isNaN(age) || age < 18 || age > 49) {
      console.log('Invalid age. Age must be a number between 18 and 49.')
      return
    }

    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
    if (!passwordRegex.test(password)) {
      console.log(
        'Invalid password. Password must meet the specified requirements.'
      )
      return
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/signup',
        formData
      )
      console.log(response.data)
    } catch (error) {
      console.log(
        error.response.data.message,
        error.response.data.error,
        error.response.data.statusCode
      )
    }
  }

  return (
    <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
      <div className=" w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800  sm:max-w-md  md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Create and account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            action="post"
            onSubmit={handleSubmit}
          >
            <div className=" flex gap-2">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="Johnny"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="age"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Age
                </label>
                <input
                  type="text"
                  name="age"
                  id="age"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="18"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Your location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                placeholder="Macedonia"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                placeholder="name@company.com"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                required
                onChange={handleChange}
              />
            </div>
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="terms"
                  className="font-light text-gray-500 dark:text-gray-300"
                >
                  I accept the{' '}
                  <a
                    className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                    href="/"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
            >
              Create an account
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <a
                href="/"
                className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                onClick={onToggleForm}
              >
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
