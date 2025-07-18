import { useState } from 'react'
import { User, Mail, Phone, Calendar, MapPin, BookOpen, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    zipCode: '',
    program: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const programs = [
    'Computer Science',
    'Business Administration',
    'Engineering',
    'Medicine',
    'Psychology',
    'Art & Design',
    'Mathematics',
    'Literature'
  ]

  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    // Date of birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required'
    } else {
      const birthDate = new Date(formData.dateOfBirth)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      if (age < 16 || age > 100) {
        newErrors.dateOfBirth = 'Age must be between 16 and 100 years'
      }
    }

    // Address validation
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required'

    // Program validation
    if (!formData.program) newErrors.program = 'Please select a program'

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number'
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    // Terms validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="success-container">
        <div className="success-card">
          <CheckCircle className="success-icon" />
          <h1>Registration Successful!</h1>
          <p>Welcome to our university, {formData.firstName}!</p>
          <p>We've sent a confirmation email to {formData.email}</p>
          <button 
            className="btn-primary"
            onClick={() => {
              setIsSubmitted(false)
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                dateOfBirth: '',
                address: '',
                city: '',
                zipCode: '',
                program: '',
                password: '',
                confirmPassword: '',
                agreeToTerms: false
              })
            }}
          >
            Register Another Student
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="background-pattern"></div>
      
      <div className="container">
        <div className="header">
          <div className="logo">
            <BookOpen className="logo-icon" />
            <span>EduPortal</span>
          </div>
          <h1>Student Registration</h1>
          <p>Join our community of learners and start your educational journey</p>
        </div>

        <form className="registration-form" onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <div className="form-section">
            <h2>Personal Information</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">
                  <User size={18} />
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? 'error' : ''}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <span className="error-message">
                    <AlertCircle size={16} />
                    {errors.firstName}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">
                  <User size={18} />
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? 'error' : ''}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <span className="error-message">
                    <AlertCircle size={16} />
                    {errors.lastName}
                  </span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">
                  <Mail size={18} />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <span className="error-message">
                    <AlertCircle size={16} />
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  <Phone size={18} />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <span className="error-message">
                    <AlertCircle size={16} />
                    {errors.phone}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">
                <Calendar size={18} />
                Date of Birth *
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={errors.dateOfBirth ? 'error' : ''}
              />
              {errors.dateOfBirth && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.dateOfBirth}
                </span>
              )}
            </div>
          </div>

          {/* Address Information Section */}
          <div className="form-section">
            <h2>Address Information</h2>
            
            <div className="form-group">
              <label htmlFor="address">
                <MapPin size={18} />
                Street Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={errors.address ? 'error' : ''}
                placeholder="Enter your street address"
              />
              {errors.address && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.address}
                </span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={errors.city ? 'error' : ''}
                  placeholder="Enter your city"
                />
                {errors.city && (
                  <span className="error-message">
                    <AlertCircle size={16} />
                    {errors.city}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="zipCode">ZIP Code *</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={errors.zipCode ? 'error' : ''}
                  placeholder="Enter ZIP code"
                />
                {errors.zipCode && (
                  <span className="error-message">
                    <AlertCircle size={16} />
                    {errors.zipCode}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="form-section">
            <h2>Academic Information</h2>
            
            <div className="form-group">
              <label htmlFor="program">
                <BookOpen size={18} />
                Program of Study *
              </label>
              <select
                id="program"
                name="program"
                value={formData.program}
                onChange={handleInputChange}
                className={errors.program ? 'error' : ''}
              >
                <option value="">Select a program</option>
                {programs.map(program => (
                  <option key={program} value={program}>{program}</option>
                ))}
              </select>
              {errors.program && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.program}
                </span>
              )}
            </div>
          </div>

          {/* Security Section */}
          <div className="form-section">
            <h2>Account Security</h2>
            
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? 'error' : ''}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.password}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <div className="password-input">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={errors.confirmPassword ? 'error' : ''}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="form-section">
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className={errors.agreeToTerms ? 'error' : ''}
                />
                <span className="checkmark"></span>
                I agree to the <a href="#" className="link">Terms and Conditions</a> and <a href="#" className="link">Privacy Policy</a> *
              </label>
              {errors.agreeToTerms && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.agreeToTerms}
                </span>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="spinner"></div>
                Processing Registration...
              </>
            ) : (
              'Complete Registration'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default App