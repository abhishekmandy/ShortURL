# ShortURL

A simple URL shortener web application built with Node.js, Express, MongoDB, and EJS.

## Features

- Shorten long URLs to unique short IDs
- Redirect short URLs to the original URLs
- Track visit history (click analytics)
- View all shortened URLs and their stats
- Server-side rendering with EJS

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- EJS (Embedded JavaScript templates)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/ShortURL.git
   cd ShortURL
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/short-url
   PORT=8001
   ```

4. **Start MongoDB** (if not already running):
   ```sh
   mongod
   ```

5. **Run the app:**
   ```sh
   npm start
   ```
   or
   ```sh
   node index.js
   ```

6. **Visit the app:**
   Open [http://localhost:8001](http://localhost:8001) in your browser.

## Usage

- Enter a long URL in the input box and click "Generate" to get a short link.
- Use the generated short link to be redirected to the original URL.
- View all your shortened URLs and their click counts in the table.

## Project Structure

```
ShortURL/
├── controllers/
│   ├── geturl.js
│   └── url.js
├── models/
│   └── url.js
├── routes/
│   ├── geturl.js
│   └── url.js
├── views/
│   └── home.ejs
├── .env
├── .gitignore
├── index.js
├── package.json
```

## License

This project is licensed under the MIT License.

---

**Happy shortening!**
