<style>
  .container {
    display: flex; /* Enable Flexbox */
    justify-content: center; /* Center columns */
    gap: 20px; /* Space between columns */
    flex-wrap: wrap;
    font-family: Arial, Verdana, sans-serif;
  }

  .column {
    width: 400px; /* Adjust as needed */
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 30px;
  }

  .icon-circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0 auto 20px auto; /* Center and add bottom margin */
    /* ... add styling for icon positioning within the circle */
  }

  h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
  }
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  a {
    color: #007bff;
    text-decoration: none;
    transition: color 0.3s;
    &:hover {
      color: #0056b3;
      text-decoration: underline;
    }
  }
  .text {
    padding: 0 20px;
    margin-bottom: 20px;
    text-align: justify;
    color: rgb(90, 90, 90);
  }
</style>
<div class="container">
  <p class="text">
    The Chromium projects include Chromium and ChromiumOS, the open-source projects behind the
    <a href="https://www.google.com/chrome">Google Chrome</a> browser and Google ChromeOS, respectively. This site houses the
    documentation and code related to the Chromium projects and is intended for developers interested in learning about and
    contributing to the open-source projects
  </p>

  <div class="column">
    <div class="icon-circle">
      <img src="https://www.chromium.org/chromium-projects/logo_chrome_color_1x_web_32dp.png" alt="" />
    </div>
    <h2><a href="https://www.chromium.org/Home"> Chromium </a></h2>
    <p>
      Chromium is an open-source browser project that aims to build a safer, faster, and more stable way for all users to
      experience the web. This site contains design documents, architecture overviews, testing information, and more to help you
      learn to build and work with the Chromium source code.
    </p>
    <p>Looking for Google ChromeOS devices?</p>
    <a href="https://www.google.com/chrome"> Download Google Chrome </a>
  </div>

  <div class="column">
    <div class="icon-circle">
      <img src="https://www.chromium.org/chromium-projects/logo_chrome_color_1x_web_32dp.png" alt="" />
    </div>
    <h2><a href="https://www.chromium.org/chromium-os"> ChromiumOS </a></h2>
    <p>
      ChromiumOS is an open-source project that aims to provide a fast, simple, and more secure computing experience for people
      who spend most of their time on the web. Learn more about the
      <a href="https://googleblog.blogspot.com/2009/11/releasing-chromium-os-open-source.html"> project goals </a>, obtain the
      latest build, and learn how you can get involved, submit code, and file bugs.
    </p>
    <p>Looking for Google ChromeOS devices?</p>
    <a href="https://www.google.com/chromeos"> Visit the Google ChromeOS site </a>
  </div>
</div>
