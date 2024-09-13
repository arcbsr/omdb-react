import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/footer/Footer';
import Body from './components/routes/MainRoutes';
import ThemeToggleButton from './components/Themes/ThemeToggleButton';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider, useTheme } from './components/Themes/ThemeContext';
import { lightTheme, darkTheme } from './components/Themes/themes';
import GlobalStyle from './components/Themes/GlobalStyles';  // or import globalStyles for Emotion
import './App.css'
import AuthProvider from './pages/User/context/AuthContext';

function AppContent() {
  const { isDarkTheme, toggleTheme } = useTheme();

  // Determine which theme to apply
  const theme = isDarkTheme ? darkTheme : lightTheme;

  // Update the theme object to include a background color
  const updatedTheme = {
    ...theme,
    backgroundColor: isDarkTheme ? '#333' : '#f0f0f0'
  };

  return (
    <StyledThemeProvider theme={updatedTheme}>
      <GlobalStyle />
      <div style={{ backgroundColor: updatedTheme.backgroundColor, minHeight: '100vh', minWidth: '100vw' }}>
        <AuthProvider>
          <Router>
            <div className="app">
              <Header />
              <Body />
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </div>
    </StyledThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
    // <BookmarkProvider>

    //   <Router>
    //     <Routes>
    //       <Route path="/" element={<MovieContainer />} />
    //       <Route path="/details/:imdbID" element={<MovieDetail />} />
    //     </Routes>
    //   </Router>
    //   </BookmarkProvider>

    // <Router>
    //   <Header />
    //   <Body/>
    //   <Footer />
    // </Router>
  );
}
export default App;


