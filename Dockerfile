FROM node:22
WORKDIR /app
ENV PORT 8080
ENV MODEL_URL="https://storage.googleapis.com/model-production-submissionmlgc-fadhillailham/model-in-prod/model.json"
COPY . .
RUN npm install
EXPOSE 8080
CMD [ "npm", "run", "start"]