import React from "react";
import { Container, Typography, Grid, Link } from "@mui/material";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const AboutMePage = () => {
  const [text] = useTypewriter({
    words: ["Diwash Karki", "a MERN Stack Developer", "a Full Stack Developer"],
    loop: true,
    typeSpeed: 100,
    deleteSpeed: 50,
    delaySpeed: 1000,
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" gutterBottom>
        About Me
      </Typography>
      <Typography variant="body1" paragraph>
        {`Hi, I'm`} <span style={{ fontWeight: "bold" }}>{text}</span>
        <Cursor />
      </Typography>
      <Typography variant="body1" paragraph>
        I am Diwash Karki, a recent graduate with a strong background in
        programming languages and technologies, specializing in the MERN stack
        (MongoDB, Express.js, React.js, and Node.js). I am skilled in HTML/CSS,
        JavaScript, and passionate about problem-solving and continuous
        learning.
      </Typography>
      <Typography variant="body1" paragraph>
        I am currently seeking opportunities in web development or software
        engineering to apply my acquired knowledge and contribute to real-world
        projects while further developing my technical expertise.
      </Typography>
      <Typography variant="body1" paragraph>
        You can check out my projects and contributions on my GitHub profile:
        <Link
          href="https://github.com/Diwaskarki96"
          target="_blank"
          rel="noopener"
        >
          https://github.com/Diwaskarki96
        </Link>
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Technical Skills
          </Typography>
          <Typography variant="body1" paragraph>
            - JavaScript, React.js, Express.js, MongoDB, Socket.io
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Soft Skills
          </Typography>
          <Typography variant="body1" paragraph>
            - Problem-Solving, Time Management, Adaptability, Teamwork
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            My Goals
          </Typography>
          <Typography variant="body1" paragraph>
            - To contribute to real-world projects
          </Typography>
          <Typography variant="body1" paragraph>
            - To further develop my technical expertise
          </Typography>
          <Typography variant="body1" paragraph>
            - To continuously learn and improve my skills
          </Typography>
          <Typography variant="body1" paragraph>
            - To seek opportunities in web development or software engineering
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutMePage;
