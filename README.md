[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/Daltonic/data-mockup/">
    <img src="https://vuejs.org/images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Data Mockup</h3>

  <p align="center">
    A responsive web application for mocking and generating data for the database and also downloadable in SQL, CSV, and JSON.
    <br />
    <a href="https://github.com/Daltonic/data-mockup"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://data-mockup.web.app/">View Demo</a>
    ·
    <a href="https://github.com/Daltonic/data-mockup/issues">Report Bug</a>
    ·
    <a href="https://github.com/Daltonic/data-mockup/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
![Data Mockup Screenshot](https://drive.google.com/uc?id=1IqnGvi8MXq_y81HtqrP8TUzAMNBPHw5K)

Data Mockup is a web application for mocking and generating data for the database and also downloadable in SQL, CSV, and JSON. Data Mockup leverages on [FakeJSON's API](http://fakejson.com/) and the [Firebase](https://console.firebase.google.com/). All these are mingled together inside the VueJs JavaScript framework and [Bootstrap-vue](https://bootstrap-vue.org/). 


### Built With

The following tools were used in the building of Data Mockup.
* [VueJs](https://vuejs.org/)
* [Vue-Router](https://router.vuejs.org/)
* [Firebase](https://console.firebase.google.com/)
* [Bootstrap-Vue](https://bootstrap-vue.org/)
* [FakeJSON API](http://fakejson.com/)



<!-- GETTING STARTED -->
## Getting Started

To get this project running on your system observe and implement the following procedures.

### Prerequisites

Get the latest VueJs CLI installed on your machine by entering this command on your terminal.
* npm
  ```sh
  npm install -g @vue/cli
  ```

### Installation

1. Get a free API Key at [FakeJSON's Doc](https://pixabay.com/api/docs/)
2. Clone the repo
   ```sh
   git clone https://github.com/Daltonic/data-mockup.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```JS
   const TOKEN = 'ENTER YOUR API';
   ```
6. Get a free API Key from your [Firebase](https://pixabay.com/api/docs/) account.
5. Enter your Firebase API details in `firebaseConfig.js`
   ```JS
   export default {
        apiKey: "XXX-XXX-XXX-XXX-XXX",
        authDomain: "XXX-XXX-XXX-XXX-XXX",
        projectId: "XXX-XXX-XXX",
        storageBucket: "XXX-XXX-XXX-XXX-XXX",
        messagingSenderId: "XXX-XXX-XXX-XXX",
        appId: "XXX-XXX-XXX-XXX-XXX-XXX-XXX",
        measurementId: "XXX-XXX-XXX"
   }
   ```



<!-- USAGE EXAMPLES -->
## Usage

When you visit the app domain at [Data Mockup](https://data-mockup.web.app/), click on the add project card to create a new project or utilize an existing project created by other users on the platform.

![Data Mockup Hero Screen Shot](https://drive.google.com/uc?id=1b1XdRPCaaCMyfOavVlAYV6iu55lsgO6r)

To create a new project you will be redirected to the login page to enter your credential before proceeding if you are yet to be authenticated. You can sign up to proceed.

![Data Mockup Images Screenshot](https://drive.google.com/uc?id=1_TwK8A89_XbFlO4VfVkf_X0k24U9Z4lQ)

Enter the title and description of the project to create new project. Edit, update and delete functionalities are also available on each project provided that you are the owner.

![Data Mockup Images Screenshot](https://drive.google.com/uc?id=1cMecOjkMFskkxUCaDIu7YPoW9LodNIac)

You can add rows and column data inside your project and click on the generate button to generate data at the available file types. Please don't forget to enter the name of the table and the number of records you aim to generate. For demo purpose, ten records is the maximum allowed for the [FakeJSON's API](http://fakejson.com/) free account.

![Data Mockup Editor Screenshot](https://drive.google.com/uc?id=1O-5ORRF_pCQiCx_zqkyuWoN4HcyzhlYo)

Once data is generated on a preferred file type, you can copy the data, toggle between JSON, CSV, or SQL file type and also download if you want.

![Data Mockup Output Screenshot](https://drive.google.com/uc?id=1sGLlUwgbhRDEMjpRO61icnXLRaSLho50)

You can add new mockup data mirroring the [FakeJSON's API Docs](https://fakejson.com/documentation) pattern, utilize this part only if you understand how to use the FakeJSON doc.

![Data Mockup Output Screenshot](https://drive.google.com/uc?id=1kztY8pfEkqQMBDB-ocWTvL-PaHxlGa8T)


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/Daltonic/data-mockup/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Gospel Darlington - [Facebook](https://www.facebook.com/darlington.gospel01) - darlingtongospel@gmail.com

Project Link: [https://github.com/Daltonic/data-mockup](https://github.com/Daltonic/data-mockup)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [VueJs](https://vuejs.org/)
* [Vue-Router](https://router.vuejs.org/)
* [Firebase](https://console.firebase.google.com/)
* [Bootstrap-Vue](https://bootstrap-vue.org/)
* [FakeJSON API](http://fakejson.com/)
* [Mockaroo](https://www.mockaroo.com/)



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/Daltonic/data-mockup/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/Daltonic/data-mockup/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/Daltonic/data-mockup/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/Daltonic/data-mockup/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/Daltonic/data-mockup/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/darlington-gospel-aa626b125/
[product-screenshot]: images/screenshot.png
