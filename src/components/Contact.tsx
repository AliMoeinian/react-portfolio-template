import React, { useRef, useState } from 'react';
import '../assets/styles/Contact.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';

function Contact() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<boolean>(false);

  const form = useRef<HTMLFormElement>(null);

  // Detect theme mode from parent component
  const isDarkMode = document.querySelector('.main-container')?.classList.contains('dark-mode') ?? true;

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    const isNameValid = name.trim() !== '';
    const isEmailValid = email.trim() !== '';
    const isMessageValid = message.trim() !== '';

    setNameError(!isNameValid);
    setEmailError(!isEmailValid);
    setMessageError(!isMessageValid);

    if (isNameValid && isEmailValid && isMessageValid) {
      // Placeholder for emailJS logic
      setName('');
      setEmail('');
      setMessage('');
      console.log('Form submitted successfully!');
    }
  };

  // Enhanced styling for both dark and light modes
  const textFieldSx = {
    '& .MuiInputLabel-root': { 
      color: isDarkMode ? '#e5e7eb' : '#4b5563',
      fontWeight: 600,
      fontSize: '1rem',
      marginBottom: '8px',
      '&.Mui-focused': {
        color: isDarkMode ? '#facc15' : '#3b82f6',
      }
    },
    '& .MuiOutlinedInput-root': {
      color: isDarkMode ? '#ffffff' : '#1f2937',
      backgroundColor: isDarkMode ? 
        'rgba(51, 65, 85, 0.4)' :  // slate-600 with opacity
        'rgba(248, 250, 252, 0.8)', // slate-50 with opacity
      borderRadius: '12px',
      backdropFilter: 'blur(12px)',
      boxShadow: isDarkMode ? 
        '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.1)' : 
        '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 0 rgba(0, 0, 0, 0.05)',
      border: isDarkMode ? 
        '1px solid rgba(148, 163, 184, 0.3)' : 
        '1px solid rgba(203, 213, 225, 0.6)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '& fieldset': { 
        borderColor: 'transparent',
        borderWidth: '0px',
      },
      '&:hover': {
        backgroundColor: isDarkMode ? 
          'rgba(71, 85, 105, 0.5)' :  // slate-500 with opacity  
          'rgba(241, 245, 249, 0.9)', // slate-100 with opacity
        transform: 'translateY(-2px)',
        border: isDarkMode ? 
          '1px solid rgba(250, 204, 21, 0.4)' : 
          '1px solid rgba(59, 130, 246, 0.4)',
        boxShadow: isDarkMode ? 
          '0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.1)' : 
          '0 8px 24px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 1), inset 0 -1px 0 rgba(0, 0, 0, 0.05)',
        '& fieldset': { 
          borderColor: 'transparent',
        },
      },
      '&.Mui-focused': {
        backgroundColor: isDarkMode ? 
          'rgba(71, 85, 105, 0.6)' :  
          'rgba(255, 255, 255, 0.95)',
        transform: 'translateY(-2px)',
        border: isDarkMode ? 
          '1px solid #facc15' : 
          '1px solid #3b82f6',
        boxShadow: isDarkMode ? 
          '0 12px 32px rgba(0, 0, 0, 0.4), 0 0 0 4px rgba(250, 204, 21, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(0, 0, 0, 0.1)' : 
          '0 12px 32px rgba(0, 0, 0, 0.15), 0 0 0 4px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 1), inset 0 -1px 0 rgba(0, 0, 0, 0.05)',
        '& fieldset': { 
          borderColor: 'transparent',
        },
      },
      '& input': {
        color: isDarkMode ? '#ffffff' : '#1f2937',
        fontWeight: 500,
        fontSize: '1rem',
        padding: '16px 20px',
      },
      '& textarea': {
        color: isDarkMode ? '#ffffff' : '#1f2937',
        fontWeight: 500,
        fontSize: '1rem',
        padding: '16px 20px',
        lineHeight: 1.6,
      },
    },
    '& .MuiInputBase-input::placeholder': {
      color: isDarkMode ? 'rgba(203, 213, 225, 0.7)' : 'rgba(107, 114, 128, 0.8)',
      opacity: 1,
      fontStyle: 'italic',
    },
    '& .MuiFormHelperText-root': {
      color: '#ef4444',
      fontSize: '0.85rem',
      fontWeight: 500,
      marginLeft: '4px',
      marginTop: '6px',
    },
  };

  return (
    <div id="contact">
      <div className="items-container">
        <div className={`contact_wrapper ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
          <h1>Contact Me</h1>
          <p>Got a project waiting to be realized? Let's collaborate and make it happen!</p>
          <Box
            ref={form}
            component="form"
            noValidate
            autoComplete="off"
            className="contact-form"
            onSubmit={sendEmail}
          >
            <div className="form-flex">
              <TextField
                label="Name"
                placeholder="What's your name?"
                value={name}
                onChange={(e) => {
                  console.log('Name input changed:', e.target.value);
                  setName(e.target.value);
                }}
                error={nameError}
                helperText={nameError ? 'Please enter your name' : ''}
                fullWidth
                variant="outlined"
                sx={textFieldSx}
              />
              <TextField
                label="Email"
                placeholder="How can I reach you?"
                value={email}
                onChange={(e) => {
                  console.log('Email input changed:', e.target.value);
                  setEmail(e.target.value);
                }}
                error={emailError}
                helperText={emailError ? 'Please enter your email or phone number' : ''}
                fullWidth
                variant="outlined"
                sx={textFieldSx}
              />
            </div>
            <TextField
              label="Message"
              placeholder="Send me any inquiries or questions"
              multiline
              rows={10}
              className="body-form"
              value={message}
              onChange={(e) => {
                console.log('Message input changed:', e.target.value);
                setMessage(e.target.value);
              }}
              error={messageError}
              helperText={messageError ? 'Please enter the message' : ''}
              fullWidth
              variant="outlined"
              sx={textFieldSx}
            />
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              sx={{
                alignSelf: 'flex-end',
                background: isDarkMode ? 
                  'linear-gradient(135deg, #facc15, #eab308)' : 
                  'linear-gradient(135deg, #3b82f6, #2563eb)',
                color: isDarkMode ? '#0f172a' : '#ffffff',
                padding: '14px 36px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '1.05rem',
                letterSpacing: '0.5px',
                textTransform: 'none',
                boxShadow: isDarkMode ? 
                  '0 8px 24px rgba(250, 204, 21, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)' : 
                  '0 8px 24px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: 'none',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  transition: 'left 0.5s',
                },
                '&:hover': {
                  background: isDarkMode ? 
                    'linear-gradient(135deg, #eab308, #d97706)' : 
                    'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  boxShadow: isDarkMode ? 
                    '0 12px 36px rgba(250, 204, 21, 0.6), 0 0 0 4px rgba(250, 204, 21, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)' : 
                    '0 12px 36px rgba(59, 130, 246, 0.6), 0 0 0 4px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                  transform: 'translateY(-3px) scale(1.02)',
                  '&::before': {
                    left: '100%',
                  },
                },
                '&:active': {
                  transform: 'translateY(-1px) scale(1.01)',
                },
              }}
            >
              Send Message
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Contact;