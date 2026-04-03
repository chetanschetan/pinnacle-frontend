FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
# Vite usually runs on 5173
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]

# Note: The -- --host flag is critical. It tells Vite to allow connections from outside the container (otherwise, you won't see your site in Chrome).












# 🎓 CSE Concept: SPA (Single Page Application)
# This proves your project is a true SPA.

# In a traditional website (like old PHP), you need the server for every single click.

# In a MERN app, the Frontend container only exists to "deliver the package" to your browser. Once the package is opened in your browser, the Frontend container can go to sleep, and the UI will still work—until it needs to ask the Backend for data.