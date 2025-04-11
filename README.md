
## 📚 ResearchBot – Ask Questions from Your PDFs (Powered by OpenAI)

**ResearchBot** is a web-based chatbot that lets you upload research papers (PDFs) and ask questions directly from their content. It uses the OpenAI API to generate smart, context-aware answers.

---

### 🚀 Features

- 📄 Upload and parse PDF documents
- 💬 Ask questions based on the uploaded content
- 🔑 Powered by OpenAI GPT API
- 🖥️ Simple UI using HTML, CSS, and JavaScript
- ⚙️ Backend built with Node.js and Express

### Screenshots
![image](https://github.com/user-attachments/assets/22c2e200-001b-4594-9ba3-c3cafc8b6fee)
![image](https://github.com/user-attachments/assets/c7fe49a9-182e-4fd4-80c4-73d5a019e74d)


---

### 📁 Project Structure

```
research-bot/
├── client/
│   ├── index.html       # Frontend HTML
│   ├── style.css        # Styling
│   └── script.js        # Client-side logic
├── server/
│   ├── index.js         # Express server
│   └── uploads/         # Uploaded PDFs (temp storage)
├── .env                 # Environment variables
├── package.json         # Project metadata & dependencies
└── README.md            # This file
```

---

### 🛠️ Requirements

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- An [OpenAI API Key](https://platform.openai.com/account/api-keys)

---

### 🔧 Setup Instructions

#### 1. Go to your path

```bash
cd research-bot
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Set Your OpenAI API Key

Create a `.env` file in the root folder:

```bash
touch .env
```

```
OPENAI_API_KEY=your_openai_api_key_here
```

---

### ▶️ Run the App

```bash
npm start
```

Now open your browser and go to:  
📍 **http://localhost:3000**
